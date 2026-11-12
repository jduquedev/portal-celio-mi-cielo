import Image from "next/image";
import Link from "next/link";
import { CartButton } from "@/components/cart/CartButton";
import { logoUrl } from "@/data/site";

// Rutas absolutas ("/#…") para que funcionen también desde otras páginas.
const links = [
  { href: "/#productos", label: "Productos" },
  { href: "/cake-party", label: "Cake Party" },
  { href: "/#como-pedir", label: "Cómo pedir" },
  { href: "/#experiencias", label: "Experiencias" },
  { href: "/#empresas", label: "Empresas" },
  { href: "/#sedes", label: "Sedes" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-lavender/90 text-leaf backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-lavender">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link href="/" aria-label="Celio Mi Cielo, inicio">
          <Image src={logoUrl} alt="Celio Mi Cielo Repostería" width={112} height={56} preload />
        </Link>
        <nav aria-label="Principal" className="hidden gap-0.5 text-sm font-semibold lg:flex">
          {links.map((link) => {
            const className = "rounded-full px-3.5 py-2 transition-colors hover:bg-white/50";
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
