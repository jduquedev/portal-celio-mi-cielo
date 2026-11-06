import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { Values } from "@/components/Values";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { christmasFeature, christmasSeason, defaultFeature } from "@/data/site";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero
          feature={christmasSeason ? christmasFeature : defaultFeature}
          festive={christmasSeason}
        />
        <Products />
        <Values />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
