"use client";

import { christmasSeason } from "@/data/site";
import { cartCount, setCartOpen, useCart } from "@/lib/cart";

/** En Navidad los botones del carrito van en chocolate con texto crema. */
const theme = christmasSeason
  ? {
      button: "bg-chocolate text-crema hover:bg-vino",
      count: "bg-crema text-chocolate",
      floating: "bg-chocolate text-crema",
      floatingCount: "bg-dorado text-chocolate",
    }
  : {
      button: "bg-leaf text-white hover:bg-sage-ink",
      count: "bg-white text-leaf",
      floating: "bg-lavender text-leaf-deep",
      floatingCount: "bg-leaf text-cream",
    };

function BagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
      <path d="M5 8h14l-1 12H6L5 8z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

/** Botón del carrito en la cabecera. */
export function CartButton() {
  const { lines } = useCart();
  const count = cartCount(lines);

  return (
    <button
      type="button"
      onClick={() => setCartOpen(true)}
      aria-label={`Abrir carrito, ${count} productos`}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${theme.button}`}
    >
      <BagIcon className="h-4 w-4" />
      <span>Carrito</span>
      {count > 0 && (
        <span className={`rounded-full px-2 text-xs font-semibold ${theme.count}`}>{count}</span>
      )}
    </button>
  );
}

/** Botón flotante que aparece cuando el carrito tiene productos. */
export function FloatingCartButton() {
  const { lines } = useCart();
  const count = cartCount(lines);
  if (count === 0) return null;

  return (
    <button
      type="button"
      onClick={() => setCartOpen(true)}
      aria-label={`Abrir carrito, ${count} productos`}
      className={`fixed bottom-22 right-5 z-20 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 ${theme.floating}`}
    >
      <BagIcon className="h-6 w-6" />
      <span className={`absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-xs font-semibold ${theme.floatingCount}`}>
        {count}
      </span>
    </button>
  );
}
