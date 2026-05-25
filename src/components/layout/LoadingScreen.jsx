import { motion } from "motion/react";

function LoadingScreen({ duration = 3 }) {
  return (
    <motion.div
      role="status"
      aria-label="Loading portfolio"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.015, filter: "blur(12px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-6 text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(135deg,#020617_0%,#050b1f_48%,#061a2b_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-72 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.18),rgba(139,92,246,0.14),transparent)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(103,232,249,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />

      <motion.div
        initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center"
      >
        <motion.div
          aria-hidden="true"
          animate={{
            opacity: [0.45, 1, 0.45],
            boxShadow: [
              "0 0 28px rgba(34,211,238,0.35)",
              "0 0 44px rgba(103,232,249,0.62)",
              "0 0 28px rgba(34,211,238,0.35)",
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-7 h-px w-40 bg-gradient-to-r from-transparent via-cyan-200 to-transparent sm:w-56"
        />

        <h1 className="text-balance text-4xl font-semibold leading-tight tracking-normal text-white drop-shadow-[0_0_30px_rgba(34,211,238,0.34)] sm:text-5xl">
          Welcome to Khel’s Portfolio
        </h1>

        <p className="mt-4 text-base font-medium leading-7 text-cyan-100/82 sm:text-lg">
          Crafting modern web experiences...
        </p>

        <div className="mt-10 w-full max-w-md">
          <div
            aria-hidden="true"
            className="relative h-2 overflow-hidden rounded-full border border-cyan-300/25 bg-white/[0.06] shadow-[0_0_34px_rgba(34,211,238,0.18)]"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-[linear-gradient(90deg,#22d3ee,#67e8f9,#a78bfa)] shadow-[0_0_24px_rgba(34,211,238,0.7)]"
            />
            <motion.span
              initial={{ left: "-35%" }}
              animate={{ left: "108%" }}
              transition={{ duration, ease: "easeInOut" }}
              className="absolute inset-y-0 w-24 rounded-full bg-white/75 blur-md"
            />
          </div>
        </div>

        <span className="sr-only">Loading portfolio</span>
      </motion.div>
    </motion.div>
  );
}

export default LoadingScreen;
