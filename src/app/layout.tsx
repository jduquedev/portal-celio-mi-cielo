import type { Metadata } from "next";
import { Figtree, Jost } from "next/font/google";
import { AddedToast } from "@/components/cart/AddedToast";
import { FloatingCartButton } from "@/components/cart/CartButton";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollToHash } from "@/components/ScrollToHash";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

/*
 * Tipografías del manual de marca: Neulis (títulos) e Intro (textos). Mientras
 * llegan sus archivos con licencia web, se usan las alternativas gratuitas más
 * parecidas: Jost en lugar de Neulis y Figtree en lugar de Intro. Para cambiarlas
 * por las originales, basta con cargar los archivos con next/font/local aquí.
 */
const titles = Jost({
  variable: "--font-titles",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Celio Mi Cielo Repostería | Pasteles, tortas y postres en Cali",
  description:
    "Repostería artesanal en Cali. Tortas, postres y café horneados todos los días, sin conservantes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${titles.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCartButton />
        <WhatsAppButton />
        <CartDrawer />
        <AddedToast />
        <ScrollToHash />
      </body>
    </html>
  );
}
