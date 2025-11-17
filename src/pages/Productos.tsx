import { categories, products } from "@/data/products";
import { Link } from "react-router-dom";
import { Search, Package } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { fadeInUp, scaleIn, staggerContainer, viewportConfig } from "@/lib/motion";

const Productos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const groupedProducts = useMemo(() => {
    const grouped: { [key: string]: typeof products } = {};
    filteredProducts.forEach(product => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });
    return grouped;
  }, [filteredProducts]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        className="relative h-screen min-h-[640px] overflow-hidden"
        variants={fadeInUp}
        initial="hidden"
        animate="show"
      >
        <div className="absolute inset-0 bg-[url('/assets/productos.png')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/60 to-sky-900/50 z-10"></div>
        <div className="relative h-full flex items-center justify-center text-center px-4 z-20">
          <motion.div className="max-w-4xl" variants={staggerContainer} initial="hidden" animate="show">
            <motion.h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4" variants={fadeInUp}>
              Nuestros Productos
            </motion.h1>
            <motion.p className="text-lg text-slate-100" variants={fadeInUp}>
              Amplio catálogo de papel institucional, papel toalla y servilletas para cada necesidad
            </motion.p>
            <motion.div className="mt-8 flex justify-center" variants={fadeInUp}>
              <a
                href="/assets/CATALOGO-PALASAC-2024.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-sky-700 transition"
              >
                Descargar Catálogo
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-16">
        {/* Search and Filter Section */}
        <motion.div
          className="mb-12 max-w-4xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportConfig}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {filteredProducts.length > 0 && (
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          )}
        </motion.div>

        {/* Categories and Products */}
        {Object.keys(groupedProducts).length > 0 ? (
          <div className="space-y-16">
            {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
              <motion.section
                key={category}
                id={category.toLowerCase().replace(/\s+/g, '-')}
                variants={fadeInUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportConfig}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {category}
                  </h2>
                  <div className="h-1 w-20 bg-primary rounded"></div>
                </div>

                <motion.div
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                  variants={staggerContainer}
                >
                  {categoryProducts.map((product, index) => (
                    <motion.div key={product.slug} variants={scaleIn} custom={index}>
                      <Link
                        to={`/productos/${product.slug}`}
                        className="group"
                      >
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                          <div className="aspect-square bg-white border border-gray-300 flex items-center justify-center p-8">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-slate-900 text-sm line-clamp-2 group-hover:text-sky-600 transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              {product.category}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
          >
            <Package className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">
              No se encontraron productos
            </h3>
            <p className="text-muted-foreground">
              Intenta con otros términos de búsqueda o filtros
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Productos;