import { motion } from 'framer-motion';
import { projects } from '../data/portfolio.js';
import AnimatedTypingTitle from '../components/AnimatedTypingTitle.jsx';
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
          <AnimatedTypingTitle
            text="Each world carries a product system."
            as="h2"
            className="section-title max-w-3xl"
            start="top 82%"
          />
        </div>

        <motion.div className="pointer-events-auto grid gap-4 md:grid-cols-2 xl:grid-cols-4" variants={stagger}>
          {projects.map((project) => (
            <motion.article
              key={project.id}
              className="section-panel flex min-h-80 flex-col justify-between p-5"
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.25 }}
            >
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.32em] text-cyan/70">
                  {project.planetName}
                </p>
                <h3 className="text-3xl font-black leading-tight text-white">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{project.description}</p>
              </div>
              <div className="mt-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="glass-chip">
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
