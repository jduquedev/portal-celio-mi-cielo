import Image from "next/image";
import { AddToCart } from "@/components/cart/AddToCart";
import { PineSprig, Star } from "@/components/Ornaments";
import type { Feature } from "@/data/site";

type HeroProps = {
  feature: Feature;
  festive?: boolean;
};

export function Hero({ feature, festive = false }: HeroProps) {
  return (
    <section id="inicio" className="relative overflow-hidden bg-leaf text-cream">
      {festive && (
        <>
          <PineSprig className="pointer-events-none absolute -left-6 bottom-0 w-44 text-sage/40 sm:w-64" />
          <PineSprig className="pointer-events-none absolute -right-6 -top-4 w-40 rotate-180 text-sage/30 sm:w-56" />
        </>
      )}

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-12 sm:px-6 md:grid-cols-2 md:pb-28 md:pt-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-lavender">
            {festive && <Star className="h-3 w-3" />}
            {feature.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[2.75rem] leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-7xl">
            {feature.title}
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-white/75">
            {feature.description}
          </p>

          <div className="mt-8 max-w-sm rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/10">
            <p className="mb-3 text-sm font-semibold text-white">¿Qué tamaño quieres?</p>
            <AddToCart product={feature.product} tone="dark" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 rounded-full border border-lavender/40" />
          <div className="relative aspect-square overflow-hidden rounded-full">
            <Image
              src={feature.product.image}
              alt={feature.imageAlt}
              fill
              sizes="(min-width: 768px) 448px, 90vw"
              preload
              className="translate-x-[4%] scale-[1.2] object-cover"
            />
          </div>
          {festive && (
            <>
              <Star className="absolute -right-1 top-8 h-5 w-5 text-lavender" />
              <Star className="absolute -left-2 bottom-16 h-3 w-3 text-lavender/70" />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
