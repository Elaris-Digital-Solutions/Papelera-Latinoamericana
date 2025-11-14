type ProductSpecs = Record<string, string>;

export type Product = {
  name: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  specs: ProductSpecs;
};

export type ProductCategory = {
  name: string;
  slug: string;
  products: Product[];
};

const slugify = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/gi, "n")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();

const toTitleCase = (value: string): string =>
  value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((segment) => {
      if (/^\d+$/.test(segment)) return segment;
      if (segment.length === 1) return segment.toUpperCase();
      return segment.charAt(0).toUpperCase() + segment.slice(1);
    })
    .join(" ");

const assetFileNames: Record<string, string> = {
  "rojo-doble-hoja-economico": "ROJO-DOBLE-HOJA-ECONOMICO.jpeg",
  "naranja-doble-hoja": "NARANJA-DOBLE-HOJA.jpeg",
  "papel-gofrado": "PAPEL GOFRADO.jpeg",
  "papel-individual": "PAPEL-INDIVIDUAL.jpeg",
  "papel-500": "PAPEL-500.jpeg",
  "papel-550": "PAPEL-550.jpeg",
  "papel-toalla-interfoliado": "PAPEL-TOALLA-INTERFOLIADO.jpeg",
  "papel-toalla-doble-precorte": "PAPEL-TOALLA-DOBLE-PRE-CORTE.jpeg",
  "papel-toalla-ecologica-precorte": "PAPEL-TOALLA-ECOLOGICA-PRE-CORTE.jpeg",
  "clasica-x-15": "CLASICA-X15.jpeg",
  "clasica-x-18": "CLASICA-X18.jpeg",
  doblada: "DOBLADA.jpeg",
  "golden-33-x-33": "GOLDEN-33X33.jpeg",
  granel: "GRANEL.jpeg",
  "clasica-machu-picchu": "CLASICA-MACHUPICHU.jpeg",
  cebras: "DISENO-CEBRAS.jpeg",
  manzanilla: "DISENO-MANZANILLA.jpeg",
  girasol: "DISENO-GIRASOL.jpeg",
  "flor-grande": "DISENO-FLOR-GRANDE.jpeg",
  "marco-dorado": "DISENO-MARCO-DORADO.jpeg",
  "marco-plateado": "DISENO-MARCO-PLATEADO.jpeg",
  frutal: "DISENO-FRUTAL.jpeg",
  "puntos-1": "PUNTOS-1.jpeg",
  "puntos-2": "PUNTOS-2.jpeg",
  cuadros: "CUADROS.jpeg",
  "flores-en-l": "FLORES-EN-L.jpeg",
  "lineas-1": "LINEAS-1.jpeg",
  "lineas-2": "LINEAS-2.jpeg",
  pirotines: "PIROTINES.jpeg",
  "happy-birthday-plateado": "HAPPY-BIRTHDAY-PLATEADO.jpeg",
  "happy-birthday-dorado": "HAPPY-BIRTHDAY-DORADO.jpeg",
  "50-anos": "50-ANOS.jpeg",
  "15-anos-1": "QUINCE-ANOS-1.jpeg",
  "15-anos-2": "15-ANOS-2.jpeg",
  "matrimonio-aro": "MATRIMONIO-ARO.jpeg",
  "matrimonio-joven": "MATRIMONIO-JOVEN.jpeg",
  "matrimonio-clasico": "MATRIMONIO-CLASICO.jpeg",
  "matrimonio-pareja": "MATRIMONIO-PAREJA.jpeg",
  "matrimonio-pareja-2": "MATRIMONIO-PAREJA-2.jpeg",
  "feliz-ano-dorado": "FELIZ-ANO-DORADO.jpeg",
  "copas-doradas-feliz-ano": "COPAS-DORADAS-FELIZ-ANO.jpeg",
  "copas-amarillas-feliz-ano": "COPAS-AMARILLAS-FELIZ-ANO.jpeg",
  "happy-birthday": "HAPPY-BIRTHDAY.jpeg",
  globos: "GLOBOS.jpeg",
  "baby-shower-unisex": "BABY-SHOWER-UNISEX.jpeg",
  princesa: "PRINCESA.jpeg",
  "baby-shower-nina": "BABY-SHOWER-NINA.jpeg",
  "bautizo-nina": "BAUTIZO-NINA.jpeg",
  "bautizo-unisex": "BAUTIZO-UNISEX.jpeg",
  "baby-shower-nino": "BABY-SHOWER-NINO.jpeg",
  "bautizo-nino": "BAUTIZO-NINO.jpeg",
  "payaso-1": "PAYASO-1.jpeg",
  "payaso-2": "PAYASO-2.jpeg",
  "payaso-3": "PAYASO-3.jpeg",
  "vela-roja": "VELA-ROJA.jpeg",
  "vela-antigua": "VELA-ANTIGUA.jpeg",
  "pesebre-1": "PESEBRE-1.jpeg",
  "pesebre-2": "PESEBRE-2.jpeg",
  "papa-noel-con-chimenea": "PAPA-NOEL-CON-CHIMENEA.jpeg",
  "papa-noel-con-cara": "PAPA-NOEL-CON-CARA.jpeg",
  "papa-noel-con-arbol": "PAPA-NOEL-CON-ARBOL.jpeg",
  "papa-noel-con-muneco": "PAPA-NOEL-CON-MUNECO.jpeg",
  "papa-noel-con-reno": "PAPA-NOEL-CON-RENO.jpeg",
  "papa-noel-y-mamanuela": "PAPA-NOEL-Y-MAMA-NOELA.jpeg",
  "merry-christmas": "MERRY-CHRISTMAS.jpeg",
  "muneco-de-nieve-1": "MUNECO-DE-NIEVE-1.jpeg",
  "muneco-de-nieve-2": "MUNECO-DE-NIEVE-2.jpeg",
  "pinguinos-navidenos": "PINGUINOS-NAVIDENOS.jpeg",
};

