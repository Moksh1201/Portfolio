import { motion } from 'framer-motion';
import { experience } from '../data/portfolio.js';
import AnimatedTypingTitle from '../components/AnimatedTypingTitle.jsx';
import { fadeInLeft, fadeUp, fadeInRight, stagger } from '../animations/sectionVariants.js';

export default function ExperienceSection() {
  return (
    <section id="experience" className="journey-section">
      <motion.div
        className="section-inner grid-cols-1 gap-10 lg:grid-cols-[minmax(320px,0.44fr)_minmax(320px,0.56fr)]"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.28 }}
      >
        <motion.div className="space-y-6" variants={fadeInLeft}>
          <motion.p className="section-kicker" variants={fadeUp}>
            Experience galaxy zone
          </motion.p>
          <AnimatedTypingTitle
            text="A trajectory through high-leverage builds."
            as="h2"
            className="section-title max-w-2xl"
            start="top 82%"
          />
          <motion.p className="section-copy max-w-xl" variants={fadeUp}>
            I map each engagement with a product narrative, clear system intent, and a delivery path that minimizes friction across teams.
          </motion.p>
        </motion.div>

        <motion.div className="grid gap-4" variants={stagger}>
          {experience.map((item, index) => (
            <motion.article
              key={item.year}
              className="section-panel p-6"
              variants={index % 2 === 0 ? fadeInRight : fadeUp}
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <time className="text-sm uppercase tracking-[0.32em] text-cyan/80">{item.year}</time>
                <span className="glass-chip">Live</span>
              </div>
              <h3 className="text-2xl font-black leading-tight text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.detail}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
