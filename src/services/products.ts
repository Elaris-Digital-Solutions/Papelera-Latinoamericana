import { supabaseClient } from "./supabaseClient";

export interface CategoryRecord {
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
  categoria?: CategoryRecord[] | null;
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

const mapProduct = (record: ProductRecord): CatalogProduct => {
  const firstCategory =
    Array.isArray(record.categoria) && record.categoria.length > 0
      ? record.categoria[0]
      : null;

  const fallbackCategory: CategoryRecord = firstCategory ?? {
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
