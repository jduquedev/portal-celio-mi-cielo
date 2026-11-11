"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DatePicker, fromIso, toIso } from "@/components/cart/DatePicker";
import { findProduct, formatPrice, sedes, whatsappLink } from "@/data/site";
import {
  type CartLine,
  cartCount,
  cartTotal,
  changeQuantity,
  clearCart,
  removeFromCart,
  setCartOpen,
  useCart,
} from "@/lib/cart";

/** La foto sale del catálogo, así funciona también con carritos guardados antes. */
function lineImage(line: CartLine) {
  return findProduct(line.id.split(":")[0])?.image ?? line.image;
}

/** Días mínimos de anticipación para un pedido. */
const MIN_DAYS_AHEAD = 2;

function earliestOrderDate() {
  const date = new Date();
  date.setDate(date.getDate() + MIN_DAYS_AHEAD);
  return toIso(date);
}

const longDate = new Intl.DateTimeFormat("es-CO", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatOrderDate(value: string) {
  return longDate.format(fromIso(value));
}

type Delivery = "recoger" | "domicilio";

const deliveryOptions: { value: Delivery; label: string; detail: string }[] = [
  { value: "recoger", label: "Recoger en tienda", detail: "Pasas por él a la sede" },
  { value: "domicilio", label: "Domicilio", detail: "Te lo llevamos" },
];

type Customer = { name: string; phone: string };

const CUSTOMER_KEY = "celio-customer-v1";

/** Datos del cliente guardados en su navegador para el próximo pedido. */
function readCustomer(): Customer {
  if (typeof window === "undefined") return { name: "", phone: "" };
  try {
    const saved: unknown = JSON.parse(window.localStorage.getItem(CUSTOMER_KEY) ?? "null");
    if (saved && typeof saved === "object") {
      const { name, phone } = saved as Record<string, unknown>;
      return {
        name: typeof name === "string" ? name : "",
        phone: typeof phone === "string" ? phone : "",
      };
    }
  } catch {
    // Sin almacenamiento: los campos empiezan vacíos.
  }
  return { name: "", phone: "" };
}

function saveCustomer(customer: Customer) {
  try {
    window.localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
  } catch {
    // No es grave: solo no se recordarán para la próxima vez.
  }
}

/** Celular colombiano: 10 dígitos, opcionalmente con +57 o espacios. */
function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "").replace(/^57(?=\d{10}$)/, "");
}

type OrderDetails = {
  lines: CartLine[];
  sedeName: string;
  date: string;
  delivery: Delivery;
  address: string;
  customer: Customer;
};

function orderMessage({ lines, sedeName, date, delivery, address, customer }: OrderDetails) {
  const items = lines.map(
    (line) =>
      `• ${line.quantity} x ${line.name} (${line.size}): ${formatPrice(line.price * line.quantity)}`,
  );
  const deliveryLines =
    delivery === "recoger"
      ? [`Entrega: Recoger en tienda (${sedeName})`]
      : ["Entrega: Domicilio", `Dirección: ${address.trim()}`, `Sede que despacha: ${sedeName}`];
  return [
    "Hola Celio mi Cielo! Quisiera hacer este pedido:",
    "",
    `Nombre: ${customer.name.trim()}`,
    `Celular: ${customer.phone.trim()}`,
    ...deliveryLines,
    `Fecha: ${formatOrderDate(date)}`,
    "",
    ...items,
    "",
    `Total productos: ${formatPrice(cartTotal(lines))}`,
    ...(delivery === "domicilio" ? ["(Quedo atento al valor del domicilio)"] : []),
  ].join("\n");
}

function choiceClass(selected: boolean) {
  return `relative cursor-pointer rounded-2xl p-3 transition-[background-color,box-shadow] duration-200 has-focus-visible:outline-2 has-focus-visible:outline-sage ${
    selected ? "bg-leaf text-white" : "bg-cream text-leaf ring-1 ring-leaf/15 hover:ring-leaf/40"
  }`;
}

