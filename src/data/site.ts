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
  /** Si desde esta sede salen domicilios. Si no, solo se puede recoger ahí. */
  delivers: boolean;
  /** Horario de atención en formato 24 h ("HH:MM"). */
  opens: string;
  closes: string;
  /** Hora máxima recomendada para llegar a un Cake Party. */
  cakePartyLastArrival: string;
};

/** "18:30" → minutos desde la medianoche. */
function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/** "18:30" → "6:30 p. m."; "12:00" → "12:00 m.". */
export function formatTime(time: string) {
  const total = toMinutes(time);
  const hours = Math.floor(total / 60);
  const minutes = String(total % 60).padStart(2, "0");
  if (hours === 12 && minutes === "00") return "12:00 m.";
  const suffix = hours < 12 ? "a. m." : "p. m.";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${minutes} ${suffix}`;
}

/** "20:00" → "8 p. m." (sin minutos cuando son en punto). */
export function formatHour(time: string) {
  return formatTime(time).replace(":00", "");
}

/** Horas de llegada para un Cake Party, cada 30 minutos desde que abre. */
export function cakePartyTimes(sede: Sede) {
  const times: string[] = [];
  for (let m = toMinutes(sede.opens); m <= toMinutes(sede.cakePartyLastArrival); m += 30) {
    times.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return times;
}

export const sedes: Sede[] = [
  {
    name: "Ciudad Jardín",
    place: "La Leyenda Mall",
    local: "Local 37",
    whatsapp: "573127185385",
    maps: "https://www.google.com/maps/search/?api=1&query=La+Leyenda+Mall+Cali",
    menu: `${uploads}/2024/10/MENU-CIUDAD-JARDIN-comprimido.pdf`,
    rappi: "", // TODO: pegar aquí el enlace de Rappi de Ciudad Jardín
    delivers: false,
    opens: "11:00",
    closes: "20:00",
    cakePartyLastArrival: "18:30",
  },
  {
    name: "Aquarela",
    place: "Centro comercial Aquarela",
    local: "Local 218 · Plazoleta de comidas",
    whatsapp: "573108565822",
    maps: "https://maps.app.goo.gl/iPg41T4MiFUTNf2z9",
    menu: `${uploads}/2024/10/MENU-AQUARELA.pdf`,
    rappi: "https://www.rappi.com.co/restaurantes/900409236-celio-mi-cielo-reposteria",
    delivers: true,
    opens: "11:00",
    closes: "19:00",
    cakePartyLastArrival: "17:30",
  },
];

/** Tarifas de domicilio por zona de Cali, en pesos. */
export type DeliveryZone = { id: string; name: string; price: number };

export const deliveryZones: DeliveryZone[] = [
  { id: "sur", name: "Cali Sur", price: 10500 },
  { id: "pance-oeste-centro", name: "Pance, Oeste o Centro", price: 13500 },
  { id: "norte", name: "Cali Norte", price: 17500 },
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
  /** Clase object-position para encuadrar fotos panorámicas en tarjetas y miniaturas. */
  imagePosition?: string;
  category: Category;
  note?: string;
  sizes: Size[];
};

const porcion = (price: number): Size => ({ label: "Porción", price });
const pequena = (price: number): Size => ({ label: "Pequeña", detail: "2-4 porciones", price });
const mediana = (price: number): Size => ({ label: "Mediana", detail: "4-8 porciones", price });
const entera = (price: number): Size => ({ label: "Entera", price });
/** Tortas enteras: de 10 a 16 porciones. */
const tortaEntera = (price: number): Size => ({ label: "Entera", detail: "10-16 porciones", price });
const unit = (label: string, price: number): Size => ({ label, price });

const products: CatalogProduct[] = [
  // Tortas
  {
    id: "torta-de-pastores",
    name: "Torta de Pastores",
    image: "/hero/torta-de-pastores.webp",
    imagePosition: "object-[73%_50%]",
    category: "navidad",
    sizes: [
      { label: "Mediana", detail: "4-6 porciones", price: 48500 },
      { label: "Entera", detail: "8-10 porciones", price: 71500 },
    ],
  },
  {
    id: "birthday-cake",
    name: "Birthday Cake",
    image: `${uploads}/2023/09/birthday.jpg`,
    category: "tortas",
    sizes: [tortaEntera(81000)],
  },
  {
    id: "red-velvet",
    name: "Red Velvet",
    image: `${uploads}/2023/09/redvelvet.jpg`,
    category: "tortas",
    sizes: [pequena(31000), mediana(51000), tortaEntera(80000)],
  },
  {
    id: "chocolate-con-arequipe",
    name: "Chocolate con arequipe",
    image: `${uploads}/2023/09/chocolate.jpg`,
    category: "tortas",
    sizes: [pequena(26500), mediana(49000), tortaEntera(85000)],
  },
  {
    id: "platano-maduro",
    name: "Plátano maduro, bocadillo y queso cuajada",
    image: `${uploads}/2023/09/maduro-y-queso.jpg`,
    category: "tortas",
    sizes: [pequena(28000), mediana(58000), tortaEntera(88000)],
  },
  {
    id: "tres-leches",
    name: "Tres leches",
    image: `${uploads}/2023/09/3-leches.jpg`,
    category: "tortas",
    sizes: [pequena(32000), mediana(46000), tortaEntera(85000)],
  },
  {
    id: "zanahoria",
    name: "Zanahoria",
    image: `${uploads}/2023/10/zanahoria.jpg`,
    category: "tortas",
    note: "Baja en azúcar",
    sizes: [pequena(24000), mediana(42000), tortaEntera(62000)],
  },
  {
    id: "zanahoria-queso-crema",
    name: "Zanahoria con frosting de queso crema",
    image: `${uploads}/2023/09/zanahoria.jpg`,
    category: "tortas",
    sizes: [pequena(36000), mediana(58000), tortaEntera(93000)],
  },
  {
    id: "torta-brownie-milo",
    name: "Torta de Brownie de Milo melcochudo",
    image: `${uploads}/2024/02/SAN-VALENTIN.jpg`,
    category: "tortas",
    sizes: [pequena(26000), tortaEntera(52000)],
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
    image: "/hero/mesa-navidena.webp",
    imagePosition: "object-[58%_60%]",
    category: "postres",
    sizes: [unit("Individual", 6500), unit("1 libra", 15000), unit("4 libras", 55000)],
  },
  {
    id: "natilla",
    name: "Natilla Artesanal",
    image: "/hero/natilla.webp",
    imagePosition: "object-[56%_50%]",
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
    image: "/hero/caja-galletas-navidenas.webp",
    imagePosition: "object-[70%_50%]",
    category: "navidad",
    sizes: [unit("Caja", 35000)],
  },
  {
    id: "candle-cake",
    name: "Candle Cake",
    image: "/hero/candle-cake.webp",
    imagePosition: "object-[71%_50%]",
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
  "candle-cake",
  "caja-galletas-navidenas",
  "arroz-con-leche",
].map(getProduct);

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

export type HeroSlide = {
  src: string;
  alt: string;
  caption: string;
  /** Foto panorámica con espacio libre a la izquierda: cubre todo el ancho del hero. */
  fullBleed?: boolean;
  /** Proporción ancho/alto de la foto panorámica (por ejemplo 1993 / 789). */
  ratio?: number;
  /** Clases extra para encuadrar la foto dentro del círculo. */
  imageClassName?: string;
};

export type Feature = {
  eyebrow: string;
  title: string;
  description: string;
  product: CatalogProduct;
  /** Fotos que rotan en el círculo del hero. La primera es la principal. */
  slides: HeroSlide[];
};

/**
 * Para usar fotos propias (por ejemplo, las originales de Instagram), guárdalas en
 * public/hero/ y usa su ruta aquí, por ejemplo: src: "/hero/pastores-mesa.jpg".
 */
export const christmasFeature: Feature = {
  eyebrow: "Edición Navidad",
  title: "Torta de Pastores",
  description:
    "La consentida de nuestra mesa de diciembre. Horneada a mano, sin conservantes y lista para compartir en familia.",
  product: getProduct("torta-de-pastores"),
  slides: [
    {
      src: "/hero/torta-de-pastores.webp",
      alt: "Torta de Pastores horneada sobre una tabla de madera",
      caption: "Torta de Pastores",
      // Panorámica con fondo verde a la izquierda: en escritorio cubre todo el hero
      // y la torta queda a la derecha; en celular se centra en la torta.
      fullBleed: true,
      ratio: 1993 / 789,
      imageClassName: "object-[78%_50%] md:object-center",
    },
    {
      src: "/hero/natilla.webp",
      alt: "Natilla artesanal con uvas pasas, junto a otros postres navideños",
      caption: "Natilla Artesanal",
      fullBleed: true,
      ratio: 1995 / 788,
      imageClassName: "object-[55%_50%] md:object-center",
    },
    {
      src: "/hero/candle-cake.webp",
      alt: "Candle Cake con una vela encendida y decoración navideña",
      caption: "Candle Cake",
      fullBleed: true,
      ratio: 1994 / 789,
      imageClassName: "object-[70%_50%] md:object-center",
    },
    {
      src: "/hero/caja-galletas-navidenas.webp",
      alt: "Caja rosada con galletas y brownies navideños",
      caption: "Caja de Galletas Navideñas",
      fullBleed: true,
      ratio: 1997 / 788,
      imageClassName: "object-[70%_50%] md:object-center",
    },
    {
      src: "/hero/mesa-navidena.webp",
      alt: "Arroz con leche con uvas pasas, hojuelas y postre de chocolate",
      caption: "Arroz con leche",
      fullBleed: true,
      ratio: 1994 / 789,
      imageClassName: "object-[58%_50%] md:object-center",
    },
  ],
};

export const defaultFeature: Feature = {
  eyebrow: "Repostería artesanal en Cali",
  title: "El cielo en cada porción",
  description:
    "Tortas equilibradas en dulce, muy esponjosas y horneadas todos los días, sin conservantes.",
  product: getProduct("red-velvet"),
  slides: [
    {
      src: `${uploads}/2023/09/redvelvet.jpg`,
      alt: "Torta Red Velvet",
      caption: "Red Velvet",
    },
  ],
};

// ---------------------------------------------------------------------------
// Contenido
// ---------------------------------------------------------------------------

export const experiences = [
  {
    title: "Cake Party",
    text: "Somos el primer decora tu mini torta en Cali. Te sientas, eliges y la vuelves tuya.",
    href: "/cake-party",
    cta: "Reservar",
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

// ---------------------------------------------------------------------------
// Cake Party: actividad para decorar tu propia mini torta
// ---------------------------------------------------------------------------

export const cakeParty = {
  /** Precio por Cake Party: incluye un mini cake, que se puede decorar en pareja. */
  price: 78000,
  includes: ["Mini cake", "Crema", "Relleno", "Mangas", "Utensilios", "Colorantes"],
  /** Máximo de Cake Party que se pueden reservar desde la página. */
  maxParties: 12,
};
