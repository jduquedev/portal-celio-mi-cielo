import type { CSSProperties } from "react";
import { AddToCart } from "@/components/cart/AddToCart";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Star } from "@/components/Ornaments";
import type { Feature } from "@/data/site";

type HeroProps = {
  feature: Feature;
  festive?: boolean;
};

export function Hero({ feature, festive = false }: HeroProps) {
  // Si la foto principal es panorámica, el hero toma su proporción para mostrarla
  // tal cual, sin agrandarla ni recortarla por arriba.
  const panorama = feature.slides[0]?.fullBleed ? feature.slides[0].ratio : undefined;
  const heroHeight = panorama ? `calc(100vw / ${panorama})` : "700px";

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-leaf text-white"
      style={{ "--hero-h": heroHeight } as CSSProperties}
    >
      <HeroCarousel
        slides={feature.slides}
        className="relative aspect-[5/4] w-full md:absolute md:inset-0 md:aspect-auto md:w-auto"
      />

      {/*
        Esta capa cubre todo el ancho del hero por encima de las fotos: no recibe
        clics (pointer-events-none) para no tapar los controles del carrusel; solo
        el bloque de texto y compra los recibe.
      */}
      <div className="pointer-events-none relative px-4 pb-16 -mt-24 sm:px-6 md:mt-0 md:flex md:min-h-[min(86vh,var(--hero-h))] md:items-center md:py-14 md:pl-[max(2rem,5vw)] md:pr-0">
        <div className="pointer-events-auto max-w-md">
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
            <AddToCart product={feature.product} tone="dark" wide />
          </div>
        </div>
      </div>
    </section>
  );
}
