import Link from "next/link";
import { IncludeIcon } from "@/components/CakePartyIcon";
import { Star } from "@/components/Ornaments";
import { cakeParty, formatPrice } from "@/data/site";

/** Invitación al Cake Party en el inicio; la reserva vive en /cake-party. */
export function CakePartyTeaser() {
  return (
    <section
      id="cake-party"
      aria-labelledby="cake-party-teaser-title"
      className="relative scroll-mt-24 overflow-hidden bg-lavender text-leaf"
    >
      <Star className="pointer-events-none absolute left-[6%] top-14 h-4 w-4 text-white/70" />
      <Star className="pointer-events-none absolute right-[10%] top-10 h-3 w-3 text-white/60" />
      <Star className="pointer-events-none absolute bottom-12 right-[30%] h-3 w-3 text-white/50" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs font-semibold">
            <Star className="h-3 w-3" />
            Nuestra experiencia más querida
          </p>
          <h2
            id="cake-party-teaser-title"
            className="mt-5 font-display text-5xl leading-none tracking-[-0.02em] sm:text-7xl"
          >
            Cake Party
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-leaf/85">
            Ven con tu gente y decora tu propia mini torta. Nosotros ponemos todo; tú pones la
            creatividad.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/cake-party"
              className="rounded-full bg-leaf px-7 py-3.5 text-sm font-semibold text-white transition-[background-color,transform] hover:bg-leaf-deep active:scale-[0.98]"
            >
              Reservar mi Cake Party
            </Link>
            <p className="text-sm">
              <span className="font-display text-2xl tabular-nums">{formatPrice(cakeParty.price)}</span>{" "}
              <span className="text-leaf/70">por Cake Party</span>
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white/55 p-6 sm:p-8">
          <h3 className="font-display text-lg">Incluye</h3>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {cakeParty.includes.map((item, index) => (
              <li key={item} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
                <span className="text-sage-ink">
                  <IncludeIcon index={index} />
                </span>
                <span className="text-sm font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
