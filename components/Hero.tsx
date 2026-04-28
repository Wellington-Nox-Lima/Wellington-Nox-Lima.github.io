import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export function Hero() {
  const { person } = portfolioData;

  return (
    <section id="inicio" className="section-shell pt-10 sm:pt-24">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="hero-intro">

          <h1 className="hero-reveal hero-delay-1 mt-6 max-w-4xl text-[2.65rem] font-semibold leading-[0.98] tracking-tight text-white sm:mt-8 sm:text-6xl lg:text-7xl">
            {person.name}
          </h1>

          <p className="hero-reveal hero-delay-2 mt-4 text-lg font-medium leading-7 text-accentSoft sm:mt-5 sm:text-2xl">
            {person.title}
          </p>

          <p className="hero-reveal hero-delay-3 mt-5 max-w-3xl text-base leading-7 text-muted sm:mt-6 sm:text-xl sm:leading-8">
            {person.shortPitch}
          </p>

          <p className="hero-reveal hero-delay-4 mt-6 max-w-3xl text-[15px] leading-7 text-muted sm:mt-8 sm:text-base sm:leading-8">
            {person.summary}
          </p>

          <div className="hero-reveal hero-delay-5 mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:gap-4">
            <a
              href="#projetos"
              className="col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-accentSoft sm:col-auto sm:px-6"
            >
              Ver projetos
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={person.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5 sm:px-6"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5 sm:px-6"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={`mailto:${person.email}`}
              className="col-span-2 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5 sm:col-auto sm:px-6"
            >
              <Mail className="h-4 w-4" />
              Contato
            </a>
          </div>
        </div>

        <div className="hero-reveal hero-delay-4 panel-card overflow-hidden shadow-glow">
          <div className="border-b border-white/10 p-5 sm:p-6">
            <div className="grid gap-4 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accentSoft">
                  Perfil tecnico
                </p>
                <h2 className="mt-3 text-xl font-semibold leading-tight text-white sm:text-2xl">
                  Entrega orientada a confiabilidade
                </h2>
              </div>
              <div className="w-fit rounded-2xl border border-accent/20 bg-accent/10 px-3 py-2 text-left sm:text-right">
                <p className="text-xs uppercase tracking-[0.22em] text-accentSoft">Base</p>
                <p className="mt-1 text-sm font-semibold text-white">.NET + SQL Server</p>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-5 sm:space-y-6 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {[
                "Aplicacoes web corporativas",
                "Importacao e saneamento de dados",
                "Automacao de processos internos",
                "Consultas SQL e regras de negocio",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/10 p-3 text-sm text-muted sm:p-4"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/10 p-4 sm:p-5">
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
