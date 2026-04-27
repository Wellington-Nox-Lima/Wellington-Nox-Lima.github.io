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

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {portfolioData.technologies.map((group) => (
          <article key={group.title} className="panel-card p-7">
            <h3 className="text-lg font-semibold text-white">{group.title}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-muted"
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
