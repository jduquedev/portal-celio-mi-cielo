import { Flower } from "@/components/Ornaments";
import { experiences, whatsappLink } from "@/data/site";

export function Experiences() {
  return (
    <section id="experiencias" className="scroll-mt-24 bg-leaf text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            Ven a vivir el cielo con las manos
          </h2>
          <p className="mt-3 text-base text-white/70">
            Además de la vitrina, en nuestras sedes puedes decorar, aprender y celebrar.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {experiences.map((experience) => (
            <li
              key={experience.title}
              className="flex flex-col rounded-t-[8rem] border border-lavender/25 px-7 pb-8 pt-14 text-center"
            >
              <Flower className="mx-auto h-10 w-10 text-lavender" />
              <h3 className="mt-6 font-display text-xl">{experience.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-white/75">{experience.text}</p>
              <a
                href={whatsappLink(experience.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto mt-6 rounded-full bg-white/10 px-5 py-2 text-xs font-semibold text-lavender transition-colors hover:bg-lavender hover:text-leaf-deep"
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
