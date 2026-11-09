import { AddToCart } from "@/components/cart/AddToCart";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Star } from "@/components/Ornaments";
import type { Feature } from "@/data/site";

type HeroProps = {
  feature: Feature;
  festive?: boolean;
};

export function Hero({ feature, festive = false }: HeroProps) {
  return (
    <section id="inicio" className="relative overflow-hidden bg-leaf text-white">
      <HeroCarousel
        slides={feature.slides}
        className="relative aspect-[5/4] w-full md:absolute md:inset-y-0 md:left-[30%] md:right-0 md:aspect-auto md:w-auto"
      />

      <div className="relative px-4 pb-16 -mt-24 sm:px-6 md:mt-0 md:flex md:min-h-[min(86vh,700px)] md:items-center md:py-20 md:pl-[max(2rem,5vw)] md:pr-0">
        <div className="max-w-md">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-lavender backdrop-blur-sm">
            {festive && <Star className="h-3 w-3" />}
            {feature.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[2.75rem] leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-7xl">
            {feature.title}
          </h1>
          <p className="mt-6 text-base leading-7 text-white/80">{feature.description}</p>

          <div className="mt-8 max-w-sm rounded-3xl bg-leaf-deep/40 p-5 ring-1 ring-white/10 backdrop-blur-md">
            <p className="mb-3 text-sm font-semibold text-white">¿Qué tamaño quieres?</p>
            <AddToCart product={feature.product} tone="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
