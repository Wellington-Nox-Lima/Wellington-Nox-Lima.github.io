type SectionHeaderProps = {
  index: string;
  label: string;
  title: string;
  intro?: string;
};

export function SectionHeader({ index, label, title, intro }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow flex items-center gap-3">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-line" aria-hidden="true" />
        <span>{label}</span>
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {intro ? <p className="mt-4 text-base leading-7 text-muted sm:text-lg sm:leading-8">{intro}</p> : null}
    </div>
  );
}
