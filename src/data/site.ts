const uploads = "https://celiomicieloreposteria.com/wp-content/uploads";

/** Cambia a false al terminar la temporada para quitar lo navideño. */
export const christmasSeason = true;

export const logoUrl = `${uploads}/2023/09/logo_sitioweb.png`;

export const social = {
  instagram: "https://www.instagram.com/celiomicieloreposteria/",
  tiktok: "https://www.tiktok.com/@celiomicielo",
};

export type Sede = {
  name: string;
  place: string;
  local: string;
  whatsapp: string;
  maps: string;
  menu: string;
  /** Enlace a la tienda de esta sede en Rappi. Vacío = no se muestra. */
  rappi: string;
};

export const sedes: Sede[] = [
  {
    name: "Ciudad Jardín",
    place: "La Leyenda Mall",
    local: "Local 37",
    whatsapp: "573127185385",
    maps: "https://www.google.com/maps/search/?api=1&query=La+Leyenda+Mall+Cali",
    menu: `${uploads}/2024/10/MENU-CIUDAD-JARDIN-comprimido.pdf`,
    rappi: "", // TODO: pegar aquí el enlace de Rappi de Ciudad Jardín
  },
  {
    name: "Aquarela",
    place: "Centro comercial Aquarela",
    local: "Local 218 · Plazoleta de comidas",
    whatsapp: "573108565822",
    maps: "https://maps.app.goo.gl/iPg41T4MiFUTNf2z9",
    menu: `${uploads}/2024/10/MENU-AQUARELA.pdf`,
    rappi: "https://www.rappi.com.co/restaurantes/900409236-celio-mi-cielo-reposteria",
  },
];

const defaultWhatsapp = "573108565822";

export function whatsappLink(message: string, number = defaultWhatsapp) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// ---------------------------------------------------------------------------
// Catálogo. Precios tomados de la tienda actual (WooCommerce), en pesos.
// ---------------------------------------------------------------------------

export type Size = { label: string; detail?: string; price: number };

export type Category = "tortas" | "postres" | "galletas" | "navidad";

export type CatalogProduct = {
  id: string;
  name: string;
  image: string;
  category: Category;
  note?: string;
  sizes: Size[];
};

const porcion = (price: number): Size => ({ label: "Porción", price });
const pequena = (price: number): Size => ({ label: "Pequeña", detail: "2-4 porciones", price });
const mediana = (price: number): Size => ({ label: "Mediana", detail: "4-8 porciones", price });
const entera = (price: number): Size => ({ label: "Entera", price });
const unit = (label: string, price: number): Size => ({ label, price });

