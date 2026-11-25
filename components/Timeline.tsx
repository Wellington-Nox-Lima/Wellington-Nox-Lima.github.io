import { Building2 } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { experience, timeline } from "@/data/portfolio";

export function Timeline() {
  return (
    <section id="trajetoria" className="container-page pt-24 sm:pt-32">
      <SectionHeader index="04" label="Trajetória" title="Experiência" />

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="card p-6 sm:p-8 lg:sticky lg:top-24">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-raised text-muted">
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold tracking-tight">{experience.role}</h3>
                <p className="mt-0.5 text-sm text-muted">{experience.company}</p>
              </div>
            </div>
            <p className="mt-5 inline-flex rounded-md bg-raised px-2 py-1 font-mono text-[0.72rem] text-muted">{experience.period}</p>
            <p className="mt-5 text-[0.95rem] leading-7 text-muted">{experience.summary}</p>
          </div>
        </div>

        <ol className="relative lg:col-span-7">
          <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-line" />
          {timeline.map((item, index) => (
            <li key={item.period} className="relative pb-10 pl-9 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-[0.4rem] h-[11px] w-[11px] rounded-full border-2 ${
                  index === 0 ? "border-accent bg-accent" : "border-line bg-bg"
                }`}
              />
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-subtle">{item.period}</p>
              <h3 className="mt-1.5 text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-1.5 leading-7 text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
