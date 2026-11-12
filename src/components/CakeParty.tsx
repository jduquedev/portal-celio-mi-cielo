"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { DatePicker, fromIso, toIso } from "@/components/cart/DatePicker";
import { IncludeIcon } from "@/components/CakePartyIcon";
import { Star } from "@/components/Ornaments";
import {
  cakeParty,
  cakePartyTimes,
  formatHour,
  formatPrice,
  formatTime,
  sedes,
  whatsappLink,
} from "@/data/site";
import { phoneDigits, saveCustomer, useSavedCustomer } from "@/lib/customer";

const longDate = new Intl.DateTimeFormat("es-CO", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** true solo en el navegador; evita leer la fecha actual durante el prerender. */
function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function tomorrow() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return toIso(date);
}

const fieldClass =
  "mt-1 w-full rounded-2xl bg-cream px-4 py-3 text-base text-leaf ring-1 ring-leaf/15 transition-shadow placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-sage sm:text-sm";

/** Página de reserva del Cake Party: explicación, qué incluye y formulario. */
export function CakeParty() {
  const isClient = useIsClient();
  const saved = useSavedCustomer();
  const [sedeName, setSedeName] = useState(sedes[0].name);
  const [date, setDate] = useState("");
  const [chosenTime, setSlot] = useState("");
  const [parties, setParties] = useState(1);
  const [occasion, setOccasion] = useState("");
  // null = todavía no lo ha tocado: se muestra lo guardado de pedidos anteriores.
  const [name, setName] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);

  const sede = sedes.find((option) => option.name === sedeName) ?? sedes[0];
  const times = cakePartyTimes(sede);
  // Si cambian a una sede que cierra antes, la hora elegida deja de valer.
  const slot = times.includes(chosenTime) ? chosenTime : "";
  const nameValue = name ?? saved.name;
  const phoneValue = phone ?? saved.phone;
  const minDate = isClient ? tomorrow() : "";
  const total = cakeParty.price * parties;
  // La reserva se agenda con el abono del 50% del valor total.
  const deposit = Math.round(total / 2);

  const missing = !date
    ? "Elige el día de tu Cake Party."
    : !slot
      ? "Elige la hora de llegada."
      : nameValue.trim().length < 2 || phoneDigits(phoneValue).length !== 10
        ? "Completa tu nombre y celular."
        : "";

  function updateContact(field: "name" | "phone", value: string) {
    if (field === "name") setName(value);
    else setPhone(value);
    saveCustomer({
      name: field === "name" ? value : nameValue,
      phone: field === "phone" ? value : phoneValue,
    });
  }

  const message = [
    "Hola Celio mi Cielo! Quisiera reservar un Cake Party:",
    "",
    `Nombre: ${nameValue.trim()}`,
    `Celular: ${phoneValue.trim()}`,
    `Sede: ${sede.name}`,
    `Fecha: ${date ? longDate.format(fromIso(date)) : ""}`,
    `Hora de llegada: ${formatTime(slot)}`,
    `Cake Party: ${parties} (${parties} ${parties === 1 ? "mini cake" : "mini cakes"})`,
    ...(occasion.trim() ? [`Ocasión: ${occasion.trim()}`] : []),
    "",
    `Total: ${formatPrice(total)}`,
    `Abono para agendar (50%): ${formatPrice(deposit)}`,
    "",
    "Entiendo que la reserva queda agendada cuando pague el abono del 50%.",
  ].join("\n");

  return (
    <section
      id="cake-party"
      aria-labelledby="cake-party-title"
      className="relative scroll-mt-24 text-leaf"
    >
      <Star className="pointer-events-none absolute right-[8%] top-10 h-3 w-3 text-white/70" />
      <Star className="pointer-events-none absolute bottom-16 left-[45%] h-3 w-3 text-white/60" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1fr_27rem] lg:gap-14">
        <div className="min-w-0">
          <Link
            href="/"
            className="mb-8 flex w-fit items-center gap-1.5 rounded-full bg-white/50 px-3.5 py-1.5 text-sm font-semibold text-leaf/80 ring-1 ring-white/70 backdrop-blur-md transition-colors hover:bg-white/80 hover:text-leaf"
          >
            <span aria-hidden="true">←</span> Volver al inicio
          </Link>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs font-semibold ring-1 ring-white/70 backdrop-blur-md">
            <Star className="h-3 w-3" />
            Nuestra experiencia más querida
          </p>
          <h1 id="cake-party-title" className="mt-5 font-display text-5xl leading-none tracking-[-0.03em] sm:text-7xl">
            Cake Party
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-leaf/85">
            Ven con tu gente y decora tu propia mini torta. Nosotros ponemos todo; tú pones la
            creatividad.
          </p>

          {/* Foto con esquinas tipo iPhone y etiquetas de vidrio esmerilado */}
          <figure className="relative mt-8 max-w-md overflow-hidden rounded-[2.25rem] shadow-[0_40px_80px_-40px_rgba(52,68,63,0.6)] ring-1 ring-white/60">
            <div className="relative aspect-[1086/1448]">
              <Image
                src="/cake-party/cake-party-amigas.webp"
                alt="Dos amigas muestran las mini tortas que decoraron en Celio Mi Cielo"
                fill
                sizes="(min-width: 640px) 448px, 100vw"
                preload
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-leaf-deep/35 to-transparent"
              />
            </div>
            <figcaption className="absolute bottom-4 left-4 hidden items-center gap-2 sm:inline-flex rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-leaf shadow-sm ring-1 ring-white/80 backdrop-blur-xl">
              <Star className="h-3 w-3 text-sage-ink" />
              Decoradas por ellas mismas
            </figcaption>
            <div className="absolute bottom-4 right-4 rounded-2xl bg-white/70 px-4 py-2.5 text-right shadow-sm ring-1 ring-white/80 backdrop-blur-xl">
              <span className="block font-display text-xl leading-none tabular-nums">
                {formatPrice(cakeParty.price)}
              </span>
              <span className="text-[11px] text-muted">por Cake Party</span>
            </div>
          </figure>

          <h2 className="mt-10 font-display text-lg">Incluye</h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {cakeParty.includes.map((item, index) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-2xl bg-white/55 px-4 py-3 ring-1 ring-white/70 backdrop-blur-md"
              >
                <span className="text-sage-ink">
                  <IncludeIcon index={index} />
                </span>
                <span className="text-sm font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={(event) => event.preventDefault()}
          aria-labelledby="reserva-title"
          className="self-start rounded-[2.25rem] bg-white/85 p-6 shadow-[0_40px_80px_-40px_rgba(52,68,63,0.6)] ring-1 ring-white/80 backdrop-blur-xl sm:p-8"
        >
          <h3 id="reserva-title" className="font-display text-xl">
            Reserva tu Cake Party
          </h3>
          <p className="mt-1 text-xs text-muted">Se agenda con el abono del 50% del valor total.</p>

          <fieldset className="mt-6">
            <legend className="text-xs font-semibold">Sede</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {sedes.map((option) => {
                const selected = option.name === sede.name;
                return (
                  <label
                    key={option.name}
                    className={`cursor-pointer rounded-2xl px-3 py-2.5 text-sm font-semibold transition-colors has-focus-visible:outline-2 has-focus-visible:outline-sage ${
                      selected ? "bg-leaf text-white" : "bg-cream ring-1 ring-leaf/15 hover:ring-leaf/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="cake-party-sede"
                      checked={selected}
                      onChange={() => setSedeName(option.name)}
                      className="sr-only"
                    />
                    {option.name}
                  </label>
                );
              })}
            </div>
            <p className="mt-2 flex items-start gap-2 rounded-2xl bg-lilac/70 px-3.5 py-2.5 text-xs leading-5 text-leaf/80">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sage-ink">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>
                Abierto de {formatHour(sede.opens)} a {formatHour(sede.closes)} Para tu Cake Party,
                llega máximo a las{" "}
                <strong className="font-semibold text-leaf">{formatTime(sede.cakePartyLastArrival)}</strong>
              </span>
            </p>
          </fieldset>

          <div className="mt-6">
            <p id="cake-party-date" className="text-xs font-semibold">
              ¿Qué día?
            </p>
            <div className="mt-2">
              {isClient ? (
                <DatePicker value={date} onChange={setDate} min={minDate} labelledBy="cake-party-date" />
              ) : (
                <div className="h-80 rounded-3xl bg-cream ring-1 ring-leaf/10" aria-hidden="true" />
              )}
            </div>
          </div>

          <fieldset className="mt-6">
            <legend className="text-xs font-semibold">¿A qué hora llegan?</legend>
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {times.map((option) => {
                const selected = option === slot;
                return (
                  <label
                    key={option}
                    className={`cursor-pointer whitespace-nowrap rounded-full py-2 text-center text-xs font-semibold tabular-nums transition-colors has-focus-visible:outline-2 has-focus-visible:outline-sage ${
                      selected ? "bg-leaf text-white" : "bg-cream ring-1 ring-leaf/15 hover:ring-leaf/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="cake-party-slot"
                      checked={selected}
                      onChange={() => setSlot(option)}
                      className="sr-only"
                    />
                    {formatTime(option)}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div>
              <p id="cake-party-count" className="text-xs font-semibold">
                ¿Cuántos Cake Party?
              </p>
              <p className="text-xs text-muted">Cada uno trae un mini cake; pueden decorarlo en pareja.</p>
            </div>
            <div
              role="group"
              aria-labelledby="cake-party-count"
              className="flex items-center rounded-full bg-cream p-1 ring-1 ring-leaf/15"
            >
              <button
                type="button"
                onClick={() => setParties((value) => Math.max(1, value - 1))}
                disabled={parties <= 1}
                aria-label="Un Cake Party menos"
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-lilac disabled:opacity-30"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
                {parties}
              </span>
              <button
                type="button"
                onClick={() => setParties((value) => Math.min(cakeParty.maxParties, value + 1))}
                disabled={parties >= cakeParty.maxParties}
                aria-label="Un Cake Party más"
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-lilac disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="cake-party-name" className="text-xs font-semibold">
                Nombre
              </label>
              <input
                id="cake-party-name"
                type="text"
                value={nameValue}
                onChange={(event) => updateContact("name", event.target.value)}
                autoComplete="name"
                placeholder="¿A nombre de quién?"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="cake-party-phone" className="text-xs font-semibold">
                Celular (WhatsApp)
              </label>
              <input
                id="cake-party-phone"
                type="tel"
                inputMode="tel"
                value={phoneValue}
                onChange={(event) => updateContact("phone", event.target.value)}
                autoComplete="tel"
                placeholder="300 123 4567"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="mt-3">
            <label htmlFor="cake-party-occasion" className="text-xs font-semibold">
              Ocasión <span className="font-normal text-muted">(opcional)</span>
            </label>
            <input
              id="cake-party-occasion"
              type="text"
              value={occasion}
              onChange={(event) => setOccasion(event.target.value)}
              placeholder="Cumpleaños, plan con amigas, aniversario…"
              className={fieldClass}
            />
          </div>

          <div className="mt-6 flex items-baseline justify-between border-t border-leaf/10 pt-4">
            <span className="text-sm text-muted">
              Total · {parties} Cake Party
            </span>
            <span className="font-display text-2xl tabular-nums">{formatPrice(total)}</span>
          </div>
          <div className="mt-3 rounded-2xl bg-lilac/70 px-4 py-3">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-semibold">Abono para agendar (50%)</span>
              <span className="text-lg font-semibold tabular-nums">{formatPrice(deposit)}</span>
            </div>
            <p className="mt-1 text-xs leading-5 text-leaf/75">
              Tu reserva queda agendada cuando pagas el 50% del valor total.
            </p>
          </div>

          {missing ? (
            <button
              type="button"
              disabled
              className="mt-4 block w-full cursor-not-allowed rounded-full bg-lilac py-3.5 text-center text-sm font-semibold text-muted"
            >
              Reservar por WhatsApp
            </button>
          ) : (
            <a
              href={whatsappLink(message, sede.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-full bg-leaf py-3.5 text-center text-sm font-semibold text-white transition-[background-color,transform] hover:bg-leaf-deep active:scale-[0.98]"
            >
              Reservar por WhatsApp
            </a>
          )}
          <p className="mt-2 min-h-4 text-center text-xs text-muted" aria-live="polite">
            {missing || "Se abrirá WhatsApp con tu reserva lista."}
          </p>
        </form>
      </div>
    </section>
  );
}
