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
    // En portátiles (lg) las tarjetas van de a 4 y son angostas: también 2 + 1.
    return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 max-sm:[&>*:last-child]:col-span-2 lg:max-xl:[&>*:last-child]:col-span-2";
  }
  return "grid-cols-2";
}

const tones = {
  light: {
    track: "bg-leaf/[0.07]",
    selected: "bg-white text-leaf shadow-[0_1px_3px_rgba(68,88,84,0.18)]",
    idle: "text-muted hover:text-leaf",
    price: "text-leaf",
    detail: "text-muted",
    button: "bg-leaf text-white hover:bg-leaf-deep",
    buttonAdded: "bg-sage-ink text-white",
  },
  dark: {
    track: "bg-white/10",
    selected: "bg-lavender text-leaf-deep shadow-sm",
    idle: "text-white/70 hover:text-white",
    price: "text-white",
    detail: "text-white/60",
    button: "bg-lavender text-leaf-deep hover:bg-white",
    buttonAdded: "bg-lavender text-leaf-deep hover:bg-white",
  },
  // Navidad sobre el rojo del hero: textos en blanco y botón blanco con texto verde.
  festive: {
    track: "bg-black/15",
    selected: "bg-white text-leaf shadow-sm",
    idle: "text-white/75 hover:text-white",
    price: "text-white",
    detail: "text-white/70",
    button: "bg-white text-leaf hover:bg-lilac",
    buttonAdded: "bg-lilac text-leaf",
  },
};

type AddToCartProps = {
  product: CatalogProduct;
  /** light: fondo claro; dark: fondo verde; festive: rojo del hero de Navidad. */
  tone?: keyof typeof tones;
  /** Versión más pequeña, para las filas del menú. */
  compact?: boolean;
  /** Hay espacio de sobra (por ejemplo, en el hero): todos los tamaños en una fila. */
  wide?: boolean;
};

export function AddToCart({ product, tone = "light", compact = false, wide = false }: AddToCartProps) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const size = product.sizes[sizeIndex];


  useEffect(() => () => clearTimeout(timer.current), []);

  function handleAdd() {
    addToCart(product, size);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1600);
  }

  const styles = tones[tone];
  const option = (selected: boolean) => (selected ? styles.selected : styles.idle);

  return (
    <div>
      {product.sizes.length > 1 && (
        <div
          role="radiogroup"
          aria-label={`Presentación de ${product.name}`}
          className={`grid w-full gap-0.5 rounded-2xl p-1 ${columns(product.sizes.length, compact || wide)} ${styles.track}`}
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

      {/*
        Precio y detalle en dos líneas fijas, con el botón al lado: así nada se
        mueve al cambiar de tamaño, tenga o no detalle de porciones.
      */}
      <div
        className={`flex items-center justify-between gap-x-3 gap-y-2 max-sm:flex-wrap ${compact ? "mt-2" : "mt-3"}`}
      >
        <p className={`min-w-0 ${styles.price}`}>
          <span className={`block font-semibold leading-tight tabular-nums ${compact ? "text-sm" : "text-base"}`}>
            {formatPrice(size.price)}
          </span>
          <span className={`block min-h-4 text-xs leading-4 ${styles.detail}`}>
            {size.detail ?? (product.sizes.length === 1 ? size.label : " ")}
          </span>
        </p>
        <button
          type="button"
          onClick={handleAdd}
          aria-label={`Agregar ${product.name}, ${size.label}, al pedido`}
          className={`flex shrink-0 items-center gap-1.5 rounded-full font-semibold transition-[background-color,transform] duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage ${
            compact ? "h-8 px-3 text-xs" : "h-9 px-4 text-xs"
          } ${!compact && !wide ? "max-sm:w-full max-sm:justify-center" : ""} ${
            added ? styles.buttonAdded : styles.button
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
