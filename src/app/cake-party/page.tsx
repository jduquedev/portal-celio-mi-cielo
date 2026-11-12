import type { Metadata } from "next";
import Image from "next/image";
import { CakeParty } from "@/components/CakeParty";

export const metadata: Metadata = {
  title: "Cake Party | Celio Mi Cielo Repostería",
  description:
    "Decora tu propia mini torta en Celio Mi Cielo. Incluye mini cake, crema, relleno, mangas, utensilios y colorantes. Reserva por WhatsApp.",
};

const steps = [
  {
    title: "Reserva aquí",
    text: "Elige sede, día, hora y cuántos Cake Party quieres. Se abre WhatsApp con tu reserva lista.",
  },
  {
    title: "Paga el 50% y queda agendada",
    text: "La sede te confirma por WhatsApp la disponibilidad y te indica cómo pagar el abono del 50%. Con el abono, tu reserva queda agendada.",
  },
  {
    title: "Ven a decorar",
    text: "Te esperamos con tu mini cake, la crema, el relleno, las mangas, los utensilios y los colorantes.",
  },
  {
    title: "Llévatela",
    text: "Tu mini torta decorada por ti, lista para compartir… o para tomarle mil fotos.",
  },
];

export default function CakePartyPage() {
  return (
    <div className="relative isolate overflow-hidden bg-lavender">
      {/*
        Fondo tipo vidrio esmerilado: la misma foto del Cake Party, muy desenfocada
        y con un velo lavanda encima, para que los colores combinen con ella.
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/cake-party/cake-party-amigas.webp"
          alt=""
          fill
          sizes="320px"
          className="scale-110 object-cover blur-[64px] saturate-[1.15]"
        />
        <div className="absolute inset-0 bg-lavender/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_10%_0%,rgb(255_255_255/0.45),transparent_70%),radial-gradient(ellipse_60%_45%_at_90%_100%,rgb(255_255_255/0.35),transparent_70%)]" />
      </div>

      <CakeParty />

      <section aria-labelledby="como-funciona-title" className="mx-auto w-full max-w-6xl px-4 pb-20 pt-6 sm:px-6 md:pb-28">
        <div className="max-w-xl">
          <h2 id="como-funciona-title" className="font-display text-3xl text-leaf sm:text-4xl">
            Cómo funciona
          </h2>
          <p className="mt-3 text-base text-leaf/75">De la reserva a tu mini torta en cuatro pasos.</p>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-[2rem] bg-white/55 p-6 shadow-[0_30px_60px_-40px_rgba(52,68,63,0.5)] ring-1 ring-white/70 backdrop-blur-xl"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf font-display text-base text-white"
              >
                {index + 1}
              </span>
              <h3 className="mt-5 font-display text-lg text-leaf">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-leaf/75">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
