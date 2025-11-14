"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  categories,
  categoryFilters,
  searchProducts,
} from "../../data/products";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../src/components/ui/breadcrumb";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 12;

const formatRange = (from: number, to: number, total: number) => {
  if (!total) return "Sin resultados";
  return `${from} – ${to} de ${total}`;
};

const FiltersLegend = ({
  count,
  rangeLabel,
}: {
  count: number;
  rangeLabel: string;
}) => (
  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-divider bg-card/80 px-5 py-4 vintage-shadow">
    <p className="text-sm text-muted-foreground">
      {count ? (
        <>
          <span className="font-semibold text-foreground">{count}</span>{" "}
          productos disponibles según tus filtros.
        </>
      ) : (
        "Ajusta los filtros para encontrar el producto ideal."
      )}
    </p>
    <span className="text-sm font-medium uppercase tracking-widest text-primary">
      {rangeLabel}
    </span>
  </div>
);

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const filteredProducts = useMemo(
    () => searchProducts(searchQuery, selectedCategory),
    [searchQuery, selectedCategory]
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const clampedPage = Math.min(currentPage, totalPages);
  const startIndex = (clampedPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const slice = filteredProducts.slice(startIndex, endIndex);
  const rangeLabel = formatRange(
    filteredProducts.length ? startIndex + 1 : 0,
    Math.min(endIndex, filteredProducts.length),
    filteredProducts.length
  );

  const visibleCategories = useMemo(
    () =>
      categories
        .map((category) => ({
          ...category,
          products: slice.filter(
            (product) => product.category === category.name
          ),
        }))
        .filter((category) => category.products.length > 0),
    [slice]
  );

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handlePageChange = (direction: "prev" | "next" | number) => {
    if (direction === "prev") {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    } else if (direction === "next") {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    } else {
      setCurrentPage(direction);
    }
  };

  return (
    <section className="min-h-screen bg-background pb-16 pt-12">
      <div className="container space-y-10">
        <header className="space-y-6">
          <Breadcrumb>
            <BreadcrumbList className="text-sm text-muted-foreground">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Inicio</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-foreground">Productos</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="gap-6 rounded-3xl border border-divider bg-card/80 p-6 shadow-sm md:grid md:grid-cols-[1.2fr,1fr] md:items-end">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">
                Catálogo en línea
              </p>
              <h1 className="font-display text-4xl text-ink md:text-5xl">
                Productos Papelera Latinoamericana
              </h1>
              <p className="text-base text-muted-foreground">
                Explora todas las líneas institucionales y de servilletas con la
                estética editorial de la marca. Aplica la barra de búsqueda,
                filtros por categoría y paginación inteligente para mantener el
                control del inventario.
              </p>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 text-primary">
              <p className="text-sm font-semibold uppercase tracking-[0.3em]">
                ADN visual
              </p>
              <p className="text-sm text-primary/90">
                Tipografías serif, azul de marca (HSL 210 70% 38%), bordes
                delicados y sombras suaves para integrar esta vista con el resto
                del sitio.
              </p>
            </div>
          </div>
        </header>

        <div className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
            <label className="relative flex items-center">
              <Search className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                placeholder="Buscar por nombre o descripción"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full rounded-2xl border border-input bg-background px-12 py-4 text-base font-medium text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
              />
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-primary/5 px-4 py-4 text-primary">
              <Filter className="h-5 w-5" />
              <p className="text-sm">
                Selecciona la categoría para refinar la cuadrícula y activar la
                paginación inteligente.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((filter) => {
              const isActive = selectedCategory === filter.value;
              return (
                <button
                  key={filter.value}
                  onClick={() => handleCategoryChange(filter.value)}
                  className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-input bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <FiltersLegend count={filteredProducts.length} rangeLabel={rangeLabel} />
        </div>

        {visibleCategories.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-divider bg-card/60 px-8 py-16 text-center">
            <p className="font-display text-2xl text-ink">Sin coincidencias</p>
            <p className="mt-2 text-muted-foreground">
              Ajusta la búsqueda o selecciona otra categoría para continuar
              explorando el catálogo.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {visibleCategories.map((category) => (
              <section
                key={category.slug}
                aria-labelledby={`category-${category.slug}`}
                className="space-y-6"
              >
                <div className="flex flex-col gap-2 border-b border-divider pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      {category.products.length} piezas en esta página
                    </p>
                    <h2
                      id={`category-${category.slug}`}
                      className="font-display text-3xl text-ink"
                    >
                      {category.name}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Inspiración editorial: bordes definidos, grid limpio y azul
                    corporativo.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {category.products.map((product) => (
                    <article
                      key={product.slug}
                      className="group flex flex-col overflow-hidden rounded-3xl border border-divider bg-card/80 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col">
                        <div className="relative h-64 w-full overflow-hidden bg-muted">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-105"
                            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            priority={false}
                          />
                          <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold tracking-wide text-primary-foreground shadow">
                            {product.category}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col gap-3 px-5 py-6">
                          <h3 className="font-display text-2xl text-ink">
                            {product.name}
                          </h3>
                          <p className="line-clamp-3 text-sm text-muted-foreground">
                            {product.description}
                          </p>
                          <span className="mt-auto inline-flex items-center text-sm font-semibold text-primary">
                            Ver ficha técnica
                          </span>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {filteredProducts.length > 0 && (
          <div className="flex flex-col gap-4 rounded-3xl border border-divider bg-card/70 px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Página {clampedPage} de {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange("prev")}
                disabled={clampedPage === 1}
                className="inline-flex items-center gap-2 rounded-full border border-input px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </button>
              <div className="hidden items-center gap-1 md:flex">
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;
                  const isActive = pageNumber === clampedPage;
                  if (
                    totalPages > 5 &&
                    Math.abs(pageNumber - clampedPage) > 2 &&
                    pageNumber !== 1 &&
                    pageNumber !== totalPages
                  ) {
                    return null;
                  }

                  return (
                    <button
                      key={`page-${pageNumber}`}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`h-10 w-10 rounded-full border text-sm font-semibold transition ${
                        isActive
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input text-muted-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                {totalPages > 5 && clampedPage < totalPages - 2 && (
                  <>
                    <span className="text-muted-foreground">...</span>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="h-10 w-10 rounded-full border border-input text-sm font-semibold text-muted-foreground transition hover:border-primary hover:text-primary"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={() => handlePageChange("next")}
                disabled={clampedPage === totalPages}
                className="inline-flex items-center gap-2 rounded-full border border-input px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

