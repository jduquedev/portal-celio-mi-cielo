import { FloatingCartButton } from "@/components/cart/CartButton";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Experiences } from "@/components/Experiences";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Menu } from "@/components/Menu";
import { Products } from "@/components/Products";
import { Rappi } from "@/components/Rappi";
import { Sedes } from "@/components/Sedes";
import { Values } from "@/components/Values";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  bestSellers,
  christmasFeature,
  christmasProducts,
  christmasSeason,
  defaultFeature,
} from "@/data/site";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero
          feature={christmasSeason ? christmasFeature : defaultFeature}
          festive={christmasSeason}
        />
        <Products
          id="productos"
          title="Los más buscados"
          intro="Elige el tamaño que necesitas y agrégalo a tu pedido."
          products={bestSellers}
        />
        <Rappi />
        {christmasSeason && (
          <Products
            title="Para tu mesa de Navidad"
            intro="Lo que solo preparamos en diciembre."
            products={christmasProducts}
            className="bg-lilac"
          />
        )}
        <Experiences />
        <Menu />
        <Values />
        <Sedes />
      </main>
      <Footer />
      <FloatingCartButton />
      <WhatsAppButton />
      <CartDrawer />
    </>
  );
}