function DeliveryIcon({ kind }: { kind: Delivery }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="h-5 w-5">
      {kind === "recoger" ? (
        <>
          <path d="M4 10l1.5-5h13L20 10" strokeLinejoin="round" />
          <path d="M4 10h16v1a3 3 0 0 1-5.33 1.9A3 3 0 0 1 12 14a3 3 0 0 1-2.67-1.1A3 3 0 0 1 4 11v-1z" strokeLinejoin="round" />
          <path d="M5.5 13.5V20h13v-6.5M10 20v-4h4v4" strokeLinejoin="round" />
        </>
      ) : (
        <>
          <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" strokeLinejoin="round" />
          <circle cx="7" cy="17.5" r="1.8" />
          <circle cx="17" cy="17.5" r="1.8" />
        </>
      )}
    </svg>
  );
}

export function CartDrawer() {
  const { lines, open } = useCart();
  const [sedeName, setSedeName] = useState(sedes[0].name);
  const [date, setDate] = useState("");
  const [delivery, setDelivery] = useState<Delivery>("recoger");
  const [address, setAddress] = useState("");
  // Los campos solo aparecen con productos en el carrito, que existen únicamente
  // en el navegador; por eso leer lo guardado aquí no desajusta el prerender.
  const [customer, setCustomer] = useState<Customer>(readCustomer);
  const dialog = useRef<HTMLDialogElement>(null);
  // Para recoger sirven todas las sedes; para domicilio, solo las que despachan.
  const availableSedes = delivery === "recoger" ? sedes : sedes.filter((option) => option.delivers);
  const sede = availableSedes.find((option) => option.name === sedeName) ?? availableSedes[0];
  const total = cartTotal(lines);
  const count = cartCount(lines);
  // El carrito solo tiene productos en el navegador, así que la fecha actual
  // nunca se lee durante el prerender del servidor.
  const minDate = lines.length > 0 ? earliestOrderDate() : "";
  const dateIsValid = date !== "" && date >= minDate;
  const addressIsValid = delivery === "recoger" || address.trim().length >= 5;
  const nameIsValid = customer.name.trim().length >= 2;
  const phoneIsValid = phoneDigits(customer.phone).length === 10;
  const canSend = dateIsValid && addressIsValid && nameIsValid && phoneIsValid;

  function updateCustomer(field: keyof Customer, value: string) {
    const next = { ...customer, [field]: value };
    setCustomer(next);
    saveCustomer(next);
  }

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      onClose={() => setCartOpen(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) setCartOpen(false);
      }}
      aria-labelledby="cart-title"
      className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-md translate-x-full bg-cream p-0 text-ink shadow-[-24px_0_60px_-20px_rgba(52,68,63,0.35)] transition-[translate,display,overlay] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] transition-discrete open:translate-x-0 starting:open:translate-x-full motion-reduce:transition-none backdrop:bg-leaf-deep/0 backdrop:backdrop-blur-[2px] backdrop:transition-[background-color,display,overlay] backdrop:duration-500 backdrop:transition-discrete open:backdrop:bg-leaf-deep/40 starting:open:backdrop:bg-leaf-deep/0 sm:rounded-l-[2rem]"
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between px-6 pb-4 pt-6">
          <div>
            <h2 id="cart-title" className="font-display text-2xl text-leaf">
              Tu pedido
            </h2>
            {count > 0 && (
              <p className="text-sm text-muted">
                {count} {count === 1 ? "producto" : "productos"}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Cerrar carrito"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-lilac text-leaf transition-[background-color,transform] hover:bg-lavender active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-4 w-4">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <p className="font-display text-xl text-leaf">Aún no has elegido nada</p>
            <p className="text-sm text-muted">
              Agrega tus tortas y postres, y aquí armamos el pedido para enviarlo por WhatsApp.
            </p>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="mt-3 rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-white transition-[background-color,transform] hover:bg-leaf-deep active:scale-[0.98]"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-6">
              <ul className="space-y-3">
                {lines.map((line) => (
                  <li key={line.id} className="flex gap-4 rounded-3xl bg-lilac p-3">
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-t-full rounded-b-2xl bg-lavender">
                      {lineImage(line) && (
                        <Image src={lineImage(line)!} alt="" fill sizes="64px" className="object-cover" />
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-display text-sm leading-snug text-leaf">{line.name}</p>
                          <p className="text-xs text-muted">{line.size}</p>
                        </div>
                        <p className="shrink-0 text-sm font-semibold text-leaf">
                          {formatPrice(line.price * line.quantity)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center rounded-full bg-cream p-0.5 ring-1 ring-leaf/10">
                          <button
                            type="button"
                            onClick={() => changeQuantity(line.id, -1)}
                            aria-label={`Quitar uno de ${line.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-leaf transition-colors hover:bg-lilac"
                          >
                            −
                          </button>
                          <span className="w-7 text-center text-sm font-semibold tabular-nums" aria-label="Cantidad">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => changeQuantity(line.id, 1)}
                            aria-label={`Agregar uno más de ${line.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-leaf transition-colors hover:bg-lilac"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(line.id)}
                          className="text-xs text-muted underline-offset-2 transition-colors hover:text-leaf hover:underline"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <fieldset className="mt-8">
                <legend className="font-display text-base text-leaf">¿Cómo lo quieres recibir?</legend>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {deliveryOptions.map((option) => {
                    const selected = option.value === delivery;
                    return (
                      <label key={option.value} className={choiceClass(selected)}>
                        <input
                          type="radio"
                          name="entrega"
                          value={option.value}
                          checked={selected}
                          onChange={() => setDelivery(option.value)}
                          className="sr-only"
                        />
                        <DeliveryIcon kind={option.value} />
                        <span className="mt-2 block text-sm font-semibold">{option.label}</span>
                        <span className={`block text-xs ${selected ? "text-white/75" : "text-muted"}`}>
                          {option.detail}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {availableSedes.length > 1 ? (
                <fieldset className="mt-8">
                  <legend className="font-display text-base text-leaf">
                    {delivery === "recoger" ? "¿En qué sede lo recoges?" : "¿Qué sede te queda más cerca?"}
                  </legend>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {availableSedes.map((option) => {
                      const selected = option.name === sede.name;
                      return (
                        <label key={option.name} className={choiceClass(selected)}>
                          <input
                            type="radio"
                            name="sede"
                            value={option.name}
                            checked={selected}
                            onChange={() => setSedeName(option.name)}
                            className="sr-only"
                          />
                          <span className="block text-sm font-semibold">{option.name}</span>
                          <span className={`block text-xs ${selected ? "text-white/75" : "text-muted"}`}>
                            {option.place}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ) : (
                <p className="mt-4 flex items-start gap-2 rounded-2xl bg-cream px-4 py-3 text-xs leading-5 text-muted ring-1 ring-leaf/10">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sage-ink">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 11v5M12 8h.01" strokeLinecap="round" />
                  </svg>
                  <span>
                    Los domicilios salen de nuestra sede{" "}
                    <strong className="font-semibold text-leaf">{sede.name}</strong> ({sede.place}).
                  </span>
                </p>
              )}

              {delivery === "domicilio" && (
                <div className="mt-8">
                  <label htmlFor="order-address" className="font-display text-base text-leaf">
                    ¿A qué dirección te lo llevamos?
                  </label>
                  <p id="order-address-hint" className="mb-3 text-xs text-muted">
                    Incluye barrio y apartamento o casa. El valor del domicilio te lo confirmamos por
                    WhatsApp.
                  </p>
                  <textarea
                    id="order-address"
                    rows={2}
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    autoComplete="street-address"
                    aria-describedby="order-address-hint"
                    placeholder="Ej: Calle 16 # 105-20, Ciudad Jardín, apto 302"
                    className="w-full resize-none rounded-2xl bg-cream px-4 py-3 text-sm text-leaf ring-1 ring-leaf/15 transition-shadow placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-sage"
                  />
                </div>
              )}

              <div className="mt-8">
                <p id="order-date-label" className="font-display text-base text-leaf">
                  ¿Para qué día?
                </p>
                <p className="mb-3 text-xs text-muted">
                  Necesitamos al menos {MIN_DAYS_AHEAD} días para prepararlo.
                </p>
                <DatePicker
                  value={date}
                  onChange={setDate}
                  min={minDate}
                  labelledBy="order-date-label"
                />
              </div>

              <fieldset className="mt-8">
                <legend className="font-display text-base text-leaf">Tus datos</legend>
                <p className="mb-3 text-xs text-muted">
                  Para saber a nombre de quién va el pedido y poder contactarte.
                </p>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="customer-name" className="text-xs font-semibold text-leaf">
                      Nombre
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      value={customer.name}
                      onChange={(event) => updateCustomer("name", event.target.value)}
                      autoComplete="name"
                      placeholder="¿A nombre de quién?"
                      className="mt-1 w-full rounded-2xl bg-cream px-4 py-3 text-base text-leaf ring-1 ring-leaf/15 transition-shadow placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-sage sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="customer-phone" className="text-xs font-semibold text-leaf">
                      Celular (WhatsApp)
                    </label>
                    <input
                      id="customer-phone"
                      type="tel"
                      inputMode="tel"
                      value={customer.phone}
                      onChange={(event) => updateCustomer("phone", event.target.value)}
                      autoComplete="tel"
                      placeholder="300 123 4567"
                      aria-invalid={customer.phone !== "" && !phoneIsValid}
                      aria-describedby="customer-phone-hint"
                      className="mt-1 w-full rounded-2xl bg-cream px-4 py-3 text-base text-leaf ring-1 ring-leaf/15 transition-shadow placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-sage aria-invalid:ring-red-400 sm:text-sm"
                    />
                    <p id="customer-phone-hint" className="mt-1 text-xs text-muted">
                      {customer.phone !== "" && !phoneIsValid
                        ? "Escribe los 10 dígitos de tu celular."
                        : "Te escribimos a este número para confirmar."}
                    </p>
                  </div>
                </div>
              </fieldset>
            </div>

            <footer className="border-t border-leaf/10 bg-cream px-6 pb-6 pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted">
                  {delivery === "domicilio" ? "Total sin domicilio" : "Total"}
                </span>
                <span className="font-display text-2xl text-leaf tabular-nums">{formatPrice(total)}</span>
              </div>
              <p className="mt-1 min-h-4 text-xs text-muted" aria-live="polite">
                {!dateIsValid
                  ? "Elige el día para enviar tu pedido."
                  : !addressIsValid
                    ? "Escribe la dirección para el domicilio."
                    : !nameIsValid || !phoneIsValid
                      ? "Completa tu nombre y celular para enviar."
                      : delivery === "recoger"
                      ? `Lo recoges el ${formatOrderDate(date)} en ${sede.name}.`
                      : `Te lo llevamos el ${formatOrderDate(date)}.`}
              </p>

              {canSend ? (
                <a
                  href={whatsappLink(
                    orderMessage({ lines, sedeName: sede.name, date, delivery, address, customer }),
                    sede.whatsapp,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-leaf py-3.5 text-sm font-semibold text-white transition-[background-color,transform] hover:bg-leaf-deep active:scale-[0.98]"
                >
                  Enviar pedido por WhatsApp
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-4 block w-full cursor-not-allowed rounded-full bg-lilac py-3.5 text-center text-sm font-semibold text-muted"
                >
                  Enviar pedido por WhatsApp
                </button>
              )}
              <button
                type="button"
                onClick={clearCart}
                className="mt-3 w-full text-center text-xs text-muted underline-offset-2 transition-colors hover:text-leaf hover:underline"
              >
                Vaciar carrito
              </button>
            </footer>
          </>
        )}
      </div>
    </dialog>
  );
}
