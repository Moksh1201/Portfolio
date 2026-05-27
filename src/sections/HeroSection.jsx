import { useMemo } from 'react';
import { motion } from 'framer-motion';
import AnimatedTypingTitle from '../components/AnimatedTypingTitle.jsx';
import MagneticButton from '../components/MagneticButton.jsx';
import { socialLinks } from '../data/portfolio.js';
import { fadeInRight, fadeUp, stagger } from '../animations/sectionVariants.js';

const headingCopy =
  'I build resilient backends, cinematic interfaces, and intelligent product systems that make complex software feel like a guided spaceflight.';

export default function HeroSection() {
  const headingText = useMemo(() => 'Moksh M.', []);

  return (
    <section id="launch" className="journey-section pt-32">
      <motion.div
        className="section-inner grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.58fr)_minmax(320px,0.42fr)]"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <div className="pointer-events-auto flex flex-col gap-8">
          <motion.p className="section-kicker" variants={fadeUp}>
            Full-stack developer / orbital interface engineer
          </motion.p>
          <AnimatedTypingTitle
            text={headingText}
            as="h1"
            className="section-title max-w-3xl leading-tight"
            start="top 85%"
          />
          <motion.p className="section-copy max-w-xl text-slate-300" variants={fadeUp}>
            {headingCopy.split(' ').map((word, index, words) => (
              <span
                key={`${word}-${index}`}
                className={word.match(/(resilient|cinematic|intelligent|guided)/i) ? 'text-keyword' : ''}
              >
                {word}
                {index < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </motion.p>

          <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row" variants={fadeUp}>
            <MagneticButton href="#projects">Explore Projects</MagneticButton>
            <MagneticButton href="#contact" variant="ghost" className="bg-black/30">
              Open Contact Dock
            </MagneticButton>
          </motion.div>
        </div>

        <motion.aside className="holo-panel p-6 sm:p-8" variants={fadeInRight} aria-label="Mission telemetry">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-cyan/80">Mission telemetry</p>
            <span className="rounded-2xl border border-cyan/20 bg-cyan/10 px-4 py-1 text-xs font-black uppercase text-cyan">
              ACTIVE
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              ['18+', 'Shipped builds'],
              ['9', 'Core stacks'],
              ['99%', 'Detail bias']
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-black/40 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.18)]">
                <strong className="block text-3xl font-black text-white">{value}</strong>
                <span className="mt-1 block text-sm uppercase tracking-[0.24em] text-slate-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="glass-chip inline-flex items-center gap-2 px-4 py-3 text-sm font-black uppercase tracking-[0.28em] text-slate-100 transition hover:bg-cyan/15"
              >
                {link.label}
                <span className="text-cyan/80">↗</span>
              </a>
            ))}
          </div>
        </motion.aside>
      </motion.div>
    </section>
  );
}
