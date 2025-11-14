export interface Product {
  name: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  specs: Record<string, string>;
}

export const products: Product[] = [
  // Papel institucional
  {
    name: "Rojo Doble Hoja Económico",
    slug: "rojo-doble-hoja-economico",
    category: "Papel institucional",
    image: "/assets/ROJO-DOBLE-HOJA-ECONOMICO.jpeg",
    description: "Papel higiénico institucional de doble hoja en presentación económica, ideal para uso en empresas y negocios.",
    specs: {}
  },
  {
    name: "Naranja Doble Hoja",
    slug: "naranja-doble-hoja",
    category: "Papel institucional",
    image: "/assets/NARANJA-DOBLE-HOJA.jpeg",
    description: "Papel higiénico institucional de doble hoja con alta absorción y resistencia.",
    specs: {}
  },
  {
    name: "Papel Gofrado",
    slug: "papel-gofrado",
    category: "Papel institucional",
    image: "/assets/PAPEL GOFRADO.jpeg",
    description: "Papel higiénico con textura gofrada para mayor suavidad y absorción.",
    specs: {}
  },
  {
    name: "Papel Individual",
    slug: "papel-individual",
    category: "Papel institucional",
    image: "/assets/PAPEL-INDIVIDUAL.jpeg",
    description: "Papel higiénico en presentación individual, perfecto para uso personal.",
    specs: {}
  },
  {
    name: "Papel 500",
    slug: "papel-500",
    category: "Papel institucional",
    image: "/assets/PAPEL-500.jpeg",
    description: "Rollo de papel higiénico institucional de 500 hojas, rendimiento prolongado.",
    specs: {}
  },
  {
    name: "Papel 550",
    slug: "papel-550",
    category: "Papel institucional",
    image: "/assets/PAPEL-550.jpeg",
    description: "Rollo de papel higiénico institucional de 550 hojas, máximo rendimiento.",
    specs: {}
  },
  
  // Papel toalla
  {
    name: "Papel Toalla Interfoliado",
    slug: "papel-toalla-interfoliado",
    category: "Papel toalla",
    image: "/assets/PAPEL-TOALLA-INTERFOLIADO.jpeg",
    description: "Papel toalla interfoliado de alta absorción, ideal para dispensadores.",
    specs: {}
  },
  {
    name: "Papel Toalla Doble Precorte",
    slug: "papel-toalla-doble-precorte",
    category: "Papel toalla",
    image: "/assets/PAPEL-TOALLA-DOBLE-PRE-CORTE.jpeg",
    description: "Papel toalla en rollo con doble hoja y precorte para fácil dispensación.",
    specs: {}
  },
  {
    name: "Papel Toalla Ecológica Precorte",
    slug: "papel-toalla-ecologica-precorte",
    category: "Papel toalla",
    image: "/assets/PAPEL-TOALLA-ECOLOGICA-PRE-CORTE.jpeg",
    description: "Papel toalla ecológica con precorte, amigable con el medio ambiente.",
    specs: {}
  },
  
  // Servilletas blancas
  {
    name: "Clásica x 15",
    slug: "clasica-x-15",
    category: "Servilletas blancas",
    image: "/assets/CLASICA-X15.jpeg",
    description: "Servilleta blanca clásica en paquete de 15 unidades.",
    specs: {}
  },
  {
    name: "Clásica x 18",
    slug: "clasica-x-18",
    category: "Servilletas blancas",
    image: "/assets/CLASICA-X18.jpeg",
    description: "Servilleta blanca clásica en paquete de 18 unidades.",
    specs: {}
  },
  {
    name: "Doblada",
    slug: "doblada",
    category: "Servilletas blancas",
    image: "/assets/DOBLADA.jpeg",
    description: "Servilleta blanca predoblada para fácil uso.",
    specs: {}
  },
  {
    name: "Golden 33 x 33",
    slug: "golden-33-x-33",
    category: "Servilletas blancas",
    image: "/assets/GOLDEN-33X33.jpeg",
    description: "Servilleta premium de 33x33 cm, calidad golden.",
    specs: {}
  },
  {
    name: "Granel",
    slug: "granel",
    category: "Servilletas blancas",
    image: "/assets/GRANEL.jpeg",
    description: "Servilletas blancas en presentación a granel para mayor rendimiento.",
    specs: {}
  },
  {
    name: "Clásica Machu Picchu",
    slug: "clasica-machu-picchu",
    category: "Servilletas blancas",
    image: "/assets/CLASICA-MACHUPICHU.jpeg",
    description: "Servilleta clásica con motivo peruano Machu Picchu.",
    specs: {}
  },
  
  // Servilletas con diseño
  {
    name: "Cebras",
    slug: "cebras",
    category: "Servilletas con diseño",
    image: "/assets/DISENO-CEBRAS.jpeg",
    description: "Servilleta con diseño de cebras, ideal para eventos temáticos.",
    specs: {}
  },
  {
    name: "Manzanilla",
    slug: "manzanilla",
    category: "Servilletas con diseño",
    image: "/assets/DISENO-MANZANILLA.jpeg",
    description: "Servilleta con diseño floral de manzanilla.",
    specs: {}
  },
  {
    name: "Girasol",
    slug: "girasol",
    category: "Servilletas con diseño",
    image: "/assets/DISENO-GIRASOL.jpeg",
    description: "Servilleta con diseño de girasoles vibrantes.",
    specs: {}
  },
  {
    name: "Flor Grande",
    slug: "flor-grande",
    category: "Servilletas con diseño",
    image: "/assets/DISENO-FLOR-GRANDE.jpeg",
    description: "Servilleta con diseño de flor grande elegante.",
    specs: {}
  },
  {
    name: "Marco Dorado",
    slug: "marco-dorado",
    category: "Servilletas con diseño",
    image: "/assets/DISENO-MARCO-DORADO.jpeg",
    description: "Servilleta con elegante marco dorado para eventos especiales.",
    specs: {}
  },
  {
    name: "Marco Plateado",
    slug: "marco-plateado",
    category: "Servilletas con diseño",
    image: "/assets/DISENO-MARCO-PLATEADO.jpeg",
    description: "Servilleta con sofisticado marco plateado.",
    specs: {}
  },
  {
    name: "Frutal",
    slug: "frutal",
    category: "Servilletas con diseño",
    image: "/assets/DISENO-FRUTAL.jpeg",
    description: "Servilleta con diseño frutal colorido y alegre.",
    specs: {}
  },
  
  // Servilletas con colores
  {
    name: "Puntos 1",
    slug: "puntos-1",
    category: "Servilletas con colores",
    image: "/assets/PUNTOS-1.jpeg",
    description: "Servilleta con diseño de puntos coloridos estilo 1.",
    specs: {}
  },
  {
    name: "Puntos 2",
    slug: "puntos-2",
    category: "Servilletas con colores",
    image: "/assets/PUNTOS-2.jpeg",
    description: "Servilleta con diseño de puntos coloridos estilo 2.",
    specs: {}
  },
  {
    name: "Cuadros",
    slug: "cuadros",
    category: "Servilletas con colores",
    image: "/assets/CUADROS.jpeg",
    description: "Servilleta con diseño de cuadros multicolor.",
    specs: {}
  },
  {
    name: "Flores en L",
    slug: "flores-en-l",
    category: "Servilletas con colores",
    image: "/assets/FLORES-EN-L.jpeg",
    description: "Servilleta con diseño de flores en esquina tipo L.",
    specs: {}
  },
  {
    name: "Líneas 1",
    slug: "lineas-1",
    category: "Servilletas con colores",
    image: "/assets/LINEAS-1.jpeg",
    description: "Servilleta con diseño de líneas coloridas estilo 1.",
    specs: {}
  },
  {
    name: "Líneas 2",
    slug: "lineas-2",
    category: "Servilletas con colores",
    image: "/assets/LINEAS-2.jpeg",
    description: "Servilleta con diseño de líneas coloridas estilo 2.",
    specs: {}
  },
  {
    name: "Pirotines",
    slug: "pirotines",
    category: "Servilletas con colores",
    image: "/assets/PIROTINES.jpeg",
    description: "Servilleta con diseño de pirotines festivos.",
    specs: {}
  },
  
  // Servilletas para eventos
  {
    name: "Happy Birthday Plateado",
    slug: "happy-birthday-plateado",
    category: "Servilletas para eventos",
    image: "/assets/HAPPY-BIRTHDAY-PLATEADO.jpeg",
    description: "Servilleta de cumpleaños con diseño plateado elegante.",
    specs: {}
  },
  {
    name: "Happy Birthday Dorado",
    slug: "happy-birthday-dorado",
    category: "Servilletas para eventos",
    image: "/assets/HAPPY-BIRTHDAY-DORADO.jpeg",
    description: "Servilleta de cumpleaños con diseño dorado sofisticado.",
    specs: {}
  },
  {
    name: "50 Años",
    slug: "50-anos",
    category: "Servilletas para eventos",
    image: "/assets/50-ANOS.jpeg",
    description: "Servilleta especial para celebración de 50 años.",
    specs: {}
  },
  {
    name: "15 Años 1",
    slug: "15-anos-1",
    category: "Servilletas para eventos",
    image: "/assets/QUINCE-ANOS-1.jpeg",
    description: "Servilleta para celebración de quinceañera estilo 1.",
    specs: {}
  },
  {
    name: "15 Años 2",
    slug: "15-anos-2",
    category: "Servilletas para eventos",
    image: "/assets/15-ANOS-2.jpeg",
    description: "Servilleta para celebración de quinceañera estilo 2.",
    specs: {}
  },
  {
    name: "Matrimonio Aro",
    slug: "matrimonio-aro",
    category: "Servilletas para eventos",
    image: "/assets/MATRIMONIO-ARO.jpeg",
    description: "Servilleta de matrimonio con diseño de aros.",
    specs: {}
  },
  {
    name: "Matrimonio Joven",
    slug: "matrimonio-joven",
    category: "Servilletas para eventos",
    image: "/assets/MATRIMONIO-JOVEN.jpeg",
    description: "Servilleta de matrimonio con diseño joven y moderno.",
    specs: {}
  },
  {
    name: "Matrimonio Clásico",
    slug: "matrimonio-clasico",
    category: "Servilletas para eventos",
    image: "/assets/MATRIMONIO-CLASICO.jpeg",
    description: "Servilleta de matrimonio con diseño clásico elegante.",
    specs: {}
  },
  {
    name: "Matrimonio Pareja",
    slug: "matrimonio-pareja",
    category: "Servilletas para eventos",
    image: "/assets/MATRIMONIO-PAREJA.jpeg",
    description: "Servilleta de matrimonio con diseño de pareja estilo 1.",
    specs: {}
  },
  {
    name: "Matrimonio Pareja 2",
    slug: "matrimonio-pareja-2",
    category: "Servilletas para eventos",
    image: "/assets/MATRIMONIO-PAREJA-2.jpeg",
    description: "Servilleta de matrimonio con diseño de pareja estilo 2.",
    specs: {}
  },
  {
    name: "Feliz Año Dorado",
    slug: "feliz-ano-dorado",
    category: "Servilletas para eventos",
    image: "/assets/FELIZ-ANO-DORADO.jpeg",
    description: "Servilleta de Año Nuevo con diseño dorado festivo.",
    specs: {}
  },
  {
    name: "Copas Doradas Feliz Año",
    slug: "copas-doradas-feliz-ano",
    category: "Servilletas para eventos",
    image: "/assets/COPAS-DORADAS-FELIZ-ANO.jpeg",
    description: "Servilleta de Año Nuevo con copas doradas.",
    specs: {}
  },
  {
    name: "Copas Amarillas Feliz Año",
    slug: "copas-amarillas-feliz-ano",
    category: "Servilletas para eventos",
    image: "/assets/COPAS-AMARILLAS-FELIZ-ANO.jpeg",
    description: "Servilleta de Año Nuevo con copas amarillas brillantes.",
    specs: {}
  },
  
  // Servilletas infantiles
  {
    name: "Happy Birthday",
    slug: "happy-birthday",
    category: "Servilletas infantiles",
    image: "/assets/HAPPY-BIRTHDAY.jpeg",
    description: "Servilleta de cumpleaños infantil con diseño festivo.",
    specs: {}
  },
  {
    name: "Globos",
    slug: "globos",
    category: "Servilletas infantiles",
    image: "/assets/GLOBOS.jpeg",
    description: "Servilleta infantil con diseño de globos coloridos.",
    specs: {}
  },
  {
    name: "Baby Shower Unisex",
    slug: "baby-shower-unisex",
    category: "Servilletas infantiles",
    image: "/assets/BABY-SHOWER-UNISEX.jpeg",
    description: "Servilleta para baby shower en colores neutros.",
    specs: {}
  },
  {
    name: "Princesa",
    slug: "princesa",
    category: "Servilletas infantiles",
    image: "/assets/PRINCESA.jpeg",
    description: "Servilleta infantil con diseño de princesa.",
    specs: {}
  },
  {
    name: "Baby Shower Niña",
    slug: "baby-shower-nina",
    category: "Servilletas infantiles",
    image: "/assets/BABY-SHOWER-NINA.jpeg",
    description: "Servilleta para baby shower de niña en tonos rosados.",
    specs: {}
  },
  {
    name: "Bautizo Niña",
    slug: "bautizo-nina",
    category: "Servilletas infantiles",
    image: "/assets/BAUTIZO-NINA.jpeg",
    description: "Servilleta especial para bautizo de niña.",
    specs: {}
  },
  {
    name: "Bautizo Unisex",
    slug: "bautizo-unisex",
    category: "Servilletas infantiles",
    image: "/assets/BAUTIZO-UNISEX.jpeg",
    description: "Servilleta para bautizo en diseño unisex.",
    specs: {}
  },
  {
    name: "Baby Shower Niño",
    slug: "baby-shower-nino",
    category: "Servilletas infantiles",
    image: "/assets/BABY-SHOWER-NINO.jpeg",
    description: "Servilleta para baby shower de niño en tonos azules.",
    specs: {}
  },
  {
    name: "Bautizo Niño",
    slug: "bautizo-nino",
    category: "Servilletas infantiles",
    image: "/assets/BAUTIZO-NINO.jpeg",
    description: "Servilleta especial para bautizo de niño.",
    specs: {}
  },
  {
    name: "Payaso 1",
    slug: "payaso-1",
    category: "Servilletas infantiles",
    image: "/assets/PAYASO-1.jpeg",
    description: "Servilleta infantil con diseño de payaso estilo 1.",
    specs: {}
  },
  {
    name: "Payaso 2",
    slug: "payaso-2",
    category: "Servilletas infantiles",
    image: "/assets/PAYASO-2.jpeg",
    description: "Servilleta infantil con diseño de payaso estilo 2.",
    specs: {}
  },
  {
    name: "Payaso 3",
    slug: "payaso-3",
    category: "Servilletas infantiles",
    image: "/assets/PAYASO-3.jpeg",
    description: "Servilleta infantil con diseño de payaso estilo 3.",
    specs: {}
  },
  
  // Servilletas navideñas
  {
    name: "Vela Roja",
    slug: "vela-roja",
    category: "Servilletas navideñas",
    image: "/assets/VELA-ROJA.jpeg",
    description: "Servilleta navideña con diseño de vela roja.",
    specs: {}
  },
  {
    name: "Vela Antigua",
    slug: "vela-antigua",
    category: "Servilletas navideñas",
    image: "/assets/VELA-ANTIGUA.jpeg",
    description: "Servilleta navideña con diseño de vela antigua.",
    specs: {}
  },
  {
    name: "Pesebre 1",
    slug: "pesebre-1",
    category: "Servilletas navideñas",
    image: "/assets/PESEBRE-1.jpeg",
    description: "Servilleta navideña con escena del pesebre estilo 1.",
    specs: {}
  },
  {
    name: "Pesebre 2",
    slug: "pesebre-2",
    category: "Servilletas navideñas",
    image: "/assets/PESEBRE-2.jpeg",
    description: "Servilleta navideña con escena del pesebre estilo 2.",
    specs: {}
  },
  {
    name: "Papá Noel con Chimenea",
    slug: "papa-noel-con-chimenea",
    category: "Servilletas navideñas",
    image: "/assets/PAPA-NOEL-CON-CHIMENEA.jpeg",
    description: "Servilleta navideña con Papá Noel junto a la chimenea.",
    specs: {}
  },
  {
    name: "Papá Noel con Cara",
    slug: "papa-noel-con-cara",
    category: "Servilletas navideñas",
    image: "/assets/PAPA-NOEL-CON-CARA.jpeg",
    description: "Servilleta navideña con rostro de Papá Noel.",
    specs: {}
  },
  {
    name: "Papá Noel con Árbol",
    slug: "papa-noel-con-arbol",
    category: "Servilletas navideñas",
    image: "/assets/PAPA-NOEL-CON-ARBOL.jpeg",
    description: "Servilleta navideña con Papá Noel y árbol de Navidad.",
    specs: {}
  },
  {
    name: "Papá Noel con Muñeco",
    slug: "papa-noel-con-muneco",
    category: "Servilletas navideñas",
    image: "/assets/PAPA-NOEL-CON-MUNECO.jpeg",
    description: "Servilleta navideña con Papá Noel y muñeco de nieve.",
    specs: {}
  },
  {
    name: "Papá Noel con Reno",
    slug: "papa-noel-con-reno",
    category: "Servilletas navideñas",
    image: "/assets/PAPA-NOEL-CON-RENO.jpeg",
    description: "Servilleta navideña con Papá Noel y reno.",
    specs: {}
  },
  {
    name: "Papá Noel y Mamanuela",
    slug: "papa-noel-y-mamanuela",
    category: "Servilletas navideñas",
    image: "/assets/PAPA-NOEL-Y-MAMA-NOELA.jpeg",
    description: "Servilleta navideña con Papá Noel y Mamá Noel.",
    specs: {}
  },
  {
    name: "Merry Christmas",
    slug: "merry-christmas",
    category: "Servilletas navideñas",
    image: "/assets/MERRY-CHRISTMAS.jpeg",
    description: "Servilleta navideña con mensaje Merry Christmas.",
    specs: {}
  },
  {
    name: "Muñeco de Nieve 1",
    slug: "muneco-de-nieve-1",
    category: "Servilletas navideñas",
    image: "/assets/MUNECO-DE-NIEVE-1.jpeg",
    description: "Servilleta navideña con muñeco de nieve estilo 1.",
    specs: {}
  },
  {
    name: "Muñeco de Nieve 2",
    slug: "muneco-de-nieve-2",
    category: "Servilletas navideñas",
    image: "/assets/MUNECO-DE-NIEVE-2.jpeg",
    description: "Servilleta navideña con muñeco de nieve estilo 2.",
    specs: {}
  },
  {
    name: "Pingüinos Navideños",
    slug: "pinguinos-navidenos",
    category: "Servilletas navideñas",
    image: "/assets/PINGUINOS-NAVIDENOS.jpeg",
    description: "Servilleta navideña con pingüinos festivos.",
    specs: {}
  },
];

export const categories = [
  "Papel institucional",
  "Papel toalla",
  "Servilletas blancas",
  "Servilletas con diseño",
  "Servilletas con colores",
  "Servilletas para eventos",
  "Servilletas infantiles",
  "Servilletas navideñas",
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};