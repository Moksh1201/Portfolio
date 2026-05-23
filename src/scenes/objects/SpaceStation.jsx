import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function SpaceStation({ position }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.18;
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
  });

  return (
    <group ref={groupRef} position={position} scale={0.88}>
      <mesh>
        <torusGeometry args={[1.25, 0.055, 12, 120]} />
        <meshStandardMaterial color="#a8f4ff" metalness={0.8} roughness={0.24} emissive="#45d9ff" emissiveIntensity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 2.1, 24]} />
        <meshStandardMaterial color="#dbeafe" metalness={0.74} roughness={0.28} emissive="#111827" emissiveIntensity={0.14} />
      </mesh>
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle) => (
        <mesh key={angle} position={[Math.cos(angle) * 1.3, 0, Math.sin(angle) * 1.3]} rotation={[0, -angle, 0]}>
          <boxGeometry args={[0.16, 0.06, 1.2]} />
          <meshStandardMaterial color="#45d9ff" metalness={0.45} roughness={0.28} emissive="#45d9ff" emissiveIntensity={0.34} />
        </mesh>
      ))}
      <pointLight position={[0, 0, 0]} intensity={5} color="#7dffce" distance={6} />
    </group>
  );
}
