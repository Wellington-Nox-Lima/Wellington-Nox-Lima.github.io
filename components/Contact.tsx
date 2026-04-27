import { Github, Linkedin, Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export function Contact() {
  const { person, contact } = portfolioData;

  return (
    <section id="contato" className="section-shell">
      <div className="panel-card p-8 sm:p-10">
        <p className="section-heading">Contato</p>
        <h2 className="section-title">Vamos conversar sobre oportunidades e projetos</h2>
        <p className="section-copy max-w-4xl">{contact.closing}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <a
            href={`mailto:${person.email}`}
            className="rounded-2xl border border-white/10 bg-black/10 p-5 transition hover:border-white/20 hover:bg-white/[0.03]"
            aria-label={`Enviar email para ${person.email}`}
          >
            <Mail className="h-5 w-5 text-accentSoft" />
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-muted">Email</p>
          </a>

          <a
            href={person.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-white/10 bg-black/10 p-5 transition hover:border-white/20 hover:bg-white/[0.03]"
            aria-label="Abrir GitHub"
          >
            <Github className="h-5 w-5 text-accentSoft" />
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-muted">GitHub</p>
          </a>

          <a
            href={person.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-white/10 bg-black/10 p-5 transition hover:border-white/20 hover:bg-white/[0.03]"
            aria-label="Abrir LinkedIn"
          >
            <Linkedin className="h-5 w-5 text-accentSoft" />
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-muted">LinkedIn</p>
          </a>
        </div>
      </div>
    </section>
  );
}
