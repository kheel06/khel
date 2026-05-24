import { motion } from "motion/react";
import {
  ArrowRight,
  Download,
  Mail,
  Phone,
} from "lucide-react";
import { IconBrandFacebook, IconBrandLinkedin } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import Section from "@/components/layout/Section";
import { profile, siteCopy, socialLinks } from "@/data/portfolio";

const iconMap = {
  Facebook: IconBrandFacebook,
  Linkedin: IconBrandLinkedin,
  Mail,
};

function Contact() {
  return (
    <Section id="contact" className="pb-10">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        data-gsap-card
        className="glass-card card-hover relative overflow-hidden p-6 sm:p-8 lg:p-10"
      >
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(34,211,238,0.12),transparent_40%,rgba(139,92,246,0.14))]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-cyan-300">
              {siteCopy.contact.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
              {siteCopy.contact.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400">
              {siteCopy.contact.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button
              asChild
              variant="ghost"
              className="glow-button h-12 rounded-full px-6 text-base font-semibold text-slate-950 hover:text-white"
            >
              <a href={`mailto:${profile.email}`}>
                {siteCopy.contact.emailCta}
                <Mail className="size-4" aria-hidden="true" />
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/10 bg-white/5 px-6 text-base font-semibold text-white hover:border-violet-300/50 hover:bg-violet-400/10 hover:text-white"
            >
              <a href={profile.resumeUrl}>
                {siteCopy.contact.resumeCta}
                <Download className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <a
              href={`mailto:${profile.email}`}
              aria-label={`Email ${profile.email}`}
              title={profile.email}
              className="inline-grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-cyan-100 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              <Mail className="size-5" aria-hidden="true" />
            </a>

            <a
              href={`tel:${profile.phone}`}
              aria-label={`Call ${profile.phone}`}
              title={profile.phone}
              className="inline-grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-violet-100 transition-colors hover:border-violet-300/40 hover:bg-violet-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              <Phone className="size-5" aria-hidden="true" />
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {socialLinks
              .filter((link) => link.icon !== "Mail" && link.label !== "Email")
              .map((link) => {
                const Icon = iconMap[link.icon] || ArrowRight;
                const isExternal = link.href.startsWith("http");

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {link.label}
                  </a>
                );
              })}
          </div>
        </div>
      </motion.div>

      <footer className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}.{" "}
          {siteCopy.contact.rights}
        </p>

        <a
          href="#home"
          className="text-slate-400 transition-colors hover:text-cyan-200"
        >
          {siteCopy.contact.backToTopLabel}
        </a>
      </footer>
    </Section>
  );
}

export default Contact;