export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};