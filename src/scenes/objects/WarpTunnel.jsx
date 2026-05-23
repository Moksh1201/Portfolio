import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getPointOnCurve } from '../../utils/spacePath.js';

export default function WarpTunnel({ curve, progress, velocity }) {
  const linesRef = useRef(null);
  const materialRef = useRef(null);
  const positions = useMemo(() => {
    const count = 90;
    const array = new Float32Array(count * 2 * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 5 + Math.random() * 11;
      const angle = Math.random() * Math.PI * 2;
      const z = -Math.random() * 25;
      const i = index * 6;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.6;
      array[i] = x;
      array[i + 1] = y;
      array[i + 2] = z;
      array[i + 3] = x * 1.05;
      array[i + 4] = y * 1.05;
      array[i + 5] = z - 1.8 - Math.random() * 4;
    }

    return array;
  }, []);

  useFrame((state) => {
    const point = getPointOnCurve(curve, progress);
    linesRef.current.position.copy(point);
    linesRef.current.rotation.z = state.clock.elapsedTime * 0.03;
    const intensity = Math.min(0.45, Math.abs(velocity) * 160 + 0.04);
    materialRef.current.opacity += (intensity - materialRef.current.opacity) * 0.08;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial ref={materialRef} color="#45d9ff" transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
    </lineSegments>
  );
}
