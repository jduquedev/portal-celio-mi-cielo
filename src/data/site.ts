const uploads = "https://celiomicieloreposteria.com/wp-content/uploads";

/** Cambia a false al terminar la temporada para quitar el bloque navideño. */
export const christmasSeason = true;

export const contact = {
  whatsappNumber: "573108565822",
  instagram: "https://www.instagram.com/celiomicieloreposteria/",
  tiktok: "https://www.tiktok.com/@celiomicielo",
  maps: "https://maps.app.goo.gl/iPg41T4MiFUTNf2z9",
  address: "Centro comercial Aquarela, Local 218",
  addressDetail: "Plazoleta de comidas · Cali",
};

export const logoUrl = `${uploads}/2023/09/logo_sitioweb.png`;

export function whatsappLink(message: string) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
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
    "La estrella de nuestra mesa decembrina. Horneada de manera artesanal, sin conservantes, para compartir en familia.",
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
  priceFrom: string;
};

export const products: Product[] = [
  { name: "Birthday Cake", image: `${uploads}/2023/09/birthday.jpg`, priceFrom: "$ 11.500" },
  { name: "Alfajores", image: `${uploads}/2023/10/alfajores.jpg`, priceFrom: "$ 13.000" },
  { name: "Red Velvet", image: `${uploads}/2023/09/redvelvet.jpg`, priceFrom: "$ 9.000" },
  {
    name: "Plátano maduro, bocadillo y queso cuajada",
    image: `${uploads}/2023/09/maduro-y-queso.jpg`,
    priceFrom: "$ 9.500",
  },
  { name: "Cheesecake de Red Velvet", image: `${uploads}/2023/09/cheesecake.jpg`, priceFrom: "$ 9.500" },
  { name: "Chocolate con arequipe", image: `${uploads}/2023/09/chocolate.jpg`, priceFrom: "$ 9.000" },
  { name: "Brownie de Milo melcochudo", image: `${uploads}/2023/09/brownie.jpg`, priceFrom: "$ 8.200" },
  { name: "Natilla Artesanal", image: `${uploads}/2023/12/Natilla.jpg`, priceFrom: "$ 6.500" },
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
