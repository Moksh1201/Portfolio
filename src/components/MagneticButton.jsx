import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function MagneticButton({ children, className = '', href, onClick, type = 'button', variant = 'primary' }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 190, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 190, damping: 18, mass: 0.35 });
  const glow = useTransform(springX, [-24, 24], ['rgba(69,217,255,0.28)', 'rgba(255,79,216,0.28)']);

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.32);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const sharedProps = {
    className: `magnetic-button ${variant === 'primary' ? 'bg-cyan text-void shadow-glow' : 'bg-white/5 text-white'} ${className}`,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
    style: {
      x: springX,
      y: springY,
      boxShadow: glow
    },
    whileHover: { scale: 1.035 },
    whileTap: { scale: 0.98 }
  };

  if (href) {
    return (
      <motion.a href={href} {...sharedProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} {...sharedProps}>
      {children}
    </motion.button>
  );
}
