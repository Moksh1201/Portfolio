import { useMemo, useRef, useState } from 'react';
import { Html, useCursor } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createPlanetTexture } from '../../utils/planetTexture.js';

function Satellite({ radius, color }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.72;
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.44) * 0.14;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius + 1.02, 0.008, 8, 180]} />
        <meshBasicMaterial color={color} transparent opacity={0.24} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[radius + 1.02, 0.06, 0]} scale={0.14}>
        <boxGeometry args={[1.1, 0.34, 0.68]} />
        <meshStandardMaterial color="#dafbff" metalness={0.68} roughness={0.28} emissive={color} emissiveIntensity={0.24} />
      </mesh>
    </group>
  );
}

export default function ProjectPlanet({ project, index, onSelect, isSelected }) {
  const groupRef = useRef(null);
  const atmosphereRef = useRef(null);
  const cloudsRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const texture = useMemo(() => createPlanetTexture(project.colorA, project.colorB, index + 1), [project.colorA, project.colorB, index]);

  useCursor(hovered);

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * (0.07 + index * 0.012);
    groupRef.current.rotation.z += delta * 0.004;
    groupRef.current.position.y = project.position[1] + Math.sin(state.clock.elapsedTime * 0.36 + index) * 0.14;
    const targetScale = hovered || isSelected ? 1.2 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    atmosphereRef.current.material.opacity = THREE.MathUtils.lerp(atmosphereRef.current.material.opacity, hovered || isSelected ? 0.34 : 0.14, 0.08);
    cloudsRef.current.rotation.y += delta * 0.05;
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
          roughness={0.78}
          metalness={0.04}
          emissive={project.colorA}
          emissiveIntensity={hovered || isSelected ? 0.16 : 0.04}
          envMapIntensity={0.8}
        />
      </mesh>
      <mesh ref={cloudsRef} scale={1.035}>
        <sphereGeometry args={[project.radius, 64, 64]} />
        <meshStandardMaterial
          color="#f8f9ff"
          roughness={0.92}
          metalness={0.1}
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={atmosphereRef} scale={1.08}>
        <sphereGeometry args={[project.radius, 64, 64]} />
        <meshBasicMaterial color={project.colorA} transparent opacity={0.16} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {project.ring ? (
        <group>
          <mesh rotation={[Math.PI / 2.2, 0.16, 0]}>
            <torusGeometry args={[project.radius * 1.58, 0.04, 12, 220]} />
            <meshBasicMaterial color={project.colorB} transparent opacity={0.52} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh rotation={[Math.PI / 2.2, 0.16, 0]}>
            <torusGeometry args={[project.radius * 1.82, 0.009, 6, 220]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.16} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>
      ) : null}
      <Satellite radius={project.radius} color={project.colorB} />
      <pointLight position={[0, 0, 0]} intensity={hovered || isSelected ? 10 : 4.2} color={project.colorA} distance={6} />
      <Html center distanceFactor={7.5} position={[0, -project.radius - 0.48, 0]} occlude={false}>
        <div className="rounded-3xl border border-cyan/25 bg-black/45 px-4 py-3 text-center text-xs font-black text-white shadow-glow backdrop-blur-xl">
          {project.planetName}
        </div>
      </Html>
    </group>
  );
}
