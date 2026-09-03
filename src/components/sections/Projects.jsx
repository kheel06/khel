"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Code2,
  Play,
  X,
} from "lucide-react";

import StaggerContainer from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import Section from "@/components/layout/Section";
import { projects, siteCopy } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/* =========================================================
   PROJECT CARD SIZES
========================================================= */

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

/* =========================================================
   CORE 1 SCREENSHOTS
========================================================= */

const core1Screenshots = Array.from(
  { length: 39 },
  (_, index) => `/projects/core1/${index + 1}.png`
);

/* =========================================================
   CORE 1 TECHNOLOGIES
========================================================= */

const core1Technologies = [
  "PHP",
  "Laravel",
  "MySQL",
  "JavaScript",
  "Bootstrap",
  "RESTful API",
  "Postman",
];

/* =========================================================
   CORE 1 DETAILS
========================================================= */

const core1Details = {
  title:
    "HOSPITAL 2: CORE 1 DIGITAL PATIENT ACCESS AND EMERGENCY MANAGEMENT PLATFORM WITH AI-POWERED TRIAGE AND TELEHEALTH SUPPORT",

  overview:
    "A hospital management platform designed to support digital patient access, emergency management, structured healthcare workflows, AI-powered triage, and telehealth services. The system brings key patient and operational processes into one organized digital environment.",

  highlights: [
    "Digital patient access and registration",
    "Emergency management workflows",
    "AI-powered patient triage",
    "Telehealth support",
    "Structured healthcare workflows",
    "Centralized patient information",
  ],

  technologies: core1Technologies,

  screenshots: core1Screenshots,
};

/* =========================================================
   CHECK IF PROJECT IS ALVION CORE 1
========================================================= */

function isCore1Project(project) {
  if (!project) {
    return false;
  }

  const title = String(project.title || "").toLowerCase();

  return (
    title.includes("alvion") &&
    (title.includes("core 1") ||
      title.includes("core1") ||
      title.includes("transaction 1"))
  );
}

/* =========================================================
   PROJECT DETAILS
========================================================= */

function getProjectDetails(project) {
  if (isCore1Project(project)) {
    return core1Details;
  }

  return {
    title: project?.title || "Project Details",

    overview:
      project?.description ||
      "A digital system developed to support practical workflows and real-world operational requirements.",

    highlights: [],

    technologies: project?.techStack || [],

    screenshots: project?.image
      ? [project.image]
      : [],
  };
}

/* =========================================================
   PROJECT DETAILS MODAL
========================================================= */

