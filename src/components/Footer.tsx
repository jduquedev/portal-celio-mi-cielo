import Image from "next/image";
import { contact, logoUrl, whatsappLink } from "@/data/site";

const external = { target: "_blank", rel: "noopener noreferrer" };
const linkClass = "transition-colors hover:text-gold";

export function Footer() {
  return (
    <footer id="ubicacion" className="bg-forest text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-3">
        <div>
          <Image src={logoUrl} alt="Celio Mi Cielo Repostería" width={130} height={65} />
          <p className="mt-4 max-w-xs text-sm leading-6 text-cream/70">
            Domicilios y atención a empresas.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl">Nuestra ubicación</h2>
          <p className="mt-3 text-sm leading-6 text-cream/75">
            {contact.address}
            <br />
            {contact.addressDetail}
          </p>
          <a href={contact.maps} {...external} className={`mt-3 inline-block text-sm text-gold ${linkClass}`}>
            Cómo llegar
          </a>
        </div>

        <div>
          <h2 className="font-serif text-2xl">Escríbenos</h2>
          <ul className="mt-3 space-y-2 text-sm text-cream/75">
            <li>
              <a
                href={whatsappLink("Hola Celio mi Cielo! Quisiera preguntarles sobre")}
                {...external}
                className={linkClass}
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={contact.instagram} {...external} className={linkClass}>
                Instagram
              </a>
            </li>
            <li>
              <a href={contact.tiktok} {...external} className={linkClass}>
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-cream/10 px-4 py-5 text-center text-xs text-cream/50">
        Celio Mi Cielo. Todos los derechos reservados.
      </p>
    </footer>
  );
}
