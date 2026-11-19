import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AddToCart } from "@/components/cart/AddToCart";
import { Flower } from "@/components/Ornaments";
import { ProductGallery } from "@/components/ProductGallery";
import { type CatalogProduct, findProduct, formatPrice, products, sedes } from "@/data/site";

/** Productos con página propia: los que tienen `details` en site.ts. */
function withDetails(id: string): (CatalogProduct & { details: NonNullable<CatalogProduct["details"]> }) | null {
  const product = findProduct(id);
  return product?.details ? { ...product, details: product.details } : null;
}

export function generateStaticParams() {
  return products.filter((product) => product.details).map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: PageProps<"/tortas/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = withDetails(id);
  if (!product) return {};
  return {
    title: `${product.name} | Celio Mi Cielo Repostería`,
    description: product.details.intro,
  };
}

/**
 * El contenido depende del id de la URL, así que va dentro de <Suspense>: la página
 * abre al instante con un esqueleto y la torta aparece enseguida (las tarjetas de
 * la portada la precargan con prefetch).
 */
export default function TortaPage({ params }: PageProps<"/tortas/[id]">) {
  return (
    <Suspense fallback={<TortaSkeleton />}>
      <TortaContent params={params} />
    </Suspense>
  );
}

function TortaSkeleton() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-20 pt-20 sm:px-6 md:grid-cols-[1.15fr_1fr] md:gap-14 md:pt-24">
      <div className="aspect-[4/3] animate-pulse rounded-[2rem] bg-lilac motion-reduce:animate-none" />
      <div className="grid content-start gap-4">
        <div className="h-12 w-3/4 animate-pulse rounded-2xl bg-lilac motion-reduce:animate-none" />
        <div className="h-24 animate-pulse rounded-2xl bg-lilac motion-reduce:animate-none" />
      </div>
    </div>
  );
}

async function TortaContent({ params }: Pick<PageProps<"/tortas/[id]">, "params">) {
  const { id } = await params;
  const product = withDetails(id);
  if (!product) notFound();

  const from = Math.min(...product.sizes.map((size) => size.price));

  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6 md:pb-28 md:pt-12">
        <Link
          href="/#productos"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-sage-ink hover:underline"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-4 w-4">
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Volver a los favoritos
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-start md:gap-14">
          {/* Fotos: la torta entera y una porción, con visor para verlas de cerca. */}
          <ProductGallery
            photos={[
              { src: product.image, alt: product.name, label: product.category === "tortas" ? "Torta entera" : "Foto" },
              ...(product.hoverImage
                ? [{ src: product.hoverImage, alt: `Porción de ${product.name}`, label: "Por dentro" }]
                : []),
            ]}
          />

          {/* Información y compra. */}
          <div className="md:sticky md:top-28">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sage-ink">
              <Flower className="h-5 w-5" />
              {product.category === "tortas" ? "Torta de la casa" : "Postre de la casa"}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-leaf sm:text-5xl">{product.name}</h1>
            <p className="mt-2 text-sm text-muted">Desde {formatPrice(from)}</p>
            <p className="mt-6 text-base leading-7 text-ink">{product.details.intro}</p>

            <ul className="mt-6 grid gap-3">
              {product.details.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-ink">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-3xl bg-lilac p-5">
              <p className="mb-3 text-sm font-semibold text-leaf">¿Qué tamaño quieres?</p>
              <AddToCart product={product} wide />
            </div>

            <p className="mt-6 text-sm leading-6 text-muted">
              Pide con al menos 2 días de anticipación y elige si la recoges en{" "}
              {sedes.map((sede) => sede.name).join(" o ")} o te la llevamos a domicilio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
