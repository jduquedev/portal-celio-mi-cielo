import { sedes, whatsappLink } from "@/data/site";

export function Sedes() {
  return (
    <section id="sedes" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-plum-soft">Pet friendly</p>
        <h2 className="mt-4 font-serif text-4xl font-medium text-plum sm:text-5xl">
          Dos casas en Cali
        </h2>
        <p className="mt-4 text-sm text-muted">Tortas, postres, café, sándwiches y más.</p>
      </div>

      <ul className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
        {sedes.map((sede) => (
          <li key={sede.name} className="rounded-3xl bg-blush p-8 text-center">
            <h3 className="font-serif text-3xl text-plum">{sede.name}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              {sede.place}
              <br />
              {sede.local}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
              <a
                href={whatsappLink("Hola Celio mi Cielo! Quisiera hacer un pedido.", sede.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-plum px-5 py-2.5 text-cream transition-colors hover:bg-plum-soft"
              >
                Pedir por WhatsApp
              </a>
              <a
                href={sede.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-plum/30 px-5 py-2.5 text-plum transition-colors hover:bg-plum hover:text-cream"
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
