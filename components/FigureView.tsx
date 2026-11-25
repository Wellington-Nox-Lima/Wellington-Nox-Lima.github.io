import { ArrowRight } from "lucide-react";
import type { Figure } from "@/data/portfolio";

const sizes = {
  md: "text-4xl sm:text-[2.6rem]",
  lg: "text-5xl sm:text-6xl",
} as const;

type FigureViewProps = {
  figure: Figure;
  size?: keyof typeof sizes;
};

export function DeltaBadge({ delta }: { delta: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-ok/10 px-1.5 py-0.5 font-mono text-xs font-medium text-ok">
      {delta}
    </span>
  );
}

/** Resultado como antes → hoje: o antes pequeno e riscado, o hoje grande e em destaque. */
export function FigureView({ figure, size = "md" }: FigureViewProps) {
  return (
    <div>
      {figure.before ? (
        <p className="flex items-center gap-2 text-sm text-muted">
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-subtle">antes</span>
          <span className="line-through decoration-subtle/60">{figure.before}</span>
          <ArrowRight className="h-3.5 w-3.5 text-subtle" aria-label="para" />
        </p>
      ) : null}
      <p className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span
          className={`${sizes[size]} font-semibold tabular-nums tracking-[-0.035em] ${
            figure.before ? "text-accent" : ""
          }`}
        >
          {figure.after}
        </span>
        {figure.delta ? <DeltaBadge delta={figure.delta} /> : null}
      </p>
    </div>
  );
}
