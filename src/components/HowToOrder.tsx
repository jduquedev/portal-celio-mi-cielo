const steps = [
  {
    title: "Elige tus productos",
    text: "Escoge el tamaño de cada torta o postre y agrégalo a tu pedido. Puedes sumar todo lo que quieras.",
  },
  {
    title: "Revisa tu pedido",
    text: "Abre el carrito para ajustar cantidades o quitar productos antes de enviarlo.",
  },
  {
    title: "Elige cómo y cuándo",
    text: "Recoges en tienda o te lo llevamos. Escoge la sede y el día, con al menos 2 días de anticipación.",
  },
  {
    title: "Envíalo por WhatsApp",
    text: "Se abre WhatsApp con tu pedido listo. La sede te confirma disponibilidad y forma de pago.",
  },
];

export function HowToOrder() {
  return (
    <section
      id="como-pedir"
      aria-labelledby="como-pedir-title"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="max-w-xl">
        <h2 id="como-pedir-title" className="font-display text-3xl text-leaf sm:text-4xl">
          Cómo pedir
        </h2>
        <p className="mt-3 text-base text-muted">
          Armas tu pedido aquí y lo terminamos de coordinar por WhatsApp. Aún no pagas nada.
        </p>
      </div>

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="relative rounded-3xl bg-lilac p-6">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf font-display text-base text-white"
            >
              {index + 1}
            </span>
            <h3 className="mt-5 font-display text-lg text-leaf">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
