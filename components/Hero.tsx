import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export function Hero() {
  const { person } = portfolioData;

  return (
    <section id="inicio" className="section-shell pt-16 sm:pt-24">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>

          <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {person.name}
          </h1>

          <p className="mt-5 text-xl font-medium text-accentSoft sm:text-2xl">
            {person.title}
          </p>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted sm:text-xl">
            {person.shortPitch}
          </p>

          <p className="mt-8 max-w-3xl text-base leading-8 text-muted">
            {person.summary}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projetos"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-accentSoft"
            >
              Ver projetos
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={person.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={`mailto:${person.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              <Mail className="h-4 w-4" />
              Contato
            </a>
          </div>
        </div>

        <div className="panel-card overflow-hidden shadow-glow">
          <div className="border-b border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accentSoft">
                  Perfil tecnico
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Entrega orientada a confiabilidade
                </h2>
              </div>
              <div className="rounded-2xl border border-accent/20 bg-accent/10 px-3 py-2 text-right">
                <p className="text-xs uppercase tracking-[0.22em] text-accentSoft">Base</p>
                <p className="mt-1 text-sm font-semibold text-white">.NET + SQL Server</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Aplicacoes web corporativas",
                "Importacao e saneamento de dados",
                "Automacao de processos internos",
                "Consultas SQL e regras de negocio",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/10 p-4 text-sm text-muted"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
              <div className="flex items-center gap-3 text-sm text-muted">
                <MapPin className="h-4 w-4 text-accentSoft" />
                <span>{person.location}</span>
              </div>
              <div className="mt-4 h-px bg-white/10" />
              <div className="mt-4 flex flex-wrap gap-2">
                {["C#", "ASP.NET MVC", "SQL Server", "JavaScript", "Redis", "Power Automate"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-muted"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
