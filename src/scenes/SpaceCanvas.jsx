import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import SpaceScene from './SpaceScene.jsx';

export default function SpaceCanvas({ progress, activeIndex, scrollVelocity, selectedProject, onSelectProject }) {
  return (
    <div className="fixed inset-0 z-0 h-screen w-screen" style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh' }}>
      <Canvas
        className="h-full w-full"
        style={{ width: '100vw', height: '100vh', display: 'block' }}
        resize={{ offsetSize: true, scroll: false, debounce: { scroll: 50, resize: 0 } }}
        dpr={[1, 1.35]}
        camera={{ position: [0, 2.2, 12], fov: 56, near: 0.1, far: 170 }}
        gl={{
          antialias: true,
          alpha: false,
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance'
        }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
          gl.setSize(window.innerWidth, window.innerHeight, false);
          gl.domElement.dataset.created = 'true';
        }}
        shadows={false}
        performance={{ min: 0.55 }}
      >
        <Suspense fallback={null}>
          <SpaceScene
            progress={progress}
            activeIndex={activeIndex}
            scrollVelocity={scrollVelocity}
            selectedProject={selectedProject}
            onSelectProject={onSelectProject}
          />
          <AdaptiveDpr pixelated />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
