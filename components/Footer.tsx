import { portfolioData } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-muted sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <p>{portfolioData.person.name}</p>
        <p>{new Date().getFullYear()} • Solucoes tecnicas para sistemas, dados e operacoes</p>
      </div>
    </footer>
  );
}
