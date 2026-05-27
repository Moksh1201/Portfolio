import { lazy, useMemo } from 'react';
import * as THREE from 'three';
import { Stars, Sparkles } from '@react-three/drei';
import { Bloom, ChromaticAberration, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { projects } from '../data/portfolio.js';
import { createJourneyCurve } from '../utils/spacePath.js';
import CameraRig from './CameraRig.jsx';
import ParticleField from './objects/ParticleField.jsx';
import ProjectPlanet from './objects/ProjectPlanet.jsx';
import AsteroidBelt from './objects/AsteroidBelt.jsx';
import SpaceStation from './objects/SpaceStation.jsx';
import GalaxyZone from './objects/GalaxyZone.jsx';
import WarpTunnel from './objects/WarpTunnel.jsx';
import HologramBeacon from './objects/HologramBeacon.jsx';
import CanvasHealthProbe from './CanvasHealthProbe.jsx';

const RocketShip = lazy(() => import('../models/RocketShip.jsx'));

export default function SpaceScene({ progress, activeIndex, scrollVelocity, selectedProject, onSelectProject, lowPerformance }) {
  const curve = useMemo(() => createJourneyCurve(), []);
  const starCount = lowPerformance ? 3200 : 7800;
  const sparkleCount = lowPerformance ? 90 : 180;

  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 18, 110]} />

      <ambientLight intensity={0.26} color="#7da8d6" />
      <pointLight position={[8, 8, 8]} intensity={48} color="#45d9ff" distance={38} />
      <pointLight position={[-8, -4, -28]} intensity={36} color="#ff4fd8" distance={46} />
      <spotLight position={[0, 10, 4]} angle={0.42} penumbra={0.9} intensity={68} color="#7dffce" distance={80} />

      <CameraRig curve={curve} progress={progress} selectedProject={selectedProject} />
      <CanvasHealthProbe />

      <Stars radius={92} depth={90} count={starCount} factor={4.5} saturation={0.4} fade speed={0.22} />
      <Sparkles count={sparkleCount} scale={[34, 18, 92]} size={lowPerformance ? 1.8 : 2.4} speed={0.18} opacity={0.14} color="#8fd7ff" />
      <ParticleField lowPerformance={lowPerformance} />
      <WarpTunnel curve={curve} progress={progress} velocity={scrollVelocity} activeIndex={activeIndex} lowPerformance={lowPerformance} />

      <RocketShip curve={curve} progress={progress} velocity={scrollVelocity} />
      <SpaceStation position={[-4.5, 1.3, -5.7]} />
      <AsteroidBelt position={[4.5, -0.4, -16]} lowPerformance={lowPerformance} />
      <GalaxyZone position={[-1, 0.4, -58]} />

      {projects.map((project, index) => (
        <ProjectPlanet key={project.id} project={project} index={index} onSelect={onSelectProject} isSelected={selectedProject?.id === project.id} />
      ))}

      <HologramBeacon position={[0, -2.4, -8]} scale={1.8} color={new THREE.Color('#45d9ff')} />
      <HologramBeacon position={[6, -2.2, -43]} scale={2.4} color={new THREE.Color('#ff4fd8')} />

      {!lowPerformance && (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom luminanceThreshold={0.18} luminanceSmoothing={0.22} intensity={1.25} mipmapBlur />
          <DepthOfField focusDistance={0.018} focalLength={0.028} bokehScale={2.2} height={540} />
          <ChromaticAberration offset={[0.0009, 0.0014]} />
          <Noise opacity={0.025} />
          <Vignette eskil={false} offset={0.18} darkness={0.78} />
        </EffectComposer>
      )}
    </>
  );
}
