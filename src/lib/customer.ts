import { useMemo, useSyncExternalStore } from "react";

/** Datos de contacto que el cliente escribe una vez y se recuerdan en su navegador. */
export type Customer = { name: string; phone: string };

const CUSTOMER_KEY = "celio-customer-v1";
const empty: Customer = { name: "", phone: "" };

function parseCustomer(raw: string | null): Customer {
  try {
    const saved: unknown = JSON.parse(raw ?? "null");
    if (saved && typeof saved === "object") {
      const { name, phone } = saved as Record<string, unknown>;
      return {
        name: typeof name === "string" ? name : "",
        phone: typeof phone === "string" ? phone : "",
      };
    }
  } catch {
    // Dato corrupto: se ignora.
  }
  return empty;
}

/** Lectura directa, para estados que solo existen en el navegador. */
export function readCustomer(): Customer {
  if (typeof window === "undefined") return empty;
  try {
    return parseCustomer(window.localStorage.getItem(CUSTOMER_KEY));
  } catch {
    return empty;
  }
}

export function saveCustomer(customer: Customer) {
  try {
    window.localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
  } catch {
    // No es grave: solo no se recordarán para la próxima vez.
  }
}

/**
 * Datos guardados, seguros para componentes que también se renderizan en el
 * servidor: allá devuelve vacío y en el navegador lo guardado.
 */
export function useSavedCustomer(): Customer {
  const raw = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return window.localStorage.getItem(CUSTOMER_KEY);
      } catch {
        return null;
      }
    },
    () => null,
  );
  return useMemo(() => parseCustomer(raw), [raw]);
}

/** Celular colombiano: 10 dígitos, opcionalmente con +57 o espacios. */
export function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "").replace(/^57(?=\d{10}$)/, "");
}
