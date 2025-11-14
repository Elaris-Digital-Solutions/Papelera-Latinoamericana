import { Card, CardContent } from "@/components/ui/card";
import { useProducts } from "@/contexts/ProductsContext";
import { Link } from "react-router-dom";

const Products = () => {
  const { products } = useProducts();
  const featured = products.filter((product) => product.visible).slice(0, 3);

  return (
    <section id="productos" className="bg-card py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <div className="inline-block">
            <div className="mb-4 h-1 w-20 bg-primary" />
            <h2 className="mb-4 text-4xl font-display font-bold text-foreground md:text-5xl">
              Nuestros Productos
            </h2>
            <div className="h-0.5 w-32 bg-divider" />
          </div>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-muted-foreground">
            Más de 25 años abasteciendo al mercado peruano con papeles institucionales y servilletas en diseños exclusivos
            para negocios, eventos y retail.
          </p>
        </div>

        <div className="grid gap-8 px-0 md:grid-cols-3 md:px-8">
          {featured.map((product) => (
            <Card
              key={product.id}
              className="group mx-auto max-w-sm overflow-hidden border-2 border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="flex aspect-square items-center justify-center overflow-hidden bg-white p-8">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-4/5 w-4/5 object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
              <CardContent className="border-t-2 border-ink p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                  {product.category}
                </p>
                <h3 className="mb-3 text-2xl font-display text-foreground">{product.name}</h3>
                <p className="text-sm font-body text-muted-foreground line-clamp-3">{product.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={`/product/${product.id}`}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground transition hover:bg-primary/90"
                  >
                    Ver producto
                  </Link>
                  <Link
                    to="/productos"
                    className="inline-flex items-center justify-center rounded-full border border-primary px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary transition hover:bg-primary hover:text-primary-foreground"
                  >
                    Catálogo
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/productos"
            className="inline-flex items-center rounded-full bg-primary px-8 py-3 font-body font-semibold uppercase tracking-[0.3em] text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Ver catálogo completo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
