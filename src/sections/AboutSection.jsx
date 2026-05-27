import { motion } from 'framer-motion';
import AnimatedTypingTitle from '../components/AnimatedTypingTitle.jsx';
import { fadeInLeft, fadeUp, fadeInRight, stagger } from '../animations/sectionVariants.js';

export default function AboutSection() {
  return (
    <section id="about" className="journey-section">
      <motion.div
        className="section-inner grid-cols-1 gap-10 lg:grid-cols-[minmax(320px,0.42fr)_minmax(320px,0.58fr)]"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.32 }}
      >
        <motion.div className="space-y-6" variants={fadeInLeft}>
          <motion.p className="section-kicker" variants={fadeUp}>
            About me space station
          </motion.p>
          <AnimatedTypingTitle
            text="Product engineering with a mission-control mindset."
            as="h2"
            className="section-title max-w-2xl"
            start="top 82%"
          />
          <motion.p className="section-copy max-w-xl" variants={fadeUp}>
            I work across strategy, interface systems, APIs, automation, and deployment pipelines. My favorite builds combine deep technical reliability with visual craft that makes teams move faster.
          </motion.p>
          <div className="glow-line" />
        </motion.div>

        <motion.div className="grid gap-4" variants={stagger}>
          {[
            ['01', 'Architecture that absorbs complexity without leaking it into the interface.'],
            ['02', 'Motion systems that make state, progress, and hierarchy feel physical.'],
            ['03', 'Cloud delivery patterns built for observability, rollback, and iteration.']
          ].map(([index, text]) => (
            <motion.article key={index} className="section-panel p-6" variants={fadeUp}>
              <span className="glass-chip">{index}</span>
              <p className="mt-4 text-lg font-semibold leading-7 text-white">{text}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
