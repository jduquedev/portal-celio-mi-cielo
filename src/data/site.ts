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
};

export const sedes: Sede[] = [
  {
    name: "Ciudad Jardín",
    place: "La Leyenda Mall",
    local: "Local 37",
    whatsapp: "573127185385",
    maps: "https://www.google.com/maps/search/?api=1&query=La+Leyenda+Mall+Cali",
    menu: `${uploads}/2024/10/MENU-CIUDAD-JARDIN-comprimido.pdf`,
  },
  {
    name: "Aquarela",
    place: "Centro comercial Aquarela",
    local: "Local 218 · Plazoleta de comidas",
    whatsapp: "573108565822",
    maps: "https://maps.app.goo.gl/iPg41T4MiFUTNf2z9",
    menu: `${uploads}/2024/10/MENU-AQUARELA.pdf`,
  },
];

const defaultWhatsapp = "573108565822";

export function whatsappLink(message: string, number = defaultWhatsapp) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export type Feature = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  priceFrom: string;
  sizes: string[];
  orderMessage: string;
};

export const christmasFeature: Feature = {
  eyebrow: "Edición Navidad",
  title: "Torta de Pastores",
  description:
    "La consentida de nuestra mesa de diciembre. Horneada a mano, sin conservantes y lista para compartir en familia.",
  image: `${uploads}/2023/12/Torta-de-Pastores.jpg`,
  imageAlt: "Torta de Pastores con frutas confitadas",
  priceFrom: "$ 13.500",
  sizes: ["Individual", "Mediana · 4-6 porciones", "Grande · 8-10 porciones"],
  orderMessage: "Hola Celio mi Cielo! Quisiera pedir la Torta de Pastores.",
};

export const defaultFeature: Feature = {
  eyebrow: "Repostería artesanal en Cali",
  title: "El cielo en cada porción",
  description:
    "Tortas equilibradas en dulce, muy esponjosas y horneadas todos los días, sin conservantes.",
  image: `${uploads}/2023/09/redvelvet.jpg`,
  imageAlt: "Torta Red Velvet",
  priceFrom: "$ 9.000",
  sizes: [],
  orderMessage: "Hola Celio mi Cielo! Quisiera hacer un pedido.",
};

export type Product = {
  name: string;
  image: string;
  price: string;
};

export const bestSellers: Product[] = [
  { name: "Birthday Cake", image: `${uploads}/2023/09/birthday.jpg`, price: "Desde $ 11.500" },
  { name: "Alfajores", image: `${uploads}/2023/10/alfajores.jpg`, price: "Desde $ 13.000" },
  { name: "Red Velvet", image: `${uploads}/2023/09/redvelvet.jpg`, price: "Desde $ 9.000" },
  {
    name: "Plátano maduro, bocadillo y queso cuajada",
    image: `${uploads}/2023/09/maduro-y-queso.jpg`,
    price: "Desde $ 9.500",
  },
  { name: "Cheesecake de Red Velvet", image: `${uploads}/2023/09/cheesecake.jpg`, price: "Desde $ 9.500" },
  { name: "Chocolate con arequipe", image: `${uploads}/2023/09/chocolate.jpg`, price: "Desde $ 9.000" },
  { name: "Brownie de Milo melcochudo", image: `${uploads}/2023/09/brownie.jpg`, price: "Desde $ 8.200" },
  { name: "Tres leches", image: `${uploads}/2023/09/3-leches.jpg`, price: "Desde $ 11.000" },
];

export const christmasProducts: Product[] = [
  { name: "Natilla Artesanal", image: `${uploads}/2023/12/Natilla.jpg`, price: "Desde $ 6.500" },
  { name: "Caja Navideña", image: `${uploads}/2023/12/Plato-navideno.jpg`, price: "$ 29.000" },
  { name: "Caja de Galletas Navideñas", image: `${uploads}/2023/12/Caja-de-Navidad.jpg`, price: "$ 35.000" },
  { name: "Candle Cake", image: `${uploads}/2023/12/Candle-cake.jpg`, price: "$ 57.000" },
];

export type MenuItem = { name: string; price: string; note?: string };

export const menu: { title: string; items: MenuItem[] }[] = [
  {
    title: "Tortas",
    items: [
      { name: "Birthday Cake", price: "$ 11.500" },
      { name: "Red Velvet", price: "$ 9.000" },
      { name: "Chocolate con arequipe", price: "$ 9.000" },
      { name: "Plátano maduro, bocadillo y queso cuajada", price: "$ 9.500" },
      { name: "Tres leches", price: "$ 11.000" },
      { name: "Zanahoria", price: "$ 8.500", note: "Baja en azúcar" },
      { name: "Zanahoria con frosting de queso crema", price: "$ 9.500" },
      { name: "Torta de Brownie de Milo melcochudo", price: "$ 26.000" },
    ],
  },
  {
    title: "Postres",
    items: [
      { name: "Cheesecake de Red Velvet", price: "$ 9.500" },
      { name: "Cheesecake de maracuyá con base de brownie de Milo", price: "$ 37.000" },
      {
        name: "Cheesecake de queso cuajada y coulis de frutos rojos",
        price: "$ 41.500",
        note: "Sin azúcar y sin harina",
      },
      { name: "Tiramisú", price: "$ 9.500" },
      { name: "Brownie de Milo melcochudo", price: "$ 8.200" },
      { name: "Arroz con leche", price: "$ 6.500" },
      { name: "Natilla Artesanal", price: "$ 6.500" },
    ],
  },
  {
    title: "Galletas",
    items: [
      { name: "Alfajores", price: "$ 13.000" },
      { name: "Galleta de Red Velvet rellena de queso crema", price: "$ 9.500" },
    ],
  },
];

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
