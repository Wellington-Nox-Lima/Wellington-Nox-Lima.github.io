import { portfolioData } from "@/data/portfolio";

export function About() {
  const { about } = portfolioData;

  return (
    <section id="sobre" className="section-shell about-reveal">
      <p className="section-heading">Sobre</p>
      <h2 className="section-title">
        Perfil técnico com foco em contexto, dados e entrega operacional
      </h2>
      <p className="section-copy">{about.overview}</p>

      <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-2">
        <article className="panel-card p-5 sm:p-7">
          <h3 className="text-lg font-semibold text-white sm:text-xl">Resumo profissional</h3>
          <p className="mt-3 text-[15px] leading-7 text-muted sm:mt-4 sm:text-base sm:leading-8">
            {about.technicalProfile}
          </p>
        </article>

        <article className="panel-card p-5 sm:p-7">
          <h3 className="text-lg font-semibold text-white sm:text-xl">Diferenciais</h3>
          <ul className="mt-3 space-y-3 text-[15px] leading-7 text-muted sm:mt-4 sm:text-base">
            {about.differentiators.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="mt-4 grid gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-2">
        <article className="panel-card p-5 sm:p-7">
          <h3 className="text-lg font-semibold text-white sm:text-xl">Principais áreas de atuação</h3>
          <ul className="mt-3 space-y-3 text-[15px] leading-7 text-muted sm:mt-4 sm:text-base">
            {about.coreAreas.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel-card p-5 sm:p-7">
          <h3 className="text-lg font-semibold text-white sm:text-xl">Problemas que resolve</h3>
          <ul className="mt-3 space-y-3 text-[15px] leading-7 text-muted sm:mt-4 sm:text-base">
            {about.problemsSolved.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
