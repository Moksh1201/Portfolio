import { useMemo, useRef, useState } from 'react';
import { Html, useCursor } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createPlanetTexture } from '../../utils/planetTexture.js';

function Satellite({ radius, color }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.65;
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.16;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius + 0.92, 0.006, 8, 120]} />
        <meshBasicMaterial color={color} transparent opacity={0.22} />
      </mesh>
      <mesh position={[radius + 0.92, 0.08, 0]} scale={0.12}>
        <boxGeometry args={[1, 0.36, 0.55]} />
        <meshStandardMaterial color="#c8f5ff" metalness={0.66} roughness={0.3} emissive={color} emissiveIntensity={0.26} />
      </mesh>
    </group>
  );
}

export default function ProjectPlanet({ project, index, onSelect, isSelected }) {
  const groupRef = useRef(null);
  const atmosphereRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const texture = useMemo(() => createPlanetTexture(project.colorA, project.colorB, index + 1), [project.colorA, project.colorB, index]);

  useCursor(hovered);

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * (0.09 + index * 0.015);
    groupRef.current.position.y = project.position[1] + Math.sin(state.clock.elapsedTime * 0.42 + index) * 0.18;
    const targetScale = hovered || isSelected ? 1.16 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    atmosphereRef.current.material.opacity = THREE.MathUtils.lerp(atmosphereRef.current.material.opacity, hovered || isSelected ? 0.34 : 0.18, 0.08);
  });

  return (
    <group
      ref={groupRef}
      position={project.position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(project.id);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <sphereGeometry args={[project.radius, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.52}
          metalness={0.08}
          emissive={project.colorA}
          emissiveIntensity={hovered || isSelected ? 0.22 : 0.08}
        />
      </mesh>
      <mesh ref={atmosphereRef} scale={1.06}>
        <sphereGeometry args={[project.radius, 64, 64]} />
        <meshBasicMaterial color={project.colorA} transparent opacity={0.18} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {project.ring ? (
        <mesh rotation={[Math.PI / 2.2, 0.16, 0]}>
          <torusGeometry args={[project.radius * 1.55, 0.035, 12, 192]} />
          <meshBasicMaterial color={project.colorB} transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </mesh>
      ) : null}
      <Satellite radius={project.radius} color={project.colorB} />
      <pointLight position={[0, 0, 0]} intensity={hovered || isSelected ? 9 : 4.5} color={project.colorA} distance={6} />
      <Html center distanceFactor={7.5} position={[0, -project.radius - 0.48, 0]} occlude={false}>
        <div className="rounded-lg border border-cyan/25 bg-black/45 px-3 py-2 text-center text-xs font-black text-white shadow-glow backdrop-blur-xl">
          {project.planetName}
        </div>
      </Html>
    </group>
  );
}
