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

function App() {
  return (
    <div className="dark min-h-screen overflow-hidden bg-slate-950 text-white selection:bg-cyan-300/25 selection:text-white">
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
    </div>
  );
}

export default App;
