import { useState } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton.jsx';
import { fadeUp, stagger } from '../animations/sectionVariants.js';

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
        className="section-inner"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.28 }}
      >
        <div>
          <motion.p className="section-kicker" variants={fadeUp}>
            Contact terminal station
          </motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>
            Dock a mission brief.
          </motion.h2>
          <motion.p className="section-copy" variants={fadeUp}>
            Send a signal for product builds, frontend systems, 3D interfaces, AI workflows, or cloud architecture.
          </motion.p>
        </div>

        <motion.form className="holo-panel pointer-events-auto grid gap-4 p-5 md:p-6" onSubmit={handleSubmit} variants={fadeUp}>
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
