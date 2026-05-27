import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField({ lowPerformance }) {
  const pointsRef = useRef(null);
  const { size } = useThree();
  const count = lowPerformance ? 620 : size.width < 700 ? 900 : 1700;

  const { positions, colors } = useMemo(() => {
    const positionArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);
    const palette = [new THREE.Color('#45d9ff'), new THREE.Color('#a855f7'), new THREE.Color('#ff4fd8'), new THREE.Color('#7dffce')];

    for (let index = 0; index < count; index += 1) {
      const i = index * 3;
      positionArray[i] = (Math.random() - 0.5) * 70;
      positionArray[i + 1] = (Math.random() - 0.5) * 34;
      positionArray[i + 2] = -Math.random() * 118 + 18;
      const color = palette[index % palette.length];
      colorArray[i] = color.r;
      colorArray[i + 1] = color.g;
      colorArray[i + 2] = color.b;
    }

    return { positions: positionArray, colors: colorArray };
  }, [count]);

  useFrame((state, delta) => {
    pointsRef.current.rotation.y += delta * 0.012;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.025;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial vertexColors size={0.055} transparent opacity={0.5} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}