const descriptionsByCategory: Record<string, string> = {
  "Papel institucional":
    "Fabricado para instituciones que necesitan rendimiento constante, absorción eficiente y una sensación confiable en cada uso diario.",
  "Papel toalla":
    "Soluciones de alta absorción para cocinas y servicios que buscan suavidad sin sacrificar resistencia.",
  "Servilletas blancas":
    "Una base elegante y versátil que realza cada mesa con una presencia impecable y profesional.",
  "Servilletas con diseno":
    "Ilustraciones cuidadosamente seleccionadas para aportar carácter y estilo artesanal a la mesa.",
  "Servilletas con colores":
    "Paletas juguetonas y modernas que añaden ritmo visual y personalidad a tus presentaciones.",
  "Servilletas para eventos":
    "Detalles memorables para celebraciones especiales, pensados para fotografías, brindis y recuerdos.",
  "Servilletas infantiles":
    "Gráficas alegres que conectan con la imaginación de los más pequeños durante cada celebración.",
  "Servilletas navidenas":
    "Motivos clásicos navideños listos para acompañar buffets cálidos y reuniones familiares.",
};

const catalog: Record<string, string[]> = {
  "Papel institucional": [
    "rojo doble hoja economico",
    "naranja doble hoja",
    "papel gofrado",
    "papel individual",
    "papel 500",
    "papel 550",
  ],
  "Papel toalla": [
    "papel toalla interfoliado",
    "papel toalla doble precorte",
    "papel toalla ecologica precorte",
  ],
  "Servilletas blancas": [
    "clasica x 15",
    "clasica x 18",
    "doblada",
    "golden 33 x 33",
    "granel",
    "clasica machu picchu",
  ],
  "Servilletas con diseno": [
    "cebras",
    "manzanilla",
    "girasol",
    "flor grande",
    "marco dorado",
    "marco plateado",
    "frutal",
  ],
  "Servilletas con colores": [
    "puntos 1",
    "puntos 2",
    "cuadros",
    "flores en l",
    "lineas 1",
    "lineas 2",
    "pirotines",
  ],
  "Servilletas para eventos": [
    "happy birthday plateado",
    "happy birthday dorado",
    "50 anos",
    "15 anos 1",
    "15 anos 2",
    "matrimonio aro",
    "matrimonio joven",
    "matrimonio clasico",
    "matrimonio pareja",
    "matrimonio pareja 2",
    "feliz ano dorado",
    "copas doradas feliz ano",
    "copas amarillas feliz ano",
  ],
  "Servilletas infantiles": [
    "happy birthday",
    "globos",
    "baby shower unisex",
    "princesa",
    "baby shower nina",
    "bautizo nina",
    "bautizo unisex",
    "baby shower nino",
    "bautizo nino",
    "payaso 1",
    "payaso 2",
    "payaso 3",
  ],
  "Servilletas navidenas": [
    "vela roja",
    "vela antigua",
    "pesebre 1",
    "pesebre 2",
    "papa noel con chimenea",
    "papa noel con cara",
    "papa noel con arbol",
    "papa noel con muneco",
    "papa noel con reno",
    "papa noel y mamanuela",
    "merry christmas",
    "muneco de nieve 1",
    "muneco de nieve 2",
    "pinguinos navidenos",
  ],
};

const createProduct = (name: string, category: string): Product => {
  const slug = slugify(name);
  const assetFile = assetFileNames[slug];
  const title = toTitleCase(name);
  const imagePath = assetFile ? `/src/assets/${assetFile}` : `/src/assets/${title.toUpperCase()}.jpeg`;
  const baseDescription = descriptionsByCategory[category] ?? "Diseñado para reforzar la experiencia de tu mesa profesional.";

  return {
    name: title,
    slug,
    category,
    image: imagePath,
    description: `${title} pertenece a la categoría ${category}. ${baseDescription}`,
    specs: {},
  };
};

const categoryOrder = [
  "Papel institucional",
  "Papel toalla",
  "Servilletas blancas",
  "Servilletas con diseno",
  "Servilletas con colores",
  "Servilletas para eventos",
  "Servilletas infantiles",
  "Servilletas navidenas",
] as const;

export const categories: ProductCategory[] = categoryOrder.map((categoryName) => ({
  name: categoryName,
  slug: slugify(categoryName),
  products: (catalog[categoryName] ?? []).map((productName) => createProduct(productName, categoryName)),
}));

export const products: Product[] = categories.flatMap((category) => category.products);

const productIndex = new Map(products.map((product) => [product.slug, product]));

export const getProductBySlug = (slug: string): Product | undefined => productIndex.get(slug);

export const searchProducts = (query: string, category?: string): Product[] => {
  const normalizedQuery = query.trim().toLowerCase();

  return products.filter((product) => {
    const matchesQuery =
      !normalizedQuery ||
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery);
    const matchesCategory = !category || category === "all" || slugify(product.category) === category;

    return matchesQuery && matchesCategory;
  });
};

export const categoryFilters = [
  { label: "Todas", value: "all" },
  ...categories.map((category) => ({ label: category.name, value: category.slug })),
];

export type ProductsCatalog = typeof categories;

export default categories;

