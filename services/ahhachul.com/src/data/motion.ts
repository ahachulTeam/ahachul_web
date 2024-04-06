import type { Variants } from 'framer-motion';

export const defaultEasing = [0.6, -0.05, 0.01, 0.99];

export const defaultFadeInVariants: Variants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity',
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity',
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity',
  },
};

export const snackBarMotionVariants = {
  initial: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.3,
    },
  },
};

export const staggerFadeInUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.5, ease: defaultEasing },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: defaultEasing },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.5, ease: defaultEasing },
  },
};

export const CTAMotionVariants = {
  initial: {
    opacity: 0,
    y: 30,
    x: '-50%',
    transition: { duration: 0.5, ease: defaultEasing },
  },
  animate: {
    opacity: 1,
    y: 0,
    x: '-50%',
    transition: { duration: 0.5, ease: defaultEasing },
  },
  exit: {
    opacity: 0,
    y: 30,
    x: '-50%',
    transition: { duration: 0.5, ease: defaultEasing },
  },
};
