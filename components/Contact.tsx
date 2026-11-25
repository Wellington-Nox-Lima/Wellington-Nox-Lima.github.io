import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { person, whatsappHref } from "@/data/portfolio";

const rowClass =
  "group flex items-center gap-4 rounded-xl border border-line bg-surface px-4 py-3.5 transition-colors hover:border-ink/25";

export function Contact() {
  return (
    <section id="contato" className="container-page py-24 sm:py-32">
      <div className="relative isolate overflow-hidden rounded-3xl border border-line bg-raised/50 p-6 sm:p-12 lg:p-16">
        <div
          aria-hidden="true"
          className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_80%_at_0%_100%,black,transparent)]"
        />
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-accent">05</span>
              <span className="h-px w-8 bg-line" aria-hidden="true" />
              <span>Contato</span>
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Vamos conversar.</h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Estou aberto a oportunidades e projetos em desenvolvimento .NET, dados e migração, em sistemas onde
              consistência importa. Respondo por e-mail ou WhatsApp.
            </p>
          </div>

          <div className="grid gap-2 lg:col-span-5">
            <div className={rowClass}>
              <Mail className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <a href={`mailto:${person.email}`} className="min-w-0 flex-1">
                <span className="block text-xs text-subtle">E-mail</span>
                <span className="block truncate font-medium">{person.email}</span>
              </a>
              <CopyButton value={person.email} label="Copiar e-mail" />
            </div>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className={rowClass}>
              <MessageCircle className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-subtle">WhatsApp</span>
                <span className="block font-medium">{person.whatsapp.display}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a href={person.linkedin} target="_blank" rel="noreferrer" className={rowClass}>
              <Linkedin className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-subtle">LinkedIn</span>
                <span className="block truncate font-medium">/in/{person.linkedinHandle}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a href={person.github} target="_blank" rel="noreferrer" className={rowClass}>
              <Github className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-subtle">GitHub</span>
                <span className="block truncate font-medium">{person.githubHandle}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
