import { motion } from 'framer-motion';

export default function SoundToggle({ enabled, isRunning, onToggle }) {
  return (
    <motion.button
      type="button"
      aria-label={enabled ? 'Mute ambient space audio' : 'Play ambient space audio'}
      onClick={onToggle}
      className="pointer-events-auto fixed left-4 top-24 z-30 grid h-14 w-14 place-items-center rounded-lg border border-cyan/25 bg-black/45 shadow-glow backdrop-blur-2xl sm:left-6 lg:left-10"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="flex h-6 items-end gap-1" aria-hidden="true">
        {[0, 1, 2].map((bar) => (
          <span
            key={bar}
            className={`block w-1.5 rounded-full ${enabled && isRunning ? 'bg-ion' : 'bg-slate-500'}`}
            style={{
              height: `${10 + bar * 5}px`,
              animation: enabled && isRunning ? `audioPulse ${0.8 + bar * 0.18}s ease-in-out infinite alternate` : 'none'
            }}
          />
        ))}
      </span>
    </motion.button>
  );
}
