import { motion } from "motion/react";
import { Calendar, GraduationCap } from "lucide-react";

import Section from "@/components/layout/Section";
import { education, siteCopy } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const formatDegree = (degree) =>
  degree === "Bachelor of Science in Information Technology" ? (
    <>
      Bachelor of Science in
      <br />
      Information Technology
    </>
  ) : (
    degree
  );

function Education() {
  return (
    <Section
      id="education"
      eyebrow={siteCopy.education.eyebrow}
      title={siteCopy.education.title}
      description={siteCopy.education.description}
    >
      <div data-education-timeline className="relative mx-auto max-w-6xl">
        <div className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-white/10 md:left-1/2 md:-translate-x-1/2">
          <div
            data-education-progress
            className="h-full origin-top scale-y-0 rounded-full bg-gradient-to-b from-cyan-300 via-sky-400 to-violet-400"
          />
        </div>

        <ol className="relative">
          {education.map((item, index) => (
            <motion.li
              data-education-item
              key={`${item.degree}-${item.institution}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.58,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="education-item relative grid gap-4 pb-5 pl-12 last:pb-0 md:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)] md:pl-0"
            >
              <span className="education-marker absolute left-0 top-1 z-10 grid size-9 place-items-center rounded-full border border-cyan-300/35 bg-slate-950 text-cyan-200 shadow-lg shadow-cyan-950/40 transition-all duration-300 md:left-1/2 md:-translate-x-1/2">
                <GraduationCap className="size-4" aria-hidden="true" />
              </span>

              <article
                data-gsap-card
                className={cn(
                  "glass-card card-hover education-card p-4 transition-colors hover:border-violet-300/35",
                  index % 2 === 0
                    ? "md:col-start-1 md:text-right"
                    : "md:col-start-3"
                )}
              >
                <div
                  className={cn(
                    "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
                    index % 2 !== 0 && "sm:flex-row-reverse"
                  )}
                >
                  <p className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-slate-300">
                    <Calendar
                      className="size-4 text-violet-200"
                      aria-hidden="true"
                    />
                    {item.date}
                  </p>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {formatDegree(item.degree)}
                    </h3>
                    <p className="mt-2 text-sm text-cyan-200">
                      {item.institution}
                    </p>
                  </div>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

export default Education;