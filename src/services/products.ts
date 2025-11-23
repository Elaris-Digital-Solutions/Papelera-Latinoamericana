import { deleteCloudinaryAssetByUrl } from "./cloudinary";
import { supabaseClient } from "./supabaseClient";

export interface CategoryRecord {
  id: string;
  nombre: string;
  slug: string;
}

export interface CategoryCreateInput {
  nombre: string;
  slug: string;
}

export interface CategoryUpdateInput {
  nombre?: string;
  slug?: string;
}

export interface CategoryConflictRecord {
  id: string;
  nombre: string;
  slug: string;
}

export interface ProductRecord {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  presentacion: string | null;
  codigo: string | null;
  imagen_url: string | null;
  categoria_id: string;
  categoria?: CategoryRecord | CategoryRecord[] | null;
}

export interface CatalogProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  presentation: string | null;
  code: string | null;
  imageUrl: string | null;
  category: CategoryRecord;
}

export interface ProductUpdateInput {
  nombre?: string;
  descripcion?: string | null;
  presentacion?: string | null;
  codigo?: string | null;
  categoria_id?: string;
  imagen_url?: string | null;
}

export interface ProductCreateInput extends ProductUpdateInput {
  nombre: string;
  slug: string;
}

export interface ProductConflictRecord {
  id: string;
  nombre: string;
  codigo: string | null;
  slug: string;
}

const mapProduct = (record: ProductRecord): CatalogProduct => {
  const categoryData = record.categoria;
  const normalizedCategory = Array.isArray(categoryData)
    ? categoryData[0] ?? null
    : categoryData ?? null;

  const fallbackCategory: CategoryRecord = normalizedCategory ?? {
    id: record.categoria_id,
    nombre: "Sin categoría",
    slug: "sin-categoria",
  };

  return {
    id: record.id,
    name: record.nombre,
    slug: record.slug,
    description: record.descripcion,
    presentation: record.presentacion,
    code: record.codigo,
    imageUrl: record.imagen_url,
    category: fallbackCategory,
  };
};

const productSelect = `
  id,
  nombre,
  slug,
  descripcion,
  presentacion,
  codigo,
  imagen_url,
  categoria_id,
  categoria:categorias ( id, nombre, slug )
`;

export const fetchProducts = async (): Promise<CatalogProduct[]> => {
  const { data, error } = await supabaseClient
    .from("productos")
    .select(productSelect)
    .order("nombre", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapProduct);
};

export const fetchProductBySlug = async (slug: string): Promise<CatalogProduct | null> => {
  const { data, error } = await supabaseClient
    .from("productos")
    .select(productSelect)
    .eq("slug", slug)
    .maybeSingle();

  if (error && error.code !== "PGRST116") throw error;
  return data ? mapProduct(data) : null;
};

export const fetchCategories = async (): Promise<CategoryRecord[]> => {
  const { data, error } = await supabaseClient
    .from("categorias")
    .select("id, nombre, slug")
    .order("nombre", { ascending: true });

  if (error) throw error;
  return data ?? [];
};

export const createCategory = async (payload: CategoryCreateInput): Promise<CategoryRecord> => {
  const { data, error } = await supabaseClient
    .from("categorias")
    .insert([payload])
    .select("id, nombre, slug")
    .single();

  if (error) throw error;
  return data;
};

export const updateCategory = async (
  id: string,
  payload: CategoryUpdateInput,
): Promise<CategoryRecord> => {
  const { data, error } = await supabaseClient
    .from("categorias")
    .update(payload)
    .eq("id", id)
    .select("id, nombre, slug")
    .single();

  if (error) throw error;
  return data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  const { error } = await supabaseClient.from("categorias").delete().eq("id", id);
  if (error) throw error;
};

export const createProduct = async (payload: ProductCreateInput): Promise<CatalogProduct> => {
  const { data, error } = await supabaseClient
    .from("productos")
    .insert([payload])
    .select(productSelect)
    .single();

  if (error) throw error;
  return mapProduct(data);
};

export const updateProduct = async (id: string, payload: ProductUpdateInput): Promise<CatalogProduct> => {
  const { data, error } = await supabaseClient
    .from("productos")
    .update(payload)
    .eq("id", id)
    .select(productSelect)
    .single();

  if (error) throw error;
  return mapProduct(data);
};

export const deleteProduct = async (id: string, imageUrl?: string | null): Promise<void> => {
  if (imageUrl) {
    try {
      await deleteCloudinaryAssetByUrl(imageUrl);
    } catch (cloudinaryError) {
      throw cloudinaryError instanceof Error
        ? cloudinaryError
        : new Error("No se pudo eliminar la imagen en Cloudinary");
    }
  }

  const { error } = await supabaseClient.from("productos").delete().eq("id", id);
  if (error) throw error;
};

export const findProductConflicts = async ({
  code,
  slug,
  excludeId,
}: {
  code?: string | null;
  slug: string;
  excludeId?: string;
}): Promise<ProductConflictRecord[]> => {
  const normalizedSlug = slug.trim().toLowerCase();
  const normalizedCode = code?.trim() ?? null;

  const filters: string[] = [`slug.eq.${normalizedSlug}`];
  if (normalizedCode) {
    filters.push(`codigo.eq.${normalizedCode}`);
  }

  let query = supabaseClient.from("productos").select("id, nombre, codigo, slug");
  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data, error } = await query.or(filters.join(","));
  if (error) throw error;
  return (data ?? []) as ProductConflictRecord[];
};

export const findCategoryConflicts = async ({
  slug,
  nombre,
  excludeId,
}: {
  slug: string;
  nombre?: string;
  excludeId?: string;
}): Promise<CategoryConflictRecord[]> => {
  const normalizedSlug = slug.trim().toLowerCase();
  const normalizedName = nombre?.trim();

  const filters: string[] = [`slug.eq.${normalizedSlug}`];
  if (normalizedName) {
    filters.push(`nombre.eq.${normalizedName}`);
  }

  let query = supabaseClient.from("categorias").select("id, nombre, slug");
  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data, error } = await query.or(filters.join(","));
  if (error) throw error;
  return (data ?? []) as CategoryConflictRecord[];
};
