import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import SpaceScene from './SpaceScene.jsx';

export default function SpaceCanvas({ progress, activeIndex, scrollVelocity, selectedProject, onSelectProject }) {
  const lowPerformance = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const cores = navigator.hardwareConcurrency ?? 8;
    const ram = navigator.deviceMemory ?? 8;
    return cores <= 4 || ram <= 4 || window.innerWidth < 1100;
  }, []);

  const dpr = lowPerformance ? [0.75, 0.92] : [0.85, 1.15];

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen" style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh' }}>
      <Canvas
        className="h-full w-full"
        style={{ width: '100vw', height: '100vh', display: 'block' }}
        resize={{ offsetSize: true, scroll: false, debounce: { scroll: 100, resize: 100 } }}
        dpr={dpr}
        camera={{ position: [0, 2.2, 12], fov: 56, near: 0.1, far: 170 }}
        gl={{
          antialias: false,
          alpha: false,
          preserveDrawingBuffer: false,
          powerPreference: 'high-performance'
        }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.15));
          gl.setSize(window.innerWidth, window.innerHeight, false);
          gl.domElement.dataset.created = 'true';
        }}
        shadows={false}
        performance={{ min: 0.45, max: 1 }}
      >
        <Suspense fallback={null}>
          <SpaceScene
            progress={progress}
            activeIndex={activeIndex}
            scrollVelocity={scrollVelocity}
            selectedProject={selectedProject}
            onSelectProject={onSelectProject}
            lowPerformance={lowPerformance}
          />
          <AdaptiveDpr pixelated />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
