import { Experiences } from "@/components/Experiences";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Menu } from "@/components/Menu";
import { Products } from "@/components/Products";
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
          eyebrow="Nuestra vitrina"
          title="Los más buscados"
          products={bestSellers}
        />
        {christmasSeason && (
          <Products
            eyebrow="Temporada"
            title="Para tu mesa de Navidad"
            products={christmasProducts}
            className="bg-blush"
          />
        )}
        <Experiences />
        <Menu />
        <Values />
        <Sedes />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
