import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProductBySlug, products } from "@/data/products";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, scaleIn, staggerContainer, viewportConfig } from "@/lib/motion";

const ProductoDetalle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  
  if (!slug) {
    return <Navigate to="/productos" replace />;
  }

  const product = getProductBySlug(slug);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    const message = `Hola, me gustaría solicitar una cotización para:\n\nProducto: ${product?.name}\nCategoría: ${product?.category}\n\nMis datos:\nNombre: ${formData.name}\nEmail: ${formData.email}\nTeléfono: ${formData.phone}\n\nMensaje adicional:\n${formData.message || "Sin mensaje adicional"}`;
    
    const whatsappUrl = `https://wa.me/51999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Redirigiendo a WhatsApp",
      description: "Te conectaremos con nuestro equipo de ventas",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  if (!product) {
    return (
      <motion.section className="py-16 md:py-24" variants={fadeInUp} initial="hidden" animate="show">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Producto no encontrado
            </h1>
            <p className="text-muted-foreground mb-8">
              El producto que buscas no existe en nuestro catálogo.
            </p>
            <Link to="/productos">
              <Button>Volver a Productos</Button>
            </Link>
          </div>
        </div>
      </motion.section>
    );
  }

  // Carrusel de productos relacionados
  const sameCat = products.filter(p => p.category === product.category && p.slug !== product.slug);
  let items = [...sameCat];
  if (items.length < 6) {
    const firstCat = products[0]?.category;
    const fillCat = products.filter(p => p.category === firstCat && p.slug !== product.slug && !items.some(i => i.slug === p.slug));
    items = [...items, ...fillCat].slice(0, 6);
  } else {
    items = items.slice(0, 6);
  }

  // Solo mostrar los primeros 4 productos relacionados
  const [carouselIndex, setCarouselIndex] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const groupSize = 4;
  const maxIndex = Math.max(0, items.length - 1);
  const handlePrev = () => setCarouselIndex(i => (i === 0 ? maxIndex : i - 1));
  const handleNext = () => setCarouselIndex(i => (i === maxIndex ? 0 : i + 1));

  return (
    <motion.section className="py-16 md:py-24" variants={fadeInUp} initial="hidden" animate="show">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <motion.div variants={fadeInUp}>
            <Link
              to="/productos"
              className="inline-flex items-center text-primary hover:text-primary-dark mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Productos
            </Link>
          </motion.div>

          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12" variants={staggerContainer}>
            {/* Product Image */}
            <motion.div className="bg-white border border-gray-300 rounded-lg p-8 flex items-center justify-center aspect-square" variants={scaleIn}>
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </motion.div>

            {/* Product Info */}
            <motion.div variants={fadeInUp}>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-6">
                {product.name}
              </h1>

              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              <motion.div className="bg-card border border-border rounded-lg p-6 mb-8" variants={scaleIn}>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Especificaciones
                </h2>
                {Object.keys(product.specs).length > 0 ? (
                  <dl className="space-y-3">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <dt className="text-muted-foreground">{key}:</dt>
                        <dd className="font-medium text-foreground">{value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-muted-foreground">
                    Consulta especificaciones técnicas con nuestro equipo de ventas.
                  </p>
                )}
              </motion.div>

            </motion.div>
          </motion.div>

          {/* Quote Request Form */}
          <motion.div
            className="mt-12 max-w-5xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
          >
            <motion.div className="bg-card border border-border rounded-lg p-8" variants={scaleIn}>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Solicitar Cotización
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@correo.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+51 999 999 999"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje adicional (opcional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Cuéntanos más sobre tu necesidad..."
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Enviar Solicitud por WhatsApp
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Al enviar, serás redirigido a WhatsApp para completar tu cotización
                </p>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* También te podrían interesar */}
      <motion.section className="py-16" variants={fadeInUp} initial="hidden" whileInView="show" viewport={viewportConfig}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-10" variants={fadeInUp}>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">También te podrían interesar</h2>
              <p className="text-muted-foreground">Más productos de la categoría <span className="font-semibold text-primary">{product.category}</span></p>
            </motion.div>
            <div className="flex items-center justify-center gap-6">
              {/* Mobile: Carrusel con flechas */}
              <div className="block sm:hidden w-full">
                <div className="flex items-center justify-center gap-4">
                  <button type="button" aria-label="Anterior" onClick={handlePrev} className="p-2 rounded-full bg-card border border-border hover:bg-primary/10 transition">
                    <ChevronLeft className="h-6 w-6 text-primary" />
                  </button>
                  <motion.div variants={scaleIn} className="min-w-[220px] max-w-xs flex-shrink-0 mx-auto">
                    <Link to={`/productos/${items[carouselIndex].slug}`} className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all block">
                      <div className="aspect-square bg-white border border-gray-300 flex items-center justify-center p-6">
                        <img src={items[carouselIndex].image} alt={items[carouselIndex].name} className="h-full w-full object-contain" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">{items[carouselIndex].name}</h3>
                        <p className="text-sm text-muted-foreground">{items[carouselIndex].category}</p>
                      </div>
                    </Link>
                  </motion.div>
                  <button type="button" aria-label="Siguiente" onClick={handleNext} className="p-2 rounded-full bg-card border border-border hover:bg-primary/10 transition">
                    <ChevronRight className="h-6 w-6 text-primary" />
                  </button>
                </div>
              </div>
              {/* Desktop: 4 productos fijos */}
              <div className="hidden sm:flex items-center justify-center gap-6 w-full">
                {items.slice(0, 4).map((p) => (
                  <motion.div key={p.slug} variants={scaleIn} className="min-w-[220px] max-w-xs flex-shrink-0">
                    <Link to={`/productos/${p.slug}`} className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all block">
                      <div className="aspect-square bg-white border border-gray-300 flex items-center justify-center p-6">
                        <img src={p.image} alt={p.name} className="h-full w-full object-contain" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                        <p className="text-sm text-muted-foreground">{p.category}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.section>
  );
};

export default ProductoDetalle;