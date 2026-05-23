import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function AsteroidBelt({ position }) {
  const groupRef = useRef(null);
  const asteroids = useMemo(
    () =>
      Array.from({ length: 48 }, (_, index) => {
        const angle = (index / 48) * Math.PI * 2;
        const radius = 3.4 + Math.sin(index * 1.7) * 0.8 + Math.random() * 0.8;
        return {
          position: [Math.cos(angle) * radius, (Math.random() - 0.5) * 1.1, Math.sin(angle) * radius],
          rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
          scale: 0.16 + Math.random() * 0.42
        };
      }),
    []
  );

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.07;
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.00012) * 0.12;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.7, 0.01, 8, 160]} />
        <meshBasicMaterial color="#45d9ff" transparent opacity={0.18} />
      </mesh>
      {asteroids.map((asteroid, index) => (
        <mesh key={index} position={asteroid.position} rotation={asteroid.rotation} scale={asteroid.scale}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#263143" roughness={0.78} metalness={0.22} emissive="#0b214f" emissiveIntensity={0.16} />
        </mesh>
      ))}
    </group>
  );
}
