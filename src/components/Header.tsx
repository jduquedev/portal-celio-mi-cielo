import Image from "next/image";
import Link from "next/link";
import { CartButton } from "@/components/cart/CartButton";
import { christmasSeason, logos, sedes } from "@/data/site";

// Rutas absolutas ("/#…") para que funcionen también desde otras páginas.
const links = [
  { href: "/#productos", label: "Productos" },
  { href: "/decora-mi-torta", label: "Decora mi torta" },
  { href: "/#como-pedir", label: "Cómo pedir" },
  { href: "/#empresas", label: "Empresas" },
  { href: "/#sedes", label: "Sedes" },
];

/** Atajo a la sección de enlaces de Rappi en la portada. */
const rappiLink = "/#rappi";

// Manual de marca, pág. 11: sobre el lila el logo va en blanco; sobre fondos muy
// claros que no son blanco (el crema de Navidad), en verde oscuro.
const theme = christmasSeason
  ? {
      bar: "bg-crema/90 text-leaf supports-[not(backdrop-filter:blur(1px))]:bg-crema",
      link: "hover:bg-lavender/40",
      logo: logos.verde,
      rappi: "bg-lavender hover:bg-lavender/70",
    }
  : {
      bar: "bg-lavender/90 text-leaf supports-[not(backdrop-filter:blur(1px))]:bg-lavender",
      link: "hover:bg-white/50",
      logo: logos.blanco,
      rappi: "bg-white/70 hover:bg-white",
    };

export function Header() {
  return (
    <header className={`sticky top-0 z-30 backdrop-blur-md ${theme.bar}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link href="/" aria-label="Celio Mi Cielo, inicio">
          <Image src={theme.logo} alt="Celio Mi Cielo Repostería" width={112} height={56} preload />
        </Link>
        <nav aria-label="Principal" className="hidden gap-0.5 text-sm font-semibold lg:flex">
          {links.map((link) => {
            const className = `rounded-full px-3.5 py-2 transition-colors ${theme.link}`;
            // Los enlaces a secciones usan <a> normal: el navegador siempre baja a la
            // sección, incluso viniendo de otra página.
            return link.href.includes("#") ? (
              <a key={link.href} href={link.href} className={className}>
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className={className}>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          {/*
            Atajo a los enlaces de Rappi (pedidos para hoy). Destacado con fondo para
            que se distinga del menú; en celular, donde no hay menú, se muestra corto.
          */}
          {sedes.some((sede) => sede.rappi) && (
            // <a> normal, como los enlaces del menú a secciones: siempre baja a la
            // sección, incluso viniendo de otra página.
            <a
              href={rappiLink}
              className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold text-leaf transition-colors sm:text-sm ${theme.rappi}`}
            >
              <span className="hidden sm:inline">¿Estás cerca? </span>¡Pide ya!
            </a>
          )}
          <CartButton />
        </div>
      </div>
    </header>
  );
}
