import { portfolioData } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experiencia" className="section-shell">
      <p className="section-heading">Experiência profissional</p>
      <h2 className="section-title">Atuação em manutenção, evolução e sustentação de sistemas</h2>
      <p className="section-copy">
        Esta seção foi construída para apresentar contexto de trabalho, responsabilidades,
        tecnologias utilizadas e o tipo de entrega realizado no ambiente profissional em que estive.
      </p>

      <div className="mt-12 space-y-6">
        {portfolioData.experience.map((item) => (
          <article key={`${item.role}-${item.period}`} className="panel-card p-7">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white">{item.role}</h3>
                <p className="mt-2 text-base text-muted">{item.company}</p>
              </div>
              <p className="font-mono text-sm uppercase tracking-[0.22em] text-accentSoft">
                {item.period}
              </p>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-accentSoft">
                  Contexto de atuação
                </h4>
                <p className="mt-3 text-base leading-8 text-muted">{item.context}</p>

                <h4 className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-accentSoft">
                  Responsabilidades principais
                </h4>
                <ul className="mt-4 space-y-3 text-base leading-7 text-muted">
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-accent" />
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-accentSoft">
                    Tecnologias usadas
                  </h4>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-accent/15 bg-accent/5 p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-accentSoft">
                    Tipo de entrega
                  </h4>
                  <p className="mt-3 text-base leading-8 text-muted">{item.deliveryType}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
