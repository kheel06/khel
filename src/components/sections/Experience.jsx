import { motion } from "motion/react";
import {
  BriefcaseBusiness,
  Check,
  CalendarDays,
  MapPin,
} from "lucide-react";

import StaggerContainer from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import Section from "@/components/layout/Section";
import { experience, siteCopy } from "@/data/portfolio";

function Experience() {
  return (
    <Section
      id="experience"
      eyebrow={siteCopy.experience.eyebrow}
      title={siteCopy.experience.title}
      description={siteCopy.experience.description}
    >
      <StaggerContainer className="relative space-y-6">
        {experience.map((item, index) => {
          const isCurrent = index === 0;
          const isLast = index === experience.length - 1;

          return (
            <motion.article
              key={`${item.role}-${item.company}`}
              variants={staggerItem}
              whileHover={{ y: -3 }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative pl-0 sm:pl-14"
            >
              {/* Timeline */}
              <div
                className="absolute left-4 top-0 hidden h-full sm:block"
                aria-hidden="true"
              >
                {!isLast && (
                  <span className="absolute left-1/2 top-10 h-[calc(100%+1.5rem)] w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/25 via-white/[0.08] to-transparent" />
                )}

                <span
                  className={[
                    "relative z-10 grid size-8 -translate-x-1/2 place-items-center rounded-xl border transition-all duration-300",
                    isCurrent
                      ? "border-cyan-300/25 bg-cyan-300/[0.08] text-cyan-300"
                      : "border-white/[0.08] bg-[#0D1117] text-slate-500 group-hover:border-white/[0.14] group-hover:text-slate-300",
                  ].join(" ")}
                >
                  <BriefcaseBusiness
                    className="size-4"
                    strokeWidth={1.8}
                  />
                </span>
              </div>

              {/* Card */}
              <div
                className={[
                  "relative overflow-hidden rounded-[1.5rem] border bg-[#0D1117] transition-all duration-300",
                  isCurrent
                    ? "border-cyan-300/15 shadow-[0_20px_70px_rgba(0,0,0,0.2)]"
                    : "border-white/[0.08] hover:border-white/[0.14]",
                ].join(" ")}
              >
                {/* Current role accent */}
                {isCurrent && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
                  />
                )}

                <div className="p-5 sm:p-7">
                  {/* Header */}
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex min-w-0 gap-4">
                      {/* Mobile icon */}
                      <div
                        className={[
                          "grid size-11 shrink-0 place-items-center rounded-xl border sm:hidden",
                          isCurrent
                            ? "border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300"
                            : "border-white/[0.08] bg-white/[0.025] text-slate-500",
                        ].join(" ")}
                      >
                        <BriefcaseBusiness
                          className="size-5"
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300/75">
                            {isCurrent
                              ? "Current role"
                              : "Development experience"}
                          </p>

                          {isCurrent && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/10 bg-emerald-300/[0.05] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-emerald-300/80">
                              <span className="size-1.5 rounded-full bg-emerald-300" />
                              Active
                            </span>
                          )}
                        </div>

                        <h3 className="mt-2 text-xl font-semibold leading-tight tracking-[-0.025em] text-white sm:text-2xl">
                          {item.role}
                        </h3>

                        <p className="mt-2 text-sm font-medium text-slate-300">
                          {item.company}
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs text-slate-400">
                      <CalendarDays
                        className="size-3.5 text-cyan-300/70"
                        aria-hidden="true"
                      />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-6 border-t border-white/[0.07] pt-6">
                    <p className="max-w-3xl text-sm leading-7 text-slate-400 sm:text-[15px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Contributions */}
                  <div className="mt-7">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Key contributions
                      </p>

                      <span className="text-[10px] font-medium text-slate-600">
                        {String(item.achievements.length).padStart(2, "0")}
                      </span>
                    </div>

                    <ul className="grid gap-3 md:grid-cols-2">
                      {item.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="flex gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] p-3.5 text-sm leading-6 text-slate-400 transition-colors duration-200 group-hover:border-white/[0.07]"
                        >
                          <span
                            className={[
                              "mt-1 grid size-5 shrink-0 place-items-center rounded-full border",
                              isCurrent
                                ? "border-cyan-300/15 bg-cyan-300/[0.06] text-cyan-300"
                                : "border-white/[0.08] bg-white/[0.025] text-slate-500",
                            ].join(" ")}
                          >
                            <Check
                              className="size-3"
                              strokeWidth={2.5}
                              aria-hidden="true"
                            />
                          </span>

                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer metadata */}
                  <div className="mt-7 flex flex-col gap-3 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <span className="size-1.5 rounded-full bg-cyan-300/50" />
                      <span>Full Stack Development</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <MapPin
                        className="size-3.5"
                        aria-hidden="true"
                      />
                      <span>Philippines</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </StaggerContainer>
    </Section>
  );
}

export default Experience;