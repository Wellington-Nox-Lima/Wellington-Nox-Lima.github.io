import { ArrowUp } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { person } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark className="h-6 w-6" />
          <span>
            © {new Date().getFullYear()} {person.name}
          </span>
        </div>
        <p className="font-mono text-[0.72rem] text-subtle">Next.js · Tailwind CSS · GitHub Pages</p>
        <a href="#inicio" className="inline-flex items-center gap-1.5 transition-colors hover:text-ink">
          Voltar ao topo
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
