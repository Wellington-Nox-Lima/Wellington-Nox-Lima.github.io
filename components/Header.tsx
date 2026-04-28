"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail, MessageCircle } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const navItems = [
  { label: "Sobre", href: "#sobre" },
  { label: "Stack", href: "#stack" },
  { label: "Projetos", href: "#projetos" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const whatsappNumber = "5519983267236";
  const whatsappMessage =
    "Olá, Wellington. Vi seu portfólio e gostaria de iniciar um contato sobre uma oportunidade ou projeto.";
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!contactRef.current?.contains(event.target as Node)) {
        setIsContactOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (window.location.hash === "#inicio") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.person.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-surface/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <a
          href="#inicio"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] shadow-[0_12px_30px_rgba(3,10,22,0.35)] transition hover:border-accent/40 hover:bg-white/[0.05]"
          aria-label={`Ir para o topo do portfólio de ${portfolioData.person.name}`}
        >
          <Image
            src="/brand-icon.png"
            alt="Ícone WL"
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover"
          />
        </a>

        <nav className="hidden items-center gap-6 text-sm text-muted lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div ref={contactRef} className="relative">
          <button
            type="button"
            onClick={() => setIsContactOpen((current) => !current)}
            className="rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accentSoft transition hover:border-accent/50 hover:bg-accent/15"
          >
            Falar comigo
          </button>

          {isContactOpen ? (
            <div className="absolute right-0 top-[calc(100%+12px)] w-[290px] rounded-3xl border border-white/10 bg-surface/95 p-3 shadow-2xl backdrop-blur-xl">
              <p className="px-3 pb-2 text-xs uppercase tracking-[0.22em] text-accentSoft">
                Escolha o contato
              </p>

              <a
                href={`mailto:${portfolioData.person.email}`}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 pr-3 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <Mail className="mt-0.5 h-4 w-4 text-accentSoft" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-white">Enviar email</span>
                  <span className="mt-1 block break-all text-sm text-muted">
                    {portfolioData.person.email}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    handleCopyEmail();
                  }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 text-muted transition hover:border-white/20 hover:text-white"
                  aria-label="Copiar email"
                  title="Copiar email"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-accentSoft" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <MessageCircle className="mt-0.5 h-4 w-4 text-accentSoft" />
                <span>
                  <span className="block text-sm font-semibold text-white">Enviar mensagem</span>
                  <span className="mt-1 block text-sm text-muted">
                    WhatsApp: (19) 98326-7236
                  </span>
                </span>
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
