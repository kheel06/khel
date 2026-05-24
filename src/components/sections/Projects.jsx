import { useRef } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  Play,
  Send,
  Terminal,
} from "lucide-react";
import {
  IconApi,
  IconBrandBootstrap,
  IconBrandCss3,
  IconBrandGithub,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandLaravel,
  IconBrandMysql,
  IconBrandPhp,
  IconBrandReact,
  IconBrandTailwind,
} from "@tabler/icons-react";

import StaggerContainer from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import Section from "@/components/layout/Section";
import { projects, siteCopy } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const featuredSizeClasses = {
  large: "md:col-span-2 lg:col-span-7 lg:row-span-2",
  medium: "lg:col-span-5",
  small: "lg:col-span-5",
  wide: "lg:col-span-5",
};

const masonrySizeClasses = {
  large: "md:col-span-2 md:row-span-2 lg:col-span-6 lg:row-span-2",
  wide: "md:col-span-2 lg:col-span-6",
  medium: "lg:col-span-3",
  small: "lg:col-span-3",
};

const getExternalProps = (href) => {
  const isExternal = href?.startsWith("http");

  return {
    target: isExternal ? "_blank" : undefined,
    rel: isExternal ? "noreferrer" : undefined,
  };
};

const techIconMap = {
  HTML: { Icon: IconBrandHtml5, color: "#e34f26" },
  CSS: { Icon: IconBrandCss3, color: "#1572b6" },
  JavaScript: { Icon: IconBrandJavascript, color: "#f7df1e" },
  "Tailwind CSS": { Icon: IconBrandTailwind, color: "#38bdf8" },
  Bootstrap: { Icon: IconBrandBootstrap, color: "#7952b3" },
  PHP: { Icon: IconBrandPhp, color: "#777bb4" },
  Laravel: { Icon: IconBrandLaravel, color: "#ff2d20" },
  "React JS": { Icon: IconBrandReact, color: "#61dafb" },
  MySQL: { Icon: IconBrandMysql, color: "#00758f" },
  "RESTful API": { Icon: IconApi, color: "#22d3ee" },
  Postman: { Icon: Send, color: "#ff6c37" },
  Motion: { Icon: Code2, color: "#a78bfa" },
};

const quickLinkClasses =
  "group/link relative grid size-9 place-items-center rounded-full border border-white/10 bg-slate-950/45 text-slate-200 opacity-80 backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/35 hover:bg-cyan-300/15 hover:text-cyan-50 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300";

function TechIcon({ tech }) {
  const { Icon, color } = techIconMap[tech] || {
    Icon: Terminal,
    color: "#cbd5e1",
  };

  return (
    <span
      role="img"
      aria-label={tech}
      title={tech}
      className="grid size-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.07] shadow-sm shadow-slate-950/20 backdrop-blur-md transition-all duration-200 group-hover:border-cyan-300/25 group-hover:bg-cyan-300/10"
    >
      <Icon className="size-4" style={{ color }} aria-hidden="true" />
    </span>
  );
}

