import Image from "next/image";
import { AddToCart } from "@/components/cart/AddToCart";
import type { CatalogProduct } from "@/data/site";

type ProductsProps = {
  id?: string;
  title: string;
  intro?: string;
  products: CatalogProduct[];
  className?: string;
};

export function Products({ id, title, intro, products, className }: ProductsProps) {
  return (
    <section id={id} className={`scroll-mt-24 ${className ?? ""}`}>
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl text-leaf sm:text-4xl">{title}</h2>
          {intro && <p className="mt-3 text-base text-muted">{intro}</p>}
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.id} className="flex flex-col">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl bg-lilac">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  // Las fotos panorámicas se recortan por alto: necesitan más resolución.
                  sizes={product.imagePosition ? "(min-width: 1024px) 60vw, 130vw" : "(min-width: 1024px) 25vw, 50vw"}
                  className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none ${product.imagePosition ?? ""}`}
                />
              </div>
              <h3 className="mt-4 mb-3 flex-1 font-display text-[15px] leading-snug text-leaf sm:text-base">
                {product.name}
              </h3>
              <AddToCart product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