function ProjectDetailsModal({
  project,
  open,
  onClose,
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const details = getProjectDetails(project);

  const screenshots = details.screenshots || [];

  /* =======================================================
     CLIENT MOUNT
  ======================================================= */

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  /* =======================================================
     RESET WHEN OPENING
  ======================================================= */

  useEffect(() => {
    if (!open) {
      return;
    }

    setActiveImage(0);

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [open, project]);

  /* =======================================================
     KEYBOARD NAVIGATION
  ======================================================= */

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (
        event.key === "ArrowRight" &&
        screenshots.length > 1
      ) {
        event.preventDefault();

        setActiveImage((current) =>
          current >= screenshots.length - 1
            ? 0
            : current + 1
        );

        return;
      }

      if (
        event.key === "ArrowLeft" &&
        screenshots.length > 1
      ) {
        event.preventDefault();

        setActiveImage((current) =>
          current <= 0
            ? screenshots.length - 1
            : current - 1
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    open,
    screenshots.length,
    onClose,
  ]);

  /* =======================================================
     NEXT IMAGE
  ======================================================= */

  const nextImage = () => {
    if (screenshots.length <= 1) {
      return;
    }

    setActiveImage((current) =>
      current >= screenshots.length - 1
        ? 0
        : current + 1
    );
  };

  /* =======================================================
     PREVIOUS IMAGE
  ======================================================= */

  const previousImage = () => {
    if (screenshots.length <= 1) {
      return;
    }

    setActiveImage((current) =>
      current <= 0
        ? screenshots.length - 1
        : current - 1
    );
  };

  /* =======================================================
     TOUCH START
  ======================================================= */

  const handleTouchStart = (event) => {
    const touch =
      event.touches?.[0];

    if (!touch) {
      return;
    }

    setTouchStartX(touch.clientX);
  };

  /* =======================================================
     TOUCH END
  ======================================================= */

  const handleTouchEnd = (event) => {
    if (touchStartX === null) {
      return;
    }

    const touch =
      event.changedTouches?.[0];

    if (!touch) {
      setTouchStartX(null);
      return;
    }

    const distance =
      touch.clientX - touchStartX;

    if (Math.abs(distance) > 60) {
      if (distance < 0) {
        nextImage();
      } else {
        previousImage();
      }
    }

    setTouchStartX(null);
  };

  /* =======================================================
     DON'T RENDER UNTIL BROWSER
  ======================================================= */

  if (!mounted || !open || !project) {
    return null;
  }

  const modal = (
    <div
      className="
        fixed
        inset-0
        z-[999999]
        flex
        items-center
        justify-center
        bg-black/85
        p-3
        backdrop-blur-md
        sm:p-5
        lg:p-8
      "
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      {/* ===================================================
          MODAL CONTAINER
      =================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          flex
          max-h-[94vh]
          w-full
          max-w-7xl
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-[#080D18]
          shadow-[0_25px_100px_rgba(0,0,0,0.75)]
          sm:rounded-[1.5rem]
        "
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            shrink-0
            items-start
            justify-between
            gap-4
            border-b
            border-white/[0.08]
            bg-[#080D18]
            px-5
            py-5
            sm:px-7
            sm:py-6
            lg:px-8
          "
        >
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-2">
              <span
                className="
                  size-1.5
                  shrink-0
                  rounded-full
                  bg-cyan-300
                  shadow-[0_0_12px_rgba(103,232,249,0.8)]
                "
              />

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-cyan-300
                "
              >
                Project Case Study
              </span>
            </div>

            <h2
              className="
                mt-3
                max-w-5xl
                text-lg
                font-semibold
                leading-[1.3]
                tracking-[-0.02em]
                text-white
                sm:text-2xl
                lg:text-[28px]
              "
            >
              {details.title}
            </h2>
          </div>

          {/* CLOSE BUTTON */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="
              grid
              size-10
              shrink-0
              place-items-center
              rounded-full
              border
              border-white/10
              bg-white/[0.04]
              text-slate-300
              transition-all
              duration-300
              hover:border-cyan-300/40
              hover:bg-cyan-300/10
              hover:text-white
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-300/50
            "
          >
            <X className="size-5" />
          </button>
        </div>

        {/* =================================================
            SCROLLABLE BODY
        ================================================= */}

        <div
          className="
            min-h-0
            overflow-y-auto
            overscroll-contain
          "
        >
          {/* =================================================
              SCREENSHOT GALLERY
          ================================================= */}

          {screenshots.length > 0 ? (
            <div
              className="
                px-3
                py-3
                sm:px-6
                sm:py-6
                lg:px-8
                lg:py-7
              "
            >
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-[#020617]
                "
                onTouchStart={
                  handleTouchStart
                }
                onTouchEnd={
                  handleTouchEnd
                }
              >
                {/* IMAGE AREA */}

                <div
                  className="
                    flex
                    min-h-[240px]
                    w-full
                    items-center
                    justify-center
                    sm:min-h-[400px]
                    lg:min-h-[510px]
                  "
                >
                  <img
                    key={activeImage}
                    src={
                      screenshots[activeImage]
                    }
                    alt={`${project.title} screenshot ${
                      activeImage + 1
                    }`}
                    draggable="false"
                    className="
                      max-h-[52vh]
                      w-full
                      select-none
                      object-contain
                      p-2
                      sm:max-h-[57vh]
                      sm:p-4
                      lg:max-h-[59vh]
                    "
                    onError={(event) => {
                      event.currentTarget.style.display =
                        "none";
                    }}
                  />
                </div>

                {/* =================================================
                    PREVIOUS BUTTON
                ================================================= */}

                {screenshots.length > 1 && (
                  <button
                    type="button"
                    onClick={previousImage}
                    aria-label="Previous screenshot"
                    className="
                      absolute
                      left-3
                      top-1/2
                      grid
                      size-10
                      -translate-y-1/2
                      place-items-center
                      rounded-full
                      border
                      border-white/10
                      bg-black/75
                      text-white
                      shadow-xl
                      backdrop-blur-md
                      transition-all
                      duration-300
                      hover:border-cyan-300/40
                      hover:bg-cyan-300/10
                      hover:text-cyan-100
                      focus:outline-none
                      focus:ring-2
                      focus:ring-cyan-300/50
                      sm:left-5
                      sm:size-11
                    "
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                )}

                {/* =================================================
                    NEXT BUTTON
                ================================================= */}

                {screenshots.length > 1 && (
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next screenshot"
                    className="
                      absolute
                      right-3
                      top-1/2
                      grid
                      size-10
                      -translate-y-1/2
                      place-items-center
                      rounded-full
                      border
                      border-white/10
                      bg-black/75
                      text-white
                      shadow-xl
                      backdrop-blur-md
                      transition-all
                      duration-300
                      hover:border-cyan-300/40
                      hover:bg-cyan-300/10
                      hover:text-cyan-100
                      focus:outline-none
                      focus:ring-2
                      focus:ring-cyan-300/50
                      sm:right-5
                      sm:size-11
                    "
                  >
                    <ChevronRight className="size-5" />
                  </button>
                )}

                {/* =================================================
                    IMAGE COUNTER
                ================================================= */}

                {screenshots.length > 1 && (
                  <div
                    className="
                      absolute
                      bottom-4
                      left-1/2
                      -translate-x-1/2
                      rounded-full
                      border
                      border-white/10
                      bg-black/80
                      px-3
                      py-1.5
                      text-[10px]
                      font-semibold
                      tracking-[0.16em]
                      text-white
                      backdrop-blur-md
                    "
                  >
                    {String(
                      activeImage + 1
                    ).padStart(2, "0")}{" "}
                    /{" "}
                    {String(
                      screenshots.length
                    ).padStart(2, "0")}
                  </div>
                )}
              </div>

              {/* SWIPE MESSAGE */}

              {screenshots.length > 1 && (
                <p
                  className="
                    mt-3
                    text-center
                    text-[9px]
                    uppercase
                    tracking-[0.12em]
                    text-slate-600
                  "
                >
                  Swipe or use the arrows to
                  explore the system
                </p>
              )}
            </div>
          ) : (
            <div
              className="
                flex
                min-h-[280px]
                items-center
                justify-center
              "
            >
              <div className="text-center">
                <Code2 className="mx-auto size-10 text-cyan-300/40" />

                <p className="mt-3 text-sm text-slate-500">
                  No screenshots available.
                </p>
              </div>
            </div>
          )}

          {/* =================================================
              INFORMATION
          ================================================= */}

          <div
            className="
              grid
              gap-8
              border-t
              border-white/[0.08]
              px-5
              py-7
              sm:px-7
              lg:grid-cols-[1.4fr_0.8fr]
              lg:px-8
              lg:py-8
            "
          >
            {/* =================================================
                SYSTEM OVERVIEW
            ================================================= */}

            <div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-cyan-300" />

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-cyan-300
                  "
                >
                  System Overview
                </span>
              </div>

              <p
                className="
                  mt-4
                  max-w-3xl
                  text-sm
                  leading-7
                  text-slate-400
                  sm:text-[15px]
                "
              >
                {details.overview}
              </p>

              {/* =================================================
                  KEY CAPABILITIES
              ================================================= */}

              {details.highlights?.length >
                0 && (
                <div className="mt-7">
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-slate-500
                    "
                  >
                    Key Capabilities
                  </p>

                  <div
                    className="
                      mt-4
                      grid
                      gap-2
                      sm:grid-cols-2
                    "
                  >
                    {details.highlights.map(
                      (item) => (
                        <div
                          key={item}
                          className="
                            flex
                            items-start
                            gap-3
                            rounded-xl
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            px-3
                            py-3
                          "
                        >
                          <span
                            className="
                              mt-1.5
                              size-1.5
                              shrink-0
                              rounded-full
                              bg-cyan-300
                            "
                          />

                          <span
                            className="
                              text-xs
                              leading-5
                              text-slate-400
                            "
                          >
                            {item}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* =================================================
                TECHNOLOGIES
            ================================================= */}

            <div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-cyan-300" />

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-cyan-300
                  "
                >
                  Technologies Used
                </span>
              </div>

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {details.technologies.map(
                  (technology) => (
                    <span
                      key={technology}
                      className="
                        rounded-full
                        border
                        border-white/[0.09]
                        bg-white/[0.035]
                        px-3
                        py-2
                        text-xs
                        font-medium
                        text-slate-300
                        transition
                        hover:border-cyan-300/30
                        hover:bg-cyan-300/[0.06]
                        hover:text-cyan-100
                      "
                    >
                      {technology}
                    </span>
                  )
                )}
              </div>

              {/* =================================================
                  GALLERY INFO
              ================================================= */}

              {screenshots.length > 0 && (
                <div
                  className="
                    mt-7
                    rounded-xl
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    <span
                      className="
                        text-[10px]
                        uppercase
                        tracking-[0.16em]
                        text-slate-500
                      "
                    >
                      Project Gallery
                    </span>

                    <span
                      className="
                        text-xs
                        font-semibold
                        text-cyan-300
                      "
                    >
                      {screenshots.length} Screens
                    </span>
                  </div>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-slate-600
                    "
                  >
                    Explore the complete interface
                    and workflow through the project
                    screenshots.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="
              flex
              flex-col
              gap-2
              border-t
              border-white/[0.07]
              px-5
              py-4
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:px-7
              lg:px-8
            "
          >
            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-slate-600
              "
            >
              Alvion Core Transaction 1
            </span>

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.12em]
                text-slate-700
              "
            >
              ESC to close • ← → to navigate
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );

  /* =======================================================
     PORTAL
     
     This is important.
     The modal is mounted directly into <body>.
  ======================================================= */

  return createPortal(
    modal,
    document.body
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
  layout = "masonry",
  onOpenDetails,
}) {
  const isFeaturedLayout =
    layout === "featured";

  const isLarge =
    project.size === "large";

  const canPreviewVideo =
    isFeaturedLayout &&
    Boolean(project.videoPreview);

  /* =======================================================
     VIDEO
  ======================================================= */

  const handleMouseEnter = (event) => {
    if (!canPreviewVideo) {
      return;
    }

    const video =
      event.currentTarget.querySelector(
        "video"
      );

    if (!video) {
      return;
    }

    video.play().catch(() => {});
  };

  const handleMouseLeave = (event) => {
    if (!canPreviewVideo) {
      return;
    }

    const video =
      event.currentTarget.querySelector(
        "video"
      );

    if (!video) {
      return;
    }

    video.pause();
    video.currentTime = 0;
  };

  /* =======================================================
     DISPLAY TITLE
  ======================================================= */

  const displayTitle = isCore1Project(project)
    ? "Alvion Core Transaction 1"
    : project.title;

  return (
    <motion.article
      data-gsap-card
      variants={staggerItem}
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex h-full min-h-[20rem] overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#0D1117] shadow-2xl shadow-black/20 transition-all duration-500",
        "hover:border-cyan-300/30",
        isFeaturedLayout
          ? featuredSizeClasses[
              project.size
            ]
          : masonrySizeClasses[
              project.size
            ],
        isFeaturedLayout && isLarge
          ? "md:min-h-[31rem] lg:min-h-0"
          : "md:min-h-0"
      )}
    >
      {/* ===================================================
          MEDIA
      =================================================== */}

      <div className="absolute inset-0 overflow-hidden">
        {canPreviewVideo ? (
          <video
            src={project.videoPreview}
            poster={project.image}
            muted
            loop
            playsInline
            preload="metadata"
            className="
              size-full
              object-cover
              opacity-90
              transition-all
              duration-700
              ease-out
              group-hover:scale-[1.06]
              group-hover:opacity-100
            "
          />
        ) : project.image ? (
          <img
            src={project.image}
            alt={`${displayTitle} preview`}
            loading="lazy"
            decoding="async"
            className="
              size-full
              object-cover
              opacity-90
              transition-all
              duration-700
              ease-out
              group-hover:scale-[1.06]
              group-hover:opacity-100
            "
          />
        ) : (
          <div
            className="
              grid
              size-full
              place-items-center
              bg-slate-950
            "
          >
            <Code2 className="size-12 text-cyan-300/40" />
          </div>
        )}

        {/* BASE GRADIENT */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-slate-950
            via-slate-950/35
            to-slate-950/5
          "
        />

        {/* HOVER OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-slate-950/0
            transition-all
            duration-500
            group-hover:bg-slate-950/70
          "
        />

        {/* GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-1/2
              size-[18rem]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-cyan-400/10
              blur-[100px]
            "
          />
        </div>
      </div>

      {/* ===================================================
          TOP LABEL
      =================================================== */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          z-30
          p-4
          sm:p-5
        "
      >
        <div className="flex items-center gap-2">
          <span
            className="
              rounded-full
              border
              border-white/[0.12]
              bg-slate-950/60
              px-3
              py-1.5
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-cyan-100
              backdrop-blur-xl
            "
          >
            {project.type || "Project"}
          </span>

          {canPreviewVideo && (
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-white/10
                bg-white/[0.07]
                px-2.5
                py-1.5
                text-[10px]
                text-slate-200
                backdrop-blur-xl
              "
            >
              <Play className="size-3" />

              Preview
            </span>
          )}
        </div>
      </div>

      {/* ===================================================
          DEFAULT CARD CONTENT
      =================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-20
          p-4
          transition-all
          duration-500
          group-hover:translate-y-4
          group-hover:opacity-0
          sm:p-5
        "
      >
        <p
          className="
            mb-1.5
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-cyan-300/70
          "
        >
          {isFeaturedLayout
            ? "Featured project"
            : "Selected build"}
        </p>

        <h3
          className={cn(
            "font-semibold leading-tight tracking-[-0.025em] text-white drop-shadow-lg",
            isLarge
              ? "text-2xl sm:text-3xl"
              : "text-lg sm:text-xl"
          )}
        >
          {displayTitle}
        </h3>
      </div>

      {/* ===================================================
          HOVER CONTENT
          
          ONLY:
          - TITLE
          - VIEW DETAILS
          
          NO TECHNOLOGY ICONS
          NO GITHUB
          NO LIVE SITE
      =================================================== */}

      <div
        className="
          absolute
          inset-0
          z-40
          flex
          items-end
          p-3
          opacity-0
          transition-all
          duration-500
          group-hover:opacity-100
          sm:p-5
        "
      >
        <div
          className="
            w-full
            rounded-[1.35rem]
            border
            border-white/[0.10]
            bg-slate-950/85
            p-4
            shadow-2xl
            shadow-black/50
            backdrop-blur-2xl
            sm:p-5
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* TITLE */}

            <div className="min-w-0">
              <p
                className="
                  mb-2
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-cyan-300/70
                "
              >
                {isFeaturedLayout
                  ? "Featured project"
                  : "Selected build"}
              </p>

              <h3
                className={cn(
                  "font-semibold leading-tight tracking-[-0.025em] text-white",
                  isLarge
                    ? "text-2xl sm:text-3xl"
                    : "text-lg sm:text-xl"
                )}
              >
                {displayTitle}
              </h3>
            </div>

            {/* VIEW DETAILS */}

            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();

                onOpenDetails(project);
              }}
              className="
                inline-flex
                w-fit
                shrink-0
                cursor-pointer
                items-center
                gap-2
                rounded-full
                border
                border-cyan-300/30
                bg-cyan-300/[0.08]
                px-4
                py-2.5
                text-xs
                font-semibold
                text-cyan-100
                transition-all
                duration-300
                hover:border-cyan-300/60
                hover:bg-cyan-300/[0.16]
                hover:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-300/50
              "
            >
              View Details

              <ArrowUpRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================
          BORDER
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-50
          rounded-[1.5rem]
          border
          border-transparent
          transition-all
          duration-500
          group-hover:border-cyan-300/20
        "
      />

      {/* ===================================================
          BOTTOM LINE
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          z-[60]
          h-px
          w-0
          -translate-x-1/2
          bg-cyan-300
          shadow-[0_0_20px_rgba(103,232,249,0.8)]
          transition-all
          duration-500
          group-hover:w-1/2
        "
      />
    </motion.article>
  );
}

/* =========================================================
   FEATURED PROJECTS
========================================================= */

function FeaturedProjects({
  items,
  onOpenDetails,
}) {
  return (
    <StaggerContainer
      className="
        grid
        gap-5
        md:grid-cols-2
        lg:grid-cols-12
        lg:auto-rows-[18rem]
      "
    >
      {items.map((project) => (
        <ProjectCard
          key={project.title}
          project={project}
          layout="featured"
          onOpenDetails={onOpenDetails}
        />
      ))}
    </StaggerContainer>
  );
}

/* =========================================================
   MORE PROJECTS
========================================================= */

function MoreProjectsGrid({
  items,
  onOpenDetails,
}) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="mt-14">
      {/* HEADER */}

      <div
        className="
          mb-6
          flex
          flex-col
          gap-2
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-slate-500" />

            <h3
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
                text-slate-400
              "
            >
              More Projects
            </h3>
          </div>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-7
              text-slate-500
            "
          >
            Additional builds spanning dashboards,
            APIs, portals, and responsive interfaces.
          </p>
        </div>

        <span
          className="
            hidden
            text-[10px]
            font-medium
            uppercase
            tracking-[0.14em]
            text-slate-600
            sm:block
          "
        >
          {String(items.length).padStart(
            2,
            "0"
          )}{" "}
          additional builds
        </span>
      </div>

      {/* GRID */}

      <StaggerContainer
        delayChildren={0.08}
        className="
          grid
          grid-flow-dense
          gap-5
          md:grid-cols-2
          md:auto-rows-[19rem]
          lg:grid-cols-12
          lg:auto-rows-[18.5rem]
        "
      >
        {items.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            onOpenDetails={onOpenDetails}
          />
        ))}
      </StaggerContainer>
    </div>
  );
}

/* =========================================================
   MAIN PROJECTS SECTION
========================================================= */

function Projects() {
  const [selectedProject, setSelectedProject] =
    useState(null);

  /* =======================================================
     FILTER PROJECTS
  ======================================================= */

  const featuredProjects =
    projects.filter(
      (project) => project.featured
    );

  const moreProjects =
    projects.filter(
      (project) => !project.featured
    );

  /* =======================================================
     OPEN MODAL
  ======================================================= */

  const handleOpenDetails = (project) => {
    setSelectedProject(project);
  };

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <Section
        id="projects"
        eyebrow={siteCopy.projects.eyebrow}
        title={siteCopy.projects.title}
        description={
          siteCopy.projects.description
        }
        className="pt-14 sm:pt-16"
      >
        {/* FEATURED PROJECTS */}

        <FeaturedProjects
          items={featuredProjects}
          onOpenDetails={
            handleOpenDetails
          }
        />

        {/* MORE PROJECTS */}

        <MoreProjectsGrid
          items={moreProjects}
          onOpenDetails={
            handleOpenDetails
          }
        />
      </Section>

      {/* =====================================================
          MODAL
          
          IMPORTANT:
          It is outside Section and rendered through
          createPortal directly into document.body.
      ===================================================== */}

      <ProjectDetailsModal
        project={selectedProject}
        open={Boolean(selectedProject)}
        onClose={handleCloseDetails}
      />
    </>
  );
}

export default Projects;