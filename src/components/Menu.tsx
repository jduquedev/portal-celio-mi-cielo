import { menu, sedes } from "@/data/site";

export function Menu() {
  return (
    <section id="menu" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-plum-soft">La carta</p>
        <h2 className="mt-4 font-serif text-4xl font-medium text-plum sm:text-5xl">Nuestro menú</h2>
        <p className="mt-4 text-sm text-muted">Precios desde la porción o presentación más pequeña.</p>
      </div>

      <div className="mt-14 grid gap-12 md:grid-cols-3">
        {menu.map((group) => (
          <div key={group.title}>
            <h3 className="border-b border-gold/50 pb-3 font-serif text-3xl text-plum">
              {group.title}
            </h3>
            <ul className="mt-4 space-y-4">
              {group.items.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between gap-4 text-sm">
                  <span>
                    {item.name}
                    {item.note && (
                      <span className="mt-0.5 block text-xs text-plum-soft">{item.note}</span>
                    )}
                  </span>
                  <span className="shrink-0 text-muted">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-center gap-3 text-sm">
        <span className="w-full text-center text-muted sm:w-auto">
          Café, sándwiches y más en la carta completa:
        </span>
        {sedes.map((sede) => (
          <a
            key={sede.name}
            href={sede.menu}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-plum/30 px-5 py-2 text-plum transition-colors hover:bg-plum hover:text-cream"
          >
            Menú {sede.name}
          </a>
        ))}
      </div>
    </section>
  );
}
