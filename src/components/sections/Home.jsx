import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Mail, Mouse, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";

const heroContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const heroItem = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

const wordAnimation = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

function Home() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-28 text-center sm:px-6 lg:px-8"
    >
      <Spotlight
        className="-top-80 left-1/2 -translate-x-1/2 opacity-40"
        fill="#22d3ee"
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_35%,rgba(139,92,246,0.12)_70%,transparent)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.25),rgba(2,6,23,0.92)_85%)]" />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center"
      >
        <motion.div
          variants={heroItem}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 backdrop-blur"
        >
          <Sparkles className="size-4" aria-hidden="true" />
          Building modern digital experiences
        </motion.div>

        <motion.h1
          variants={heroContainer}
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
        >
          <motion.span variants={wordAnimation}>Hello,</motion.span>

          <motion.span variants={wordAnimation}>I’m</motion.span>

          <motion.span
            variants={wordAnimation}
            animate={{
              backgroundPosition: ["220% center", "-220% center"],
            }}
            transition={{
              backgroundPosition: {
                duration: 16,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              },
            }}
            className="bg-[linear-gradient(110deg,#22d3ee_0%,#8b5cf6_35%,#ffffff_50%,#8b5cf6_65%,#22d3ee_100%)] bg-[length:300%_100%] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(34,211,238,0.45)]"
          >
            Michael Petras
          </motion.span>
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mt-6 max-w-3xl text-xl font-medium text-cyan-100 sm:text-2xl"
        >
          Full Stack Developer
        </motion.p>

        <motion.p
          variants={heroItem}
          className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg"
        >
          I build responsive websites, powerful web applications, and clean
          digital experiences using modern frontend and backend technologies.
        </motion.p>

        <motion.div
          variants={heroItem}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            asChild
            variant="ghost"
            className="glow-button h-12 rounded-full px-6 text-base font-semibold text-slate-950 hover:text-white"
          >
            <a href="#projects">
              View My Work
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-12 rounded-full border-white/10 bg-white/5 px-6 text-base font-semibold text-white hover:border-violet-300/50 hover:bg-violet-400/10 hover:text-white"
          >
            <a href="#contact">
              Let’s Connect
              <Mail className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <motion.a
        href="#projects"
        aria-label="Scroll down"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: [0, 10, 0],
        }}
        transition={{
          opacity: {
            duration: 0.8,
            delay: 1.2,
            ease: "easeOut",
          },
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cyan-100/80 transition hover:text-cyan-100"
      >
        <div className="relative flex size-12 items-center justify-center rounded-full border border-cyan-300/20 bg-white/5 backdrop-blur-md">
          <Mouse className="size-5" aria-hidden="true" />

          <motion.span
            animate={{
              y: [0, 6, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-4 h-1.5 w-1.5 rounded-full bg-cyan-200"
          />
        </div>

        <ChevronDown className="size-5" aria-hidden="true" />
      </motion.a>
    </section>
  );
}

export default Home;