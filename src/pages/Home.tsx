import Hero from "@/components/Hero";
import { Building2, Users, Award, MapPin, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Home = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const featuredProducts = products.slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo pronto.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const features = [
    {
      icon: Award,
      title: "25 Años de Experiencia",
      description: "Un cuarto de siglo fabricando productos de calidad para el mercado peruano.",
    },
    {
      icon: Building2,
      title: "Fabricación Nacional",
      description: "Producción 100% peruana con los más altos estándares de calidad.",
    },
    {
      icon: MapPin,
      title: "Cobertura Nacional",
      description: "Distribución en todo el Perú, llegando a cada rincón del país.",
    },
    {
      icon: Users,
      title: "Miles de Clientes Satisfechos",
      description: "Confianza de hoteles, restaurantes, empresas y consumidores finales.",
    },
  ];

  return (
    <>
      <Hero />
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Somos la mejor opción en papel institucional, papel toalla y servilletas en el Perú.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section with Featured Products */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Conoce nuestra amplia gama de productos
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Desde papel institucional hasta servilletas para eventos especiales, 
              tenemos todo lo que necesitas.
            </p>

            {/* Featured Products Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {featuredProducts.map((product) => (
                <Link
                  key={product.slug}
                  to={`/productos/${product.slug}`}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="aspect-square bg-background flex items-center justify-center p-8">
                    <Package className="h-24 w-24 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {product.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <Link to="/productos">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-dark">
                Ver Catálogo Completo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Nuestros Valores
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Calidad</h3>
                <p className="text-muted-foreground">
                  Productos que cumplen los más altos estándares de fabricación.
                </p>
              </div>
              <div className="text-center p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Confianza</h3>
                <p className="text-muted-foreground">
                  25 años respaldando a nuestros clientes en todo el Perú.
                </p>
              </div>
              <div className="text-center p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Innovación</h3>
                <p className="text-muted-foreground">
                  Mejorando continuamente nuestros procesos y productos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                ¿Necesitas más información?
              </h2>
              <p className="text-lg text-muted-foreground">
                Completa el formulario y nos pondremos en contacto contigo
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="home-name">Nombre completo *</Label>
                  <Input
                    id="home-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="home-email">Correo electrónico *</Label>
                    <Input
                      id="home-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@correo.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="home-phone">Teléfono *</Label>
                    <Input
                      id="home-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+51 999 999 999"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="home-message">Mensaje *</Label>
                  <Textarea
                    id="home-message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Enviar Mensaje
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;