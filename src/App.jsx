import { ReactLenis } from 'lenis/react';
import { Suspense, lazy, useMemo, useState } from 'react';
import HeroSection from './sections/HeroSection.jsx';
import AboutSection from './sections/AboutSection.jsx';
import SkillsSection from './sections/SkillsSection.jsx';
import ProjectsSection from './sections/ProjectsSection.jsx';
import ExperienceSection from './sections/ExperienceSection.jsx';
import ContactSection from './sections/ContactSection.jsx';
import HudNavigation from './components/HudNavigation.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import ProjectModal from './components/ProjectModal.jsx';
import RadarMiniMap from './components/RadarMiniMap.jsx';
import SoundToggle from './components/SoundToggle.jsx';
import FloatingAssistantOrb from './components/FloatingAssistantOrb.jsx';
import MobileSpaceFallback from './components/MobileSpaceFallback.jsx';
import { projects, sections } from './data/portfolio.js';
import { useScrollProgress } from './hooks/useScrollProgress.js';
import { useAmbientAudio } from './hooks/useAmbientAudio.js';

const SpaceCanvas = lazy(() => import('./scenes/SpaceCanvas.jsx'));

export default function App() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        wheelMultiplier: 0.88,
        touchMultiplier: 1.05,
        smoothWheel: true
      }}
    >
      <AppContent />
    </ReactLenis>
  );
}

function AppContent() {
  const scroll = useScrollProgress(sections.length);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const { isRunning } = useAmbientAudio(soundEnabled);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [selectedProjectId]
  );

  return (
    <div className="min-h-screen bg-void text-white">
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      <Suspense fallback={null}>
        <SpaceCanvas
          activeIndex={scroll.activeIndex}
          progress={scroll.progress}
          scrollVelocity={scroll.velocity}
          selectedProject={selectedProject}
          onSelectProject={setSelectedProjectId}
        />
      </Suspense>
      <MobileSpaceFallback />

      <HudNavigation activeSection={sections[scroll.activeIndex]?.id ?? sections[0].id} />
      <SoundToggle enabled={soundEnabled} isRunning={isRunning} onToggle={() => setSoundEnabled((value) => !value)} />
      <RadarMiniMap activeIndex={scroll.activeIndex} projects={projects} onSelectProject={setSelectedProjectId} />
      <FloatingAssistantOrb activeSection={sections[scroll.activeIndex]?.label ?? 'Launch'} />

      <main className="pointer-events-none relative z-10">
        <HeroSection isReady={loadingComplete} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection onSelectProject={setSelectedProjectId} />
        <ExperienceSection />
        <ContactSection />
      </main>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProjectId(null)} />
    </div>
  );
}
