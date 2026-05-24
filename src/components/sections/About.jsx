import { motion } from "motion/react";
import { BadgeCheck, Briefcase, Layers, MapPin } from "lucide-react";

import avatarImage from "@/assets/khel.jpg";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import Section from "@/components/layout/Section";
import { profile, siteCopy, stats } from "@/data/portfolio";

const statIcons = [Briefcase, BadgeCheck, Layers];

function About() {
  return (
    <Section
      id="about"
      eyebrow={siteCopy.about.eyebrow}
      title={siteCopy.about.title}
      description={siteCopy.about.description}
    >
      <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
        <FadeUp className="glass-card card-hover relative overflow-hidden p-4">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent" />
          <div className="grid min-h-[24rem] place-items-center rounded-[1.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.12),rgba(15,23,42,0.86),rgba(139,92,246,0.15))] p-4 sm:p-5">
            <div className="text-center">
              <div className="mx-auto h-64 w-52 overflow-hidden rounded-[2rem] border border-cyan-300/30 bg-cyan-300/10 shadow-2xl shadow-cyan-950/30 sm:h-72 sm:w-56">
                <img
                  src={avatarImage}
                  alt={`${profile.name} portrait`}
                  className="size-full object-cover"
                />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">
                {profile.name}
              </h3>
              <p className="mt-2 text-slate-400">{profile.role}</p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-300">
                <MapPin className="size-4 text-cyan-300" aria-hidden="true" />
                {profile.location}
              </p>
            </div>
          </div>
        </FadeUp>

        <div className="grid gap-4">
          <FadeUp delay={0.08} className="glass-card card-hover p-4 sm:p-5">
            <p className="text-sm font-semibold uppercase text-cyan-300">
              {siteCopy.about.bioLabel}
            </p>
            <div className="mt-3 space-y-3 text-base leading-7 text-slate-300">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </FadeUp>

          <StaggerContainer className="grid gap-3 sm:grid-cols-3">
            {stats.map((stat, index) => {
              const Icon = statIcons[index] || BadgeCheck;

              return (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="glass-card card-hover p-3.5"
                >
                  <Icon className="size-5 text-cyan-300" aria-hidden="true" />
                  <p className="mt-3 text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </Section>
  );
}

export default About;
