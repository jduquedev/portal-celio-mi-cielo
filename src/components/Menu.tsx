import { AddToCart } from "@/components/cart/AddToCart";
import { menu, sedes } from "@/data/site";

export function Menu() {
  return (
    <section id="menu" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 md:py-28">
      <div className="max-w-xl">
        <h2 className="font-display text-3xl text-leaf sm:text-4xl">Nuestro menú</h2>
        <p className="mt-3 text-base text-muted">
          Toda la carta de tortas, postres y galletas, con el precio de cada tamaño.
        </p>
      </div>

      <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-3">
        {menu.map((group) => (
          <div key={group.title}>
            <h3 className="font-display text-xl text-leaf">{group.title}</h3>
            <ul className="mt-4 divide-y divide-leaf/10 border-t border-leaf/10">
              {group.items.map((item) => (
                <li key={item.id} className="py-4">
                  <p className="text-sm font-semibold text-leaf">{item.name}</p>
                  {item.note && <p className="text-xs text-sage-ink">{item.note}</p>}
                  <div className="mt-2.5">
                    <AddToCart product={item} compact />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-col items-start gap-3 rounded-3xl bg-lilac p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-leaf">
          ¿Buscas café, sándwiches o almuerzo? Están en la carta de cada sede.
        </p>
        <div className="flex flex-wrap gap-2">
          {sedes.map((sede) => (
            <a
              key={sede.name}
              href={sede.menu}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-leaf transition-colors hover:bg-leaf hover:text-white"
            >
              Carta {sede.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
