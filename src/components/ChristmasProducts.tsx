import Image from "next/image";
import { AddToCart } from "@/components/cart/AddToCart";
import { PineSprig, Star } from "@/components/Ornaments";
import type { CatalogProduct } from "@/data/site";

/** Estrellas fijas de fondo: posición (en %) y tamaño (en px). Solo decoración. */
const stars = [
  { top: 12, left: 8, size: 10, opacity: 0.5 },
  { top: 22, left: 92, size: 14, opacity: 0.6 },
  { top: 48, left: 4, size: 8, opacity: 0.35 },
  { top: 64, left: 96, size: 9, opacity: 0.4 },
  { top: 86, left: 14, size: 12, opacity: 0.45 },
  { top: 8, left: 58, size: 7, opacity: 0.35 },
];

type ChristmasProductsProps = {
  products: CatalogProduct[];
};

/**
 * Vitrina de temporada: fotos grandes sobre el degradado protagonista de la temporada
 * (vino → ciruela → morado oscuro, el mismo del hero). El dorado solo en detalles:
 * estrellas, marco fino y etiqueta.
 */
export function ChristmasProducts({ products }: ChristmasProductsProps) {
  return (
    <section
      id="navidad"
      aria-labelledby="navidad-title"
      className="relative scroll-mt-24 overflow-hidden bg-linear-to-br from-vino via-ciruela to-morado-oscuro text-crema"
    >
      <PineSprig className="pointer-events-none absolute -left-8 -top-6 w-44 rotate-90 text-dorado/25 sm:w-60" />
      <PineSprig className="pointer-events-none absolute -bottom-6 -right-8 w-44 -rotate-90 text-dorado/25 sm:w-60" />
      {stars.map((star) => (
        <Star
          key={`${star.top}-${star.left}`}
          className="pointer-events-none absolute text-dorado"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
        />
      ))}

      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-dorado/15 px-3 py-1 text-xs font-semibold text-dorado ring-1 ring-dorado/30">
            <Star className="h-3 w-3" />
            Temporada de Navidad
          </p>
          <h2 id="navidad-title" className="mt-5 font-display text-3xl sm:text-5xl">
            Para tu mesa de Navidad
          </h2>
          <p className="mt-4 text-base text-crema/70">
            Los sabores de diciembre, listos para compartir en familia.
          </p>
        </div>

        {/*
          Flex en vez de grid para que la última fila, si queda incompleta, se centre.
          De a 3 en escritorio: fotos más grandes.
        */}
        <ul className="mt-14 flex flex-wrap justify-center gap-x-4 gap-y-14 sm:gap-x-8">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex w-[calc(50%-0.5rem)] flex-col sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
            >
              <div className="relative rounded-t-full rounded-b-[1.75rem] p-1.5 ring-1 ring-dorado/45">
                <div className="group relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl bg-white/5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes={product.imagePosition ? "(min-width: 1024px) 70vw, 130vw" : "(min-width: 1024px) 33vw, 50vw"}
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none ${product.imagePosition ?? ""}`}
                  />
                </div>
                <span className="absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-dorado px-3 py-1 text-[11px] font-semibold text-chocolate shadow-sm">
                  <Star className="h-2.5 w-2.5" />
                  Temporada
                </span>
              </div>
              <h3 className="mt-7 mb-3 flex-1 text-center font-display text-[15px] leading-snug sm:text-lg">
                {product.name}
              </h3>
              <AddToCart product={product} tone="festive" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
