import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/contexts/ProductsContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["Todos", "Higiene Personal", "Mesa y Cocina", "Limpieza"];

const Products = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  
  const filteredProducts = selectedCategory === "Todos" 
    ? products.filter(product => product.visible)
    : products.filter(product => product.category === selectedCategory && product.visible);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section with Papelera Latinoamericana Aesthetic */}
        <section className="py-20 bg-background relative">
          {/* Newspaper lines pattern background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 49px,
                hsl(var(--divider)) 49px,
                hsl(var(--divider)) 50px
              )`
            }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Title Section with Newspaper Border */}
              <div className="newspaper-border py-8 mb-12">
                <div className="border-l-4 border-primary pl-6 mb-6 inline-block">
                  <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-4 leading-tight uppercase tracking-wide">
                    Nuestros Productos
                  </h1>
                </div>
                <p className="text-xl md:text-2xl text-muted-foreground font-body leading-relaxed max-w-3xl mx-auto">
                  Más de 25 años ofreciendo papel higiénico, servilletas y productos de papel con la suavidad y resistencia que mereces para tu negocio y hogar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            {/* Category Filters - Elegant Text Menu */}
            <div className="flex flex-wrap justify-center gap-8 mb-16">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-lg font-body font-medium tracking-wide uppercase transition-all duration-300 relative ${
                    selectedCategory === category
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {category}
                  {selectedCategory === category && (
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-primary rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredProducts.map((product) => (
                <Card key={product.id} id={product.id} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden bg-background border-2 border-border vintage-shadow">
                  {/* Product Image */}
                  <div className="aspect-square overflow-hidden p-8 flex items-center justify-center bg-white">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  <CardContent className="p-6 border-t-2 border-ink">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-sm text-xs font-body font-medium uppercase tracking-wide">
                        {product.category}
                      </span>
                    </div>
                    
                    {/* Product Name - Serif Typography */}
                    <h3 className="text-2xl font-display font-bold text-foreground mb-3 leading-tight">
                      {product.name}
                    </h3>
                    
                    {/* Description - Sans-serif for readability */}
                    <p className="text-muted-foreground font-body leading-relaxed mb-4 text-sm">
                      {product.description}
                    </p>
                    
                    {/* Features List */}
                    <div className="mb-6">
                      <h4 className="font-display font-semibold text-foreground mb-3 text-base">Características:</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start font-body">
                            <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons - Following Hero Button Style */}
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold tracking-wide uppercase text-sm"
                        size="sm"
                      >
                        Cotizar
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-body font-semibold tracking-wide uppercase text-sm bg-transparent"
                        size="sm"
                      >
                        Info
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact CTA Section - Following About Section Style */}
            <div className="mt-20 max-w-4xl mx-auto">
              <div className="bg-card p-8 vintage-shadow border-l-4 border-primary">
                <h3 className="text-3xl font-display font-bold text-foreground mb-4">
                  ¿No encuentras lo que buscas?
                </h3>
                <p className="text-muted-foreground font-body mb-6 leading-relaxed text-lg">
                  Contáctanos y te ayudaremos a encontrar el producto perfecto para tus necesidades específicas. 
                  Nuestro equipo de expertos está listo para asesorarte y ofrecerte soluciones personalizadas.
                </p>
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold tracking-wide uppercase"
                >
                  Contactar Ahora
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;