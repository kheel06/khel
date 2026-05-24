import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Award, BadgeCheck, Maximize2, X } from "lucide-react";

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

  return (
    <Section
      id="certifications"
      eyebrow={siteCopy.certifications.eyebrow}
      title={siteCopy.certifications.title}
      description={siteCopy.certifications.description}
    >
      <StaggerContainer className="grid gap-4 lg:grid-cols-2">
        {certifications.map((certification, index) => {
          const Icon = index === 0 ? BadgeCheck : Award;
          const imageSrc = certificateImages[certification.image];

          return (
            <motion.article
              key={`${certification.title}-${certification.issuer}`}
              variants={staggerItem}
              transition={{ duration: 0.22, ease: "easeOut" }}
              data-gsap-card
              className="glass-card card-hover group overflow-hidden p-3 transition-colors hover:border-violet-300/40"
            >
              <button
                type="button"
                onClick={() =>
                  setActiveCertificate({ ...certification, imageSrc })
                }
                className="relative block w-full overflow-hidden rounded-[1.25rem] border border-white/10 bg-slate-950/70 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                aria-label={`Open preview for ${certification.title}`}
              >
                <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-cyan-100 backdrop-blur">
                  <Icon className="size-4" aria-hidden="true" />
                  {certification.year}
                </div>
                <div className="absolute right-4 top-4 z-10 inline-grid size-9 place-items-center rounded-full border border-white/10 bg-slate-950/80 text-cyan-100 backdrop-blur transition-colors group-hover:border-violet-300/40 group-hover:text-violet-100">
                  <Maximize2 className="size-4" aria-hidden="true" />
                </div>
                <img
                  src={imageSrc}
                  alt={`${certification.title} certificate preview`}
                  className="aspect-[16/9] w-full bg-slate-950 object-contain p-2"
                />
              </button>
              <h3 className="mt-3 text-base font-semibold text-white">
                {certification.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-cyan-200">
                {certification.issuer}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {certification.description}
              </p>
            </motion.article>
          );
        })}
      </StaggerContainer>

      <AnimatePresence>
        {activeCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/85 p-4 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeCertificate.title} certificate preview`}
            onClick={() => setActiveCertificate(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="relative w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveCertificate(null)}
                className="absolute -right-2 -top-12 inline-grid size-10 place-items-center rounded-full border border-white/10 bg-white/10 text-white transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:-right-4"
                aria-label="Close certificate preview"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
              <div className="glass-card overflow-hidden p-3">
                <img
                  src={activeCertificate.imageSrc}
                  alt={`${activeCertificate.title} full certificate preview`}
                  className="max-h-[82vh] w-full rounded-2xl bg-slate-950 object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

export default Certifications;
