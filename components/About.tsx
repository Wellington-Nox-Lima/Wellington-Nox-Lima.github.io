import { portfolioData } from "@/data/portfolio";

export function About() {
  const { about } = portfolioData;

  return (
    <section id="sobre" className="section-shell">
      <p className="section-heading">Sobre</p>
      <h2 className="section-title">Perfil técnico com foco em contexto, dados e entrega operacional</h2>
      <p className="section-copy">{about.overview}</p>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <article className="panel-card p-7">
          <h3 className="text-xl font-semibold text-white">Resumo profissional</h3>
          <p className="mt-4 text-base leading-8 text-muted">{about.technicalProfile}</p>
        </article>

        <article className="panel-card p-7">
          <h3 className="text-xl font-semibold text-white">Diferenciais</h3>
          <ul className="mt-4 space-y-3 text-base leading-7 text-muted">
            {about.differentiators.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="panel-card p-7">
          <h3 className="text-xl font-semibold text-white">Principais áreas de atuação</h3>
          <ul className="mt-4 space-y-3 text-base leading-7 text-muted">
            {about.coreAreas.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel-card p-7">
          <h3 className="text-xl font-semibold text-white">Problemas que resolve</h3>
          <ul className="mt-4 space-y-3 text-base leading-7 text-muted">
            {about.problemsSolved.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
