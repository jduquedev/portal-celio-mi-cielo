"use client";

import { useState } from "react";
import { whatsappLink } from "@/data/site";

// TODO: confirmar con la marca qué ofrecen exactamente a empresas.
const services = [
  {
    title: "Regalos corporativos",
    text: "Cajas y detalles para clientes y equipos, ideales para fin de año y fechas especiales.",
  },
  {
    title: "Celebraciones en la oficina",
    text: "Tortas y porciones para cumpleaños, aniversarios y logros del equipo.",
  },
  {
    title: "Refrigerios para reuniones",
    text: "Postres, galletas y café para reuniones, capacitaciones y eventos.",
  },
  {
    title: "Experiencias para equipos",
    text: "Talleres y Decora tu mini torta para integrar a tu equipo de una forma diferente.",
  },
];

const fieldClass =
  "mt-1 w-full rounded-2xl bg-white px-4 py-3 text-base text-leaf ring-1 ring-leaf/15 transition-shadow placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-sage sm:text-sm";

export function Corporate() {
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [people, setPeople] = useState("");
  const [when, setWhen] = useState("");
  const [details, setDetails] = useState("");

  const canSend = company.trim().length >= 2 && contact.trim().length >= 2 && needs.length > 0;

  function toggleNeed(title: string) {
    setNeeds((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title],
    );
  }

  const message = [
    "Hola Celio mi Cielo! Quisiera cotizar un pedido para empresa:",
    "",
    `Empresa: ${company.trim()}`,
    `Contacto: ${contact.trim()}`,
    `Necesitamos: ${needs.join(", ")}`,
    ...(people.trim() ? [`Personas aprox.: ${people.trim()}`] : []),
    ...(when.trim() ? [`Fecha aprox.: ${when.trim()}`] : []),
    ...(details.trim() ? ["", `Detalles: ${details.trim()}`] : []),
  ].join("\n");

  return (
    <section id="empresas" aria-labelledby="empresas-title" className="scroll-mt-24 bg-lilac">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1fr_26rem] lg:gap-16">
        <div>
          <h2 id="empresas-title" className="font-display text-3xl text-leaf sm:text-4xl">
            Para empresas
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted">
            Endulzamos los momentos de tu equipo y tus clientes. Cuéntanos qué necesitas y te
            enviamos una cotización por WhatsApp.
          </p>

          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.title} className="border-t-2 border-lavender pt-5">
                <h3 className="font-display text-lg text-leaf">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{service.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={(event) => event.preventDefault()}
          aria-labelledby="cotizar-title"
          className="rounded-[2rem] bg-cream p-6 shadow-[0_24px_60px_-30px_rgba(52,68,63,0.45)] sm:p-8"
        >
          <h3 id="cotizar-title" className="font-display text-xl text-leaf">
            Pide tu cotización
          </h3>
          <p className="mt-1 text-xs text-muted">Te respondemos por WhatsApp.</p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="corp-company" className="text-xs font-semibold text-leaf">
                Empresa
              </label>
              <input
                id="corp-company"
                type="text"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                autoComplete="organization"
                placeholder="Nombre de la empresa"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="corp-contact" className="text-xs font-semibold text-leaf">
                Tu nombre
              </label>
              <input
                id="corp-contact"
                type="text"
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                autoComplete="name"
                placeholder="¿Con quién hablamos?"
                className={fieldClass}
              />
            </div>

            <fieldset>
              <legend className="text-xs font-semibold text-leaf">¿Qué necesitas?</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {services.map((service) => {
                  const selected = needs.includes(service.title);
                  return (
                    <label
                      key={service.title}
                      className={`cursor-pointer rounded-full px-3.5 py-2 text-xs font-semibold transition-colors has-focus-visible:outline-2 has-focus-visible:outline-sage ${
                        selected ? "bg-leaf text-white" : "bg-white text-leaf ring-1 ring-leaf/15 hover:ring-leaf/40"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleNeed(service.title)}
                        className="sr-only"
                      />
                      {service.title}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="corp-people" className="text-xs font-semibold text-leaf">
                  Personas aprox.
                </label>
                <input
                  id="corp-people"
                  type="text"
                  inputMode="numeric"
                  value={people}
                  onChange={(event) => setPeople(event.target.value)}
                  placeholder="Ej: 40"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="corp-when" className="text-xs font-semibold text-leaf">
                  ¿Para cuándo?
                </label>
                <input
                  id="corp-when"
                  type="text"
                  value={when}
                  onChange={(event) => setWhen(event.target.value)}
                  placeholder="Ej: 15 de diciembre"
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="corp-details" className="text-xs font-semibold text-leaf">
                Detalles <span className="font-normal text-muted">(opcional)</span>
              </label>
              <textarea
                id="corp-details"
                rows={3}
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                placeholder="Presupuesto, tipo de evento, si es para entregar en la oficina…"
                className={`${fieldClass} resize-none`}
              />
            </div>
          </div>

          {canSend ? (
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block rounded-full bg-leaf py-3.5 text-center text-sm font-semibold text-white transition-[background-color,transform] hover:bg-leaf-deep active:scale-[0.98]"
            >
              Cotizar por WhatsApp
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="mt-6 block w-full cursor-not-allowed rounded-full bg-lilac py-3.5 text-center text-sm font-semibold text-muted"
            >
              Cotizar por WhatsApp
            </button>
          )}
          <p className="mt-2 text-center text-xs text-muted" aria-live="polite">
            {canSend ? "Se abrirá WhatsApp con tu solicitud lista." : "Completa empresa, tu nombre y qué necesitas."}
          </p>
        </form>
      </div>
    </section>
  );
}
