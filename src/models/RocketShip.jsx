import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getPointOnCurve, getTangentOnCurve } from '../utils/spacePath.js';

function ThrusterTrail() {
  const pointsRef = useRef(null);
  const positions = useMemo(() => {
    const count = 160;
    const array = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const i = index * 3;
      const radius = Math.random() * 0.12;
      const angle = Math.random() * Math.PI * 2;
      array[i] = Math.cos(angle) * radius;
      array[i + 1] = Math.sin(angle) * radius;
      array[i + 2] = -0.82 - Math.random() * 2.4;
    }
    return array;
  }, []);

  useFrame((state) => {
    const attribute = pointsRef.current.geometry.attributes.position;
    for (let index = 0; index < attribute.count; index += 1) {
      const z = attribute.getZ(index) - 0.035 - Math.sin(state.clock.elapsedTime * 2 + index) * 0.005;
      attribute.setZ(index, z < -3.25 ? -0.82 : z);
    }
    attribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} transparent opacity={0.92} color="#45d9ff" depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function RocketShip({ curve, progress }) {
  const groupRef = useRef(null);
  const { pointer } = useThree();

  useFrame((state) => {
    const point = getPointOnCurve(curve, progress);
    const tangent = getTangentOnCurve(curve, progress);
    const ahead = point.clone().addScaledVector(tangent, 1.2);
    const bank = Math.sin(progress * Math.PI * 8 + state.clock.elapsedTime * 0.4) * 0.18 - pointer.x * 0.24;

    groupRef.current.position.lerp(point, 0.12);
    groupRef.current.lookAt(ahead);
    groupRef.current.rotateZ(bank);
    groupRef.current.position.x += pointer.x * 0.16;
    groupRef.current.position.y += -pointer.y * 0.1;
  });

  return (
    <group ref={groupRef} scale={1.18}>
      <group rotation={[0, 0, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.12]}>
          <cylinderGeometry args={[0.24, 0.34, 1.3, 32]} />
          <meshStandardMaterial color="#d8f8ff" roughness={0.28} metalness={0.72} emissive="#08294d" emissiveIntensity={0.14} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.94]}>
          <coneGeometry args={[0.25, 0.54, 32]} />
          <meshStandardMaterial color="#45d9ff" roughness={0.22} metalness={0.66} emissive="#45d9ff" emissiveIntensity={0.24} />
        </mesh>
        <mesh position={[0, 0.25, -0.36]} rotation={[0.15, 0, 0]}>
          <boxGeometry args={[0.11, 0.52, 0.46]} />
          <meshStandardMaterial color="#ff4fd8" roughness={0.3} metalness={0.54} emissive="#ff4fd8" emissiveIntensity={0.18} />
        </mesh>
        <mesh position={[0.33, -0.08, -0.36]} rotation={[0, 0.22, -0.35]}>
          <boxGeometry args={[0.5, 0.08, 0.42]} />
          <meshStandardMaterial color="#0a2b62" roughness={0.34} metalness={0.74} emissive="#1f7bff" emissiveIntensity={0.22} />
        </mesh>
        <mesh position={[-0.33, -0.08, -0.36]} rotation={[0, -0.22, 0.35]}>
          <boxGeometry args={[0.5, 0.08, 0.42]} />
          <meshStandardMaterial color="#0a2b62" roughness={0.34} metalness={0.74} emissive="#1f7bff" emissiveIntensity={0.22} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.62]}>
          <cylinderGeometry args={[0.21, 0.28, 0.25, 32]} />
          <meshStandardMaterial color="#111827" roughness={0.2} metalness={0.86} emissive="#7dffce" emissiveIntensity={0.22} />
        </mesh>
        <pointLight position={[0, 0, -1]} intensity={8} color="#45d9ff" distance={5} />
        <ThrusterTrail />
      </group>
    </group>
  );
}
