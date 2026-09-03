import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Award,
  BadgeCheck,
  CalendarDays,
  Maximize2,
  X,
} from "lucide-react";

import asysCertificate from "@/assets/A-sys Certificate.jpg";
import informationManagementCertificate from "@/assets/Information Management in the Digital Age Course Certificate.png";

import StaggerContainer from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import Section from "@/components/layout/Section";
import { certifications, siteCopy } from "@/data/portfolio";

const certificateImages = {
  asys: asysCertificate,
  informationManagement: informationManagementCertificate,
};

function Certifications() {
  const [activeCertificate, setActiveCertificate] = useState(null);

  useEffect(() => {
    if (!activeCertificate) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveCertificate(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCertificate]);

  return (
    <Section
      id="certifications"
      eyebrow={siteCopy.certifications.eyebrow}
      title={siteCopy.certifications.title}
      description={siteCopy.certifications.description}
    >
      <StaggerContainer className="grid gap-5 lg:grid-cols-2">
        {certifications.map((certification, index) => {
          const Icon = index === 0 ? BadgeCheck : Award;
          const imageSrc =
            certificateImages[certification.image];

          return (
            <motion.article
              key={`${certification.title}-${certification.issuer}`}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              data-gsap-card
              className="
                group relative overflow-hidden
                rounded-[1.5rem]
                border border-white/[0.08]
                bg-[#0D1117]
                shadow-2xl shadow-black/20
                transition-colors duration-300
                hover:border-cyan-300/20
              "
            >
              {/* Subtle top accent */}
              <div
                aria-hidden="true"
                className="
                  absolute inset-x-8 top-0 z-10 h-px
                  bg-gradient-to-r
                  from-transparent
                  via-cyan-300/30
                  to-transparent
                  opacity-0
                  transition-opacity duration-300
                  group-hover:opacity-100
                "
              />

              {/* Certificate preview */}
              <button
                type="button"
                onClick={() =>
                  setActiveCertificate({
                    ...certification,
                    imageSrc,
                  })
                }
                className="
                  group/certificate relative block
                  w-full overflow-hidden
                  border-b border-white/[0.07]
                  bg-[#080C12]
                  text-left
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-[-2px]
                  focus-visible:outline-cyan-300
                "
                aria-label={`View ${certification.title} certificate`}
              >
                {/* Year */}
                <div
                  className="
                    absolute left-4 top-4 z-20
                    inline-flex items-center gap-2
                    rounded-full
                    border border-white/[0.10]
                    bg-slate-950/75
                    px-3 py-1.5
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-cyan-100
                    backdrop-blur-xl
                  "
                >
                  <CalendarDays
                    className="size-3.5 text-cyan-300/80"
                    aria-hidden="true"
                  />
                  {certification.year}
                </div>

                {/* Expand button */}
                <div
                  className="
                    absolute right-4 top-4 z-20
                    grid size-9 place-items-center
                    rounded-full
                    border border-white/[0.10]
                    bg-slate-950/75
                    text-slate-300
                    backdrop-blur-xl
                    transition-all duration-300
                    group-hover/certificate:border-cyan-300/30
                    group-hover/certificate:bg-cyan-300/10
                    group-hover/certificate:text-cyan-100
                  "
                  aria-hidden="true"
                >
                  <Maximize2 className="size-4" />
                </div>

                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden p-3 sm:p-4">
                  <img
                    src={imageSrc}
                    alt={`${certification.title} certificate`}
                    className="
                      size-full
                      object-contain
                      rounded-xl
                      transition-transform
                      duration-500
                      ease-out
                      group-hover/certificate:scale-[1.025]
                    "
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Hover veil */}
                  <div
                    className="
                      pointer-events-none absolute inset-0
                      bg-cyan-300/[0.03]
                      opacity-0
                      transition-opacity duration-300
                      group-hover/certificate:opacity-100
                    "
                  />
                </div>

                {/* View hint */}
                <div
                  className="
                    absolute bottom-5 left-1/2 z-20
                    -translate-x-1/2 translate-y-2
                    rounded-full
                    border border-white/[0.10]
                    bg-slate-950/80
                    px-3 py-1.5
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-slate-200
                    opacity-0
                    backdrop-blur-xl
                    transition-all duration-300
                    group-hover/certificate:translate-y-0
                    group-hover/certificate:opacity-100
                  "
                >
                  View certificate
                </div>
              </button>

              {/* Certificate information */}
              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="
                      grid size-10 shrink-0 place-items-center
                      rounded-xl
                      border border-cyan-300/15
                      bg-cyan-300/[0.06]
                      text-cyan-300
                    "
                  >
                    <Icon
                      className="size-5"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base font-semibold leading-snug tracking-[-0.015em] text-white sm:text-lg">
                      {certification.title}
                    </h3>

                    <p className="mt-1.5 text-sm font-medium text-cyan-300/80">
                      {certification.issuer}
                    </p>
                  </div>
                </div>

                <p className="mt-5 border-t border-white/[0.07] pt-4 text-sm leading-7 text-slate-400">
                  {certification.description}
                </p>
              </div>
            </motion.article>
          );
        })}
      </StaggerContainer>

      {/* Certificate modal */}
      <AnimatePresence>
        {activeCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed inset-0 z-[80]
              flex items-center justify-center
              bg-slate-950/90
              p-4
              backdrop-blur-xl
              sm:p-6
            "
            role="dialog"
            aria-modal="true"
            aria-label={`${activeCertificate.title} certificate preview`}
            onClick={() => setActiveCertificate(null)}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 24,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 16,
                scale: 0.97,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative w-full max-w-6xl"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Modal header */}
              <div className="mb-3 flex items-center justify-between gap-4 px-1">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {activeCertificate.title}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {activeCertificate.issuer}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveCertificate(null)}
                  className="
                    grid size-10 shrink-0 place-items-center
                    rounded-full
                    border border-white/[0.10]
                    bg-white/[0.06]
                    text-slate-300
                    backdrop-blur-xl
                    transition-all duration-200
                    hover:border-cyan-300/30
                    hover:bg-cyan-300/10
                    hover:text-white
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-cyan-300
                  "
                  aria-label="Close certificate preview"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>

              {/* Image */}
              <div className="overflow-hidden rounded-[1.5rem] border border-white/[0.10] bg-[#080C12] p-2 shadow-2xl shadow-black/50 sm:p-3">
                <img
                  src={activeCertificate.imageSrc}
                  alt={`${activeCertificate.title} full certificate`}
                  className="
                    max-h-[78vh]
                    w-full
                    rounded-xl
                    object-contain
                  "
                />
              </div>

              <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-slate-600">
                Press Escape or click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

export default Certifications;