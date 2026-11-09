import { useSyncExternalStore } from "react";
import type { CatalogProduct, Size } from "@/data/site";

export type CartLine = {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartState = { lines: CartLine[]; open: boolean };

const STORAGE_KEY = "celio-cart-v1";
const serverState: CartState = { lines: [], open: false };

let state: CartState = serverState;
let hydrated = false;
const listeners = new Set<() => void>();

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as Record<string, unknown>;
  return (
    typeof line.id === "string" &&
    typeof line.name === "string" &&
    typeof line.size === "string" &&
    typeof line.price === "number" &&
    typeof line.quantity === "number" &&
    line.quantity > 0
  );
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (Array.isArray(stored)) state = { ...state, lines: stored.filter(isCartLine) };
  } catch {
    // Almacenamiento no disponible o corrupto: se empieza con el carrito vacío.
  }
}

function setState(next: CartState) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next.lines));
  } catch {
    // El carrito sigue funcionando en memoria.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  hydrate();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  hydrate();
  return state;
}

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverState);
}

export function addToCart(product: CatalogProduct, size: Size, quantity = 1) {
  const id = `${product.id}:${size.label}`;
  const existing = state.lines.find((line) => line.id === id);
  const lines = existing
    ? state.lines.map((line) =>
        line.id === id ? { ...line, quantity: line.quantity + quantity } : line,
      )
    : [
        ...state.lines,
        {
          id,
          name: product.name,
          size: size.label,
          price: size.price,
          quantity,
          image: product.image,
        },
      ];
  setState({ ...state, lines });
}

export function changeQuantity(id: string, delta: number) {
  const lines = state.lines
    .map((line) => (line.id === id ? { ...line, quantity: line.quantity + delta } : line))
    .filter((line) => line.quantity > 0);
  setState({ ...state, lines });
}

export function removeFromCart(id: string) {
  setState({ ...state, lines: state.lines.filter((line) => line.id !== id) });
}

export function clearCart() {
  setState({ ...state, lines: [] });
}

export function setCartOpen(open: boolean) {
  setState({ ...state, open });
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function cartTotal(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
}
