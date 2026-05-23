import { motion } from 'framer-motion';
import { experience } from '../data/portfolio.js';
import { fadeUp, stagger } from '../animations/sectionVariants.js';

export default function ExperienceSection() {
  return (
    <section id="experience" className="journey-section">
      <motion.div
        className="section-inner"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.28 }}
      >
        <div>
          <motion.p className="section-kicker" variants={fadeUp}>
            Experience galaxy zone
          </motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>
            A trajectory through high-leverage builds.
          </motion.h2>
        </div>

        <motion.div className="grid gap-4" variants={stagger}>
          {experience.map((item) => (
            <motion.article key={item.year} className="holo-panel p-5" variants={fadeUp}>
              <time className="text-sm font-black text-cyan">{item.year}</time>
              <h3 className="mt-3 text-2xl font-black text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
