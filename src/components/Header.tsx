import Image from "next/image";
import { logoUrl, whatsappLink } from "@/data/site";

const links = [
  { href: "#productos", label: "Productos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#ubicacion", label: "Ubicación" },
];

export function Header() {
  return (
    <header className="bg-forest text-cream">
      <p className="bg-forest-deep px-4 py-2 text-center text-xs tracking-wide text-cream/80">
        Recomendamos realizar tu pedido con al menos 2 días de anticipación
      </p>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <a href="#inicio" aria-label="Celio Mi Cielo, inicio">
          <Image
            src={logoUrl}
            alt="Celio Mi Cielo Repostería"
            width={120}
            height={60}
            preload
          />
        </a>
        <nav aria-label="Principal" className="hidden gap-8 text-sm md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-cream/80 transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={whatsappLink("Hola Celio mi Cielo! Quisiera hacer un pedido.")}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-gold/60 px-5 py-2 text-sm transition-colors hover:bg-gold hover:text-forest-deep"
        >
          Hacer pedido
        </a>
      </div>
    </header>
  );
}
