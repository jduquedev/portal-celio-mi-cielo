import Image from "next/image";
import { CartButton } from "@/components/cart/CartButton";
import { logoUrl } from "@/data/site";

const links = [
  { href: "#productos", label: "Productos" },
  { href: "#como-pedir", label: "Cómo pedir" },
  { href: "#experiencias", label: "Experiencias" },
  { href: "#empresas", label: "Empresas" },
  { href: "#menu", label: "Menú" },
  { href: "#sedes", label: "Sedes" },
];

export function Header() {
  return (
    <>
      <header className="sticky top-0 z-30 bg-lavender/90 text-leaf backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-lavender">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
          <a href="#inicio" aria-label="Celio Mi Cielo, inicio">
            <Image src={logoUrl} alt="Celio Mi Cielo Repostería" width={112} height={56} preload />
          </a>
          <nav aria-label="Principal" className="hidden gap-0.5 text-sm font-semibold lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 transition-colors hover:bg-white/50"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <CartButton />
        </div>
      </header>
    </>
  );
}
