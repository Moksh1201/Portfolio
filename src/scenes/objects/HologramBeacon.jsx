import { useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { hologramFragmentShader, hologramVertexShader } from '../../shaders/hologram.js';

const HologramMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color('#45d9ff') },
  hologramVertexShader,
  hologramFragmentShader
);

extend({ HologramMaterial });

export default function HologramBeacon({ position, scale = 1, color = new THREE.Color('#45d9ff') }) {
  const materialRef = useRef(null);
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    materialRef.current.uTime = state.clock.elapsedTime;
    groupRef.current.rotation.y += delta * 0.24;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.04, 96, 1, true]} />
        <hologramMaterial ref={materialRef} uColor={color} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.22, 0.01, 8, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.36} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}
