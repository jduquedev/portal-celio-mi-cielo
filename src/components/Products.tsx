import Image from "next/image";
import { type Product, whatsappLink } from "@/data/site";

type ProductsProps = {
  id?: string;
  eyebrow: string;
  title: string;
  products: Product[];
  className?: string;
};

export function Products({ id, eyebrow, title, products, className }: ProductsProps) {
  return (
    <section id={id} className={className}>
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-plum-soft">{eyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl font-medium text-plum sm:text-5xl">{title}</h2>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.name}>
              <a
                href={whatsappLink(`Hola Celio mi Cielo! Quisiera pedir: ${product.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-blush">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-serif text-xl leading-snug text-plum">{product.name}</h3>
                <p className="mt-1 text-sm text-muted">{product.price}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
