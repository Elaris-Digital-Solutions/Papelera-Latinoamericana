import Hero from "@/components/Hero";
import { Building2, Users, Award, MapPin, Shield, Zap, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeInUpItem,
  scaleIn,
  staggerContainer,
  viewportConfig,
} from "@/lib/motion";
import { useProductsQuery } from "@/hooks/useProducts";

const Home = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const { data: products = [], isLoading: productsLoading } = useProductsQuery();
  const featuredProducts = useMemo(() => products.slice(0, 3), [products]);

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
      description: "Un cuarto de siglo fabricando productos de calidad para clientes de todo el mundo.",
    },
    {
      icon: Building2,
      title: "Fabricación Nacional",
      description: "Producción 100% peruana con los más altos estándares de calidad y alcance internacional.",
    },
    {
      icon: MapPin,
      title: "Cobertura Global",
      description: "Distribución internacional y nacional, llegando a cada rincón del planeta.",
    },
    {
      icon: Users,
      title: "Miles de Clientes Satisfechos",
      description: "Confianza de hoteles, restaurantes, empresas y consumidores finales en todo el mundo.",
    },
  ];

  return (
    <>
      <Hero />
      
      
      {/* Features Section */}
      <motion.section
        className="py-16 md:py-24 bg-background"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportConfig}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Somos la mejor opción en papel institucional, papel toalla y servilletas para clientes de todo el mundo.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-md transition-shadow"
                  variants={fadeInUpItem}
                  custom={index}
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
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section with Featured Products */}
      <motion.section
        className="py-16 md:py-24 bg-secondary"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportConfig}
      >
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
            {productsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`placeholder-${index}`}
                    className="h-full rounded-lg border border-dashed border-border p-8 animate-pulse bg-card"
                  >
                    <div className="h-48 bg-muted rounded mb-4" />
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : featuredProducts.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                variants={staggerContainer}
              >
                {featuredProducts.map((product, index) => (
                  <motion.div key={product.slug} variants={scaleIn} custom={index}>
                    <Link
                      to={`/productos/${product.slug}`}
                      className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all"
                    >
                      <div className="aspect-square bg-white border border-gray-300 flex items-center justify-center p-8">
                        <img
                          src={product.imageUrl ?? "/assets/productos.png"}
                          alt={product.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {product.category.nombre}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-muted-foreground mb-12">
                Los productos destacados estarán disponibles en breve.
              </p>
            )}

            <motion.div className="flex items-center justify-center gap-4" variants={fadeInUp}>
              <Link to="/productos">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-dark">
                  Ver Catálogo Completo
                </Button>
              </Link>

              <a
                href="/assets/CATALOGO-PALASAC-2024.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="bg-white text-slate-900 font-semibold px-6 py-3 rounded-md hover:shadow-lg transition">
                  Descargar Catálogo
                </button>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Nuestros Valores - Cards Section */}
      <motion.section
        className="py-16 md:py-24 bg-background"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportConfig}
      >
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Nuestros Valores</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Principios que definen nuestra forma de trabajo y compromiso con clientes y colaboradores.</p>
            </motion.div>

            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={staggerContainer}>
              <motion.div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center" variants={fadeInUpItem}>
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-sky-50 mb-4 mx-auto">
                  <Award className="h-7 w-7 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Calidad</h3>
                <p className="text-slate-600 leading-relaxed">Productos que cumplen los más altos estándares de fabricación.</p>
              </motion.div>

              <motion.div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center" variants={fadeInUpItem} custom={1}>
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-sky-50 mb-4 mx-auto">
                  <Shield className="h-7 w-7 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Confianza</h3>
                <p className="text-slate-600 leading-relaxed">25 años respaldando a nuestros clientes en todo el mundo.</p>
              </motion.div>

              <motion.div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center" variants={fadeInUpItem} custom={2}>
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-sky-50 mb-4 mx-auto">
                  <Zap className="h-7 w-7 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Innovación</h3>
                <p className="text-slate-600 leading-relaxed">Mejorando continuamente nuestros procesos y productos.</p>
              </motion.div>

              <motion.div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center" variants={fadeInUpItem} custom={3}>
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-sky-50 mb-4 mx-auto">
                  <Compass className="h-7 w-7 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Responsabilidad</h3>
                <p className="text-slate-600 leading-relaxed">Comprometidos con el medio ambiente y el desarrollo sostenible.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Google Maps Section */}
      <motion.section
        className="py-16 md:py-24 bg-gray-100"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportConfig}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestra Ubicación
            </h2>
            <p className="text-lg text-muted-foreground">
              Encuéntranos en Mz. u Lote 3 Urb. Huertos de Lurín, Lima 15823
            </p>
          </motion.div>

          <motion.div className="rounded-lg overflow-hidden shadow-lg" variants={scaleIn}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.217393698736!2d-76.8908834!3d-12.2556131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105bd0fe5e983bd%3A0x8648870348814a69!2sPAPELERA%20LATINOAMERICANA!5e0!3m2!1ses-419!2spe!4v1700240000000!5m2!1ses-419!2spe"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        className="py-16 md:py-24 bg-background"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportConfig}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                ¿Necesitas más información?
              </h2>
              <p className="text-lg text-muted-foreground">
                Completa el formulario y nos pondremos en contacto contigo
              </p>
            </motion.div>

            <motion.div className="bg-card border border-border rounded-lg p-8" variants={scaleIn}>
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
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Home;