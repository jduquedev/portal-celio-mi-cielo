import Image from "next/image";
import Link from "next/link";
import { CartButton } from "@/components/cart/CartButton";
import { christmasSeason, logoUrl } from "@/data/site";

// Rutas absolutas ("/#…") para que funcionen también desde otras páginas.
const links = [
  { href: "/#productos", label: "Productos" },
  { href: "/cake-party", label: "Cake Party" },
  { href: "/#como-pedir", label: "Cómo pedir" },
  { href: "/#experiencias", label: "Experiencias" },
  { href: "/#empresas", label: "Empresas" },
  { href: "/#sedes", label: "Sedes" },
];

// En Navidad la barra pasa a crema con el logo en el morado oficial de la marca y
// los enlaces en chocolate; el resto del año, lavanda con el logo blanco.
const theme = christmasSeason
  ? {
      bar: "bg-crema/90 text-chocolate supports-[not(backdrop-filter:blur(1px))]:bg-crema",
      link: "hover:bg-morado/15",
      logo: "/logo-morado.png",
    }
  : {
      bar: "bg-lavender/90 text-leaf supports-[not(backdrop-filter:blur(1px))]:bg-lavender",
      link: "hover:bg-white/50",
      logo: logoUrl,
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
        <CartButton />
      </div>
    </header>
  );
}
