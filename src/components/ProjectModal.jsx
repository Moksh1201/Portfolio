import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MagneticButton from './MagneticButton.jsx';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="pointer-events-auto fixed inset-0 z-40 grid place-items-center bg-black/58 px-4 py-8 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.article
            className="holo-panel max-h-[92vh] w-full max-w-5xl overflow-y-auto p-5 sm:p-7"
            initial={{ opacity: 0, y: 38, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 210, damping: 24 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
          >
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker mb-2">{project.planetName}</p>
                <h2 id="project-title" className="text-4xl font-black leading-tight text-white md:text-6xl">
                  {project.title}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200 md:text-lg">{project.description}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/5 text-xl font-black text-white transition hover:border-cyan hover:bg-cyan/10"
                aria-label="Close project panel"
              >
                ×
              </button>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1fr_0.72fr]">
              <div className="grid gap-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  {project.screenshots.map((shot, index) => (
                    <div key={shot} className="relative min-h-44 overflow-hidden rounded-lg border border-cyan/15 bg-black/40 p-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan/15 via-transparent to-magenta/20" />
                      <div className="relative flex h-full flex-col justify-between">
                        <span className="text-xs font-black text-ion">0{index + 1}</span>
                        <div>
                          <div className="mb-3 h-20 rounded-lg border border-white/10 bg-white/5" />
                          <p className="text-sm font-bold text-slate-200">{shot}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <MagneticButton href={project.github} variant="ghost" className="bg-white/5">
                    GitHub
                  </MagneticButton>
                  <MagneticButton href={project.demo}>Live Demo</MagneticButton>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-lg border border-white/10 bg-black/35 p-4">
                  <p className="text-sm font-black uppercase text-amber">Timeline / status</p>
                  <p className="mt-3 text-2xl font-black text-white">{project.status}</p>
                  <p className="mt-1 text-slate-300">{project.timeline}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/35 p-4">
                  <p className="text-sm font-black uppercase text-cyan">Tech stack</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="rounded-lg border border-cyan/20 bg-cyan/10 px-3 py-2 text-sm font-bold text-slate-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/35 p-4">
                  <p className="text-sm font-black uppercase text-magenta">Features</p>
                  <ul className="mt-4 grid gap-3 text-sm text-slate-200">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ion shadow-glow" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
