import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ── Procedural vertex displacement ───────────────────────────────────────────
function deformGeometry(geo, seed, intensity = 1.0) {
  const pos = geo.attributes.position;
  let s = seed * 9301 + 49297;
  const rng = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };

  for (let i = 0; i < pos.count; i++) {
    const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
    const len = v.length();
    const n1 = Math.sin(v.x * 3.1 + seed) * Math.cos(v.y * 2.7 + seed * 0.7) * Math.sin(v.z * 2.3 + seed * 1.3);
    const n2 = Math.sin(v.x * 7.3 + seed * 2) * Math.cos(v.z * 6.1 + seed) * 0.5;
    const n3 = (rng() - 0.5) * 0.28;
    const displacement = (n1 * 0.32 + n2 * 0.14 + n3) * intensity;
    v.normalize().multiplyScalar(len + displacement);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

// ── Color palette: visible against pitch black, slight self-illumination ─────
// Mid-tone warm grey-browns + amber mineral veins that glow faintly
const ASTEROID_TYPES = [
  // Iron-rich silicate — warm brown, visible with amber glow
  { color: '#7a6248', emissive: '#c87820', roughness: 0.94, metalness: 0.06, emissiveIntensity: 0.12, weight: 4 },
  { color: '#6e5840', emissive: '#b86010', roughness: 0.96, metalness: 0.05, emissiveIntensity: 0.10, weight: 4 },
  // S-type siliceous — warm grey, sunlit look
  { color: '#8a7660', emissive: '#a05818', roughness: 0.92, metalness: 0.08, emissiveIntensity: 0.09, weight: 3 },
  { color: '#746050', emissive: '#904810', roughness: 0.90, metalness: 0.09, emissiveIntensity: 0.11, weight: 3 },
  // Pale icy/mineral surface — cool grey, slightly blue
  { color: '#7a8090', emissive: '#304870', roughness: 0.88, metalness: 0.12, emissiveIntensity: 0.08, weight: 2 },
  { color: '#8a8c94', emissive: '#2a3860', roughness: 0.86, metalness: 0.14, emissiveIntensity: 0.07, weight: 2 },
  // M-type metallic — medium grey with sheen
  { color: '#707880', emissive: '#203050', roughness: 0.72, metalness: 0.42, emissiveIntensity: 0.06, weight: 1 },
  { color: '#686e78', emissive: '#182840', roughness: 0.70, metalness: 0.45, emissiveIntensity: 0.05, weight: 1 },
];

function weightedPick(arr, seed) {
  const total = arr.reduce((s, a) => s + a.weight, 0);
  let r = ((seed * 7919) % total + total) % total;
  for (const item of arr) { r -= item.weight; if (r < 0) return item; }
  return arr[0];
}

// ── Pixel scatter particles around each asteroid ─────────────────────────────
// These are proximity-based: always present but become obvious when close.
function PixelScatter({ position, seed, scale }) {
  const pointsRef = useRef(null);
  const camRef = useRef(null);

  const { positions: pts, colors } = useMemo(() => {
    const count = 48;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    let s = seed * 6271 + 1234;
    const rng = () => { s = (s * 6271 + 1234) % 999983; return s / 999983; };

    // Warm amber + cool blue mineral scatter pixels
    const palettes = [
      [1.0, 0.62, 0.12],  // amber
      [0.9, 0.50, 0.08],  // orange-amber
      [0.7, 0.80, 1.0],   // ice blue
      [0.6, 0.70, 0.95],  // pale blue
      [1.0, 0.80, 0.40],  // gold
    ];

    for (let i = 0; i < count; i++) {
      const r = (scale * 1.1) + rng() * scale * 1.8;
      const theta = rng() * Math.PI * 2;
      const phi = (rng() - 0.5) * Math.PI;
      positions[i * 3]     = Math.cos(theta) * Math.cos(phi) * r;
      positions[i * 3 + 1] = Math.sin(phi) * r;
      positions[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * r;

      const col = palettes[Math.floor(rng() * palettes.length)];
      colors[i * 3]     = col[0];
      colors[i * 3 + 1] = col[1];
      colors[i * 3 + 2] = col[2];
    }
    return { positions, colors };
  }, [seed, scale]);

  useFrame(({ camera }) => {
    if (!pointsRef.current) return;
    const worldPos = new THREE.Vector3(...position);
    const dist = camera.position.distanceTo(worldPos);
    // Fade IN as camera gets closer (< 6 units), fade OUT when far
    const proximity = Math.max(0, Math.min(1, (6.0 - dist) / 4.5));
    pointsRef.current.material.opacity = proximity * 0.85;
    // Pixel size grows slightly when very close
    pointsRef.current.material.size = 0.022 + proximity * 0.055;
  });

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pts, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        vertexColors
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ── Single Asteroid ──────────────────────────────────────────────────────────
function Asteroid({ position, rotation, scaleX, scaleY, scaleZ, seed, spinAxis, spinSpeed, mat }) {
  const meshRef = useRef(null);
  const baseScale = (scaleX + scaleY + scaleZ) / 3;

  const geometry = useMemo(() => {
    const detail = seed % 3 === 0 ? 3 : 2;
    const geo = new THREE.IcosahedronGeometry(1, detail);
    return deformGeometry(geo, seed, 0.72 + (seed % 7) * 0.08);
  }, [seed]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotateOnAxis(spinAxis, delta * spinSpeed);
  });

  return (
    <>
      <mesh
        ref={meshRef}
        geometry={geometry}
        position={position}
        rotation={rotation}
        scale={[scaleX, scaleY, scaleZ]}
      >
        <meshStandardMaterial
          color={mat.color}
          roughness={mat.roughness}
          metalness={mat.metalness}
          emissive={mat.emissive}
          emissiveIntensity={mat.emissiveIntensity}
          flatShading
        />
      </mesh>
      {/* Proximity pixel scatter halo */}
      <PixelScatter position={position} seed={seed} scale={baseScale} />
    </>
  );
}

// ── Belt-wide ambient dust ────────────────────────────────────────────────────
function BeltDust({ count = 420 }) {
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 2.6 + Math.random() * 2.2;
      positions[i * 3]     = Math.cos(angle) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.9;
      positions[i * 3 + 2] = Math.sin(angle) * r;
      // warm amber dust
      colors[i * 3]     = 0.7 + Math.random() * 0.3;
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.25;
      colors[i * 3 + 2] = 0.15 + Math.random() * 0.2;
    }
    return { positions, colors };
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.016}
        vertexColors
        transparent
        opacity={0.28}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ── Main Belt ────────────────────────────────────────────────────────────────
export default function AsteroidBelt({ position }) {
  const groupRef = useRef(null);

  const asteroids = useMemo(() => {
    return Array.from({ length: 52 }, (_, index) => {
      const seed = index * 137 + 42;
      const angle = (index / 52) * Math.PI * 2 + (seed % 100) * 0.01;
      const radius = 3.2 + Math.sin(index * 1.7) * 0.9 + ((seed % 100) / 100) * 0.9;

      const baseScale = 0.13 + ((seed % 100) / 100) * 0.44;
      const scaleX = baseScale * (0.7  + ((seed * 3)  % 100) / 167);
      const scaleY = baseScale * (0.55 + ((seed * 7)  % 100) / 200);
      const scaleZ = baseScale * (0.65 + ((seed * 11) % 100) / 150);

      const spinAxis = new THREE.Vector3(
        Math.sin(seed * 0.7),
        Math.cos(seed * 0.3),
        Math.sin(seed * 1.1)
      ).normalize();

      return {
        position: [
          Math.cos(angle) * radius,
          (((seed % 100) / 100) - 0.5) * 1.3,
          Math.sin(angle) * radius,
        ],
        rotation: [
          ((seed * 2) % 628) / 100,
          ((seed * 3) % 628) / 100,
          ((seed * 5) % 628) / 100,
        ],
        scaleX, scaleY, scaleZ,
        seed,
        spinAxis,
        spinSpeed: 0.06 + ((seed % 100) / 100) * 0.22,
        mat: weightedPick(ASTEROID_TYPES, seed),
      };
    });
  }, []);

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.055;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.09;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Faint orbital ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.7, 0.006, 6, 180]} />
        <meshBasicMaterial color="#c87820" transparent opacity={0.06} />
      </mesh>

      <BeltDust count={420} />

      {asteroids.map((a, i) => (
        <Asteroid key={i} {...a} />
      ))}
    </group>
  );
}