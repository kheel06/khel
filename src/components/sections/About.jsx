import { motion } from "motion/react";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Code2,
  Database,
  MapPin,
  Server,
  Sparkles,
} from "lucide-react";

import avatarImage from "@/assets/khel.jpg";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import Section from "@/components/layout/Section";
import { profile, siteCopy, stats } from "@/data/portfolio";

const statIcons = [
  BriefcaseBusiness,
  BadgeCheck,
  Code2,
];

const capabilities = [
  {
    icon: Code2,
    title: "Frontend",
    description:
      "Responsive interfaces with React, JavaScript, Tailwind CSS, and thoughtful UI interactions.",
  },
  {
    icon: Server,
    title: "Backend",
    description:
      "Structured web applications, APIs, authentication, CRUD systems, and business logic.",
  },
  {
    icon: Database,
    title: "Data",
    description:
      "Database-driven applications using MySQL with clean, practical data workflows.",
  },
];

function About() {
  return (
    <Section
      id="about"
      eyebrow={siteCopy.about.eyebrow}
      title="I build with both sides of the stack."
      description="I care about how a product feels on the surface and how well it works underneath. My approach combines interface design, frontend development, backend architecture, and database-driven systems."
    >
      <div className="space-y-5">
        {/* =================================================
            INTRODUCTION
        ================================================== */}

        <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          {/* PROFILE */}
          <FadeUp className="relative">
            <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#0D1117]">
              {/* Image */}
              <div className="relative aspect-[4/4.8] overflow-hidden">
                <img
                  src={avatarImage}
                  alt={`${profile.name} portrait`}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />

                {/* Dark cinematic overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/10 to-transparent"
                  aria-hidden="true"
                />

                {/* Subtle cyan light */}
                <div
                  className="pointer-events-none absolute -right-16 top-1/3 size-40 rounded-full bg-cyan-300/[0.06] blur-3xl"
                  aria-hidden="true"
                />

                {/* Location */}
                <div className="absolute left-5 top-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-xl">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-300 opacity-50" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-cyan-300" />
                    </span>

                    Philippines
                  </div>
                </div>

                {/* Image identity */}
                <div className="absolute inset-x-5 bottom-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
                    {profile.role}
                  </p>

                  <h3 className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
                    {profile.name}
                  </h3>
                </div>
              </div>

              {/* Profile metadata */}
              <div className="border-t border-white/[0.07] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600">
                      Current focus
                    </p>

                    <p className="mt-1.5 text-sm font-medium text-slate-300">
                      Full Stack Web Development
                    </p>
                  </div>

                  <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-cyan-300/10 bg-cyan-300/[0.04]">
                    <Code2
                      className="size-4 text-cyan-300"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* MAIN CONTENT */}
          <div className="grid gap-5">
            {/* BIO */}
            <FadeUp
              delay={0.08}
              className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#0D1117] p-6 sm:p-8"
            >
              {/* Decorative number */}
              <span
                className="pointer-events-none absolute right-7 top-5 select-none text-7xl font-semibold tracking-[-0.08em] text-white/[0.025]"
                aria-hidden="true"
              >
                01
              </span>

              <div className="relative">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-300">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  {siteCopy.about.bioLabel}
                </div>

                <h3 className="mt-5 max-w-2xl text-2xl font-semibold leading-[1.15] tracking-[-0.035em] text-white sm:text-3xl">
                  Turning ideas and requirements into useful digital products.
                </h3>

                <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-7 text-slate-400">
                  {profile.about.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {/* Location */}
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/[0.07] pt-5">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin
                      className="size-4 text-cyan-300"
                      aria-hidden="true"
                    />

                    <span>{profile.location}</span>
                  </div>

                  <span
                    className="hidden h-1 w-1 rounded-full bg-slate-700 sm:block"
                    aria-hidden="true"
                  />

                  <span className="text-sm text-slate-600">
                    Available for opportunities
                  </span>
                </div>
              </div>
            </FadeUp>

            {/* STATS */}
            <StaggerContainer className="grid gap-3 sm:grid-cols-3">
              {stats.map((stat, index) => {
                const Icon = statIcons[index] || BadgeCheck;

                return (
                  <motion.article
                    key={stat.label}
                    variants={staggerItem}
                    whileHover={{ y: -4 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className="group relative overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#0D1117] p-5 transition-colors duration-300 hover:border-cyan-300/20"
                  >
                    {/* Hover glow */}
                    <div
                      className="pointer-events-none absolute -right-8 -top-8 size-20 rounded-full bg-cyan-300/[0.04] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden="true"
                    />

                    <div className="relative flex items-start justify-between">
                      <span className="grid size-9 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.025]">
                        <Icon
                          className="size-4 text-slate-400 transition-colors duration-200 group-hover:text-cyan-300"
                          aria-hidden="true"
                        />
                      </span>

                      <span className="text-[10px] font-medium tracking-[0.15em] text-slate-700">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="relative mt-7">
                      <p className="text-3xl font-semibold tracking-[-0.05em] text-white">
                        {stat.value}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {stat.label}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </StaggerContainer>
          </div>
        </div>

        {/* =================================================
            CAPABILITIES
        ================================================== */}

        <FadeUp
          delay={0.12}
          className="rounded-[1.75rem] border border-white/[0.08] bg-[#0D1117]"
        >
          <div className="border-b border-white/[0.07] px-6 py-5 sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  How I work
                </p>

                <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-white">
                  From interface to infrastructure.
                </h3>
              </div>

              <span className="hidden text-xs text-slate-600 sm:block">
                02 / Capabilities
              </span>
            </div>
          </div>

          <StaggerContainer className="grid divide-y divide-white/[0.07] md:grid-cols-3 md:divide-x md:divide-y-0">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;

              return (
                <motion.article
                  key={capability.title}
                  variants={staggerItem}
                  className="group relative p-6 transition-colors duration-300 hover:bg-white/[0.015] sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <div className="grid size-10 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.025]">
                      <Icon
                        className="size-4 text-slate-400 transition-colors duration-200 group-hover:text-cyan-300"
                        aria-hidden="true"
                      />
                    </div>

                    <span className="text-[10px] tracking-[0.15em] text-slate-700">
                      0{index + 1}
                    </span>
                  </div>

                  <h4 className="mt-6 text-base font-semibold text-white">
                    {capability.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {capability.description}
                  </p>
                </motion.article>
              );
            })}
          </StaggerContainer>
        </FadeUp>

        {/* =================================================
            CTA
        ================================================== */}

        <FadeUp delay={0.16}>
          <div className="group relative overflow-hidden rounded-[1.5rem] border border-cyan-300/10 bg-cyan-300/[0.025] px-6 py-6 sm:px-7">
            {/* Background glow */}
            <div
              className="pointer-events-none absolute -right-20 -top-24 size-56 rounded-full bg-cyan-300/[0.045] blur-3xl"
              aria-hidden="true"
            />

            <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-base font-medium tracking-[-0.01em] text-white">
                  Have a project, idea, or opportunity?
                </p>

                <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-500">
                  I&apos;m open to development opportunities, freelance
                  projects, and collaborations where I can build something
                  meaningful.
                </p>
              </div>

              <a
                href="#contact"
                className="group/link inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
              >
                Let&apos;s talk

                <ArrowUpRight
                  className="size-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </Section>
  );
}

export default About;