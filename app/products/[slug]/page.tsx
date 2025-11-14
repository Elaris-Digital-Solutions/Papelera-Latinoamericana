import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../src/components/ui/breadcrumb";
import { getProductBySlug, products } from "../../../data/products";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="min-h-screen bg-background pb-16 pt-12">
      <div className="container space-y-10">
        <Breadcrumb>
          <BreadcrumbList className="text-sm text-muted-foreground">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Inicio</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/products">Productos</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-foreground">{product.name}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="gap-10 rounded-3xl border border-divider bg-card/80 p-8 shadow-lg lg:grid lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {product.category}
            </span>
            <div className="space-y-4">
              <h1 className="font-display text-4xl leading-tight text-ink md:text-5xl">
                {product.name}
              </h1>
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
                      <dt className="font-semibold uppercase tracking-widest text-xs text-muted-foreground">
                        {key}
                      </dt>
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
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                Volver a productos
              </Link>
              <a
                href="mailto:ventas@papeleralatinoamericana.com?subject=Consulta%20producto"
                className="inline-flex items-center justify-center rounded-full border border-input bg-primary/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                Solicitar cotización
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-divider bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
                priority
              />
            </div>
            <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6 text-primary">
              <p className="text-sm font-semibold uppercase tracking-[0.3em]">
                Inspiración editorial
              </p>
              <p className="text-sm text-primary/90">
                Fondo cálido, serif de alto contraste, azul de marca y sombras
                suaves para mantener coherencia con el resto del sitio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

