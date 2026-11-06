import Image from "next/image";
import { FlowerBadge } from "@/components/Ornaments";
import { logoUrl } from "@/data/site";

const links = [
  { href: "#productos", label: "Productos" },
  { href: "#experiencias", label: "Experiencias" },
  { href: "#menu", label: "Menú" },
  { href: "#sedes", label: "Sedes" },
];

export function Header() {
  return (
    <header className="bg-plum text-cream">
      <p className="bg-plum-deep px-4 py-2 text-center text-xs tracking-wide text-cream/80">
        Recomendamos realizar tu pedido con al menos 2 días de anticipación
      </p>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <a href="#inicio" aria-label="Celio Mi Cielo, inicio" className="flex items-center gap-3">
          <FlowerBadge className="h-11 w-11" />
          <Image src={logoUrl} alt="Celio Mi Cielo Repostería" width={104} height={52} preload />
        </a>
        <nav aria-label="Principal" className="hidden gap-8 text-sm md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-cream/80 transition-colors hover:text-lavender"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#sedes"
          className="rounded-full border border-lavender/60 px-5 py-2 text-sm transition-colors hover:bg-lavender hover:text-plum-deep"
        >
          Hacer pedido
        </a>
      </div>
    </header>
  );
}
