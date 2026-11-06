import { Flower } from "@/components/Ornaments";
import { experiences, whatsappLink } from "@/data/site";

export function Experiences() {
  return (
    <section id="experiencias" className="bg-plum text-cream">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-lavender">Más que una pastelería</p>
          <h2 className="mt-4 font-serif text-4xl font-medium leading-tight sm:text-5xl">
            Ven a vivir el <span className="italic text-lavender">cielo</span> con las manos
          </h2>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {experiences.map((experience) => (
            <li
              key={experience.title}
              className="flex flex-col rounded-t-[8rem] border border-lavender/25 px-7 pb-8 pt-14 text-center"
            >
              <Flower className="mx-auto h-10 w-10 text-lavender" />
              <h3 className="mt-6 font-serif text-3xl">{experience.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-cream/75">{experience.text}</p>
              <a
                href={whatsappLink(experience.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 text-sm text-gold transition-colors hover:text-cream"
              >
                Quiero saber más
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
