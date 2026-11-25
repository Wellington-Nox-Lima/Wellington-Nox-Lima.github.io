import { SectionHeader } from "@/components/SectionHeader";
import { deliveryAreas } from "@/data/portfolio";

/** Entregas: listas rápidas por área, todas à vista, uma linha por entrega. */
export function Deliveries() {
  return (
    <section id="entregas" className="container-page pt-24 sm:pt-32">
      <SectionHeader
        index="02"
        label="Entregas"
        title="Mais resultados, área por área"
        intro="O que passou a funcionar para quem usa o sistema, uma linha por entrega."
      />

      <div className="mt-12 gap-5 sm:columns-2 lg:columns-3">
        {deliveryAreas.map((area) => (
          <section
            key={area.id}
            aria-labelledby={`area-${area.id}`}
            className="card mb-5 break-inside-avoid p-6 sm:p-7"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 id={`area-${area.id}`} className="font-semibold tracking-tight">
                {area.title}
              </h3>
              {area.note ? <p className="font-mono text-[0.72rem] text-subtle">{area.note}</p> : null}
            </div>
            <ul className="mt-4 space-y-2.5">
              {area.items.map((item) => (
                <li key={item} className="flex gap-3 text-[0.92rem] leading-6 text-muted">
                  <span className="mt-[0.7rem] h-px w-2.5 shrink-0 bg-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
