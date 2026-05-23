import { motion } from 'framer-motion';
import { skills } from '../data/portfolio.js';
import { fadeUp, stagger } from '../animations/sectionVariants.js';

export default function SkillsSection() {
  return (
    <section id="skills" className="journey-section">
      <motion.div
        className="mx-auto grid w-full max-w-7xl gap-8"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="max-w-4xl">
          <motion.p className="section-kicker" variants={fadeUp}>
            Skills asteroid belt
          </motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>
            Systems, surfaces, motion, and cloud gravity.
          </motion.h2>
        </div>

        <motion.div className="pointer-events-auto grid gap-3 sm:grid-cols-2 lg:grid-cols-4" variants={stagger}>
          {skills.map((skill) => (
            <motion.article key={skill.name} className="holo-panel min-h-44 p-4" variants={fadeUp} whileHover={{ y: -8, scale: 1.015 }}>
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-2xl font-black text-white">{skill.name}</h3>
                <span className="text-sm font-black text-ion">{skill.power}</span>
              </div>
              <p className="text-sm text-slate-300">{skill.group}</p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan via-ion to-magenta"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: skill.power / 100 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
