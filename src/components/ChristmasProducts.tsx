import Image from "next/image";
import { AddToCart } from "@/components/cart/AddToCart";
import { Star } from "@/components/Ornaments";
import type { CatalogProduct } from "@/data/site";

type ChristmasProductsProps = {
  products: CatalogProduct[];
};

/**
 * Vitrina de temporada, estilo pastelería de lujo: fondo crema, mucho aire y
 * fotos grandes y limpias, para que los productos sean los protagonistas. Sin adornos
 * de fondo; el color lo ponen las fotos, el título en vino y los botones.
 */
export function ChristmasProducts({ products }: ChristmasProductsProps) {
  return (
    <section id="navidad" aria-labelledby="navidad-title" className="scroll-mt-24 bg-crema text-chocolate">
      <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 md:py-32">
        <div className="mx-auto max-w-xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-vino">
            <Star className="h-3 w-3 text-dorado" />
            Temporada de Navidad
            <Star className="h-3 w-3 text-dorado" />
          </p>
          <h2 id="navidad-title" className="mt-5 font-display text-3xl text-vino sm:text-5xl">
            Para tu mesa de Navidad
          </h2>
          <p className="mt-4 text-base text-chocolate/70">
            Los sabores de diciembre, listos para compartir en familia.
          </p>
        </div>

        {/*
          Flex en vez de grid para que la última fila, si queda incompleta, se centre.
          De a 3 en escritorio, con bastante espacio entre productos.
        */}
        <ul className="mt-16 flex flex-wrap justify-center gap-x-4 gap-y-16 sm:gap-x-10">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex w-[calc(50%-0.5rem)] flex-col sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.667rem)]"
            >
              {/* Misma proporción de las fotos (4:3) para mostrar el producto completo. */}
              <div className="group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[0_24px_48px_-30px_rgba(48,37,34,0.55)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes={product.imagePosition ? "(min-width: 1024px) 70vw, 130vw" : "(min-width: 1024px) 33vw, 50vw"}
                  className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none ${product.imagePosition ?? ""}`}
                />
              </div>
              <h3 className="mt-6 mb-3 flex-1 text-center font-display text-[15px] leading-snug sm:text-lg">
                {product.name}
              </h3>
              <AddToCart product={product} tone="festiveLight" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
