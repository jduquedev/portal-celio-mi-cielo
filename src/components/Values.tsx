import { values } from "@/data/site";

export function Values() {
  return (
    <section id="nosotros" className="bg-lilac">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1fr_2fr] md:py-28">
        <div>
          <h2 className="font-display text-3xl leading-tight text-leaf sm:text-4xl">
            El cielo en cada porción
          </h2>
        </div>
        <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {values.map((value) => (
            <div key={value.title} className="border-t-2 border-lavender pt-5">
              <dt className="font-display text-xl text-leaf">{value.title}</dt>
              <dd className="mt-2 text-sm leading-6 text-muted">{value.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
