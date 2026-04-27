import {
  FolderKanban,
  GitBranch,
  Github,
  LaptopMinimalCheck,
  ShieldCheck,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const icons = [FolderKanban, LaptopMinimalCheck, GitBranch, ShieldCheck];

export function GithubSection() {
  return (
    <section id="github" className="section-shell">
      <div className="panel-card overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div className="border-b border-white/10 p-8 lg:border-b-0 lg:border-r">
            {/* Seção estratégica para usar o GitHub como prova técnica do trabalho. */}
            <p className="section-heading">GitHub / Prova técnica</p>
            <h2 className="section-title mt-4">
              Repositórios como vitrine de organização, prática e consistência
            </h2>
            <p className="section-copy mt-5 max-w-none">{portfolioData.github.copy}</p>

            <a
              href={portfolioData.person.github}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              <Github className="h-4 w-4" />
              Acessar GitHub
            </a>
          </div>

          <div className="grid gap-4 p-8">
            {portfolioData.github.highlights.map((item, index) => {
              const Icon = icons[index];

              return (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/10 p-5 text-sm leading-7 text-muted"
                >
                  <Icon className="mb-4 h-5 w-5 text-accentSoft" />
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