function ProjectCard({ project, layout = "masonry" }) {
  const videoRef = useRef(null);

  const isFeaturedLayout = layout === "featured";
  const isLarge = project.size === "large";
  const canPreviewVideo = isFeaturedLayout && Boolean(project.videoPreview);

  const techStack = project.techStack ?? [];
  const shownTechStack = techStack.slice(0, isLarge ? 5 : 4);
  const hiddenTechCount = Math.max(techStack.length - shownTechStack.length, 0);

  const liveUrl = project.liveUrl || project.websiteUrl || project.siteUrl || "";
  const detailsUrl = project.caseStudyUrl || project.href || liveUrl || "";
  const sourceUrl = project.githubUrl || project.sourceUrl || "";

  const externalUrl = liveUrl || project.href || project.caseStudyUrl || "";
  const hasExternalUrl = Boolean(externalUrl);
  const hasDetailsUrl = Boolean(detailsUrl);
  const hasSourceUrl = Boolean(sourceUrl);

  const handleMouseEnter = () => {
    if (!canPreviewVideo || !videoRef.current) return;

    videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (!canPreviewVideo || !videoRef.current) return;

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <motion.article
      data-gsap-card
      variants={staggerItem}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "glass-card card-hover group relative flex h-full min-h-[20rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-0 shadow-2xl shadow-slate-950/30 transition-all duration-300 hover:border-cyan-300/40 hover:shadow-cyan-950/30",
        isFeaturedLayout
          ? featuredSizeClasses[project.size]
          : masonrySizeClasses[project.size],
        isFeaturedLayout && isLarge
          ? "md:min-h-[31rem] lg:min-h-0"
          : "md:min-h-0"
      )}
    >
      {/* Accent Glow */}
      <div
        className={cn(
          "absolute inset-0 -z-20 bg-gradient-to-br opacity-70",
          project.accent
        )}
      />

      {/* Clear Project Screenshot */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {canPreviewVideo ? (
          <video
            ref={videoRef}
            src={project.videoPreview}
            poster={project.image}
            muted
            loop
            playsInline
            preload="metadata"
            className="size-full object-cover opacity-95 transition-transform duration-700 ease-out group-hover:scale-105"
            aria-label={`${project.title} video preview`}
          />
        ) : project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            decoding="async"
            className="size-full object-cover opacity-95 transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="grid size-full place-items-center bg-slate-950 text-cyan-200">
            <Code2 className="size-12" aria-hidden="true" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/10 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-slate-950/0 transition-colors duration-300 group-hover:bg-slate-950/20" />
      </div>

      {/* Small Category Badge */}
      <div className="absolute left-4 top-4 z-20 flex max-w-[calc(100%-7rem)] flex-wrap items-center gap-2">
        <span className="rounded-full border border-white/15 bg-slate-950/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100 shadow-lg shadow-slate-950/30 backdrop-blur-xl">
          {project.type || "Project"}
        </span>

        {canPreviewVideo && (
          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-100 backdrop-blur-xl">
            <Play className="size-3" aria-hidden="true" />
            Preview
          </span>
        )}
      </div>

      {/* Top-right project links */}
      {(hasExternalUrl || (!isFeaturedLayout && hasSourceUrl)) && (
        <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
          {!isFeaturedLayout && hasSourceUrl && (
            <a
              href={sourceUrl}
              {...getExternalProps(sourceUrl)}
              aria-label={`${project.title} source code`}
              title="View source code"
              className={quickLinkClasses}
            >
              <IconBrandGithub className="size-4" aria-hidden="true" />

              <span
                role="tooltip"
                className="pointer-events-none absolute right-0 top-11 w-max rounded-full border border-white/10 bg-slate-950/90 px-3 py-1.5 text-[11px] font-medium text-slate-100 opacity-0 shadow-lg shadow-slate-950/40 backdrop-blur-xl transition-opacity duration-200 group-hover/link:opacity-100 group-focus-visible/link:opacity-100"
              >
                Source code
              </span>
            </a>
          )}

          {hasExternalUrl && (
            <a
              href={externalUrl}
              {...getExternalProps(externalUrl)}
              aria-label={`Visit ${project.title} website`}
              title="Visit website"
              className={quickLinkClasses}
            >
              <ExternalLink className="size-4" aria-hidden="true" />

              <span
                role="tooltip"
                className="pointer-events-none absolute right-0 top-11 w-max rounded-full border border-white/10 bg-slate-950/90 px-3 py-1.5 text-[11px] font-medium text-slate-100 opacity-0 shadow-lg shadow-slate-950/40 backdrop-blur-xl transition-opacity duration-200 group-hover/link:opacity-100 group-focus-visible/link:opacity-100"
              >
                Visit website
              </span>
            </a>
          )}
        </div>
      )}

      {/* Hover Details Panel */}
      <div className="relative z-10 mt-auto flex w-full p-3 sm:p-4">
        <div className="w-full translate-y-0 rounded-3xl border border-white/12 bg-slate-950/78 p-4 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl transition-all duration-300 ease-out sm:translate-y-5 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
          {/* Project Title */}
          <h3
            className={cn(
              "line-clamp-2 break-words font-semibold leading-tight tracking-tight text-white",
              isLarge ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
            )}
          >
            {project.title}
          </h3>

          {/* Short Project Description */}
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-300 sm:text-[13px]">
            {project.description}
          </p>

          {(shownTechStack.length > 0 ||
            (isFeaturedLayout && hasDetailsUrl)) && (
            <div
              className={cn(
                "mt-3 flex gap-3",
                isFeaturedLayout
                  ? "items-center justify-between"
                  : "flex-wrap items-center"
              )}
            >
              {shownTechStack.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {shownTechStack.map((tech) => (
                    <TechIcon key={tech} tech={tech} />
                  ))}

                  {hiddenTechCount > 0 && (
                    <span
                      aria-label={`${hiddenTechCount} more technologies`}
                      title={`${hiddenTechCount} more technologies`}
                      className="grid size-8 shrink-0 place-items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-[10px] font-semibold text-cyan-100"
                    >
                      +{hiddenTechCount}
                    </span>
                  )}
                </div>
              )}

              {isFeaturedLayout && hasDetailsUrl && (
                <a
                  href={detailsUrl}
                  {...getExternalProps(detailsUrl)}
                  className="ml-auto inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-cyan-300/35 bg-cyan-300/15 px-3 text-xs font-semibold text-cyan-50 transition-all hover:border-cyan-200/70 hover:bg-cyan-300/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                >
                  View Details
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function FeaturedProjects({ items }) {
  return (
    <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[18rem]">
      {items.map((project) => (
        <ProjectCard key={project.title} project={project} layout="featured" />
      ))}
    </StaggerContainer>
  );
}

function MoreProjectsGrid({ items }) {
  return (
    <div className="mt-12">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-white">More Projects</h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
            Additional builds spanning dashboards, APIs, portals, and responsive
            interfaces.
          </p>
        </div>
      </div>

      <StaggerContainer
        delayChildren={0.08}
        className="grid grid-flow-dense gap-5 md:grid-cols-2 md:auto-rows-[19rem] lg:grid-cols-12 lg:auto-rows-[18.5rem]"
      >
        {items.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </StaggerContainer>
    </div>
  );
}

function Projects() {
  const featuredProjects = projects.filter((project) => project.featured);
  const moreProjects = projects.filter((project) => !project.featured);

  return (
    <Section
      id="projects"
      eyebrow={siteCopy.projects.eyebrow}
      title={siteCopy.projects.title}
      description={siteCopy.projects.description}
      className="pt-14 sm:pt-16"
    >
      <FeaturedProjects items={featuredProjects} />
      <MoreProjectsGrid items={moreProjects} />
    </Section>
  );
}

export default Projects;
