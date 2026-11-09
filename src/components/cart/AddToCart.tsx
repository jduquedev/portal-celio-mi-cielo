"use client";

import { useEffect, useRef, useState } from "react";
import { type CatalogProduct, formatPrice } from "@/data/site";
import { addToCart } from "@/lib/cart";

/**
 * Columnas del selector. En el menú van todas en una fila; en las tarjetas,
 * que son angostas, 4 tamaños van en 2×2 y 3 tamaños pasan a 2 + 1 en celular.
 */
function columns(count: number, compact: boolean) {
  if (count === 2) return "grid-cols-2";
  if (compact) return count === 3 ? "grid-cols-3" : "grid-cols-4";
  if (count === 3) {
    return "grid-cols-2 sm:grid-cols-3 max-sm:[&>*:last-child]:col-span-2";
  }
  return "grid-cols-2";
}

type AddToCartProps = {
  product: CatalogProduct;
  tone?: "light" | "dark";
  /** Versión más pequeña, para las filas del menú. */
  compact?: boolean;
};

export function AddToCart({ product, tone = "light", compact = false }: AddToCartProps) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const size = product.sizes[sizeIndex];
  const dark = tone === "dark";

  useEffect(() => () => clearTimeout(timer.current), []);

  function handleAdd() {
    addToCart(product, size);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1600);
  }

  const track = dark ? "bg-white/10" : "bg-leaf/[0.07]";
  const option = (selected: boolean) =>
    selected
      ? dark
        ? "bg-lavender text-leaf-deep shadow-sm"
        : "bg-white text-leaf shadow-[0_1px_3px_rgba(68,88,84,0.18)]"
      : dark
        ? "text-white/70 hover:text-white"
        : "text-muted hover:text-leaf";

  return (
    <div>
      {product.sizes.length > 1 && (
        <div
          role="radiogroup"
          aria-label={`Presentación de ${product.name}`}
          className={`grid w-full gap-0.5 rounded-2xl p-1 ${columns(product.sizes.length, compact || dark)} ${track}`}
        >
          {product.sizes.map((item, index) => {
            const selected = index === sizeIndex;
            return (
              <button
                key={item.label}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setSizeIndex(index)}
                className={`truncate rounded-xl px-1.5 text-center font-semibold transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-sage ${
                  compact ? "py-1 text-[11px]" : "py-1.5 text-xs"
                } ${option(selected)}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      <div className={`flex flex-wrap items-center justify-between gap-x-3 gap-y-2 ${compact ? "mt-2" : "mt-3"}`}>
        <p className={dark ? "text-white" : "text-leaf"}>
          <span className={`font-semibold tabular-nums ${compact ? "text-sm" : "text-base"}`}>
            {formatPrice(size.price)}
          </span>
          {(size.detail || product.sizes.length === 1) && (
            <span className={`ml-2 text-xs ${dark ? "text-white/60" : "text-muted"}`}>
              {size.detail ?? size.label}
            </span>
          )}
        </p>
        <button
          type="button"
          onClick={handleAdd}
          aria-label={`Agregar ${product.name}, ${size.label}, al pedido`}
          className={`flex shrink-0 items-center gap-1.5 rounded-full font-semibold transition-[background-color,transform] duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage ${
            compact ? "h-8 px-3 text-xs" : "h-9 px-4 text-xs"
          } ${!compact && !dark ? "max-sm:w-full max-sm:justify-center" : ""} ${
            dark
              ? "bg-lavender text-leaf-deep hover:bg-white"
              : added
                ? "bg-sage-ink text-white"
                : "bg-leaf text-white hover:bg-leaf-deep"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true" className="h-3.5 w-3.5">
            <path
              d={added ? "M5 12.5l4.5 4.5L19 7.5" : "M12 5v14M5 12h14"}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {added ? "Agregado" : "Agregar"}
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {added ? `${product.name}, ${size.label}, agregado al pedido` : ""}
      </span>
    </div>
  );
}
