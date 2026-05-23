import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton.jsx';
import { fadeUp, stagger } from '../animations/sectionVariants.js';

export default function HeroSection() {
  return (
    <section id="launch" className="journey-section pt-36">
      <motion.div
        className="section-inner"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <div className="pointer-events-auto">
          <motion.p className="section-kicker" variants={fadeUp}>
            Full-stack developer / orbital interface engineer
          </motion.p>
          <motion.h1 className="section-title" variants={fadeUp}>
            Moksh M.
          </motion.h1>
          <motion.p className="section-copy" variants={fadeUp}>
            I build resilient backends, cinematic interfaces, and intelligent product systems that make complex software feel like a guided spaceflight.
          </motion.p>
          <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row" variants={fadeUp}>
            <MagneticButton href="#projects">Explore Projects</MagneticButton>
            <MagneticButton href="#contact" variant="ghost" className="bg-black/30">
              Open Contact Dock
            </MagneticButton>
          </motion.div>
        </div>

        <motion.aside className="holo-panel p-5 md:p-6" variants={fadeUp} aria-label="Mission telemetry">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-black uppercase text-amber">Mission telemetry</p>
            <span className="rounded-lg border border-ion/25 bg-ion/10 px-3 py-1 text-xs font-black text-ion">ACTIVE</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              ['18+', 'Shipped builds'],
              ['9', 'Core stacks'],
              ['99%', 'Detail bias']
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-black/35 p-4">
                <strong className="block text-3xl font-black text-white">{value}</strong>
                <span className="text-sm text-slate-300">{label}</span>
              </div>
            ))}
          </div>
        </motion.aside>
      </motion.div>
    </section>
  );
}
