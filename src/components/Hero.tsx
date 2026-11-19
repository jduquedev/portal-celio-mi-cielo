"use client";

import { type CSSProperties, useState } from "react";
import { AddToCart } from "@/components/cart/AddToCart";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Star } from "@/components/Ornaments";
import type { Feature } from "@/data/site";

type HeroProps = {
  feature: Feature;
  festive?: boolean;
};

/**
 * Colores del hero. En Navidad, el fondo es el mismo rojo terciopelo de las fotos,
 * así se funden sin que se note ningún degradado; textos en blanco y la estrella en
 * dorado. El resto del año, verde oscuro con detalles lavanda.
 */
const themes = {
  festive: {
    section: "hero-festive bg-terciopelo text-white [text-shadow:0_1px_14px_rgb(90_0_0/0.45)]",
    eyebrow: "bg-white/15 text-white ring-1 ring-white/25 [&>svg]:text-dorado",
    description: "text-white/85",
    // Sólida (sin transparencia ni desenfoque): si la foto tiene partes claras detrás,
    // la caja no se aclara. Su color se oscurece a partir del rojo de cada foto.
    box: "ring-white/20 shadow-[0_20px_40px_-24px_rgb(0_0_0/0.5)]",
    boxTitle: "text-white",
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
  // Foto que está en pantalla: el nombre, el texto y el selector de tamaño son los
  // de su producto.
  const [current, setCurrent] = useState(0);
  const slide = feature.slides[current] ?? feature.slides[0];

  return (
    <section
      id="inicio"
      className={`relative overflow-hidden transition-[background-color] duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${theme.section}`}
      style={
        {
          "--hero-h": heroHeight,
          // En Navidad el fondo toma el rojo de la foto en pantalla (con transición),
          // así no se nota el borde de la foto aunque cada una tenga un rojo distinto.
          ...(festive && slide.background ? { backgroundColor: `rgb(${slide.background})` } : {}),
        } as CSSProperties
      }
    >
      <HeroCarousel
        slides={feature.slides}
        festive={festive}
        onSlideChange={setCurrent}
        className={`relative aspect-[5/4] w-full md:absolute md:inset-0 md:aspect-auto md:w-auto ${
          festive ? "" : "bg-leaf"
        }`}
      />

      {/*
        Esta capa cubre todo el ancho del hero por encima de las fotos: no recibe
        clics (pointer-events-none) para no tapar los controles del carrusel; solo
        el bloque de texto y compra los recibe.
      */}
      <div className="pointer-events-none relative px-4 pb-16 -mt-24 sm:px-6 md:mt-0 md:flex md:min-h-[calc(100svh-5rem)] md:items-center md:py-14 md:pl-[max(2rem,5vw)] md:pr-0">
        <div className="pointer-events-auto max-w-md">
          <p
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${theme.eyebrow}`}
          >
            {festive && <Star className="h-3 w-3" />}
            {feature.eyebrow}
          </p>
          {/*
            Al cambiar de foto, el bloque se vuelve a montar (key) y entra con un fundido
            corto. El alto mínimo de título y texto evita que el hero salte entre fotos.
          */}
          <div key={slide.product.id} className="hero-text-in">
            <h1 className="mt-5 min-h-[2.04em] font-display text-[2.75rem] leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-7xl">
              {slide.title}
            </h1>
            <p className={`mt-6 min-h-21 text-base leading-7 ${theme.description}`}>{slide.description}</p>

            <div
              className={`mt-8 max-w-sm rounded-3xl p-5 ring-1 transition-[background-color] duration-[1400ms] ${
                festive ? "" : "backdrop-blur-md"
              } ${theme.box}`}
              style={
                festive
                  ? {
                      backgroundColor: `color-mix(in srgb, rgb(${slide.background ?? "170 3 5"}) 82%, black)`,
                    }
                  : undefined
              }
            >
              <p className={`mb-3 text-sm font-semibold ${theme.boxTitle}`}>
                {slide.product.sizes.length > 1 ? "¿Qué tamaño quieres?" : slide.product.name}
              </p>
              <AddToCart product={slide.product} tone={festive ? "festive" : "dark"} wide />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
