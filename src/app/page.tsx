import { CakePartyTeaser } from "@/components/CakePartyTeaser";
import { ChristmasProducts } from "@/components/ChristmasProducts";
import { Corporate } from "@/components/Corporate";
import { Experiences } from "@/components/Experiences";
import { Hero } from "@/components/Hero";
import { HowToOrder } from "@/components/HowToOrder";
import { Products } from "@/components/Products";
import { Rappi } from "@/components/Rappi";
import { Sedes } from "@/components/Sedes";
import { Values } from "@/components/Values";
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
      {christmasSeason && <ChristmasProducts products={christmasProducts} />}
      <CakePartyTeaser />
      <HowToOrder />
      <Experiences />
      <Corporate />
      <Values />
      <Sedes />
    </>
  );
}
