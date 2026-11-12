"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Al llegar a una página con "#seccion" en la dirección (por ejemplo, desde el
 * menú en /cake-party hacia /#sedes), baja hasta esa sección cuando ya existe.
 * Next.js cambia de página sin recargar, así que la sección puede tardar un poco
 * en aparecer: se reintenta por un momento.
 */
export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    let timer: ReturnType<typeof setTimeout>;
    let tries = 0;
    const scroll = () => {
      const target = document.getElementById(id);
      if (target) {
        // Salto directo (sin animación), como un enlace con "#" al cargar una página.
        target.scrollIntoView({ block: "start", behavior: "instant" });
      } else if (tries < 40) {
        tries += 1;
        timer = setTimeout(scroll, 50);
      }
    };
    timer = setTimeout(scroll, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
