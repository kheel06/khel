import { motion } from "motion/react";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  GraduationCap,
} from "lucide-react";

import Section from "@/components/layout/Section";
import { education, siteCopy } from "@/data/portfolio";

const formatDegree = (degree) => {
  if (degree === "Bachelor of Science in Information Technology") {
    return (
      <>
        Bachelor of Science in{" "}
        <span className="text-slate-400">
          Information Technology
        </span>
      </>
    );
  }

  return degree;
};

function Education() {
  return (
    <Section
      id="education"
      eyebrow={siteCopy.education.eyebrow}
      title={siteCopy.education.title}
      description={siteCopy.education.description}
    >
      <div className="relative">
        {/* =================================================
            TIMELINE LINE
        ================================================== */}

        <div
          className="pointer-events-none absolute bottom-8 left-[1.15rem] top-8 hidden w-px bg-gradient-to-b from-cyan-300/30 via-white/[0.08] to-transparent md:block"
          aria-hidden="true"
        />

        {/* =================================================
            EDUCATION ITEMS
        ================================================== */}

        <div className="space-y-4">
          {education.map((item, index) => {
            const isPrimary = index === 0;

            return (
              <motion.article
                key={`${item.degree}-${item.institution}`}
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative grid gap-5 md:grid-cols-[2.5rem_minmax(0,1fr)]"
              >
                {/* =================================================
                    TIMELINE MARKER
                ================================================== */}

                <div className="relative z-10 hidden md:block">
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className={`grid size-9 place-items-center rounded-xl border ${
                      isPrimary
                        ? "border-cyan-300/25 bg-cyan-300/[0.08]"
                        : "border-white/[0.08] bg-[#0D1117]"
                    }`}
                  >
                    <GraduationCap
                      className={`size-4 ${
                        isPrimary
                          ? "text-cyan-300"
                          : "text-slate-500"
                      }`}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>

                {/* =================================================
                    CONTENT CARD
                ================================================== */}

                <div
                  className={`relative overflow-hidden rounded-[1.5rem] border p-6 transition-all duration-300 sm:p-7 ${
                    isPrimary
                      ? "border-cyan-300/15 bg-[#0D1117]"
                      : "border-white/[0.07] bg-[#0D1117]/80 hover:border-white/[0.12]"
                  }`}
                >
                  {/* Subtle primary glow */}
                  {isPrimary && (
                    <div
                      className="pointer-events-none absolute -right-24 -top-24 size-56 rounded-full bg-cyan-300/[0.045] blur-3xl"
                      aria-hidden="true"
                    />
                  )}

                  {/* Hover arrow */}
                  <ArrowUpRight
                    className="pointer-events-none absolute right-6 top-6 size-4 text-slate-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300"
                    aria-hidden="true"
                  />

                  <div className="relative">
                    {/* Top metadata */}
                    <div className="flex flex-col gap-3 pr-8 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`size-1.5 rounded-full ${
                            isPrimary
                              ? "bg-cyan-300"
                              : "bg-slate-600"
                          }`}
                          aria-hidden="true"
                        />

                        <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-500">
                          {isPrimary
                            ? "Higher Education"
                            : "Education"}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-2 text-xs text-slate-500">
                        <CalendarDays
                          className="size-3.5"
                          aria-hidden="true"
                        />

                        <span>{item.date}</span>
                      </div>
                    </div>

                    {/* Degree */}
                    <h3
                      className={`mt-5 max-w-3xl text-xl font-semibold leading-tight tracking-[-0.025em] sm:text-2xl ${
                        isPrimary
                          ? "text-white"
                          : "text-slate-200"
                      }`}
                    >
                      {formatDegree(item.degree)}
                    </h3>

                    {/* Institution */}
                    <p className="mt-2 text-sm font-medium text-cyan-300/80">
                      {item.institution}
                    </p>

                    {/* Description */}
                    <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-500 sm:text-[15px]">
                      {item.description}
                    </p>

                    {/* Bottom metadata */}
                    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-5">
                      {isPrimary ? (
                        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/10 bg-cyan-300/[0.04] px-3 py-1.5 text-[11px] font-medium text-cyan-300">
                          <span className="grid size-4 place-items-center rounded-full bg-cyan-300/10">
                            <Check
                              className="size-2.5"
                              strokeWidth={2.5}
                              aria-hidden="true"
                            />
                          </span>

                          Completed
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-600">
                          Academic Background
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export default Education;