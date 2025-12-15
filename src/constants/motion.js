export const EASING = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  spring: { type: 'spring', stiffness: 100, damping: 20 },
  smooth: { type: 'spring', stiffness: 50, damping: 25 },
  bounce: { type: 'spring', stiffness: 400, damping: 10 },
};

export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.2,
  verySlow: 2,
};

export const STAGGER = {
  children: 0.05,
  fast: 0.02,
  slow: 0.1,
};

export const VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -60 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 60 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
  },
};

export const SCROLL_REVEAL = {
  viewport: { once: false, margin: '-100px' },
  transition: { duration: DURATION.normal, ease: EASING.easeOut },
};
