import type { CSSProperties } from "react";
import { AddToCart } from "@/components/cart/AddToCart";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Star } from "@/components/Ornaments";
import type { Feature } from "@/data/site";

type HeroProps = {
  feature: Feature;
  festive?: boolean;
};

/** Colores del hero: vino, crema y dorado en Navidad; verde y lavanda el resto del año. */
const themes = {
  festive: {
    section: "hero-festive bg-vino text-crema",
    eyebrow: "bg-dorado/15 text-dorado ring-1 ring-dorado/30",
    description: "text-crema/80",
    box: "bg-chocolate/35 ring-dorado/20",
    boxTitle: "text-crema",
  },
  regular: {
    section: "bg-leaf text-white",
    eyebrow: "bg-white/10 text-lavender",
    description: "text-white/80",
    box: "bg-leaf-deep/40 ring-white/10",
    boxTitle: "text-white",
  },
};

export function Hero({ feature, festive = false }: HeroProps) {
  // Si la foto principal es panorámica, el hero toma su proporción para mostrarla
  // tal cual, sin agrandarla ni recortarla por arriba.
  const panorama = feature.slides[0]?.fullBleed ? feature.slides[0].ratio : undefined;
  const heroHeight = panorama ? `calc(100vw / ${panorama})` : "700px";
  const theme = festive ? themes.festive : themes.regular;

  return (
    <section
      id="inicio"
      className={`relative overflow-hidden ${theme.section}`}
      style={{ "--hero-h": heroHeight } as CSSProperties}
    >
      <HeroCarousel
        slides={feature.slides}
        festive={festive}
        className={`relative aspect-[5/4] w-full md:absolute md:inset-0 md:aspect-auto md:w-auto ${
          festive ? "bg-vino" : "bg-leaf"
        }`}
      />

      {/*
        Degradado protagonista de la temporada: vino → ciruela → morado oscuro, de
        arriba a la derecha (junto a las fotos) hacia abajo a la izquierda (detrás
        del texto). Va encima de todo, así no deja costuras con el difuminado de las
        fotos, y conserva el morado de la marca sin competir con el vino.
      */}
      {festive && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top_right,rgb(58_39_82/0.92)_0%,rgb(74_31_61/0.6)_32%,rgb(111_29_42/0)_62%)]"
        />
      )}

      {/*
        Esta capa cubre todo el ancho del hero por encima de las fotos: no recibe
        clics (pointer-events-none) para no tapar los controles del carrusel; solo
        el bloque de texto y compra los recibe.
      */}
      <div className="pointer-events-none relative px-4 pb-16 -mt-24 sm:px-6 md:mt-0 md:flex md:min-h-[min(86vh,var(--hero-h))] md:items-center md:py-14 md:pl-[max(2rem,5vw)] md:pr-0">
        <div className="pointer-events-auto max-w-md">
          <p
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${theme.eyebrow}`}
          >
            {festive && <Star className="h-3 w-3" />}
            {feature.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[2.75rem] leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-7xl">
            {feature.title}
          </h1>
          <p className={`mt-6 text-base leading-7 ${theme.description}`}>{feature.description}</p>

          <div className={`mt-8 max-w-sm rounded-3xl p-5 ring-1 backdrop-blur-md ${theme.box}`}>
            <p className={`mb-3 text-sm font-semibold ${theme.boxTitle}`}>¿Qué tamaño quieres?</p>
            <AddToCart product={feature.product} tone={festive ? "festive" : "dark"} wide />
          </div>
        </div>
      </div>
    </section>
  );
}
