export const defaultEasing = [0.6, -0.05, 0.01, 0.99];

export const motions = {
  fadeInAndUp: (duration = 0.3) => ({
    initial: {
      opacity: 0,
      y: 30,
      transition: { duration, ease: defaultEasing },
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: defaultEasing },
    },
    exit: {
      opacity: 0,
      y: 30,
      transition: { duration, ease: defaultEasing },
    },
  }),
};
