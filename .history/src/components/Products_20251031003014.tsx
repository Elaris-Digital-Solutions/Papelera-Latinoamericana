import { Card, CardContent } from "@/components/ui/card";
import notebooksImg from "@/assets/product-notebooks.jpg";
import pensImg from "@/assets/product-pens.jpg";
import suppliesImg from "@/assets/product-supplies.jpg";
import papelJumboImg from "@/assets/papel-jumbo-landing.png";

const products = [
  {
    image: '/',
    name: "Papel Higiénico",
    description: "Rollos de papel higiénico premium con suavidad excepcional. Disponibles en presentaciones individuales y paquetes mayoristas.",
  },
  {
    image: pensImg,
    name: "Servilletas",
    description: "Servilletas de papel de alta calidad en diversos colores y tamaños. Ideales para restaurantes, eventos y hogares.",
  },
  {
    image: suppliesImg,
    name: "Papel Toalla",
    description: "Toallas de papel absorbentes y resistentes para cocina y limpieza. Presentaciones en rollo y paquetes múltiples.",
  },
];

const Products = () => {
  return (
    <section id="productos" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="h-1 w-20 bg-primary mb-4 mx-auto" />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Productos Destacados
            </h2>
            <div className="h-0.5 w-32 bg-divider mx-auto" />
          </div>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto mt-6">
            Descubre nuestra selección de artículos esenciales para cada necesidad
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-background border-2 border-border">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6 border-t-2 border-ink">
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                  {product.name}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
