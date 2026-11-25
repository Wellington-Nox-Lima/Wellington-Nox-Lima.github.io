import { ArrowRight, Github, Linkedin } from "lucide-react";
import { hero, person } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate -mt-16 overflow-hidden pt-16">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_20%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-48 left-1/2 -z-10 h-[520px] w-[min(1000px,140vw)] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="container-page pb-16 pt-12 sm:pt-16 lg:pb-20 lg:pt-20">
        <div className="max-w-4xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-xs text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-ok" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
            </span>
            Aberto a conversas · {person.location}
          </p>

          <p className="mt-6 text-base font-semibold tracking-tight sm:text-lg">{person.name}</p>
          <p className="mt-1 text-sm text-muted">{hero.role}</p>

          <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-6xl lg:text-[4.25rem]">
            {hero.headline.before} <span className="text-accent">{hero.headline.highlight}</span>{" "}
            {hero.headline.after}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">{hero.sub}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#resultados" className="btn-primary group">
              Ver resultados
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a href="#contato" className="btn-ghost">
              Falar comigo
            </a>
            <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden="true" />
            <span className="flex items-center gap-1">
              <a
                href={person.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-raised hover:text-ink"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-raised hover:text-ink"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
