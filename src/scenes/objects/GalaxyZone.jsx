import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GalaxyZone({ position }) {
  const pointsRef = useRef(null);
  const { positions, colors } = useMemo(() => {
    const count = 900;
    const positionArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);
    const cyan = new THREE.Color('#45d9ff');
    const magenta = new THREE.Color('#ff4fd8');

    for (let index = 0; index < count; index += 1) {
      const radius = Math.random() * 6.8;
      const spin = radius * 0.95;
      const branch = (index % 3) * ((Math.PI * 2) / 3);
      const angle = branch + spin + Math.random() * 0.45;
      const i = index * 3;
      positionArray[i] = Math.cos(angle) * radius;
      positionArray[i + 1] = (Math.random() - 0.5) * 0.7;
      positionArray[i + 2] = Math.sin(angle) * radius;
      const color = cyan.clone().lerp(magenta, radius / 6.8);
      colorArray[i] = color.r;
      colorArray[i + 1] = color.g;
      colorArray[i + 2] = color.b;
    }

    return { positions: positionArray, colors: colorArray };
  }, []);

  useFrame((_, delta) => {
    pointsRef.current.rotation.y += delta * 0.045;
  });

  return (
    <points ref={pointsRef} position={position} rotation={[0.35, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial vertexColors size={0.05} transparent opacity={0.74} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}
