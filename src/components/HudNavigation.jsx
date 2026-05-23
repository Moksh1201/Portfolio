import { motion } from 'framer-motion';
import { sections } from '../data/portfolio.js';

export default function HudNavigation({ activeSection }) {
  return (
    <header className="pointer-events-auto fixed left-0 right-0 top-0 z-30 mx-auto flex w-full max-w-7xl items-start justify-between gap-3 px-4 py-4 sm:px-6 lg:px-10">
      <a
        href="#launch"
        className="grid h-12 w-12 place-items-center rounded-lg border border-cyan/35 bg-hull/70 text-sm font-black text-white shadow-glow backdrop-blur-xl"
        aria-label="Moksh M. home"
      >
        MM
      </a>
      <nav aria-label="Primary navigation" className="flex max-w-[calc(100%-64px)] gap-2 overflow-x-auto rounded-lg border border-white/10 bg-black/35 p-1.5 backdrop-blur-2xl">
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`} className="hud-link relative whitespace-nowrap">
            {activeSection === section.id ? (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-0 rounded-lg border border-cyan/50 bg-cyan/10"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            ) : null}
            <span className="relative">{section.label}</span>
          </a>
        ))}
      </nav>
    </header>
  );
}
