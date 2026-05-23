import { motion } from 'framer-motion';
import { projects } from '../data/portfolio.js';
import { fadeUp, stagger } from '../animations/sectionVariants.js';
import MagneticButton from '../components/MagneticButton.jsx';

export default function ProjectsSection({ onSelectProject }) {
  return (
    <section id="projects" className="journey-section">
      <motion.div
        className="mx-auto grid w-full max-w-7xl gap-8"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-4xl">
          <motion.p className="section-kicker" variants={fadeUp}>
            Projects planet system
          </motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>
            Each world carries a product system.
          </motion.h2>
        </div>

        <motion.div className="pointer-events-auto grid gap-4 lg:grid-cols-4" variants={stagger}>
          {projects.map((project) => (
            <motion.article key={project.id} className="holo-panel flex min-h-80 flex-col justify-between p-5" variants={fadeUp} whileHover={{ y: -8 }}>
              <div>
                <p className="mb-3 text-sm font-black uppercase text-ion">{project.planetName}</p>
                <h3 className="text-3xl font-black leading-tight text-white">{project.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-300">{project.description}</p>
              </div>
              <div className="mt-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="rounded-lg border border-cyan/15 bg-cyan/10 px-2 py-1 text-xs font-bold text-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
                <MagneticButton onClick={() => onSelectProject(project.id)} className="w-full">
                  Open Planet
                </MagneticButton>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
