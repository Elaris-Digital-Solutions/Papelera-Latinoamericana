import "dotenv/config";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { v2 as cloudinary } from "cloudinary";
import { products, categories } from "../src/data/products";

const required = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const supabaseUrl = required(process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL, "VITE_SUPABASE_URL");
const supabaseKey = required(
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_SERVICE_KEY,
  "SUPABASE_SERVICE_ROLE_KEY || VITE_SUPABASE_ANON_KEY"
);

const supabase = createClient(supabaseUrl, supabaseKey);

const cloudName = required(
  process.env.VITE_CLOUDINARY_CLOUD_NAME ?? process.env.CLOUDINARY_CLOUD_NAME,
  "VITE_CLOUDINARY_CLOUD_NAME"
);
const cloudApiKey = required(
  process.env.VITE_CLOUDINARY_API_KEY ?? process.env.CLOUDINARY_API_KEY,
  "VITE_CLOUDINARY_API_KEY"
);
const cloudApiSecret = required(
  process.env.VITE_CLOUDINARY_API_SECRET ?? process.env.CLOUDINARY_API_SECRET,
  "VITE_CLOUDINARY_API_SECRET"
);
const cloudFolder = process.env.CLOUDINARY_FOLDER ?? process.env.VITE_CLOUDINARY_FOLDER ?? "PALASAC";

cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudApiKey,
  api_secret: cloudApiSecret,
  secure: true,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "..", "public");

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

const loadExistingCategories = async () => {
  const { data, error } = await supabase.from("categorias").select("id, slug, nombre");
  if (error) throw error;
  return data ?? [];
};

const loadExistingProducts = async () => {
  const { data, error } = await supabase.from("productos").select("id, slug, codigo");
  if (error) throw error;
  return data ?? [];
};

const ensureCategories = async () => {
  const existing = await loadExistingCategories();
  const map = new Map(existing.map((cat) => [cat.slug, cat]));

  for (const name of categories) {
    const slug = slugify(name);
    if (map.has(slug)) continue;

    const { data, error } = await supabase
      .from("categorias")
      .insert({ nombre: name, slug })
      .select("id, slug, nombre")
      .single();

    if (error) {
      console.error(`Failed to insert category ${name}`, error);
      throw error;
    }

    map.set(slug, data);
    console.log(`Created category: ${name}`);
  }

  return map;
};

const normalizeCode = (code: string | null | undefined, slug: string) => {
  const trimmed = code?.trim();
  if (!trimmed || trimmed === "XXXXXXXXXX") {
    return slug.toUpperCase();
  }
  return trimmed;
};

const generateUniqueCode = (
  rawCode: string | null | undefined,
  slug: string,
  usedCodes: Set<string>
) => {
  const base = normalizeCode(rawCode, slug);
  let candidate = base;
  let counter = 1;

  while (usedCodes.has(candidate)) {
    candidate = `${base}-${counter}`;
    counter += 1;
  }

  usedCodes.add(candidate);
  if (candidate !== base) {
    console.warn(`Adjusted duplicate code for ${slug} -> ${candidate}`);
  }
  return candidate;
};

const resolveImagePath = async (relativePath: string) => {
  if (!relativePath) return null;
  const normalized = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
  const absolute = path.join(publicDir, normalized);
  try {
    await fs.access(absolute);
    return absolute;
  } catch {
    console.warn(`Image not found locally: ${relativePath}`);
    return null;
  }
};

const uploadImage = async (productSlug: string, localPath: string) => {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      folder: cloudFolder,
      public_id: productSlug,
      overwrite: true,
      unique_filename: false,
      use_filename: false,
      resource_type: "image",
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Failed to upload image for ${productSlug}`, error);
    throw error;
  }
};

const migrateProducts = async () => {
  const categoryMap = await ensureCategories();
  const existingProducts = await loadExistingProducts();
  const existingProductMap = new Map(existingProducts.map((product) => [product.slug, product]));
  const usedCodes = new Set(existingProducts.map((product) => product.codigo));
  let upserted = 0;
  let skipped = 0;

  for (const product of products) {
    const categorySlug = slugify(product.category);
    const category = categoryMap.get(categorySlug);
    if (!category) {
      console.warn(`Category not found in Supabase for product ${product.name}`);
      skipped += 1;
      continue;
    }

    let imageUrl: string | null = null;
    if (product.image) {
      const localPath = await resolveImagePath(product.image);
      if (localPath) {
        imageUrl = await uploadImage(product.slug, localPath);
      }
    }

    const existingProduct = existingProductMap.get(product.slug);

    const codigo = existingProduct
      ? existingProduct.codigo
      : generateUniqueCode(product.code, product.slug, usedCodes);

    const payload = {
      codigo,
      nombre: product.name,
      slug: product.slug,
      categoria_id: category.id,
      presentacion: product.presentation || null,
      descripcion: product.description || null,
      imagen_url: imageUrl,
    };

    const { error } = await supabase.from("productos").upsert(payload, { onConflict: "slug" });
    if (error) {
      console.error(`Failed to upsert product ${product.name}`, error);
      continue;
    }

    upserted += 1;
    console.log(`Synced product: ${product.name}`);
  }

  console.log(`\nMigration finished. Upserted ${upserted} products. Skipped ${skipped}.`);
};

migrateProducts()
  .then(() => {
    console.log("Done.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration failed", error);
    process.exit(1);
  });
