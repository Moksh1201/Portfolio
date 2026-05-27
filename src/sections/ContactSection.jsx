import { useState } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton.jsx';
import AnimatedTypingTitle from '../components/AnimatedTypingTitle.jsx';
import { fadeInRight, fadeUp, fadeInLeft, stagger } from '../animations/sectionVariants.js';
import { socialLinks } from '../data/portfolio.js';

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    window.setTimeout(() => {
      setSent(false);
      event.currentTarget.reset();
    }, 1800);
  };

  return (
    <section id="contact" className="journey-section pb-32">
      <motion.div
        className="section-inner grid-cols-1 gap-10 lg:grid-cols-[minmax(320px,0.46fr)_minmax(320px,0.54fr)]"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.28 }}
      >
        <motion.div className="space-y-6" variants={fadeInLeft}>
          <motion.p className="section-kicker" variants={fadeUp}>
            Contact terminal station
          </motion.p>
          <AnimatedTypingTitle
            text="Dock a mission brief."
            as="h2"
            className="section-title max-w-2xl"
            start="top 82%"
          />
          <motion.p className="section-copy max-w-lg" variants={fadeUp}>
            Send a signal for product builds, frontend systems, 3D interfaces, AI workflows, or cloud architecture.
          </motion.p>
          <div className="glow-line" />
          <motion.div className="grid gap-3" variants={stagger}>
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="glass-chip inline-flex w-full items-center justify-between px-4 py-4 text-sm font-black text-slate-100 transition hover:border-cyan/60 hover:bg-cyan/10"
                variants={fadeUp}
              >
                {link.label}
                <span className="text-cyan/80">↗</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.form
          className="section-panel pointer-events-auto grid gap-4 p-6"
          onSubmit={handleSubmit}
          variants={fadeInRight}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-300">
              Name
              <input className="field-input" name="name" placeholder="Your name" autoComplete="name" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-300">
              Email
              <input className="field-input" name="email" type="text" inputMode="email" placeholder="you@example.com" autoComplete="email" />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-bold text-slate-300">
            Message
            <textarea className="field-input min-h-36 resize-y py-3" name="message" placeholder="Tell me what you want to create" />
          </label>
          <MagneticButton type="submit" className="w-full">
            {sent ? 'Transmission Sent' : 'Send Message'}
          </MagneticButton>
        </motion.form>
      </motion.div>
    </section>
  );
}
