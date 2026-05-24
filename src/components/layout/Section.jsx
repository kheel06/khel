import FadeUp from "@/components/animations/FadeUp";
import { cn } from "@/lib/utils";

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  contentClassName,
}) {
  return (
    <section
      id={id}
      className={cn(
        "section-bg relative scroll-mt-24 px-4 py-8 sm:px-6 sm:py-10 lg:px-8",
        className
      )}
    >
      <div className={cn("mx-auto max-w-7xl", contentClassName)}>
        {(eyebrow || title || description) && (
          <FadeUp className="mb-6 max-w-3xl">
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase text-cyan-300">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-2 max-w-2xl text-base leading-7 text-slate-400">
                {description}
              </p>
            )}
          </FadeUp>
        )}
        {children}
      </div>
    </section>
  );
}

export default Section;
