export interface Product {
  name: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  specs: Record<string, string>;
  code: string;
  presentation: string;
}

export const products: Product[] = [
  // Papel institucional
  {
    name: "Rojo Doble Hoja Económico",
    slug: "rojo-doble-hoja-economico",
    category: "Papel institucional",
    image: "/assets/ROJO-DOBLE-HOJA-ECONOMICO.jpeg",
    description: "Papel higiénico institucional de doble hoja en presentación económica, ideal para uso en empresas y negocios.",
    specs: {},
    code: "PT00000261",
    presentation: "Paquete 6 unds x 1.3 kg aprox"
  },
  {
    name: "Naranja Doble Hoja",
    slug: "naranja-doble-hoja",
    category: "Papel institucional",
    image: "/assets/NARANJA-DOBLE-HOJA.jpeg",
    description: "Papel higiénico institucional de doble hoja con alta absorción y resistencia.",
    specs: {},
    code: "PT00000158",
    presentation: "Paquete 6 unds x 1.4 kg aprox"
  },
  {
    name: "Papel Gofrado",
    slug: "papel-gofrado",
    category: "Papel institucional",
    image: "/assets/PAPEL GOFRADO.jpeg",
    description: "Papel higiénico con textura gofrada para mayor suavidad y absorción.",
    specs: {},
    code: "PT00000156",
    presentation: "Paquete 6 unds x 180 mtrs aprox c/u"
  },
  {
    name: "Papel Individual",
    slug: "papel-individual",
    category: "Papel institucional",
    image: "/assets/PAPEL-INDIVIDUAL.jpeg",
    description: "Papel higiénico en presentación individual, perfecto para uso personal.",
    specs: {},
    code: "PT00000248",
    presentation: "Opción 1: paquete 6 unds x 4 kg aprox c/u / Opción 2: paquete 6 unds x 5 kg aprox c/u"
  },
  {
    name: "Papel 500",
    slug: "papel-500",
    category: "Papel institucional",
    image: "/assets/PAPEL-500.jpeg",
    description: "Rollo de papel higiénico institucional de 500 hojas, rendimiento prolongado.",
    specs: {},
    code: "PT00000163",
    presentation: "Paquete 6 unds x 500 mtrs aprox c/u"
  },
  {
    name: "Papel 550",
    slug: "papel-550",
    category: "Papel institucional",
    image: "/assets/PAPEL-550.jpeg",
    description: "Rollo de papel higiénico institucional de 550 hojas, máximo rendimiento.",
    specs: {},
    code: "PT00000164",
    presentation: "Paquete 6 unds x 550 mtrs aprox c/u"
  },
  
  // Papel toalla
  {
    name: "Papel Toalla Interfoliado",
    slug: "papel-toalla-interfoliado",
    category: "Papel toalla",
    image: "/assets/PAPEL-TOALLA-INTERFOLIADO.jpeg",
    description: "Papel toalla interfoliado de alta absorción, ideal para dispensadores.",
    specs: {},
    code: "PT00000165",
    presentation: "Caja 20 paq x 200 und c/u"
  },
  {
    name: "Papel Toalla Doble Precorte",
    slug: "papel-toalla-doble-precorte",
    category: "Papel toalla",
    image: "/assets/PAPEL-TOALLA-DOBLE-PRE-CORTE.jpeg",
    description: "Papel toalla en rollo con doble hoja y precorte para fácil dispensación.",
    specs: {},
    code: "PT00000270",
    presentation: "Paquete 6 unds x 4.8 kg aprox c/u"
  },
  {
    name: "Papel Toalla Ecológica Precorte",
    slug: "papel-toalla-ecologica-precorte",
    category: "Papel toalla",
    image: "/assets/PAPEL-TOALLA-ECOLOGICA-PRE-CORTE.jpeg",
    description: "Papel toalla ecológica con precorte, amigable con el medio ambiente.",
    specs: {},
    code: "PT00000176",
    presentation: "Paquete 6 unds x 4.8 kg aprox"
  },
  
  // Servilletas blancas
  {
    name: "Clásica x 15",
    slug: "clasica-x-15",
    category: "Servilletas blancas",
    image: "/assets/CLASICA-X15.jpeg",
    description: "Servilleta blanca clásica en paquete de 15 unidades.",
    specs: {},
    code: "PT00000003",
    presentation: "Plancha 15 paq x 100 grs c/u (1.6 kg aprox)"
  },
  {
    name: "Clásica x 18",
    slug: "clasica-x-18",
    category: "Servilletas blancas",
    image: "/assets/CLASICA-X18.jpeg",
    description: "Servilleta blanca clásica en paquete de 18 unidades.",
    specs: {},
    code: "PT00000187",
    presentation: "Plancha 18 paq x 65 grs c/u (1.3 kg aprox)"
  },
  {
    name: "Doblada",
    slug: "doblada",
    category: "Servilletas blancas",
    image: "/assets/DOBLADA.jpeg",
    description: "Servilleta blanca predoblada para fácil uso.",
    specs: {},
    code: "PT00000001",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Golden 33 x 33",
    slug: "golden-33-x-33",
    category: "Servilletas blancas",
    image: "/assets/GOLDEN-33X33.jpeg",
    description: "Servilleta premium de 33x33 cm, calidad golden.",
    specs: {},
    code: "XXXXXXXXXX",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Granel",
    slug: "granel",
    category: "Servilletas blancas",
    image: "/assets/GRANEL.jpeg",
    description: "Servilletas blancas en presentación a granel para mayor rendimiento.",
    specs: {},
    code: "PT00000004",
    presentation: "Paquete 1200 unds aprox"
  },
  {
    name: "Clásica Machu Picchu",
    slug: "clasica-machu-picchu",
    category: "Servilletas blancas",
    image: "/assets/CLASICA-MACHUPICHU.jpeg",
    description: "Servilleta clásica con motivo peruano Machu Picchu.",
    specs: {},
    code: "XXXXXXXXXX",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  
  // Servilletas con diseño
  {
    name: "Cebras",
    slug: "cebras",
    category: "Servilletas con diseño",
    image: "/assets/DISENO-CEBRAS.jpeg",
    description: "Servilleta con diseño de cebras, ideal para eventos temáticos.",
    specs: {},
    code: "SETS000018",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Manzanilla",
    slug: "manzanilla",
    category: "Servilletas con diseño",
    image: "/assets/DISENO-MANZANILLA.jpeg",
    description: "Servilleta con diseño floral de manzanilla.",
    specs: {},
    code: "SETS000026",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Girasol",
    slug: "girasol",
    category: "Servilletas con diseño",
    image: "/assets/DISENO-GIRASOL.jpeg",
    description: "Servilleta con diseño de girasoles vibrantes.",
    specs: {},
    code: "SETS000024",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Flor Grande",
    slug: "flor-grande",
    category: "Servilletas con diseño",
    image: "/assets/DISENO-FLOR-GRANDE.jpeg",
    description: "Servilleta con diseño de flor grande elegante.",
    specs: {},
    code: "SETS000025",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Marco Dorado",
    slug: "marco-dorado",
    category: "Servilletas con diseño",
    image: "/assets/DISENO-MARCO-DORADO.jpeg",
    description: "Servilleta con elegante marco dorado para eventos especiales.",
    specs: {},
    code: "XXXXXXXXXX",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Marco Plateado",
    slug: "marco-plateado",
    category: "Servilletas con diseño",
    image: "/assets/DISENO-MARCO-PLATEADO.jpeg",
    description: "Servilleta con sofisticado marco plateado.",
    specs: {},
    code: "XXXXXXXXXX",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Frutal",
    slug: "frutal",
    category: "Servilletas con diseño",
    image: "/assets/DISENO-FRUTAL.jpeg",
    description: "Servilleta con diseño frutal colorido y alegre.",
    specs: {},
    code: "XXXXXXXXXX",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  
  // Servilletas con colores
  {
    name: "Puntos 1",
    slug: "puntos-1",
    category: "Servilletas con colores",
    image: "/assets/PUNTOS-1.jpeg",
    description: "Servilleta con diseño de puntos coloridos estilo 1.",
    specs: {},
    code: "SETS000020",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Puntos 2",
    slug: "puntos-2",
    category: "Servilletas con colores",
    image: "/assets/PUNTOS-2.jpeg",
    description: "Servilleta con diseño de puntos coloridos estilo 2.",
    specs: {},
    code: "SETS000021",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Cuadros",
    slug: "cuadros",
    category: "Servilletas con colores",
    image: "/assets/CUADROS.jpeg",
    description: "Servilleta con diseño de cuadros multicolor.",
    specs: {},
    code: "SETS000016",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Flores en L",
    slug: "flores-en-l",
    category: "Servilletas con colores",
    image: "/assets/FLORES-EN-L.jpeg",
    description: "Servilleta con diseño de flores en esquina tipo L.",
    specs: {},
    code: "SETS000015",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Líneas 1",
    slug: "lineas-1",
    category: "Servilletas con colores",
    image: "/assets/LINEAS-1.jpeg",
    description: "Servilleta con diseño de líneas coloridas estilo 1.",
    specs: {},
    code: "SETS000019",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Líneas 2",
    slug: "lineas-2",
    category: "Servilletas con colores",
    image: "/assets/LINEAS-2.jpeg",
    description: "Servilleta con diseño de líneas coloridas estilo 2.",
    specs: {},
    code: "SETS000022",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Pirotines",
    slug: "pirotines",
    category: "Servilletas con colores",
    image: "/assets/PIROTINES.jpeg",
    description: "Servilleta con diseño de pirotines festivos.",
    specs: {},
    code: "SETS000017",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  
  // Servilletas para eventos
  {
    name: "Happy Birthday Plateado",
    slug: "happy-birthday-plateado",
    category: "Servilletas para eventos",
    image: "/assets/HAPPY-BIRTHDAY-PLATEADO.jpeg",
    description: "Servilleta de cumpleaños con diseño plateado elegante.",
    specs: {},
    code: "XXXXXXXXXX",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Happy Birthday Dorado",
    slug: "happy-birthday-dorado",
    category: "Servilletas para eventos",
    image: "/assets/HAPPY-BIRTHDAY-DORADO.jpeg",
    description: "Servilleta de cumpleaños con diseño dorado sofisticado.",
    specs: {},
    code: "XXXXXXXXXX",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "50 Años",
    slug: "50-anos",
    category: "Servilletas para eventos",
    image: "/assets/50-ANOS.jpeg",
    description: "Servilleta especial para celebración de 50 años.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "15 Años 1",
    slug: "15-anos-1",
    category: "Servilletas para eventos",
    image: "/assets/QUINCE-ANOS-1.jpeg",
    description: "Servilleta para celebración de quinceañera estilo 1.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "15 Años 2",
    slug: "15-anos-2",
    category: "Servilletas para eventos",
    image: "/assets/15-ANOS-2.jpeg",
    description: "Servilleta para celebración de quinceañera estilo 2.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Matrimonio Aro",
    slug: "matrimonio-aro",
    category: "Servilletas para eventos",
    image: "/assets/MATRIMONIO-ARO.jpeg",
    description: "Servilleta de matrimonio con diseño de aros.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Matrimonio Joven",
    slug: "matrimonio-joven",
    category: "Servilletas para eventos",
    image: "/assets/MATRIMONIO-JOVEN.jpeg",
    description: "Servilleta de matrimonio con diseño joven y moderno.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Matrimonio Clásico",
    slug: "matrimonio-clasico",
    category: "Servilletas para eventos",
    image: "/assets/MATRIMONIO-CLASICO.jpeg",
    description: "Servilleta de matrimonio con diseño clásico elegante.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Matrimonio Pareja",
    slug: "matrimonio-pareja",
    category: "Servilletas para eventos",
    image: "/assets/MATRIMONIO-PAREJA.jpeg",
    description: "Servilleta de matrimonio con diseño de pareja estilo 1.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Matrimonio Pareja 2",
    slug: "matrimonio-pareja-2",
    category: "Servilletas para eventos",
    image: "/assets/MATRIMONIO-PAREJA-2.jpeg",
    description: "Servilleta de matrimonio con diseño de pareja estilo 2.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Feliz Año Dorado",
    slug: "feliz-ano-dorado",
    category: "Servilletas para eventos",
    image: "/assets/FELIZ-ANO-DORADO.jpeg",
    description: "Servilleta de Año Nuevo con diseño dorado festivo.",
    specs: {},
    code: "XXXXXXXXXX",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Copas Doradas Feliz Año",
    slug: "copas-doradas-feliz-ano",
    category: "Servilletas para eventos",
    image: "/assets/COPAS-DORADAS-FELIZ-ANO.jpeg",
    description: "Servilleta de Año Nuevo con copas doradas.",
    specs: {},
    code: "XXXXXXXXXX",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Copas Amarillas Feliz Año",
    slug: "copas-amarillas-feliz-ano",
    category: "Servilletas para eventos",
    image: "/assets/COPAS-AMARILLAS-FELIZ-ANO.jpeg",
    description: "Servilleta de Año Nuevo con copas amarillas brillantes.",
    specs: {},
    code: "XXXXXXXXXX",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  
  // Servilletas infantiles
  {
    name: "Happy Birthday",
    slug: "happy-birthday",
    category: "Servilletas infantiles",
    image: "/assets/HAPPY-BIRTHDAY.jpeg",
    description: "Servilleta de cumpleaños infantil con diseño festivo.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Globos",
    slug: "globos",
    category: "Servilletas infantiles",
    image: "/assets/GLOBOS.jpeg",
    description: "Servilleta infantil con diseño de globos coloridos.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Baby Shower Unisex",
    slug: "baby-shower-unisex",
    category: "Servilletas infantiles",
    image: "/assets/BABY-SHOWER-UNISEX.jpeg",
    description: "Servilleta para baby shower en colores neutros.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Princesa",
    slug: "princesa",
    category: "Servilletas infantiles",
    image: "/assets/PRINCESA.jpeg",
    description: "Servilleta infantil con diseño de princesa.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Baby Shower Niña",
    slug: "baby-shower-nina",
    category: "Servilletas infantiles",
    image: "/assets/BABY-SHOWER-NINA.jpeg",
    description: "Servilleta para baby shower de niña en tonos rosados.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Bautizo Niña",
    slug: "bautizo-nina",
    category: "Servilletas infantiles",
    image: "/assets/BAUTIZO-NINA.jpeg",
    description: "Servilleta especial para bautizo de niña.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Bautizo Unisex",
    slug: "bautizo-unisex",
    category: "Servilletas infantiles",
    image: "/assets/BAUTIZO-UNISEX.jpeg",
    description: "Servilleta para bautizo en diseño unisex.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Baby Shower Niño",
    slug: "baby-shower-nino",
    category: "Servilletas infantiles",
    image: "/assets/BABY-SHOWER-NINO.jpeg",
    description: "Servilleta para baby shower de niño en tonos azules.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Bautizo Niño",
    slug: "bautizo-nino",
    category: "Servilletas infantiles",
    image: "/assets/BAUTIZO-NINO.jpeg",
    description: "Servilleta especial para bautizo de niño.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Payaso 1",
    slug: "payaso-1",
    category: "Servilletas infantiles",
    image: "/assets/PAYASO-1.jpeg",
    description: "Servilleta infantil con diseño de payaso estilo 1.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Payaso 2",
    slug: "payaso-2",
    category: "Servilletas infantiles",
    image: "/assets/PAYASO-2.jpeg",
    description: "Servilleta infantil con diseño de payaso estilo 2.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Payaso 3",
    slug: "payaso-3",
    category: "Servilletas infantiles",
    image: "/assets/PAYASO-3.jpeg",
    description: "Servilleta infantil con diseño de payaso estilo 3.",
    specs: {},
    code: "SETS000030",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  
  // Servilletas navideñas
  {
    name: "Vela Roja",
    slug: "vela-roja",
    category: "Servilletas navideñas",
    image: "/assets/VELA-ROJA.jpeg",
    description: "Servilleta navideña con diseño de vela roja.",
    specs: {},
    code: "SETS000029",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Vela Antigua",
    slug: "vela-antigua",
    category: "Servilletas navideñas",
    image: "/assets/VELA-ANTIGUA.jpeg",
    description: "Servilleta navideña con diseño de vela antigua.",
    specs: {},
    code: "SETS000029",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Pesebre 1",
    slug: "pesebre-1",
    category: "Servilletas navideñas",
    image: "/assets/PESEBRE-1.jpeg",
    description: "Servilleta navideña con escena del pesebre estilo 1.",
    specs: {},
    code: "SETS000029",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Pesebre 2",
    slug: "pesebre-2",
    category: "Servilletas navideñas",
    image: "/assets/PESEBRE-2.jpeg",
    description: "Servilleta navideña con escena del pesebre estilo 2.",
    specs: {},
    code: "SETS000029",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Papá Noel con Chimenea",
    slug: "papa-noel-con-chimenea",
    category: "Servilletas navideñas",
    image: "/assets/PAPA-NOEL-CON-CHIMENEA.jpeg",
    description: "Servilleta navideña con Papá Noel junto a la chimenea.",
    specs: {},
    code: "SETS000029",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Papá Noel con Cara",
    slug: "papa-noel-con-cara",
    category: "Servilletas navideñas",
    image: "/assets/PAPA-NOEL-CON-CARA.jpeg",
    description: "Servilleta navideña con rostro de Papá Noel.",
    specs: {},
    code: "SETS000029",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Papá Noel con Árbol",
    slug: "papa-noel-con-arbol",
    category: "Servilletas navideñas",
    image: "/assets/PAPA-NOEL-CON-ARBOL.jpeg",
    description: "Servilleta navideña con Papá Noel y árbol de Navidad.",
    specs: {},
    code: "SETS000029",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Papá Noel con Muñeco",
    slug: "papa-noel-con-muneco",
    category: "Servilletas navideñas",
    image: "/assets/PAPA-NOEL-CON-MUNECO.jpeg",
    description: "Servilleta navideña con Papá Noel y muñeco de nieve.",
    specs: {},
    code: "SETS000029",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Papá Noel con Reno",
    slug: "papa-noel-con-reno",
    category: "Servilletas navideñas",
    image: "/assets/PAPA-NOEL-CON-RENO.jpeg",
    description: "Servilleta navideña con Papá Noel y reno.",
    specs: {},
    code: "SETS000029",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Papá Noel y Mamanuela",
    slug: "papa-noel-y-mamanuela",
    category: "Servilletas navideñas",
    image: "/assets/PAPA-NOEL-Y-MAMA-NOELA.jpeg",
    description: "Servilleta navideña con Papá Noel y Mamá Noel.",
    specs: {},
    code: "SETS000029",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Merry Christmas",
    slug: "merry-christmas",
    category: "Servilletas navideñas",
    image: "/assets/MERRY-CHRISTMAS.jpeg",
    description: "Servilleta navideña con mensaje Merry Christmas.",
    specs: {},
    code: "SETS000029",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Muñeco de Nieve 1",
    slug: "muneco-de-nieve-1",
    category: "Servilletas navideñas",
    image: "/assets/MUNECO-DE-NIEVE-1.jpeg",
    description: "Servilleta navideña con muñeco de nieve estilo 1.",
    specs: {},
    code: "SETS000029",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Muñeco de Nieve 2",
    slug: "muneco-de-nieve-2",
    category: "Servilletas navideñas",
    image: "/assets/MUNECO-DE-NIEVE-2.jpeg",
    description: "Servilleta navideña con muñeco de nieve estilo 2.",
    specs: {},
    code: "SETS000029",
    presentation: "Plancha 6 paq x 100 und dob"
  },
  {
    name: "Pingüinos Navideños",
    slug: "pinguinos-navidenos",
    category: "Servilletas navideñas",
    image: "/assets/PINGUINOS-NAVIDENOS.jpeg",
    description: "Servilleta navideña con pingüinos festivos.",
    specs: {},
    code: "SETS000029",
    presentation: "Plancha 6 paq x 100 und dob"
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