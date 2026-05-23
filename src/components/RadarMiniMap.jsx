import { motion } from 'framer-motion';

export default function RadarMiniMap({ activeIndex, projects, onSelectProject }) {
  return (
    <aside className="pointer-events-auto fixed right-4 top-24 z-30 hidden w-44 rounded-lg border border-cyan/20 bg-black/35 p-4 shadow-glow backdrop-blur-2xl md:block lg:right-10">
      <div className="mb-3 flex items-center justify-between text-xs font-black text-slate-300">
        <span>RADAR</span>
        <span className="text-ion">0{activeIndex + 1}</span>
      </div>
      <div className="relative aspect-square rounded-full border border-cyan/20 bg-cyan/5">
        <span className="absolute inset-1/2 h-px w-[46%] origin-left animate-[radarSweep_4s_linear_infinite] bg-gradient-to-r from-cyan to-transparent" />
        <span className="absolute inset-5 rounded-full border border-white/10" />
        <span className="absolute inset-10 rounded-full border border-white/10" />
        {projects.map((project, index) => (
          <motion.button
            key={project.id}
            type="button"
            onClick={() => onSelectProject(project.id)}
            className="absolute h-3 w-3 rounded-full border border-white/60"
            style={{
              left: `${project.radar?.x ?? 22 + (index % 2) * 52}%`,
              top: `${project.radar?.y ?? 24 + index * 13}%`,
              background: project.colorA
            }}
            aria-label={`Open ${project.title}`}
            whileHover={{ scale: 1.6 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </aside>
  );
}
