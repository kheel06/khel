import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Database,
  Layers3,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";

import { profile, socialLinks } from "@/data/portfolio";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Home() {
  const linkedin = socialLinks.find(
    (link) => link.icon === "Linkedin"
  );

  const facebook = socialLinks.find(
    (link) => link.icon === "Facebook"
  );

  return (
    <section
      id="home"
      className="
        hero-background
        relative
        isolate
        flex
        min-h-[100svh]
        items-center
        justify-center
        overflow-hidden
        px-4
        pb-10
        pt-24
        sm:px-6
        sm:pb-12
        sm:pt-28
        lg:px-8
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -z-10
          h-[520px]
          w-[520px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-300/[0.035]
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[45%]
          -z-10
          h-[300px]
          w-[650px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-500/[0.025]
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          grid-background
          pointer-events-none
          absolute
          inset-0
          -z-20
        "
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="
          container-portfolio
          relative
          z-10
          flex
          w-full
          -translate-y-2
          flex-col
          items-center
          text-center
          lg:-translate-y-4
        "
      >
        {/* =================================================
            AVAILABILITY
        ================================================== */}

        <motion.div variants={itemVariants}>
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-300/10
              bg-cyan-300/[0.035]
              px-3
              py-1.5
              text-[11px]
              font-medium
              text-slate-300
              backdrop-blur-sm
              sm:px-3.5
              sm:py-2
              sm:text-xs
            "
          >
            <span className="relative flex size-1.5 sm:size-2">
              <span
                aria-hidden="true"
                className="
                  absolute
                  inline-flex
                  size-full
                  animate-ping
                  rounded-full
                  bg-cyan-300/60
                "
              />

              <span
                aria-hidden="true"
                className="
                  relative
                  inline-flex
                  size-full
                  rounded-full
                  bg-cyan-300
                  shadow-[0_0_10px_rgba(103,232,249,0.7)]
                "
              />
            </span>

            Available for selected projects
          </div>
        </motion.div>

        {/* =================================================
            EYEBROW
        ================================================== */}

        <motion.div
          variants={itemVariants}
          className="
            mt-5
            flex
            items-center
            justify-center
            gap-2.5
            text-[10px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-slate-500
            sm:mt-6
            sm:text-xs
            sm:tracking-[0.2em]
          "
        >
          <span className="h-px w-5 bg-cyan-300/40 sm:w-8" />

          <span>Full Stack Developer</span>

          <span className="text-slate-700">•</span>

          <span>Philippines</span>

          <span className="h-px w-5 bg-cyan-300/40 sm:w-8" />
        </motion.div>

        {/* =================================================
            MAIN HEADING
        ================================================== */}

        <motion.h1
          variants={itemVariants}
          className="
            mt-5
            max-w-5xl
            text-balance
            text-[clamp(3.1rem,6.2vw,6.3rem)]
            font-semibold
            leading-[0.88]
            tracking-[-0.065em]
            text-white
            sm:mt-6
          "
        >
          Building
          <br />

          <span className="text-slate-400">
            reliable
          </span>{" "}

          <span
            className="
              bg-gradient-to-r
              from-cyan-200
              via-cyan-300
              to-violet-300
              bg-clip-text
              text-transparent
            "
          >
            digital products.
          </span>
        </motion.h1>

        {/* =================================================
            DESCRIPTION
        ================================================== */}

        <motion.p
          variants={itemVariants}
          className="
            mt-5
            max-w-xl
            text-sm
            leading-6
            text-slate-400
            sm:mt-6
            sm:text-base
            sm:leading-7
            lg:max-w-2xl
          "
        >
          I&apos;m{" "}
          <span className="font-medium text-slate-200">
            {profile.name}
          </span>
          , a Full Stack Developer focused on building
          responsive interfaces, scalable web applications,
          APIs, and database-driven systems.
        </motion.p>

        {/* =================================================
            CORE STACK
        ================================================== */}

        <motion.div
          variants={itemVariants}
          className="
            mt-5
            flex
            flex-wrap
            items-center
            justify-center
            gap-1.5
            sm:mt-6
            sm:gap-2
          "
        >
          <span
            className="
              mr-1
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-slate-600
              sm:text-[10px]
            "
          >
            Core stack
          </span>

          {[
            {
              name: "Laravel",
              icon: Layers3,
            },
            {
              name: "React",
              icon: Code2,
            },
            {
              name: "PHP",
              icon: Code2,
            },
            {
              name: "MySQL",
              icon: Database,
            },
          ].map((tech) => {
            const Icon = tech.icon;

            return (
              <span
                key={tech.name}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  px-2.5
                  py-1.5
                  text-[10px]
                  font-medium
                  text-slate-400
                  transition-all
                  duration-200
                  hover:border-cyan-300/20
                  hover:bg-cyan-300/[0.04]
                  hover:text-slate-200
                  sm:px-3
                  sm:py-2
                  sm:text-xs
                "
              >
                <Icon
                  className="size-3 text-cyan-300/70 sm:size-3.5"
                  aria-hidden="true"
                />

                {tech.name}
              </span>
            );
          })}
        </motion.div>

        {/* =================================================
            CTA
        ================================================== */}

        <motion.div
          variants={itemVariants}
          className="
            mt-6
            flex
            flex-col
            items-center
            justify-center
            gap-2.5
            sm:mt-7
            sm:flex-row
          "
        >
          <a
            href="#projects"
            className="
              group
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-cyan-300
              px-5
              text-xs
              font-semibold
              text-slate-950
              shadow-[0_10px_30px_rgba(103,232,249,0.12)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-cyan-200
              hover:shadow-[0_15px_35px_rgba(103,232,249,0.18)]
              sm:h-12
              sm:px-6
              sm:text-sm
            "
          >
            View selected work

            <ArrowRight
              className="
                size-3.5
                transition-transform
                duration-200
                group-hover:translate-x-1
                sm:size-4
              "
              aria-hidden="true"
            />
          </a>

          <a
            href="#contact"
            className="
              group
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/[0.09]
              bg-white/[0.025]
              px-5
              text-xs
              font-medium
              text-slate-300
              backdrop-blur-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-white/[0.16]
              hover:bg-white/[0.05]
              hover:text-white
              sm:h-12
              sm:px-6
              sm:text-sm
            "
          >
            Get in touch

            <ArrowUpRight
              className="
                size-3.5
                transition-transform
                duration-200
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
                sm:size-4
              "
              aria-hidden="true"
            />
          </a>
        </motion.div>

        {/* =================================================
            SOCIAL LINKS
        ================================================== */}

        <motion.div
          variants={itemVariants}
          className="
            mt-5
            flex
            items-center
            justify-center
            gap-1.5
            sm:mt-6
            sm:gap-2
          "
        >
          <span
            className="
              mr-1
              text-[10px]
              text-slate-600
              sm:mr-2
              sm:text-xs
            "
          >
            Find me
          </span>

          {/* GitHub */}

          <a
            href="https://github.com/kheel06"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="
              grid
              size-8
              place-items-center
              rounded-lg
              border
              border-white/[0.07]
              bg-white/[0.02]
              text-slate-500
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-white/[0.15]
              hover:bg-white/[0.05]
              hover:text-white
              sm:size-9
            "
          >
            <FaGithub className="size-3.5 sm:size-4" />
          </a>

          {/* LinkedIn */}

          {linkedin && (
            <a
              href={linkedin.href}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="
                grid
                size-8
                place-items-center
                rounded-lg
                border
                border-white/[0.07]
                bg-white/[0.02]
                text-slate-500
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-cyan-300/20
                hover:bg-cyan-300/[0.04]
                hover:text-cyan-300
                sm:size-9
              "
            >
              <FaLinkedin className="size-3.5 sm:size-4" />
            </a>
          )}

          {/* Facebook */}

          {facebook && (
            <a
              href={facebook.href}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              title="Facebook"
              className="
                grid
                size-8
                place-items-center
                rounded-lg
                border
                border-white/[0.07]
                bg-white/[0.02]
                text-slate-500
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-cyan-300/20
                hover:bg-cyan-300/[0.04]
                hover:text-cyan-300
                sm:size-9
              "
            >
              <FaFacebook className="size-3.5 sm:size-4" />
            </a>
          )}
        </motion.div>

        {/* =================================================
            SYSTEM STATEMENT
        ================================================== */}

        <motion.div
          variants={itemVariants}
          className="
            mt-5
            hidden
            items-center
            justify-center
            gap-3
            text-[10px]
            text-slate-600
            sm:flex
          "
        >
          <span className="h-px w-6 bg-white/[0.08]" />

          <span>
            Interface → application → API → database
          </span>

          <span className="h-px w-6 bg-white/[0.08]" />
        </motion.div>
      </motion.div>

      {/* =====================================================
          DESKTOP SCROLL INDICATOR
      ====================================================== */}

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
          delay: 1,
        }}
        className="
          absolute
          bottom-5
          left-1/2
          hidden
          -translate-x-1/2
          items-center
          gap-2
          text-[10px]
          uppercase
          tracking-[0.16em]
          text-slate-700
          transition-colors
          hover:text-cyan-300
          md:flex
        "
      >
        <span>Scroll to explore</span>

        <ArrowDown
          className="size-3"
          aria-hidden="true"
        />
      </motion.a>
    </section>
  );
}

export default Home;