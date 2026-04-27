"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, LockKeyhole, Play, X } from "lucide-react";
import { portfolioData, type Project } from "@/data/portfolio";
import { withBasePath } from "@/lib/base-path";

const AUTO_SCROLL_INTERVAL_MS = 5000;
const DEFAULT_PROJECT_IMAGE = withBasePath("/images/projects/default-cover.svg");
const DEFAULT_PROJECT_VIDEO_POSTER = withBasePath("/images/projects/default-video-poster.svg");

type EmbedOptions = {
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
};

function getEmbedSrc(src: string, options: EmbedOptions = {}) {
  const { autoplay = false, muted = false, controls = true } = options;
  const url = new URL(src);

  if (url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be")) {
    const id =
      url.searchParams.get("v") ??
      url.pathname.split("/").filter(Boolean).pop() ??
      "";

    if (!id) {
      return src;
    }

    const embedUrl = new URL(`https://www.youtube.com/embed/${id}`);

    if (autoplay) {
      embedUrl.searchParams.set("autoplay", "1");
      embedUrl.searchParams.set("loop", "1");
      embedUrl.searchParams.set("playlist", id);
      embedUrl.searchParams.set("playsinline", "1");
      embedUrl.searchParams.set("modestbranding", "1");
      embedUrl.searchParams.set("rel", "0");
    }

    embedUrl.searchParams.set("controls", controls ? "1" : "0");
    embedUrl.searchParams.set("mute", muted ? "1" : "0");
    embedUrl.searchParams.set("rel", "0");
    embedUrl.searchParams.set("modestbranding", "1");

    return embedUrl.toString();
  }

  return src;
}

