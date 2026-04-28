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

      <div className="mt-6 flex items-center justify-between gap-4 sm:mt-8">
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
            className="rounded-full border border-white/10 bg-white/[0.04] p-2.5 text-muted transition hover:border-white/25 hover:text-white sm:p-3"
            aria-label="Projeto anterior"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleArrow("next")}
            className="rounded-full border border-white/10 bg-white/[0.04] p-2.5 text-muted transition hover:border-white/25 hover:text-white sm:p-3"
            aria-label="Próximo projeto"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className="relative mt-7 sm:mt-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-20 xl:w-24 bg-gradient-to-l from-surface via-surface/80 to-transparent" />

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-0 pb-5 pt-3 sm:gap-5 sm:px-1 sm:pb-6 sm:pt-6 xl:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
      className={`group relative w-[min(84vw,390px)] min-w-[min(84vw,390px)] max-w-[390px] snap-start overflow-hidden rounded-2xl border border-white/10 bg-panel text-left transition duration-300 sm:rounded-[30px] ${
        isActive ? "shadow-glow" : ""
      } hover:border-accent/30 sm:hover:z-20 sm:hover:-translate-y-3 sm:hover:scale-[1.04]`}
    >
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10.25]">
        {embed ? (
          <iframe
            src={getEmbedSrc(embed.src, { autoplay: true, muted: true, controls: false })}
            title={embed.label}
            className="pointer-events-none h-full w-full scale-[1.18] object-cover transition duration-500 sm:scale-[1.24] sm:group-hover:scale-[1.3]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
            aria-hidden="true"
          />
        ) : (
          <MediaImage
            src={cover?.src}
            alt={project.name}
            className="h-full w-full object-cover transition duration-500 sm:group-hover:scale-110"
            fallbackLabel="Adicione image-00.webp para ativar a capa"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/78 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#020817] via-[#020817]/88 to-transparent sm:h-32" />

        <div className="absolute inset-x-0 bottom-0 px-2.5 pb-3 pt-3 sm:px-3.5 sm:pb-5 sm:pt-3.5">
          <div className={`rounded-2xl border px-3 py-3 shadow-[0_18px_40px_rgba(2,6,23,0.65)] backdrop-blur-md sm:rounded-[22px] sm:px-4 sm:py-3.5 ${overlayPanelClassName}`}>
            <div>
              <h3 className={`line-clamp-2 max-w-[18ch] text-base font-semibold leading-tight drop-shadow-[0_2px_10px_rgba(2,6,23,0.9)] sm:max-w-[16ch] sm:text-[clamp(1rem,1.55vw,1.22rem)] sm:leading-[1.08] ${overlayTitleClassName}`}>
                {project.name}
              </h3>
              <p className={`mt-1.5 line-clamp-2 max-w-[26ch] text-xs leading-5 drop-shadow-[0_1px_8px_rgba(2,6,23,0.8)] sm:max-w-[24ch] sm:text-[clamp(11px,1.05vw,12px)] sm:leading-[1.32rem] ${overlayTextClassName}`}>
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

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-slate-950 shadow-lg transition sm:h-10 sm:w-10 sm:group-hover:scale-105">
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
    () => project.media.filter((asset) => asset.type === "image").slice(1, 4),
    [project.media],
  );
  const embed = project.media.find((asset) => asset.type === "embed");
  const shouldFillImages = project.name === "Importador e Validador de Planilhas";
  const [activeImageSrc, setActiveImageSrc] = useState(gallery[0]?.src ?? project.media[1]?.src);
  const [activeImageAlt, setActiveImageAlt] = useState(gallery[0]?.label ?? project.name);
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [expandedImage, setExpandedImage] = useState<{ src: string; alt: string } | null>(null);
  const overlayTitleClassName = project.overlayTitleClassName ?? "text-white";
  const overlayTextClassName = project.overlayTextClassName ?? "text-slate-200";
  const displayedImageSrc = previewImage?.src ?? activeImageSrc;
  const displayedImageAlt = previewImage?.alt ?? activeImageAlt;
  const displayedImageIndex = Math.max(
    gallery.findIndex((asset) => asset.src === displayedImageSrc),
    0,
  );

  useEffect(() => {
    setActiveImageSrc(gallery[0]?.src ?? project.media[1]?.src);
    setActiveImageAlt(gallery[0]?.label ?? project.name);
    setPreviewImage(null);
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

  const openExpandedImage = (src: string, alt: string) => {
    setExpandedImage({ src, alt });
  };

  const navigateExpandedImage = (direction: "prev" | "next") => {
    if (!gallery.length || !expandedImage) {
      return;
    }

    const currentIndex = gallery.findIndex((asset) => asset.src === expandedImage.src);
    const fallbackIndex = currentIndex >= 0 ? currentIndex : displayedImageIndex;
    const nextIndex =
      direction === "next"
        ? (fallbackIndex + 1) % gallery.length
        : (fallbackIndex - 1 + gallery.length) % gallery.length;

    const nextImage = gallery[nextIndex];
    if (!nextImage) {
      return;
    }

    setExpandedImage({ src: nextImage.src, alt: nextImage.label });
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="relative max-h-[94vh] w-full max-w-6xl overflow-hidden rounded-t-3xl border border-white/10 bg-[#101418] shadow-2xl sm:max-h-[92vh] sm:rounded-[32px]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/75 sm:right-5 sm:top-5 sm:h-11 sm:w-11"
          aria-label="Fechar detalhes do projeto"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="max-h-[94vh] overflow-y-auto sm:max-h-[92vh]">
          <div className="relative min-h-[420px] overflow-hidden sm:aspect-[16/7] sm:min-h-0">
            <div
              className={`h-full w-full transition-opacity duration-300 ${
                isImageVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <button
                type="button"
                onClick={() => openExpandedImage(displayedImageSrc ?? "", displayedImageAlt)}
                className="flex h-full min-h-[420px] w-full items-start justify-center bg-[#07111f] p-3 pb-40 text-left sm:min-h-0 sm:items-center sm:p-5 lg:p-6"
                aria-label={`Expandir ${displayedImageAlt}`}
              >
                <MediaImage
                  src={displayedImageSrc}
                  alt={displayedImageAlt}
                  className={`h-auto max-h-[260px] w-full rounded-2xl shadow-[0_18px_50px_rgba(2,8,23,0.45)] sm:h-full sm:max-h-none ${
                    shouldFillImages ? "object-fill" : "object-contain"
                  }`}
                  fallbackLabel="Adicione a imagem principal do projeto"
                />
              </button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#101418] via-[#101418]/35 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-10">
              <h3 className={`max-w-3xl text-2xl font-semibold leading-tight sm:text-5xl ${overlayTitleClassName}`}>
                {project.name}
              </h3>
              <p className={`mt-3 max-w-3xl text-sm leading-6 sm:mt-4 sm:text-base sm:leading-7 ${overlayTextClassName}`}>
                {project.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-3 sm:mt-6">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white sm:px-6 sm:py-3"
                  >
                    Acessar link
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-4 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {gallery.map((asset) => (
                  <button
                    key={asset.src}
                    type="button"
                    onClick={() => {
                      changeActiveImage(asset.src, asset.label);
                      openExpandedImage(asset.src, asset.label);
                    }}
                    onMouseEnter={() => setPreviewImage({ src: asset.src, alt: asset.label })}
                    onMouseLeave={() => setPreviewImage(null)}
                    className={`group relative overflow-hidden rounded-xl border bg-black/20 text-left transition duration-300 hover:border-accent/40 hover:shadow-[0_18px_45px_rgba(56,189,248,0.18)] sm:rounded-2xl sm:hover:-translate-y-1.5 ${
                      displayedImageSrc === asset.src
                        ? "scale-[1.03] border-accent/60 shadow-glow"
                        : "border-white/10 hover:scale-[1.02]"
                    }`}
                    aria-label={`Visualizar ${asset.label}`}
                  >
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#07111f]/70 via-transparent to-[#07111f]/20 opacity-70 transition duration-300 group-hover:opacity-20" />
                    <div className="relative aspect-square overflow-hidden sm:aspect-[4/3]">
                      <MediaImage
                        src={asset.src}
                        alt={asset.label}
                        className="h-full w-full object-cover transition duration-500 sm:group-hover:scale-110"
                        fallbackLabel={asset.label}
                      />
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/20 sm:mt-5 sm:rounded-3xl">
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
                    <button
                      type="button"
                      onClick={() => openExpandedImage(displayedImageSrc ?? "", displayedImageAlt)}
                      className="flex h-full w-full items-center justify-center bg-[#07111f] p-2 text-left sm:p-4"
                      aria-label={`Expandir ${displayedImageAlt}`}
                    >
                      <MediaImage
                        src={displayedImageSrc}
                        alt={displayedImageAlt}
                        className={`h-full w-full rounded-xl shadow-[0_14px_36px_rgba(2,8,23,0.4)] sm:rounded-2xl ${
                          shouldFillImages ? "object-fill" : "object-contain"
                        }`}
                        fallbackLabel="Adicione image-01.webp para ativar a mídia principal"
                      />
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:mt-8 sm:rounded-3xl sm:p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-accentSoft">Problema resolvido</p>
                <p className="mt-3 text-[15px] leading-7 text-muted sm:text-base sm:leading-8">{project.problem}</p>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:mt-5 sm:rounded-3xl sm:p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-accentSoft">Atuação</p>
                <p className="mt-3 text-[15px] leading-7 text-muted sm:text-base sm:leading-8">{project.role}</p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:rounded-3xl sm:p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-accentSoft sm:tracking-[0.22em]">Stack utilizada</p>
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

              <div className="rounded-2xl border border-accent/15 bg-accent/5 p-5 sm:rounded-3xl sm:p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-accentSoft">Resultado / impacto</p>
                <p className="mt-3 text-[15px] leading-7 text-muted sm:text-base sm:leading-8">{project.impact}</p>
              </div>

              {project.privacyNote ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:rounded-3xl sm:p-6">
                  <div className="flex items-start gap-3">
                    <LockKeyhole className="mt-1 h-4 w-4 shrink-0 text-accentSoft" />
                    <p className="text-[15px] leading-7 text-muted sm:text-base sm:leading-8">{project.privacyNote}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {expandedImage ? (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setExpandedImage(null)}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              navigateExpandedImage("prev");
            }}
          className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/75 sm:left-5 sm:h-12 sm:w-12"
            aria-label="Imagem anterior"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setExpandedImage(null);
            }}
            className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/75 sm:right-5 sm:top-5 sm:h-11 sm:w-11"
            aria-label="Fechar imagem ampliada"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              navigateExpandedImage("next");
            }}
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/75 sm:right-5 sm:h-12 sm:w-12"
            aria-label="Próxima imagem"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          <img
            src={expandedImage.src}
            alt={expandedImage.alt}
            className="max-h-[86vh] max-w-[94vw] rounded-2xl object-contain shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:max-h-[90vh] sm:max-w-[92vw] sm:rounded-3xl"
          />
        </div>
      ) : null}
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
