export const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 40, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] }
  }
};

export const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1
    }
  }
};