export function Projects() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const isInitializingRef = useRef(true);
  const isProgrammaticScrollRef = useRef(false);
  const scrollResetTimerRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [edgeSpacing, setEdgeSpacing] = useState(0);
  const projects = portfolioData.projects;
  const activeProject = projects[activeIndex] ?? projects[0];

  useEffect(() => {
    return () => {
      if (scrollResetTimerRef.current) {
        window.clearTimeout(scrollResetTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller || isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      const nextIndex = (activeIndex + 1) % projects.length;
      goToCard(nextIndex, "smooth");
    }, AUTO_SCROLL_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [activeIndex, isPaused, projects.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const updateActiveCard = () => {
      if (isInitializingRef.current || isProgrammaticScrollRef.current) {
        return;
      }

      const cards = cardRefs.current.filter((card): card is HTMLButtonElement => Boolean(card));

      if (!cards.length) {
        return;
      }

      const scrollerCenter = scroller.scrollLeft + scroller.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const center = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(center - scrollerCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    const firstCard = cardRefs.current[0];

    if (firstCard) {
      firstCard.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "center",
      });
    }

    window.requestAnimationFrame(updateActiveCard);
    scroller.addEventListener("scroll", updateActiveCard, { passive: true });

    return () => scroller.removeEventListener("scroll", updateActiveCard);
  }, [projects.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const updateSpacing = () => {
      const firstCard = cardRefs.current[0];

      if (!firstCard) {
        return;
      }

      const spacing = Math.max((scroller.clientWidth - firstCard.offsetWidth) / 2, 0);
      setEdgeSpacing(spacing);
    };

    updateSpacing();
    window.addEventListener("resize", updateSpacing);

    return () => window.removeEventListener("resize", updateSpacing);
  }, [projects.length]);

  useEffect(() => {
    const firstCard = cardRefs.current[0];

    if (!firstCard || edgeSpacing === 0) {
      return;
    }

    isInitializingRef.current = true;
    setActiveIndex(0);
    window.requestAnimationFrame(() => {
      scrollToCard(0, "auto");

      window.requestAnimationFrame(() => {
        setActiveIndex(0);
        isInitializingRef.current = false;
      });
    });
  }, [edgeSpacing]);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const goToCard = (index: number, behavior: ScrollBehavior = "smooth") => {
    const normalizedIndex = ((index % projects.length) + projects.length) % projects.length;
    setActiveIndex(normalizedIndex);
    isInitializingRef.current = false;
    scrollToCard(normalizedIndex, behavior);
  };

  const scrollToCard = (index: number, behavior: ScrollBehavior) => {
    const scroller = scrollerRef.current;
    const card = cardRefs.current[index];

    if (!scroller || !card) {
      return;
    }

    const targetLeft = Math.max(
      card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2,
      0,
    );

    isProgrammaticScrollRef.current = true;
    scroller.scrollTo({ left: targetLeft, behavior });

    if (scrollResetTimerRef.current) {
      window.clearTimeout(scrollResetTimerRef.current);
    }

    scrollResetTimerRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, behavior === "smooth" ? 900 : 120);
  };

  const handleArrow = (direction: "prev" | "next") => {
    const nextIndex = direction === "next" ? activeIndex + 1 : activeIndex - 1;
    goToCard(nextIndex);
  };

  return (
    <section id="projetos" className="section-shell">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-heading">Projetos em destaque</p>
          <h2 className="section-title">{activeProject.name}</h2>
          <p className="section-copy max-w-2xl">
            {activeProject.summary} Clique para ver o contexto, a solução aplicada e o impacto entregue.
          </p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {projects.map((project, index) => (
            <button
              key={project.name}
              type="button"
              onClick={() => goToCard(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? "w-10 bg-accent" : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Ir para ${project.name}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleArrow("prev")}
            className="rounded-full border border-white/10 bg-white/[0.04] p-3 text-muted transition hover:border-white/25 hover:text-white"
            aria-label="Projeto anterior"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleArrow("next")}
            className="rounded-full border border-white/10 bg-white/[0.04] p-3 text-muted transition hover:border-white/25 hover:text-white"
            aria-label="Próximo projeto"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className="relative mt-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-20 xl:w-24 bg-gradient-to-l from-surface via-surface/80 to-transparent" />

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-6 pt-6 sm:gap-5 xl:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div style={{ width: edgeSpacing }} className="shrink-0" />
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              isActive={index === activeIndex}
              setRef={(element) => {
                cardRefs.current[index] = element;
              }}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
          <div style={{ width: edgeSpacing }} className="shrink-0" />
        </div>
      </div>

      {selectedProject ? (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      ) : null}
    </section>
  );
}

type ProjectCardProps = {
  project: Project;
  isActive: boolean;
  setRef: (element: HTMLButtonElement | null) => void;
  onOpen: () => void;
};

function ProjectCard({ project, isActive, setRef, onOpen }: ProjectCardProps) {
  const cover = project.media[0];
  const embed = project.media.find((asset) => asset.type === "embed");
  const overlayPanelClassName =
    project.overlayPanelClassName ?? "border-white/12 bg-slate-950/94";
  const overlayTagClassName =
    project.overlayTagClassName ?? "border-white/15 bg-slate-900/90 text-accentSoft";
  const overlayTitleClassName = project.overlayTitleClassName ?? "text-white";
  const overlayTextClassName = project.overlayTextClassName ?? "text-slate-100";
  const overlayChipClassName =
    project.overlayChipClassName ?? "border-white/15 bg-slate-900/95 text-slate-50";

  return (
    <button
      ref={setRef}
      type="button"
      data-project-card="true"
      onClick={onOpen}
      className={`group relative w-[clamp(280px,32vw,390px)] min-w-[clamp(280px,32vw,390px)] max-w-[390px] snap-start overflow-hidden rounded-[30px] border border-white/10 bg-panel text-left transition duration-300 ${
        isActive ? "shadow-glow" : ""
      } hover:z-20 hover:-translate-y-3 hover:scale-[1.04] hover:border-accent/30`}
    >
      <div className="relative aspect-[16/10.25] overflow-hidden">
        {embed ? (
          <iframe
            src={getEmbedSrc(embed.src, { autoplay: true, muted: true, controls: false })}
            title={embed.label}
            className="pointer-events-none h-full w-full scale-[1.24] object-cover transition duration-500 group-hover:scale-[1.3]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
            aria-hidden="true"
          />
        ) : (
          <MediaImage
            src={cover?.src}
            alt={project.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            fallbackLabel="Adicione image-01.webp para ativar a capa"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/78 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 sm:h-32 bg-gradient-to-t from-[#020817] via-[#020817]/88 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 px-3 pb-4 pt-3 sm:px-3.5 sm:pb-5 sm:pt-3.5">
          <div className={`rounded-[20px] border px-3 py-3 shadow-[0_18px_40px_rgba(2,6,23,0.65)] backdrop-blur-md sm:rounded-[22px] sm:px-4 sm:py-3.5 ${overlayPanelClassName}`}>
            <div>
              <h3 className={`line-clamp-2 max-w-[16ch] text-[clamp(1rem,1.55vw,1.22rem)] font-semibold leading-[1.08] drop-shadow-[0_2px_10px_rgba(2,6,23,0.9)] ${overlayTitleClassName}`}>
                {project.name}
              </h3>
              <p className={`mt-1.5 line-clamp-2 max-w-[24ch] text-[clamp(11px,1.05vw,12px)] leading-[1.32rem] drop-shadow-[0_1px_8px_rgba(2,6,23,0.8)] ${overlayTextClassName}`}>
                {project.summary}
              </p>
            </div>

            <div className="mt-3 flex items-end justify-between gap-2 sm:mt-3.5 sm:gap-3">
              <div className="flex max-w-[76%] flex-wrap gap-1.5">
                {project.isConfidential ? (
                  <span
                    className={`stack-chip inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[8px] uppercase tracking-[0.14em] sm:text-[9px] ${overlayChipClassName}`}
                  >
                    <LockKeyhole className="h-2.5 w-2.5" />
                    Stack confidencial
                  </span>
                ) : (
                  project.stack.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className={`stack-chip rounded-full border px-2 py-1 text-[8px] uppercase tracking-[0.14em] sm:text-[9px] ${overlayChipClassName}`}
                    >
                      {item}
                    </span>
                  ))
                )}
              </div>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-slate-950 shadow-lg transition group-hover:scale-105 sm:h-10 sm:w-10">
                <Play className="h-3 w-3 fill-current sm:h-3.5 sm:w-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const gallery = useMemo(
    () => project.media.filter((asset) => asset.type === "image").slice(0, 3),
    [project.media],
  );
  const embed = project.media.find((asset) => asset.type === "embed");
  const [activeImageSrc, setActiveImageSrc] = useState(gallery[0]?.src ?? project.media[0]?.src);
  const [activeImageAlt, setActiveImageAlt] = useState(gallery[0]?.label ?? project.name);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const overlayTitleClassName = project.overlayTitleClassName ?? "text-white";
  const overlayTextClassName = project.overlayTextClassName ?? "text-slate-200";

  useEffect(() => {
    setActiveImageSrc(gallery[0]?.src ?? project.media[0]?.src);
    setActiveImageAlt(gallery[0]?.label ?? project.name);
    setIsImageVisible(true);
  }, [gallery, project]);

  const changeActiveImage = (src: string, alt: string) => {
    if (src === activeImageSrc) {
      return;
    }

    setIsImageVisible(false);

    window.setTimeout(() => {
      setActiveImageSrc(src);
      setActiveImageAlt(alt);
      setIsImageVisible(true);
    }, 190);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-[#101418] shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75"
          aria-label="Fechar detalhes do projeto"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="max-h-[92vh] overflow-y-auto">
          <div className="relative aspect-[16/7] overflow-hidden">
            <div
              className={`h-full w-full transition-opacity duration-300 ${
                isImageVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex h-full w-full items-center justify-center bg-[#07111f] p-3 sm:p-5 lg:p-6">
                <MediaImage
                  src={activeImageSrc}
                  alt={activeImageAlt}
                  className="h-full w-full rounded-2xl object-contain shadow-[0_18px_50px_rgba(2,8,23,0.45)]"
                  fallbackLabel="Adicione a imagem principal do projeto"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#101418] via-[#101418]/35 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-accentSoft">
                Projeto em destaque
              </div>
              <h3 className={`mt-5 max-w-3xl text-3xl font-semibold sm:text-5xl ${overlayTitleClassName}`}>
                {project.name}
              </h3>
              <p className={`mt-4 max-w-3xl text-sm leading-7 sm:text-base ${overlayTextClassName}`}>
                {project.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Ver detalhes
                </button>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white"
                  >
                    Acessar link
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="grid gap-4 sm:grid-cols-3">
                {gallery.map((asset) => (
                  <button
                    key={asset.src}
                    type="button"
                    onClick={() => {
                      changeActiveImage(asset.src, asset.label);
                    }}
                    className={`group overflow-hidden rounded-2xl border bg-black/20 text-left transition duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg ${
                      activeImageSrc === asset.src ? "border-accent/60 shadow-glow" : "border-white/10"
                    }`}
                    aria-label={`Visualizar ${asset.label}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <MediaImage
                        src={asset.src}
                        alt={asset.label}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        fallbackLabel={asset.label}
                      />
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-5 overflow-hidden rounded-3xl border border-white/10 bg-black/20">
                {embed ? (
                  <iframe
                    src={getEmbedSrc(embed.src, { autoplay: true, muted: false, controls: true })}
                    title={embed.label}
                    className="aspect-[16/9] w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <div className="flex h-full w-full items-center justify-center bg-[#07111f] p-3 sm:p-4">
                      <MediaImage
                        src={gallery[0]?.src ?? project.media[0]?.src}
                        alt={gallery[0]?.label ?? project.name}
                        className="h-full w-full rounded-2xl object-contain shadow-[0_14px_36px_rgba(2,8,23,0.4)]"
                        fallbackLabel="Adicione image-01.webp para ativar a mídia principal"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-accentSoft">Problema resolvido</p>
                <p className="mt-3 text-base leading-8 text-muted">{project.problem}</p>
              </div>

              <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-accentSoft">Atuação</p>
                <p className="mt-3 text-base leading-8 text-muted">{project.role}</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-accentSoft">Stack utilizada</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.isConfidential ? (
                    <span className="stack-chip inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-muted">
                      <LockKeyhole className="h-3.5 w-3.5 text-accentSoft" />
                      Stack confidencial
                    </span>
                  ) : (
                    project.stack.map((item) => (
                      <span
                        key={item}
                        className="stack-chip rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-muted"
                      >
                        {item}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-accent/15 bg-accent/5 p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-accentSoft">Resultado / impacto</p>
                <p className="mt-3 text-base leading-8 text-muted">{project.impact}</p>
              </div>

              {project.privacyNote ? (
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="flex items-start gap-3">
                    <LockKeyhole className="mt-1 h-4 w-4 shrink-0 text-accentSoft" />
                    <p className="text-base leading-8 text-muted">{project.privacyNote}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type MediaImageProps = {
  src?: string;
  alt: string;
  className: string;
  fallbackLabel: string;
};

function MediaImage({ src, alt, className, fallbackLabel }: MediaImageProps) {
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    if (!src) {
      setResolvedSrc(null);
      return () => {
        isCancelled = true;
      };
    }

    const image = new Image();
    image.onload = () => {
      if (!isCancelled) {
        setResolvedSrc(src);
      }
    };
    image.onerror = () => {
      if (!isCancelled) {
        setResolvedSrc(null);
      }
    };
    image.src = src;

    return () => {
      isCancelled = true;
    };
  }, [src]);

  if (!resolvedSrc) {
    return (
      <div className="relative h-full w-full">
        <img src={DEFAULT_PROJECT_IMAGE} alt={fallbackLabel} className={`${className} opacity-45`} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,23,0.28),rgba(2,8,23,0.68))]" />
      </div>
    );
  }

  return <img src={resolvedSrc} alt={alt} className={className} />;
}
