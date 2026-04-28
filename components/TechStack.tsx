import { portfolioData } from "@/data/portfolio";

export function TechStack() {
  return (
    <section id="stack" className="section-shell">
      <p className="section-heading">Stack</p>
      <h2 className="section-title">Tecnologias organizadas pelo tipo de entrega</h2>
      <p className="section-copy">
        Estruturado para destacar experiência práticas e ferramentas de trabalho utilizadas em cenários
        corporativos.
      </p>

      <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {portfolioData.technologies.map((group) => (
          <article key={group.title} className="panel-card p-5 sm:p-7">
            <h3 className="text-lg font-semibold text-white">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[13px] text-muted sm:py-2 sm:text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
