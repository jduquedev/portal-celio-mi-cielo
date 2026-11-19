import { WaveLines } from "@/components/Ornaments";
import { sedes } from "@/data/site";

/**
 * Pedidos inmediatos por Rappi para quien está cerca de una sede.
 * Solo aparece si al menos una sede tiene su enlace de Rappi en site.ts.
 *
 * Banner en el lila de la marca con las líneas onda a una tinta (blanco), como
 * en el manual de marca, y textos en verde oscuro.
 */
export function Rappi() {
  const withRappi = sedes.filter((sede) => sede.rappi);
  if (withRappi.length === 0) return null;

  const theme = {
    box: "relative overflow-hidden bg-lavender",
    title: "text-leaf",
    body: "text-leaf-deep",
    card: "bg-white text-leaf hover:bg-lilac",
  };

  return (
    <section
      id="rappi"
      aria-labelledby="rappi-title"
      className="mx-auto w-full max-w-6xl scroll-mt-28 px-4 pb-20 sm:px-6 md:pb-28"
    >
      <div
        className={`flex flex-col gap-6 rounded-[2rem] px-6 py-8 sm:px-10 md:flex-row md:items-center md:justify-between ${theme.box}`}
      >
        <WaveLines tone="white" className="pointer-events-none absolute -right-10 -top-24 w-[28rem] opacity-50" />
        <div className="relative max-w-md">
          <h2 id="rappi-title" className={`font-display text-2xl sm:text-3xl ${theme.title}`}>
            ¿Se te antojó para hoy?
          </h2>
          <p className={`mt-2 text-sm leading-6 ${theme.body}`}>
            Si estás cerca de una sede, pide lo que hay en vitrina por Rappi y te llega sin esperar
            los días de anticipación.
          </p>
        </div>
        <ul className="relative flex flex-col gap-2 sm:flex-row">
          {withRappi.map((sede) => (
            <li key={sede.name}>
              <a
                href={sede.rappi}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between gap-4 rounded-2xl px-5 py-3.5 transition-[background-color,transform] active:scale-[0.98] sm:min-w-52 ${theme.card}`}
              >
                <span>
                  <span className="block text-xs text-muted">Pedir en Rappi</span>
                  <span className="block text-sm font-semibold">{sede.name}</span>
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-4 w-4 shrink-0">
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
