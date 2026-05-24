import { motion } from "motion/react";

function StaggerContainer({
  children,
  className = "",
  delayChildren = 0,
  staggerChildren = 0.08,
  amount = 0.16,
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default StaggerContainer;
