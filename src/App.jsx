import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import LoadingScreen from "@/components/layout/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import ScrollEffects from "@/components/animations/ScrollEffects";
import About from "@/components/sections/About";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Home from "@/components/sections/Home";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

const LOADING_SCREEN_DURATION_MS = 3000;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, LOADING_SCREEN_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isLoading) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLoading]);

  return (
    <div className="dark min-h-screen overflow-hidden bg-slate-950 text-white selection:bg-cyan-300/25 selection:text-white">
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen duration={LOADING_SCREEN_DURATION_MS / 1000} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.85, ease: "easeOut" }}
        >
          <Navbar />
          <ScrollEffects />
          <main>
            <Home />
            <About />
            <Education />
            <Experience />
            <Skills />
            <Projects />
            <Certifications />
            <Contact />
          </main>
        </motion.div>
      )}
    </div>
  );
}

export default App;
