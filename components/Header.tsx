"use client";

import { ArrowUpRight, Linkedin, Mail, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { LogoMark } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { navItems, person, whatsappHref } from "@/data/portfolio";

// "inicio" e "contato" não estão no menu: ao passar por eles, nenhum item fica destacado.
const observedSections = ["inicio", ...navItems.map((item) => item.href.slice(1)), "contato"];

function ContactLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="grid gap-1.5">
      <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-raised">
        <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        <a href={`mailto:${person.email}`} onClick={onNavigate} className="min-w-0 flex-1">
          <span className="block text-sm font-medium">E-mail</span>
          <span className="block truncate text-sm text-muted">{person.email}</span>
        </a>
        <CopyButton value={person.email} label="Copiar e-mail" />
      </div>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        onClick={onNavigate}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-raised"
      >
        <MessageCircle className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium">WhatsApp</span>
          <span className="block text-sm text-muted">{person.whatsapp.display}</span>
        </span>
        <ArrowUpRight className="h-4 w-4 text-subtle" aria-hidden="true" />
      </a>
      <a
        href={person.linkedin}
        target="_blank"
        rel="noreferrer"
        onClick={onNavigate}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-raised"
      >
        <Linkedin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium">LinkedIn</span>
          <span className="block text-sm text-muted">/in/{person.linkedinHandle}</span>
        </span>
        <ArrowUpRight className="h-4 w-4 text-subtle" aria-hidden="true" />
      </a>
    </div>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  // Abre no topo, salvo quando o link aponta para uma seção.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (!window.location.hash || window.location.hash === "#inicio") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Destaca no menu a seção que está no meio da tela.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    observedSections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!contactRef.current?.contains(event.target as Node)) setContactOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContactOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? "border-line bg-bg/80 backdrop-blur-xl" : "border-transparent bg-bg/0"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Ir para o início">
            <LogoMark className="h-8 w-8" />
            <span className="text-sm font-semibold tracking-tight">{person.shortName}</span>
          </a>

          <nav aria-label="Seções" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                    isActive ? "bg-raised text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <div ref={contactRef} className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setContactOpen((open) => !open)}
                aria-expanded={contactOpen}
                aria-haspopup="true"
                className="inline-flex h-9 items-center rounded-full bg-ink px-4 text-sm font-medium text-bg transition-colors hover:bg-ink/85"
              >
                Falar comigo
              </button>
              {contactOpen ? (
                <div className="card absolute right-0 top-[calc(100%+10px)] w-[300px] p-2 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.35)]">
                  <p className="eyebrow px-3 pb-1 pt-2">Escolha o canal</p>
                  <ContactLinks onNavigate={() => setContactOpen(false)} />
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:text-ink lg:hidden"
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Fora do <header>: o backdrop-blur dele viraria a referência do position: fixed. */}
      {menuOpen ? (
        <div className="fixed inset-0 z-[90] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
          />
          <aside className="absolute right-0 top-0 flex h-dvh w-[86vw] max-w-[360px] flex-col border-l border-line bg-bg">
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <span className="flex items-center gap-3">
                <LogoMark className="h-8 w-8" />
                <span className="text-sm font-semibold">{person.shortName}</span>
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface"
                aria-label="Fechar menu"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Seções" className="grid gap-1 p-4">
              {[...navItems, { label: "Contato", href: "#contato" }].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium transition-colors hover:bg-raised"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto border-t border-line p-4">
              <p className="eyebrow px-3 pb-2">Contato</p>
              <ContactLinks onNavigate={() => setMenuOpen(false)} />
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
