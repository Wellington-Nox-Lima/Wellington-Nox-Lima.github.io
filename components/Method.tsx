import { Bot, FileText, Layers, Repeat, ScanSearch, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { principles } from "@/data/portfolio";

const icons = {
  search: ScanSearch,
  layers: Layers,
  repeat: Repeat,
  shield: ShieldCheck,
  file: FileText,
  bot: Bot,
} as const;

export function Method() {
  return (
    <section id="metodo" className="container-page pt-24 sm:pt-32">
      <SectionHeader
        index="03"
        label="Como trabalho"
        title="Por que os resultados se repetem"
        intro="O sistema guarda a agenda, o prontuário e o dinheiro das clínicas, e lá um erro custa caro."
      />

      <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((principle) => {
          const Icon = icons[principle.icon];
          return (
            <li key={principle.title} className="bg-surface p-6 sm:p-7">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-semibold tracking-tight">{principle.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{principle.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
