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
    rappi: "https://www.rappi.com.co/restaurantes/900425804-celio-mi-cielo-reposteria",
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
  // Navidad (catálogo de temporada). Las coronas, la Torta de Pastores y el Pan de
  // jamón agrupan su versión pequeña y la grande en un solo producto.
  {
    id: "corona-chocolate",
    name: "Corona Navideña de Chocolate",
    image: "/navidad/corona-chocolate.webp",
    category: "navidad",
    note: "Torta de chocolate decorada con ganache de chocolate semiamargo",
    sizes: [
      { label: "Mini", detail: "Porción", price: 11500 },
      { label: "Grande", detail: "6-8 porciones", price: 65000 },
    ],
  },
  {
    id: "corona-red-velvet",
    name: "Corona Navideña Red Velvet",
    image: "/navidad/corona-red-velvet.webp",
    category: "navidad",
    note: "Torta red velvet coronada con frosting de queso crema",
    sizes: [
      { label: "Mini", detail: "Porción", price: 11500 },
      { label: "Grande", detail: "6-8 porciones", price: 65000 },
    ],
  },
  {
    id: "torta-de-pastores",
    name: "Torta de Pastores",
    image: "/navidad/torta-de-pastores.webp",
    category: "navidad",
    sizes: [
      { label: "Personal", price: 14200 },
      { label: "Corona", detail: "6-8 porciones", price: 57800 },
    ],
  },
  {
    id: "tiramisu-consciente",
    name: "Tiramisú Consciente",
    image: "/navidad/tiramisu-consciente.webp",
    category: "navidad",
    note: "Endulzado con alulosa y hecho con harina de almendras y arroz",
    sizes: [tortaEntera(108500)],
  },
  {
    id: "pan-de-jamon",
    name: "Pan de jamón",
    image: "/navidad/pan-de-jamon.webp",
    category: "navidad",
    sizes: [unit("Rollo", 7200), unit("Entero", 47500)],
  },
  {
    id: "casita-de-jengibre",
    name: "Casita de jengibre para decorar",
    image: "/navidad/casita-de-jengibre.webp",
    category: "navidad",
    sizes: [unit("Kit", 75000)],
  },
  {
    id: "galleta-de-regalo",
    name: "Galleta de regalo con tarjeta",
    image: "/navidad/galleta-de-regalo.webp",
    category: "navidad",
    note: "Empacada con moño y tarjeta de Feliz Navidad (Para / De)",
    // Mismo precio en los dos sabores: el selector sirve para escoger el sabor.
    sizes: [unit("Grageas", 6500), unit("Red Velvet", 6500)],
  },
  {
    id: "caja-navidad-mini",
    name: "Caja Navidad Mini",
    image: "/navidad/caja-navidad-mini.webp",
    category: "navidad",
    sizes: [{ label: "Caja", detail: "4 galletas y brownie", price: 15000 }],
  },
  {
    id: "caja-navidad-mediana",
    name: "Caja Navidad Mediana",
    image: "/navidad/caja-navidad-mediana.webp",
    category: "navidad",
    sizes: [{ label: "Caja", detail: "Galletas surtidas y brownies", price: 27600 }],
  },
  {
    id: "caja-celio-especial",
    name: "Caja Celio Especial",
    image: "/navidad/caja-celio-especial.webp",
    category: "navidad",
    sizes: [{ label: "Caja", detail: "Brownies, alfajores y galletas", price: 33000 }],
  },
  {
    id: "caja-navidad-grande",
    name: "Caja Navidad Grande",
    image: "/navidad/caja-navidad-grande.webp",
    category: "navidad",
    sizes: [{ label: "Caja", detail: "Nuestra selección completa", price: 47900 }],
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
  "corona-chocolate",
  "corona-red-velvet",
  "torta-de-pastores",
  "tiramisu-consciente",
  "pan-de-jamon",
  "casita-de-jengibre",
  "galleta-de-regalo",
  "caja-navidad-mini",
  "caja-navidad-mediana",
  "caja-celio-especial",
  "caja-navidad-grande",
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
  // Fotos del catálogo de Navidad (4:3). En escritorio ocupan el lado derecho del
  // hero y se difuminan hacia el verde por la izquierda.
  slides: [
    {
      src: "/navidad/torta-de-pastores.webp",
      alt: "Torta de Pastores en forma de corona, con brevas y frutas confitadas",
      caption: "Torta de Pastores",
    },
    {
      src: "/navidad/coronas-y-cajas.webp",
      alt: "Coronas navideñas de chocolate y red velvet junto a cajas de galletas",
      caption: "Coronas y cajas navideñas",
    },
    {
      src: "/navidad/corona-red-velvet.webp",
      alt: "Corona navideña red velvet con frosting de queso crema y moño rojo",
      caption: "Corona Red Velvet",
    },
    {
      src: "/navidad/corona-chocolate.webp",
      alt: "Corona navideña de chocolate con ganache y moño rojo",
      caption: "Corona de Chocolate",
    },
    {
      src: "/navidad/caja-navidad-grande.webp",
      alt: "Caja dorada con galletas, alfajores, polvorosas y brownie",
      caption: "Caja Navidad Grande",
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
