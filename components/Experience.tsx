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

      <div className="mt-8 space-y-4 sm:mt-12 sm:space-y-6">
        {portfolioData.experience.map((item) => (
          <article key={`${item.role}-${item.period}`} className="panel-card p-5 sm:p-7">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:gap-4 sm:pb-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl">{item.role}</h3>
                <p className="mt-2 text-base text-muted">{item.company}</p>
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accentSoft sm:text-sm sm:tracking-[0.22em]">
                {item.period}
              </p>
            </div>

            <div className="mt-5 grid gap-5 sm:mt-6 sm:gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-accentSoft sm:text-sm sm:tracking-[0.2em]">
                  Contexto de atuação
                </h4>
                <p className="mt-3 text-[15px] leading-7 text-muted sm:text-base sm:leading-8">{item.context}</p>

                <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-accentSoft sm:mt-8 sm:text-sm sm:tracking-[0.2em]">
                  Responsabilidades principais
                </h4>
                <ul className="mt-3 space-y-3 text-[15px] leading-7 text-muted sm:mt-4 sm:text-base">
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4 sm:p-5">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-accentSoft sm:text-sm sm:tracking-[0.2em]">
                    Tecnologias usadas
                  </h4>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] text-muted sm:text-xs sm:tracking-[0.12em]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-accent/15 bg-accent/5 p-4 sm:p-5">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-accentSoft sm:text-sm sm:tracking-[0.2em]">
                    Tipo de entrega
                  </h4>
                  <p className="mt-3 text-[15px] leading-7 text-muted sm:text-base sm:leading-8">{item.deliveryType}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
