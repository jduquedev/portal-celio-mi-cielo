import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import { AddedToast } from "@/components/cart/AddedToast";
import { FloatingCartButton } from "@/components/cart/CartButton";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollToHash } from "@/components/ScrollToHash";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "800"],
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
      className={`${poppins.variable} ${montserrat.variable} h-full antialiased`}
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
