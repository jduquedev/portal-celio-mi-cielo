"use client";

import Image from "next/image";
import { useEffect } from "react";
import { findProduct } from "@/data/site";
import { cartCount, dismissNotice, setCartOpen, useCart } from "@/lib/cart";

/** Tiempo que el aviso queda en pantalla, en milisegundos. */
const VISIBLE_MS = 4500;

/**
 * Aviso que aparece al agregar un producto: confirma qué se agregó y ofrece
 * ver el pedido o seguir comprando.
 */
export function AddedToast() {
  const { notice, lines } = useCart();

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(dismissNotice, VISIBLE_MS);
    return () => clearTimeout(timer);
  }, [notice]);

  if (!notice) return null;
  const count = cartCount(lines);
  const product = findProduct(notice.productId);
  const image = product?.image ?? notice.image;

  return (
    <div
      key={notice.id}
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-4 right-24 z-40 rounded-3xl bg-white p-3 shadow-[0_18px_50px_-12px_rgba(52,68,63,0.45)] ring-1 ring-leaf/10 transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] starting:translate-y-3 starting:opacity-0 motion-reduce:transition-none sm:left-auto sm:w-96"
    >
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-t-full rounded-b-xl bg-lavender">
          {image && (
            <Image src={image} alt="" fill sizes="48px" className={`object-cover ${product?.imagePosition ?? ""}`} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-sage-ink">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" className="h-3.5 w-3.5">
              <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Agregado a tu pedido
          </p>
          <p className="truncate font-display text-sm text-leaf">{notice.name}</p>
          <p className="text-xs text-muted">
            {notice.size} · {count} {count === 1 ? "producto" : "productos"} en tu pedido
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={dismissNotice}
          className="rounded-full bg-lilac py-2.5 text-xs font-semibold text-leaf transition-[background-color,transform] hover:bg-lavender/60 active:scale-[0.98]"
        >
          Seguir comprando
        </button>
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="rounded-full bg-leaf py-2.5 text-xs font-semibold text-white transition-[background-color,transform] hover:bg-leaf-deep active:scale-[0.98]"
        >
          Ver pedido
        </button>
      </div>
    </div>
  );
}
