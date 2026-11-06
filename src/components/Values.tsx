import { values } from "@/data/site";

export function Values() {
  return (
    <section id="nosotros" className="bg-sand">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1fr_2fr] md:py-28">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-sage">Celio mi cielo</p>
          <h2 className="mt-4 font-serif text-4xl font-medium italic leading-tight text-forest sm:text-5xl">
            El cielo en cada porción
          </h2>
        </div>
        <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {values.map((value) => (
            <div key={value.title} className="border-t border-gold/50 pt-5">
              <dt className="font-serif text-2xl text-forest">{value.title}</dt>
              <dd className="mt-2 text-sm leading-6 text-muted">{value.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
