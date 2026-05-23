import { motion } from 'framer-motion';

export default function FloatingAssistantOrb({ activeSection }) {
  return (
    <motion.aside
      className="pointer-events-none fixed bottom-5 right-4 z-[9] hidden items-center gap-3 rounded-lg border border-magenta/25 bg-black/35 px-3 py-2 shadow-magenta backdrop-blur-2xl sm:flex lg:right-10"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.7 }}
      aria-label="AI assistant status"
    >
      <span className="relative grid h-12 w-12 place-items-center rounded-full border border-cyan/40 bg-cyan/10">
        <span className="absolute inset-1 rounded-full bg-cyan/20 blur-md" />
        <span className="relative text-xs font-black text-ion">AI</span>
      </span>
      <span className="text-xs font-bold text-slate-300">
        ORBIT
        <strong className="block text-sm text-white">{activeSection}</strong>
      </span>
    </motion.aside>
  );
}