const products: CatalogProduct[] = [
  // Tortas
  {
    id: "torta-de-pastores",
    name: "Torta de Pastores",
    image: `${uploads}/2023/12/Torta-de-Pastores.jpg`,
    category: "navidad",
    sizes: [
      porcion(13500),
      { label: "Mediana", detail: "4-6 porciones", price: 48500 },
      { label: "Entera", detail: "8-10 porciones", price: 71500 },
    ],
  },
  {
    id: "birthday-cake",
    name: "Birthday Cake",
    image: `${uploads}/2023/09/birthday.jpg`,
    category: "tortas",
    sizes: [porcion(11500), entera(81000)],
  },
  {
    id: "red-velvet",
    name: "Red Velvet",
    image: `${uploads}/2023/09/redvelvet.jpg`,
    category: "tortas",
    sizes: [porcion(9000), pequena(28000), mediana(47000), entera(70000)],
  },
  {
    id: "chocolate-con-arequipe",
    name: "Chocolate con arequipe",
    image: `${uploads}/2023/09/chocolate.jpg`,
    category: "tortas",
    sizes: [porcion(9000), pequena(24000), mediana(46000), entera(70000)],
  },
  {
    id: "platano-maduro",
    name: "Plátano maduro, bocadillo y queso cuajada",
    image: `${uploads}/2023/09/maduro-y-queso.jpg`,
    category: "tortas",
    sizes: [porcion(9500), pequena(24000), mediana(48000), entera(75500)],
  },
  {
    id: "tres-leches",
    name: "Tres leches",
    image: `${uploads}/2023/09/3-leches.jpg`,
    category: "tortas",
    sizes: [porcion(11000), pequena(32000), mediana(46000), entera(85000)],
  },
  {
    id: "zanahoria",
    name: "Zanahoria",
    image: `${uploads}/2023/10/zanahoria.jpg`,
    category: "tortas",
    note: "Baja en azúcar",
    sizes: [porcion(8500), pequena(24000), mediana(42000), entera(62000)],
  },
  {
    id: "zanahoria-queso-crema",
    name: "Zanahoria con frosting de queso crema",
    image: `${uploads}/2023/09/zanahoria.jpg`,
    category: "tortas",
    sizes: [porcion(9500), pequena(31000), mediana(50000), entera(75000)],
  },
  {
    id: "torta-brownie-milo",
    name: "Torta de Brownie de Milo melcochudo",
    image: `${uploads}/2024/02/SAN-VALENTIN.jpg`,
    category: "tortas",
    sizes: [pequena(26000), entera(52000)],
  },
  // Postres
  {
    id: "cheesecake-red-velvet",
    name: "Cheesecake de Red Velvet",
    image: `${uploads}/2023/09/cheesecake.jpg`,
    category: "postres",
    sizes: [porcion(9500), entera(79000)],
  },
  {
    id: "cheesecake-maracuya",
    name: "Cheesecake de maracuyá con base de brownie de Milo",
    image: `${uploads}/2024/05/Cheesecake-de-maracuya.jpg`,
    category: "postres",
    sizes: [pequena(37000), entera(91000)],
  },
  {
    id: "cheesecake-queso-cuajada",
    name: "Cheesecake de queso cuajada y coulis de frutos rojos",
    image: `${uploads}/2024/05/Chesecake-de-queso-coulis-de-frutos-rojos-.jpg`,
    category: "postres",
    note: "Sin azúcar y sin harina",
    sizes: [pequena(41500), entera(93000)],
  },
  {
    id: "tiramisu",
    name: "Tiramisú",
    image: `${uploads}/2023/09/tiramisu.jpg`,
    category: "postres",
    sizes: [porcion(9500), entera(79000)],
  },
  {
    id: "brownie-milo",
    name: "Brownie de Milo melcochudo",
    image: `${uploads}/2023/09/brownie.jpg`,
    category: "postres",
    sizes: [unit("Individual", 8200), unit("Caja x 4", 32500), unit("Caja x 6", 63000)],
  },
  {
    id: "arroz-con-leche",
    name: "Arroz con leche",
    image: `${uploads}/2023/11/BUC_7626.jpg`,
    category: "postres",
    sizes: [unit("Individual", 6500), unit("1 libra", 15000), unit("4 libras", 55000)],
  },
  {
    id: "natilla",
    name: "Natilla Artesanal",
    image: `${uploads}/2023/12/Natilla.jpg`,
    category: "postres",
    sizes: [unit("Individual", 6500), unit("1 libra", 15500), unit("4 libras", 58000)],
  },
  // Galletas
  {
    id: "alfajores",
    name: "Alfajores",
    image: `${uploads}/2023/10/alfajores.jpg`,
    category: "galletas",
    sizes: [unit("Caja x 4", 13000), unit("Caja x 9", 29000)],
  },
  {
    id: "galleta-red-velvet",
    name: "Galleta de Red Velvet rellena de queso crema",
    image: `${uploads}/2023/09/galleta-red-veltet.jpg`,
    category: "galletas",
    sizes: [unit("Individual", 9500), unit("Caja x 4", 38000)],
  },
  // Navidad
  {
    id: "caja-navidena",
    name: "Caja Navideña",
    image: `${uploads}/2023/12/Plato-navideno.jpg`,
    category: "navidad",
    sizes: [unit("Caja", 29000)],
  },
  {
    id: "caja-galletas-navidenas",
    name: "Caja de Galletas Navideñas",
    image: `${uploads}/2023/12/Caja-de-Navidad.jpg`,
    category: "navidad",
    sizes: [unit("Caja", 35000)],
  },
  {
    id: "candle-cake",
    name: "Candle Cake",
    image: `${uploads}/2023/12/Candle-cake.jpg`,
    category: "navidad",
    sizes: [unit("Torta", 57000)],
  },
  {
    id: "galletas-polvorosas",
    name: "Galletas polvorosas navideñas",
    image: `${uploads}/2023/12/Galletas-polvorosas.jpg`,
    category: "navidad",
    sizes: [unit("Paquete", 7500)],
  },
];

