import { motion } from "motion/react";

function LoadingScreen({ duration = 2.4 }) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Loading Khel's portfolio"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.015,
        filter: "blur(10px)",
      }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-6 text-white"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.08),transparent_32%),linear-gradient(135deg,#020617_0%,#050b1f_48%,#061a2b_100%)]"
      />

      {/* Ambient glow */}
      <motion.div
        aria-hidden="true"
        animate={{
          opacity: [0.35, 0.65, 0.35],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-80 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.07] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-72 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.13),rgba(139,92,246,0.1),transparent)] blur-3xl"
      />

      {/* Grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(103,232,249,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.07)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />

      {/* Content */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
          filter: "blur(10px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center"
      >
        {/* Brand mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-8"
        >
          <div className="relative grid size-16 place-items-center rounded-2xl border border-cyan-300/20 bg-white/[0.035] shadow-[0_0_45px_rgba(34,211,238,0.12)] backdrop-blur-sm sm:size-[4.5rem]">
            <span className="text-xl font-bold tracking-[-0.04em] text-white sm:text-2xl">
              MP
            </span>

            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl border border-cyan-300/10"
            />

            <motion.span
              aria-hidden="true"
              animate={{
                opacity: [0.25, 0.7, 0.25],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-1 rounded-[1.15rem] border border-cyan-300/10"
            />
          </div>
        </motion.div>

        {/* Accent line */}
        <motion.div
          aria-hidden="true"
          animate={{
            opacity: [0.4, 1, 0.4],
            scaleX: [0.8, 1, 0.8],
            boxShadow: [
              "0 0 24px rgba(34,211,238,0.25)",
              "0 0 42px rgba(103,232,249,0.55)",
              "0 0 24px rgba(34,211,238,0.25)",
            ],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-7 h-px w-32 origin-center bg-gradient-to-r from-transparent via-cyan-200 to-transparent sm:w-48"
        />

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.25,
          }}
          className="text-balance text-3xl font-semibold leading-tight tracking-[-0.025em] text-white drop-shadow-[0_0_30px_rgba(34,211,238,0.28)] sm:text-5xl"
        >
          Welcome to{" "}
          <span className="bg-gradient-to-r from-cyan-200 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
            Khel&apos;s Portfolio
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.38,
          }}
          className="mt-4 max-w-md text-sm font-medium leading-7 text-slate-400 sm:text-base"
        >
          Full Stack Developer · Laravel · React · MySQL
        </motion.p>

        {/* Loading status */}
        <div className="mt-10 w-full max-w-md">
          <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em]">
            <span className="text-slate-600">Initializing</span>

            <motion.span
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-cyan-300/70"
            >
              Please wait
            </motion.span>
          </div>

          {/* Progress bar */}
          <div
            aria-hidden="true"
            className="relative h-1.5 overflow-hidden rounded-full border border-cyan-300/20 bg-white/[0.055] shadow-[0_0_30px_rgba(34,211,238,0.12)]"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-400 shadow-[0_0_22px_rgba(34,211,238,0.55)]"
            />

            <motion.span
              initial={{ left: "-20%" }}
              animate={{ left: "110%" }}
              transition={{
                duration: duration * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-y-0 w-20 rounded-full bg-white/70 blur-md"
            />
          </div>
        </div>

        {/* Bottom metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.55,
          }}
          className="mt-7 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-600"
        >
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-cyan-300/70 shadow-[0_0_8px_rgba(103,232,249,0.7)]"
          />
          <span>Web Portfolio</span>
          <span className="text-slate-700">/</span>
          <span>2026</span>
        </motion.div>

        <span className="sr-only">
          Loading Khel&apos;s portfolio. Please wait.
        </span>
      </motion.div>
    </motion.div>
  );
}

export default LoadingScreen;