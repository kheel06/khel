import { motion } from "motion/react";
import {
  ArrowUpRight,
  CheckCircle2,
  Download,
  Mail,
  Phone,
} from "lucide-react";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
} from "@tabler/icons-react";

import Section from "@/components/layout/Section";
import { profile, siteCopy, socialLinks } from "@/data/portfolio";

const iconMap = {
  Facebook: IconBrandFacebook,
  Linkedin: IconBrandLinkedin,
  Mail,
};

const externalProps = (href) => {
  const isExternal = href?.startsWith("http");

  return {
    target: isExternal ? "_blank" : undefined,
    rel: isExternal ? "noreferrer" : undefined,
  };
};

function Contact() {
  const hasResume =
    profile.resumeUrl &&
    profile.resumeUrl !== "#" &&
    profile.resumeUrl.trim() !== "";

  const socialItems = socialLinks.filter(
    (link) => link.icon !== "Mail" && link.label !== "Email"
  );

  return (
    <Section id="contact" className="pb-10">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10"
      >
        {/* Ambient background */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -right-32 -top-40 size-[28rem] rounded-full bg-cyan-400/[0.07] blur-3xl" />

          <div className="absolute -bottom-48 left-1/3 size-[32rem] rounded-full bg-violet-500/[0.045] blur-3xl" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.06),transparent_35%)]" />
        </div>

        {/* Top accent */}
        <div
          className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
          aria-hidden="true"
        />

        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div className="relative">
          {/* Header */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
            <div className="max-w-3xl">
              {/* Availability */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.055] px-3.5 py-2 text-xs font-medium text-cyan-100">
                <span className="relative flex size-2">
                  <span
                    className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-300/50"
                    aria-hidden="true"
                  />

                  <span
                    className="relative inline-flex size-2 rounded-full bg-cyan-300"
                    aria-hidden="true"
                  />
                </span>

                {profile.availability || "Open to opportunities"}
              </div>

              {/* Eyebrow */}
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                {siteCopy.contact.eyebrow}
              </p>

              {/* Heading */}
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
                {siteCopy.contact.title}
              </h2>

              {/* Description */}
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                {siteCopy.contact.description}
              </p>

              {/* Contact information */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {/* Email */}
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/20 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-cyan-300/[0.035] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-cyan-300/10 bg-cyan-300/[0.06] text-cyan-200 transition-colors group-hover:border-cyan-300/20 group-hover:bg-cyan-300/[0.1]">
                    <Mail className="size-4" aria-hidden="true" />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Email
                    </span>

                    <span className="mt-1 block truncate text-sm font-medium text-slate-200">
                      {profile.email}
                    </span>
                  </span>
                </a>

                {/* Phone */}
                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/20 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-cyan-300/[0.035] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-slate-300 transition-colors group-hover:border-cyan-300/20 group-hover:bg-cyan-300/[0.06] group-hover:text-cyan-200">
                      <Phone className="size-4" aria-hidden="true" />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Phone
                      </span>

                      <span className="mt-1 block truncate text-sm font-medium text-slate-200">
                        {profile.phone}
                      </span>
                    </span>
                  </a>
                )}
              </div>
            </div>

            {/* CTA area */}
            <div className="flex flex-col justify-end">
              <div className="mb-3 hidden text-right text-xs font-medium uppercase tracking-[0.16em] text-slate-500 lg:block">
                Let&apos;s work together
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                {/* Primary CTA */}
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                >
                  <Mail className="size-4" aria-hidden="true" />

                  <span>{siteCopy.contact.emailCta}</span>

                  <ArrowUpRight
                    className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>

                {/* Resume */}
                {hasResume && (
                  <a
                    href={profile.resumeUrl}
                    {...externalProps(profile.resumeUrl)}
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-semibold text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-cyan-300/[0.04] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                  >
                    <Download
                      className="size-4 text-cyan-200 transition-transform duration-200 group-hover:translate-y-0.5"
                      aria-hidden="true"
                    />

                    <span>{siteCopy.contact.resumeCta}</span>
                  </a>
                )}
              </div>

              {/* Availability note */}
              <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-500">
                <CheckCircle2
                  className="mt-0.5 size-3.5 shrink-0 text-cyan-300/70"
                  aria-hidden="true"
                />

                <span>
                  {profile.location || "Philippines"} · Available for
                  opportunities
                </span>
              </div>
            </div>
          </div>

          {/* Bottom divider */}
          <div className="my-8 h-px bg-white/[0.07]" />

          {/* Social / footer metadata */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Social links */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                Connect
              </span>

              {socialItems.map((link) => {
                const Icon = iconMap[link.icon] || ArrowUpRight;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    {...externalProps(link.href)}
                    aria-label={link.label}
                    title={link.label}
                    className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2 text-xs font-medium text-slate-400 transition-all duration-200 hover:border-cyan-300/20 hover:bg-cyan-300/[0.04] hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                  >
                    <Icon
                      className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />

                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span
                className="size-1.5 rounded-full bg-cyan-300/70"
                aria-hidden="true"
              />

              <span>{profile.location || "Philippines"}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mx-auto mt-8 flex max-w-7xl flex-col gap-4 border-t border-white/[0.06] pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}.{" "}
          {siteCopy.contact.rights}
        </p>

        <a
          href="#home"
          className="group inline-flex w-fit items-center gap-1.5 text-slate-400 transition-colors hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
        >
          {siteCopy.contact.backToTopLabel}

          <ArrowUpRight
            className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </footer>
    </Section>
  );
}

export default Contact;