const byId = new Map(products.map((product) => [product.id, product]));

/** Busca un producto por id sin fallar (para datos guardados en el navegador). */
export function findProduct(id: string): CatalogProduct | undefined {
  return byId.get(id);
}

export function getProduct(id: string): CatalogProduct {
  const product = byId.get(id);
  if (!product) throw new Error(`Producto desconocido: ${id}`);
  return product;
}

export const bestSellers = [
  "birthday-cake",
  "alfajores",
  "red-velvet",
  "platano-maduro",
  "cheesecake-red-velvet",
  "chocolate-con-arequipe",
  "brownie-milo",
  "tres-leches",
].map(getProduct);

export const christmasProducts = [
  "natilla",
  "caja-navidena",
  "caja-galletas-navidenas",
  "candle-cake",
].map(getProduct);

export const menu = (
  [
    ["Tortas", "tortas"],
    ["Postres", "postres"],
    ["Galletas", "galletas"],
  ] as const
).map(([title, category]) => ({
  title,
  items: products.filter((product) => product.category === category),
}));

export const priceFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function formatPrice(price: number) {
  return priceFormatter.format(price);
}

// ---------------------------------------------------------------------------
// Producto destacado del hero
// ---------------------------------------------------------------------------

export type Feature = {
  eyebrow: string;
  title: string;
  description: string;
  imageAlt: string;
  product: CatalogProduct;
};

export const christmasFeature: Feature = {
  eyebrow: "Edición Navidad",
  title: "Torta de Pastores",
  description:
    "La consentida de nuestra mesa de diciembre. Horneada a mano, sin conservantes y lista para compartir en familia.",
  imageAlt: "Torta de Pastores con frutas confitadas",
  product: getProduct("torta-de-pastores"),
};

export const defaultFeature: Feature = {
  eyebrow: "Repostería artesanal en Cali",
  title: "El cielo en cada porción",
  description:
    "Tortas equilibradas en dulce, muy esponjosas y horneadas todos los días, sin conservantes.",
  imageAlt: "Torta Red Velvet",
  product: getProduct("red-velvet"),
};

// ---------------------------------------------------------------------------
// Contenido
// ---------------------------------------------------------------------------

export const experiences = [
  {
    title: "Decora tu mini torta",
    text: "Somos el primer decora tu mini torta en Cali. Te sientas, eliges y la vuelves tuya.",
    message: "Hola Celio mi Cielo! Quisiera información sobre Decora tu mini torta.",
  },
  {
    title: "Talleres",
    text: "Planes para aprender repostería con las manos en la masa, solo o en compañía.",
    message: "Hola Celio mi Cielo! Quisiera información sobre los talleres.",
  },
  {
    title: "Eventos empresariales",
    text: "Llevamos la experiencia a tu equipo, para celebrar de una forma diferente.",
    message: "Hola Celio mi Cielo! Quisiera información sobre eventos empresariales.",
  },
];

export const values = [
  {
    title: "Equilibrio",
    text: "Nuestras tortas son súper equilibradas en dulce, muy esponjosas y para nada secas.",
  },
  {
    title: "Productos frescos",
    text: "Horneamos todos los días y no usamos conservantes, mejorantes ni aditivos.",
  },
  {
    title: "Producción artesanal",
    text: "Nos esforzamos por tener todo disponible, pero te recomendamos pedir con anticipación.",
  },
  {
    title: "Amor, el ingrediente principal",
    text: "Materia prima de la mejor calidad, trabajada de manera artesanal y con mucho amor.",
  },
];
