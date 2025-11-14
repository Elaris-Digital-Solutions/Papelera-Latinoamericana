import { useParams, Link, Navigate } from "react-router-dom";
import { getProductBySlug } from "@/data/products";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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
      <div className="py-16 md:py-24">
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
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link
            to="/productos"
            className="inline-flex items-center text-primary hover:text-primary-dark mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Productos
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="bg-white border border-gray-300 rounded-lg p-8 flex items-center justify-center aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Product Info */}
            <div>
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
              <div className="bg-card border border-border rounded-lg p-6 mb-8">
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
              </div>

            </div>
          </div>

          {/* Quote Request Form */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-8">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;