import { useQuery } from "@tanstack/react-query";
import {
  CatalogProduct,
  CategoryRecord,
  fetchCategories,
  fetchProductBySlug,
  fetchProducts,
} from "@/services/products";

export const useProductsQuery = () =>
  useQuery<CatalogProduct[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

export const useCategoriesQuery = () =>
  useQuery<CategoryRecord[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

export const useProductQuery = (slug?: string) =>
  useQuery<CatalogProduct | null>({
    queryKey: ["product", slug],
    queryFn: () => {
      if (!slug) throw new Error("Product slug is required");
      return fetchProductBySlug(slug);
    },
    enabled: Boolean(slug),
  });
