import { formatHour, sedes, whatsappLink } from "@/data/site";

export function Sedes() {
  return (
    <section id="sedes" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 md:py-28">
      <div className="max-w-xl">
        <h2 className="font-display text-3xl text-leaf sm:text-4xl">Dos casas en Cali</h2>
        <p className="mt-3 text-base text-muted">
          Tortas, postres, café y sándwiches. Y sí, tu mascota también es bienvenida.
        </p>
      </div>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {sedes.map((sede) => (
          <li key={sede.name} className="rounded-t-[10rem] rounded-b-3xl bg-lilac px-8 pb-8 pt-16 text-center">
            <h3 className="font-display text-2xl text-leaf">{sede.name}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              {sede.place}
              <br />
              {sede.local}
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-leaf">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-3.5 w-3.5 text-sage-ink">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {formatHour(sede.opens)} a {formatHour(sede.closes)}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
              <a
                href={whatsappLink("Hola Celio mi Cielo! Quisiera hacer un pedido.", sede.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-leaf px-5 py-2.5 text-cream transition-colors hover:bg-sage-ink"
              >
                Pedir por WhatsApp
              </a>
              {sede.rappi && (
                <a
                  href={sede.rappi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-5 py-2.5 text-leaf transition-colors hover:bg-lavender"
                >
                  Pedir en Rappi
                </a>
              )}
              <a
                href={sede.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-leaf/30 px-5 py-2.5 text-leaf transition-colors hover:bg-leaf hover:text-cream"
              >
                Cómo llegar
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
