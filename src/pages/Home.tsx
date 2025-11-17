import Hero from "@/components/Hero";
import { Building2, Users, Award, MapPin, Shield, Zap, Compass } from "lucide-react";
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
                  <div className="aspect-square bg-white border border-gray-300 flex items-center justify-center p-8">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
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

      {/* Nuestros Valores - Cards Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Nuestros Valores</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Principios que definen nuestra forma de trabajo y compromiso con clientes y colaboradores.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-sky-50 mb-4 mx-auto">
                  <Award className="h-7 w-7 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Calidad</h3>
                <p className="text-slate-600 leading-relaxed">Productos que cumplen los más altos estándares de fabricación.</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-sky-50 mb-4 mx-auto">
                  <Shield className="h-7 w-7 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Confianza</h3>
                <p className="text-slate-600 leading-relaxed">25 años respaldando a nuestros clientes en todo el Perú.</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-sky-50 mb-4 mx-auto">
                  <Zap className="h-7 w-7 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Innovación</h3>
                <p className="text-slate-600 leading-relaxed">Mejorando continuamente nuestros procesos y productos.</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-sky-50 mb-4 mx-auto">
                  <Compass className="h-7 w-7 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Responsabilidad</h3>
                <p className="text-slate-600 leading-relaxed">Comprometidos con el medio ambiente y el desarrollo sostenible.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestra Ubicación
            </h2>
            <p className="text-lg text-muted-foreground">
              Encuéntranos en Mz. u Lote 3 Urb. Huertos de Lurín, Lima 15823
            </p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.123456789012!2d-76.987654321!3d-12.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9101234567890123%3A0x123456789abcdef!2sMz.%20u%20Lote%203%20Urb.%20Huertos%20de%20Lur%C3%ADn%2C%20Lima%2015823!5e0!3m2!1ses-419!2spe!4v1631234567890!5m2!1ses-419!2spe"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
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