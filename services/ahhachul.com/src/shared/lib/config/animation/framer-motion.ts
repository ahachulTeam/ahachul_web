import { type Variants as MotionVariantsType } from 'framer-motion';

export const defaultEasing = [0.6, -0.05, 0.01, 0.99];

export const animateVariants = (duration = 0.3): MotionVariantsType => ({
  initial: {
    opacity: 0,
    transition: { duration, ease: defaultEasing },
    willChange: 'opacity',
  },
  animate: {
    opacity: 1,
    transition: { duration, ease: defaultEasing },
    willChange: 'opacity',
  },
  exit: {
    opacity: 0,
    transition: { duration, ease: defaultEasing },
    willChange: 'opacity',
  },
});
