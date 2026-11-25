import { FigureView } from "@/components/FigureView";
import { SectionHeader } from "@/components/SectionHeader";
import { results, resultsIntro } from "@/data/portfolio";

/** Resultados: uma entrega por área, com o antes → hoje e o efeito para quem usa. */
export function Results() {
  return (
    <section id="resultados" className="container-page pt-4 sm:pt-8">
      <SectionHeader index="01" label="Resultados" title="O que mudou por causa do meu trabalho" intro={resultsIntro} />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((item) => (
          <li key={item.area} className="card flex flex-col p-6 sm:p-7">
            <p className="eyebrow text-accent">{item.area}</p>
            <div className="mt-5">
              <FigureView figure={item} />
            </div>
            <p className="mt-5 text-lg font-semibold leading-snug tracking-tight">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
