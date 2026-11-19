import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { AddToCart } from "@/components/cart/AddToCart";
import type { CatalogProduct } from "@/data/site";

type ProductsProps = {
  id?: string;
  title: string;
  intro?: string;
  products: CatalogProduct[];
  className?: string;
};

/** Foto y nombre: enlazan a la página del producto si tiene detalles. */
function ProductLink({ product, children }: { product: CatalogProduct; children: ReactNode }) {
  if (!product.details) return <div className="group">{children}</div>;
  return (
    <Link
      href={`/tortas/${product.id}`}
      // Precarga también el contenido de la torta (depende del id en la URL).
      prefetch
      className="group block rounded-[1.75rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
    >
      {children}
    </Link>
  );
}

/**
 * Vitrina de productos con la misma tarjeta del catálogo de Navidad: foto 4:3 con
 * esquinas redondeadas y sombra suave, de a 3 por fila en escritorio.
 */
export function Products({ id, title, intro, products, className }: ProductsProps) {
  return (
    <section id={id} className={`scroll-mt-24 ${className ?? ""}`}>
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl text-leaf sm:text-4xl">{title}</h2>
          {intro && <p className="mt-3 text-base text-muted">{intro}</p>}
        </div>

        {/* Flex en vez de grid para que la última fila, si queda incompleta, se centre. */}
        <ul className="mt-12 flex flex-wrap justify-center gap-x-4 gap-y-14 sm:gap-x-10">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex w-[calc(50%-0.5rem)] flex-col sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.667rem)]"
            >
              <ProductLink product={product}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-lilac shadow-[0_24px_48px_-30px_rgba(52,68,63,0.5)]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none ${product.imagePosition ?? ""}`}
                  />
                  {/* Al pasar el cursor, la torta entera da paso a una porción (fundido). */}
                  {product.hoverImage && (
                    <Image
                      src={product.hoverImage}
                      alt={`Porción de ${product.name}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                    />
                  )}
                </div>
                <h3 className="mt-6 mb-1 text-center font-display text-[15px] leading-snug text-leaf sm:text-lg">
                  {product.name}
                </h3>
                {product.details && (
                  <p className="text-center text-xs font-semibold text-sage-ink underline-offset-4 group-hover:underline">
                    Ver detalles
                  </p>
                )}
              </ProductLink>
              <div className="mb-3 flex-1" />
              <AddToCart product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
