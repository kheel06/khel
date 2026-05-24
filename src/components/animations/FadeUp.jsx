import { motion } from "motion/react";

function FadeUp({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  y = 28,
  amount = 0.18,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default FadeUp;
