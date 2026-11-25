"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

const STORAGE_KEY = "theme";

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

/**
 * Alterna claro/escuro. O ícone é escolhido por CSS (dark:), então o HTML do servidor
 * e o do cliente são iguais e não há troca visível na hidratação.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  // Sem preferência salva, acompanha o sistema quando ele muda.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(STORAGE_KEY);
      } catch {
        saved = null;
      }
      if (!saved) applyTheme(event.matches);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const dark = !document.documentElement.classList.contains("dark");
    applyTheme(dark);
    try {
      localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
    } catch {
      // Armazenamento bloqueado: o tema vale só para esta visita.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-ink/30 hover:text-ink ${className}`}
      aria-label="Alternar tema claro ou escuro"
      title="Alternar tema"
    >
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
      <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
    </button>
  );
}
