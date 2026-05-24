import { motion } from "motion/react";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

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
      <StaggerContainer className="grid gap-5 lg:grid-cols-2">
        {experience.map((item) => (
          <motion.article
            key={`${item.role}-${item.company}`}
            variants={staggerItem}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            data-gsap-card
            className="glass-card card-hover p-5 transition-colors hover:border-violet-300/35 sm:p-6"
          >
            <div className="grid size-12 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
              <Briefcase className="size-4" aria-hidden="true" />
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {item.role}
                </h3>
                <p className="mt-1 text-cyan-200">{item.company}</p>
              </div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-slate-300">
                <Calendar className="size-4 text-violet-200" aria-hidden="true" />
                {item.date}
              </p>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              {item.description}
            </p>

            <ul className="mt-5 grid gap-3">
              {item.achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="flex gap-3 text-sm leading-6 text-slate-300"
                >
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-cyan-300"
                    aria-hidden="true"
                  />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </StaggerContainer>
    </Section>
  );
}

export default Experience;
