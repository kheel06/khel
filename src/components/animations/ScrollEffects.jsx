import { useEffect } from "react";

function ScrollEffects() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    let context;
    let disposed = false;
    const anchorHandlers = [];

    const setupScrollEffects = async () => {
      const [{ default: gsap }, { ScrollTrigger }, { ScrollToPlugin }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("gsap/ScrollToPlugin"),
        ]);

      if (disposed) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      context = gsap.context(() => {
      gsap.utils.toArray("[data-gsap-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 26, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const timeline = document.querySelector("[data-education-timeline]");
      const progressLine = document.querySelector("[data-education-progress]");

      if (timeline && progressLine) {
        gsap.to(progressLine, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top 68%",
            end: "bottom 58%",
            scrub: 0.45,
          },
        });
      }

      gsap.utils.toArray("[data-education-item]").forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 72%",
          end: "bottom 34%",
          toggleClass: { targets: item, className: "is-active" },
        });
      });
      });

      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        const handleClick = (event) => {
          const href = anchor.getAttribute("href");

          if (!href || href === "#") {
            return;
          }

          const target = document.querySelector(href);

          if (!target) {
            return;
          }

          event.preventDefault();
          gsap.to(window, {
            duration: 0.85,
            ease: "power3.out",
            scrollTo: { y: target, offsetY: 92 },
          });
        };

        anchor.addEventListener("click", handleClick);
        anchorHandlers.push([anchor, handleClick]);
      });
    };

    setupScrollEffects();

    return () => {
      disposed = true;
      anchorHandlers.forEach(([anchor, handleClick]) => {
        anchor.removeEventListener("click", handleClick);
      });
      context?.revert();
    };
  }, []);

  return null;
}

export default ScrollEffects;
