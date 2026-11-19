"use client";

import Image from "next/image";
import { type MouseEvent, useEffect, useRef, useState } from "react";

type Photo = { src: string; alt: string; label: string };

/** Cuánto se acerca la foto al hacer zoom dentro del visor. */
const ZOOM = 2.2;

/**
 * Fotos de la página de una torta: la principal se puede cambiar con las miniaturas
 * y, al tocarla, se abre un visor a pantalla completa. Dentro del visor, un clic (o
 * toque) acerca la foto y el cursor o el dedo recorren los detalles.
 */
export function ProductGallery({ photos }: { photos: Photo[] }) {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = photos[current];

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  function openViewer() {
    setZoomed(false);
    setOrigin("50% 50%");
    setOpen(true);
  }

  // El punto bajo el cursor o el dedo queda como centro del zoom.
  function follow(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`);
  }

  return (
    <div className="grid gap-4">
      <button
        type="button"
        onClick={openViewer}
        aria-label={`Ver de cerca: ${photo.alt}`}
        className="group relative block aspect-[4/3] cursor-zoom-in overflow-hidden rounded-[2rem] bg-lilac shadow-[0_24px_48px_-30px_rgba(52,68,63,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
      >
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          preload={current === 0}
          sizes="(min-width: 768px) 55vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
        />
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-leaf shadow-sm backdrop-blur-sm">
          <MagnifierIcon />
          Ver de cerca
        </span>
      </button>

      {photos.length > 1 && (
        <div className="flex gap-3" role="group" aria-label="Fotos de la torta">
          {photos.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setCurrent(index)}
              aria-pressed={index === current}
              className={`flex items-center gap-3 rounded-2xl p-1.5 pr-4 text-left text-sm font-semibold transition-colors ${
                index === current ? "bg-lilac text-leaf ring-2 ring-lavender" : "text-muted hover:bg-lilac/60"
              }`}
            >
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-lilac">
                <Image src={item.src} alt="" fill sizes="56px" className="object-cover" />
              </span>
              {item.label}
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        aria-label={photo.alt}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-leaf-deep p-0 text-white backdrop:bg-leaf-deep"
      >
        {open && (
          <div className="relative flex h-full w-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="text-sm font-semibold">{photo.label}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                aria-label="Cerrar"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-5 w-5">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <button
              type="button"
              onClick={(event) => {
                follow(event);
                setZoomed((value) => !value);
              }}
              onPointerMove={zoomed ? follow : undefined}
              aria-label={zoomed ? "Alejar foto" : "Acercar foto"}
              className={`relative mx-4 mb-4 flex-1 overflow-hidden rounded-3xl sm:mx-6 ${
                zoomed ? "cursor-zoom-out touch-none" : "cursor-zoom-in"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="100vw"
                quality={90}
                className="object-contain transition-transform duration-300 ease-out motion-reduce:transition-none"
                style={{ transform: zoomed ? `scale(${ZOOM})` : "none", transformOrigin: origin }}
              />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-3 px-4 pb-5">
              {photos.length > 1 &&
                photos.map((item, index) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => {
                      setCurrent(index);
                      setZoomed(false);
                    }}
                    aria-pressed={index === current}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                      index === current ? "bg-white text-leaf" : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              <p className="w-full text-center text-xs text-white/60">
                {zoomed ? "Mueve el cursor o el dedo para recorrer la foto. Toca para alejar." : "Toca la foto para acercarla."}
              </p>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}

function MagnifierIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-3.5 w-3.5">
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.5-4.5M11 8v6M8 11h6" strokeLinecap="round" />
    </svg>
  );
}
