"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { HeroSlide as Slide } from "@/data/site";

/** Tiempo que cada foto queda en pantalla, en milisegundos. */
const SLIDE_MS = 5500;

function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

/** true mientras la pestaña está a la vista. */
function usePageVisible() {
  return useSyncExternalStore(
    subscribeVisibility,
    () => document.visibilityState === "visible",
    () => true,
  );
}

type HeroCarouselProps = {
  slides: Slide[];
  /** Posición y tamaño del bloque de fotos dentro del hero. */
  className?: string;
};

/**
 * Fotos de fondo del hero: rotan con un fundido lento y un zoom suave, y se
 * difuminan hacia el color del hero para que el texto se lea sin cajas.
 */
export function HeroCarousel({ slides, className }: HeroCarouselProps) {
  const [{ index, previous }, setSlide] = useState<{ index: number; previous: number | null }>({
    index: 0,
    previous: null,
  });
  const [paused, setPaused] = useState(false);
  const pageVisible = usePageVisible();
  // Con "reducir movimiento" sigue avanzando, pero sin zoom y con un fundido corto.
  // Con la pestaña oculta se detiene, y al volver retoma sola.
  const autoplay = slides.length > 1 && !paused && pageVisible;

  function goTo(next: number) {
    setSlide((current) =>
      current.index === next ? current : { index: next, previous: current.index },
    );
  }

  useEffect(() => {
    if (!autoplay) return;
    const timer = setTimeout(() => {
      setSlide((current) => ({
        index: (current.index + 1) % slides.length,
        previous: current.index,
      }));
    }, SLIDE_MS);
    return () => clearTimeout(timer);
  }, [autoplay, index, slides.length]);

  return (
    <div
      role="group"
      aria-roledescription="carrusel"
      aria-label="Fotos de temporada"
      className={`overflow-hidden bg-leaf ${className ?? ""}`}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        const zooming = active || i === previous;
        return (
          <div
            key={slide.src}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:duration-300 ${
              active ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={`absolute inset-0 ${zooming ? "hero-zoom" : ""}`}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(min-width: 768px) 70vw, 100vw"
                preload={i === 0}
                // Todas cargan desde el inicio para que ningún cambio muestre un hueco.
                loading={i === 0 ? undefined : "eager"}
                className={`object-cover ${slide.imageClassName ?? ""}`}
              />
            </div>
          </div>
        );
      })}

      {/* Difuminados hacia el color del hero: abajo en celular, a la izquierda en escritorio. */}
      <div aria-hidden="true" className="hero-fade pointer-events-none absolute inset-0" />

      {slides.length > 1 && (
        <div className="absolute right-4 top-4 flex items-center gap-3 rounded-full bg-leaf-deep/45 py-1.5 pl-4 pr-1.5 text-white backdrop-blur-md md:bottom-8 md:right-28 md:top-auto">
          <p className="text-xs font-semibold" aria-live={autoplay ? "off" : "polite"}>
            {slides[index].caption}
          </p>
          <div className="flex items-center gap-1">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ver ${slide.caption}`}
                aria-current={i === index}
                className="flex h-6 items-center justify-center px-0.5 focus-visible:outline-2 focus-visible:outline-lavender"
              >
                <span
                  className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    i === index ? "w-5 bg-lavender" : "w-1.5 bg-white/45"
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Reanudar fotos" : "Pausar fotos"}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-lavender"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3 w-3">
              {paused ? <path d="M8 5.5v13l10.5-6.5z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
