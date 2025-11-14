import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductById, products as catalogProducts } from "@/data/products";

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProductById(productId) : undefined;
  const relatedProducts = catalogProducts.filter((entry) => entry.id !== productId).slice(0, 4);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex flex-1 items-center justify-center px-4">
          <div className="rounded-3xl border border-divider bg-card/80 p-10 text-center shadow-lg">
            <p className="font-display text-3xl text-foreground">Producto no encontrado</p>
            <p className="mt-4 text-muted-foreground">
              El artículo que buscas no existe o fue retirado. Vuelve al catálogo para explorar todas las líneas
              disponibles.
            </p>
            <Link
              to="/productos"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground"
            >
              Volver al catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="bg-background py-16">
        <div className="container mx-auto px-4">
          <section className="gap-10 rounded-3xl border border-divider bg-card/80 p-8 shadow-lg lg:grid lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                {product.category}
              </span>

              <div className="space-y-4">
                <h1 className="font-display text-4xl leading-tight text-ink md:text-5xl">{product.name}</h1>
                <p className="text-base text-muted-foreground">{product.description}</p>
              </div>

              <div className="space-y-4 rounded-3xl border border-divider bg-background/60 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-display text-ink">Especificaciones</h2>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Ficha técnica
                  </span>
                </div>

                {Object.keys(product.specs).length > 0 ? (
                  <dl className="grid gap-3 text-sm text-muted-foreground">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between border-b border-dashed border-divider pb-2">
                        <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{key}</dt>
                        <dd className="text-foreground">{value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Próximamente podrás agregar medidas, gramajes y cualquier detalle técnico en esta sección.
                  </p>
                )}
              </div>

              <div className="rounded-3xl border border-divider bg-background/60 p-6">
                <h3 className="text-lg font-display text-ink">Presentación</h3>
                <p className="mt-2 text-sm text-muted-foreground">{product.presentation}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center rounded-full border border-primary bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground transition hover:-translate-y-0.5"
                >
                  Solicitar cotización
                </Link>
                <Link
                  to="/productos"
                  className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  Volver al catálogo
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-divider bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6 text-primary">
                <p className="text-sm font-semibold uppercase tracking-[0.3em]">Inspiración editorial</p>
                <p className="text-sm text-primary/90">
                  Fondo cálido, serif de alto contraste, azul de marca y sombras suaves para mantener coherencia con el
                  resto del sitio.
                </p>
              </div>
            </div>
          </section>

          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-3xl text-ink">También te puede interesar</h2>
                <Link
                  to="/productos"
                  className="text-sm font-semibold uppercase tracking-[0.3em] text-primary hover:text-primary/80"
                >
                  Ver todo
                </Link>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((item) => (
                  <article key={item.id} className="group overflow-hidden rounded-3xl border border-divider bg-card/80 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <Link to={`/product/${item.id}`} className="flex flex-col">
                      <div className="relative h-56 w-full overflow-hidden bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-2 px-4 py-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                          {item.category}
                        </p>
                        <h3 className="font-display text-xl text-ink">{item.name}</h3>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;