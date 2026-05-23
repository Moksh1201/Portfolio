import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../animations/sectionVariants.js';

export default function AboutSection() {
  return (
    <section id="about" className="journey-section">
      <motion.div
        className="section-inner"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <div>
          <motion.p className="section-kicker" variants={fadeUp}>
            About me space station
          </motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>
            Product engineering with a mission-control mindset.
          </motion.h2>
          <motion.p className="section-copy" variants={fadeUp}>
            I work across strategy, interface systems, APIs, automation, and deployment pipelines. My favorite builds combine deep technical reliability with visual craft that makes teams move faster.
          </motion.p>
        </div>

        <motion.div className="grid gap-4" variants={stagger}>
          {[
            ['01', 'Architecture that absorbs complexity without leaking it into the interface.'],
            ['02', 'Motion systems that make state, progress, and hierarchy feel physical.'],
            ['03', 'Cloud delivery patterns built for observability, rollback, and iteration.']
          ].map(([index, text]) => (
            <motion.article key={index} className="holo-panel p-5" variants={fadeUp}>
              <span className="text-sm font-black text-cyan">{index}</span>
              <p className="mt-3 text-lg font-bold leading-7 text-white">{text}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
