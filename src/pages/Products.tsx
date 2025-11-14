import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useProducts } from "@/contexts/ProductsContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Products = () => {
  const { products } = useProducts();
  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(products.map((product) => product.category)))],
    [products]
  );
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  
  const filteredProducts =
    selectedCategory === "Todos"
      ? products.filter((product) => product.visible)
      : products.filter((product) => product.category === selectedCategory && product.visible);

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
            <div className="grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  className="group overflow-hidden border-2 border-border bg-background vintage-shadow transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="flex aspect-square items-center justify-center overflow-hidden bg-white p-8">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-4/5 w-4/5 object-contain transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </Link>

                  <CardContent className="border-t-2 border-ink p-6">
                    <div className="mb-3">
                      <span className="inline-block rounded-sm bg-primary/10 px-3 py-1 text-xs font-body font-medium uppercase tracking-[0.3em] text-primary">
                        {product.category}
                      </span>
                    </div>

                    <h3 className="mb-3 font-display text-2xl font-bold leading-tight text-foreground">
                      {product.name}
                    </h3>

                    <p className="mb-4 text-sm font-body leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>

                    {product.features.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-display font-semibold text-foreground">Características</h4>
                        <ul className="mt-3 space-y-2">
                          {product.features.map((feature, index) => (
                            <li key={index} className="flex items-start text-sm text-muted-foreground">
                              <span className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex-1 rounded-full bg-primary px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground transition hover:bg-primary/90"
                      >
                        Ver producto
                      </Link>
                      <Link
                        to="/contacto"
                        className="flex-1 rounded-full border border-primary px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-primary transition hover:bg-primary hover:text-primary-foreground"
                      >
                        Cotizar
                      </Link>
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