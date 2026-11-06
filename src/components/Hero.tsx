import Image from "next/image";
import { PineSprig, Star } from "@/components/Ornaments";
import { type Feature, whatsappLink } from "@/data/site";

type HeroProps = {
  feature: Feature;
  festive?: boolean;
};

export function Hero({ feature, festive = false }: HeroProps) {
  return (
    <section id="inicio" className="relative overflow-hidden bg-forest text-cream">
      {festive && (
        <>
          <PineSprig className="pointer-events-none absolute -left-6 bottom-0 w-44 text-gold/30 sm:w-64" />
          <PineSprig className="pointer-events-none absolute -right-6 -top-4 w-40 rotate-180 text-gold/25 sm:w-56" />
        </>
      )}

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-12 sm:px-6 md:grid-cols-2 md:pb-28 md:pt-16">
        <div>
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
            {festive && <Star className="h-3 w-3" />}
            {feature.eyebrow}
          </p>
          <h1 className="mt-5 font-serif text-5xl font-medium leading-[1.05] sm:text-6xl lg:text-7xl">
            {feature.title}
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-cream/75">
            {feature.description}
          </p>

          {feature.sizes.length > 0 && (
            <ul className="mt-8 max-w-sm divide-y divide-cream/10 border-y border-cream/10 text-sm text-cream/85">
              {feature.sizes.map((size) => (
                <li key={size} className="py-2.5">
                  {size}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={whatsappLink(feature.orderMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gold px-7 py-3 text-sm font-medium text-forest-deep transition-colors hover:bg-cream"
            >
              Pedir por WhatsApp
            </a>
            <p className="text-sm text-cream/70">
              Desde <span className="font-serif text-xl text-cream">{feature.priceFrom}</span>
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 rounded-full border border-gold/40" />
          <div className="relative aspect-square overflow-hidden rounded-full">
            <Image
              src={feature.image}
              alt={feature.imageAlt}
              fill
              sizes="(min-width: 768px) 448px, 90vw"
              preload
              className="translate-x-[4%] scale-[1.2] object-cover"
            />
          </div>
          {festive && (
            <>
              <Star className="absolute -right-1 top-8 h-5 w-5 text-gold" />
              <Star className="absolute -left-2 bottom-16 h-3 w-3 text-gold/70" />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
