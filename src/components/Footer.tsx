import Image from "next/image";
import { FlowerBadge } from "@/components/Ornaments";
import { logoUrl, social } from "@/data/site";

const external = { target: "_blank", rel: "noopener noreferrer" };
const linkClass = "transition-colors hover:text-lavender";

export function Footer() {
  return (
    <footer className="bg-plum-deep text-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-10 sm:px-6">
        <div className="flex items-center gap-3">
          <FlowerBadge className="h-12 w-12" />
          <Image src={logoUrl} alt="Celio Mi Cielo Repostería" width={112} height={56} />
        </div>
        <p className="text-sm text-cream/70">Domicilios y atención a empresas</p>
        <ul className="flex gap-6 text-sm text-cream/80">
          <li>
            <a href={social.instagram} {...external} className={linkClass}>
              Instagram
            </a>
          </li>
          <li>
            <a href={social.tiktok} {...external} className={linkClass}>
              TikTok
            </a>
          </li>
        </ul>
      </div>
      <p className="border-t border-cream/10 px-4 py-5 text-center text-xs text-cream/50">
        Celio Mi Cielo. Todos los derechos reservados.
      </p>
    </footer>
  );
}
