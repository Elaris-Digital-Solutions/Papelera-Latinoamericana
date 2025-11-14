import React, { createContext, useContext, useState, useEffect } from 'react';

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

const initialProducts: Product[] = [
  {
    id: "papel-higienico",
    image: "placeholder.jpg",
    name: "Papel Higiénico Premium",
    description: "Rollos de papel higiénico premium con suavidad excepcional. Disponibles en presentaciones individuales y paquetes mayoristas para uso doméstico y comercial.",
    features: ["Ultra suave y resistente", "Alta absorción", "100% biodegradable", "Presentaciones múltiples"],
    category: "Higiene Personal",
    visible: true
  },
  {
    id: "papel-higienico-jumbo",
    image: "placeholder.jpg",
    name: "Papel Higiénico Jumbo",
    description: "Rollos de gran tamaño especialmente diseñados para uso comercial e institucional. Máxima durabilidad y rendimiento económico.",
    features: ["Mayor rendimiento por rollo", "Ideal para uso comercial", "Compatible con dispensadores", "Excelente relación precio-calidad"],
    category: "Higiene Personal",
    visible: true
  },
  {
    id: "servilletas",
    image: "placeholder.jpg",
    name: "Servilletas Clásicas",
    description: "Servilletas de papel de alta calidad en diversos colores y tamaños. Perfectas para restaurantes, eventos y uso doméstico.",
    features: ["Variedad de colores", "Diferentes tamaños disponibles", "Resistentes y absorbentes", "Absorción rápida"],
    category: "Mesa y Cocina",
    visible: true
  },
  {
    id: "servilletas-premium",
    image: "placeholder.jpg",
    name: "Servilletas Premium",
    description: "Servilletas de lujo con diseños elegantes y texturas especiales, perfectas para eventos especiales y establecimientos de alta gama.",
    features: ["Diseños exclusivos", "Textura premium suave", "Colores elegantes", "Presentación especial"],
    category: "Mesa y Cocina",
    visible: true
  },
  {
    id: "papel-toalla",
    image: "placeholder.jpg",
    name: "Papel Toalla Multiusos",
    description: "Toallas de papel ultra absorbentes y resistentes, ideales para cocina, limpieza y múltiples usos domésticos y comerciales.",
    features: ["Ultra absorbente", "Resistente en húmedo", "Multiusos versátil", "Dispensado fácil"],
    category: "Limpieza",
    visible: true
  },
  {
    id: "papel-toalla-industrial",
    image: "placeholder.jpg",
    name: "Papel Toalla Industrial",
    description: "Toallas de papel de grado industrial para uso profesional intensivo. Máxima resistencia y capacidad de absorción.",
    features: ["Grado industrial", "Super resistente", "Alto rendimiento", "Uso profesional intensivo"],
    category: "Limpieza",
    visible: true
  }
];

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load products from localStorage or use initial products
    const savedProducts = localStorage.getItem('admin_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
    }
  }, []);

  useEffect(() => {
    // Save products to localStorage whenever products change
    localStorage.setItem('admin_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const toggleVisibility = (id: string) => {
    setProducts(prev => 
      prev.map(product => 
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