import React, { createContext, useContext, useState, useEffect } from "react";
import { products as catalogProducts, Product as CatalogProduct } from "@/data/products";

export interface Product {
  id: string;
  image: string;
  name: string;
  description: string;
  features: string[];
  category: string;
  visible: boolean;
}

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleVisibility: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const createFeatureList = (product: CatalogProduct): string[] => {
  const sharedBullets = [
    "Calidad institucional garantizada",
    "Entrega rápida a nivel nacional",
    "Texturas suaves y resistentes",
    "Asesoría personalizada para tu pedido",
  ];

  if (product.category.toLowerCase().includes("papel")) {
    return [
      "Celulosa seleccionada para máxima absorción",
      "Mayor rendimiento por rollo o pliego",
      "Compatible con dispensadores institucionales",
      "Control de calidad continuo en planta",
    ];
  }

  if (product.category.toLowerCase().includes("navidenas")) {
    return [
      "Diseños estacionales listos para vitrinas",
      "Tintas orgánicas resistentes al roce",
      "Cortes precisos para un doblado perfecto",
      "Disponibilidad limitada: programa tu pedido",
    ];
  }

  if (product.category.toLowerCase().includes("eventos")) {
    return [
      "Estampados elegantes para celebraciones",
      "Combinan con vajillas premium",
      "Paquetes listos para banqueteras",
      "Acabado satinado y absorbente",
    ];
  }

  return sharedBullets;
};

const initialProducts: Product[] = catalogProducts.map((product) => ({
  id: product.id,
  image: product.image,
  name: product.name,
  description: product.description,
  features: createFeatureList(product),
  category: product.category,
  visible: true,
}));

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load products from localStorage or use initial products
    const savedProducts = localStorage.getItem("admin_products");

    if (savedProducts) {
      try {
        const parsed: Product[] = JSON.parse(savedProducts);
        const needsMigration =
          !Array.isArray(parsed) ||
          parsed.length === 0 ||
          parsed.every((product) => product.image?.includes("placeholder"));

        if (!needsMigration) {
          setProducts(parsed);
          return;
        }
      } catch (error) {
        console.warn("No se pudieron cargar los productos guardados, se usará el catálogo base.", error);
      }
    }

    setProducts(initialProducts);
  }, []);

  useEffect(() => {
    // Save products to localStorage whenever products change
    localStorage.setItem("admin_products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const toggleVisibility = (id: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, visible: !product.visible } : product
      )
    );
  };

  return (
    <ProductsContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      toggleVisibility
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};