import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getPointOnCurve, getTangentOnCurve } from '../utils/spacePath.js';

// ── PALETTE ──────────────────────────────────────────────────────────────────
// Hull:        #2a3a4a  (steel-blue titanium)  highlights: #3d5a72
// Trim:        #c0740a  (molten amber/gold)
// Energy:      #ff9a00  (hot plasma orange)
// Engine glow: #ff6a00 → #ffcc44  (fire gradient)
// Canopy:      #00ffe7  (neon teal)
// Bolts:       #ff8800  (orange plasma)

// ─── Thruster Trail ──────────────────────────────────────────────────────────
function ThrusterTrail({ offsetX = 0, thrust = 1 }) {
  const pointsRef = useRef(null);
  const positions = useMemo(() => {
    const count = 90;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 0.018 + Math.random() * 0.055;
      const angle = Math.random() * Math.PI * 2;
      arr[i * 3]     = offsetX + Math.cos(angle) * radius;
      arr[i * 3 + 1] = Math.sin(angle) * radius;
      arr[i * 3 + 2] = -0.3 - Math.random() * 2.2;
    }
    return arr;
  }, [offsetX]);

  useFrame((state) => {
    const attr = pointsRef.current.geometry.attributes.position;
    const pulse = Math.sin(state.clock.elapsedTime * 6.0) * 0.015 + 0.025;
    for (let i = 0; i < attr.count; i++) {
      const z = attr.getZ(i) - 0.09 - pulse;
      attr.setZ(i, z < -3.4 ? -0.3 : z);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.024 + thrust * 0.016}
        transparent
        opacity={0.85}
        color="#ff8c00"          // hot orange exhaust
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Engine glow ring ────────────────────────────────────────────────────────
function EngineGlow({ x = 0 }) {
  const meshRef = useRef(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const pulse = Math.sin(state.clock.elapsedTime * 5.5) * 0.06 + 0.9;
    meshRef.current.material.opacity = 0.28 * pulse;
    meshRef.current.scale.setScalar(pulse);
  });
  return (
    <mesh ref={meshRef} position={[x, 0, -0.52]}>
      <torusGeometry args={[0.13, 0.04, 8, 48]} />
      <meshBasicMaterial color="#ff7700" transparent opacity={0.28} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

// ─── Plasma cannon bolts ─────────────────────────────────────────────────────
function PlasmaCannons({ count = 4, velocity }) {
  const refs = useRef([]);
  const bolts = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      x: i < 2 ? -0.52 : 0.52,
      y: i % 2 === 0 ? 0.04 : -0.04,
      z: -0.9 - i * 1.1,
      phase: i * 0.72,
    })),
    [count]
  );

  useFrame((state) => {
    const speed = 0.42 + Math.max(0, velocity) * 1.8;
    const t = state.clock.elapsedTime;
    bolts.forEach((bolt, i) => {
      bolt.z -= speed + Math.sin(t * 3.5 + i) * 0.018;
      if (bolt.z < -8.0) bolt.z = -1.2;
      const mesh = refs.current[i];
      if (!mesh) return;
      mesh.position.set(bolt.x, bolt.y + Math.sin(t * 4 + bolt.phase) * 0.02, bolt.z);
      mesh.scale.setScalar(0.1 + Math.sin(t * 14 + i) * 0.012);
    });
  });

  return (
    <group>
      {bolts.map((bolt, i) => (
        <mesh key={i} ref={(r) => (refs.current[i] = r)} position={[bolt.x, bolt.y, bolt.z]}>
          <capsuleGeometry args={[0.022, 0.22, 4, 8]} />
          <meshStandardMaterial
            color="#ffaa00"           // amber plasma bolt
            emissive="#ff6600"
            emissiveIntensity={2.8}
            roughness={0.1}
            metalness={0.2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Wing panel ──────────────────────────────────────────────────────────────
function Wing({ side = 1 }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(side * 0.72, -0.18);
    s.lineTo(side * 0.68, -0.32);
    s.lineTo(0, -0.12);
    s.closePath();
    return s;
  }, [side]);

  const extrudeSettings = { depth: 0.04, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 2 };

  return (
    <group position={[0, 0.02, 0.08]}>
      {/* Main wing surface — titanium steel-blue */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial
          color="#2e4258"           // steel-blue titanium
          roughness={0.18}
          metalness={0.88}
          emissive="#1a2e42"
          emissiveIntensity={0.12}
        />
      </mesh>
      {/* Amber energy stripe */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[side * 0.22, 0, 0.042]}>
        <planeGeometry args={[0.06, 0.26]} />
        <meshBasicMaterial color="#ff9a00" transparent opacity={0.7} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Wingtip nav light */}
      <mesh position={[side * 0.66, 0.025, -0.26]}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshBasicMaterial color={side > 0 ? '#ff3344' : '#00ffcc'} toneMapped={false} />
      </mesh>
      <pointLight
        position={[side * 0.66, 0.025, -0.26]}
        intensity={0.7}
        color={side > 0 ? '#ff3344' : '#00ffcc'}
        distance={1.4}
      />
    </group>
  );
}

// ─── Engine pod ──────────────────────────────────────────────────────────────
function EnginePod({ x = 0 }) {
  return (
    <group position={[x, -0.05, -0.08]}>
      {/* Pod body — darker steel with amber emissive */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.1, 0.72, 20]} />
        <meshStandardMaterial
          color="#243040"           // deep gunmetal
          roughness={0.16}
          metalness={0.94}
          emissive="#5c3000"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Nozzle — glowing amber ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.02]}>
        <cylinderGeometry args={[0.1, 0.13, 0.14, 20]} />
        <meshStandardMaterial
          color="#1a2030"
          roughness={0.12}
          metalness={0.96}
          emissive="#cc5500"
          emissiveIntensity={0.55}
        />
      </mesh>
      <EngineGlow x={0} />
      <pointLight position={[0, 0, -0.65]} intensity={1.8} color="#ff7700" distance={3.4} />
    </group>
  );
}

// ─── Main Fighter ────────────────────────────────────────────────────────────
export default function RocketShip({ curve, progress, velocity }) {
  const groupRef = useRef(null);
  const canopyRef = useRef(null);
  const { pointer } = useThree();
  const smoothState = useRef({ bankAngle: 0, px: 0, py: 0 });

  useFrame((state) => {
    const point   = getPointOnCurve(curve, progress);
    const tangent = getTangentOnCurve(curve, progress);
    const ahead   = point.clone().addScaledVector(tangent, 1.5);
    const target  = point.clone().addScaledVector(tangent, 0.04).add(new THREE.Vector3(0, -0.22, 0));

    const sm = smoothState.current;
    sm.px += (pointer.x - sm.px) * 0.06;
    sm.py += (pointer.y - sm.py) * 0.06;

    const desiredBank =
      Math.sin(progress * Math.PI * 10 + state.clock.elapsedTime * 0.35) * 0.1
      - sm.px * 0.28;
    sm.bankAngle += (desiredBank - sm.bankAngle) * 0.08;

    groupRef.current.position.lerp(target, 0.14);
    groupRef.current.lookAt(ahead);
    groupRef.current.rotateZ(sm.bankAngle);
    groupRef.current.position.x += sm.px * 0.14;
    groupRef.current.position.y += -sm.py * 0.09;

    if (canopyRef.current) {
      canopyRef.current.material.opacity = 0.58 + Math.sin(state.clock.elapsedTime * 2.8) * 0.06;
    }
  });

  return (
    <group ref={groupRef} scale={0.94}>

      {/* ── Fuselage — steel blue-grey with amber underbelly glow ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.12]}>
        <cylinderGeometry args={[0.13, 0.17, 1.5, 28]} />
        <meshStandardMaterial
          color="#2e4460"           // rich steel blue
          roughness={0.14}
          metalness={0.9}
          emissive="#1a2a40"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* ── Nose cone — lighter accent titanium ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 1.0]}>
        <coneGeometry args={[0.12, 0.62, 28]} />
        <meshStandardMaterial
          color="#3a5a78"           // lighter nose
          roughness={0.16}
          metalness={0.88}
          emissive="#cc6600"        // amber tip glow
          emissiveIntensity={0.22}
        />
      </mesh>

      {/* ── Canopy — neon teal glass ── */}
      <mesh ref={canopyRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.16, 0.52]}>
        <capsuleGeometry args={[0.085, 0.32, 6, 14]} />
        <meshStandardMaterial
          color="#00ffe7"           // neon teal
          roughness={0.04}
          metalness={0.5}
          emissive="#00ccaa"
          emissiveIntensity={0.5}
          transparent
          opacity={0.62}
        />
      </mesh>
      {/* Canopy frame — gold/amber trim */}
      <mesh position={[0, 0.2, 0.52]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 0.32, 8]} />
        <meshStandardMaterial
          color="#c87820"           // gold frame
          roughness={0.22}
          metalness={0.85}
          emissive="#a05010"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Canopy glow light */}
      <pointLight position={[0, 0.2, 0.52]} intensity={0.5} color="#00ffdd" distance={1.5} />

      {/* ── Swept wings ── */}
      <Wing side={1} />
      <Wing side={-1} />

      {/* ── Dorsal fin — steel blue ── */}
      <mesh position={[0, 0.22, -0.1]} rotation={[0.18, 0, 0]}>
        <boxGeometry args={[0.03, 0.28, 0.44]} />
        <meshStandardMaterial
          color="#2e4460"
          roughness={0.16}
          metalness={0.9}
          emissive="#c06010"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* ── Twin engine pods ── */}
      <EnginePod x={0.46} />
      <EnginePod x={-0.46} />

      {/* ── Thruster trails ── */}
      <ThrusterTrail offsetX={0.46}  thrust={Math.min(1.3, 1 + Math.abs(velocity) * 0.6)} />
      <ThrusterTrail offsetX={-0.46} thrust={Math.min(1.3, 1 + Math.abs(velocity) * 0.6)} />

      {/* ── Plasma cannons ── */}
      <group position={[0, 0, -0.3]}>
        <PlasmaCannons count={4} velocity={velocity} />
      </group>

      {/* ── Hull detail panels — amber trim lines ── */}
      <mesh position={[0, -0.1, 0.22]}>
        <boxGeometry args={[0.22, 0.06, 0.48]} />
        <meshStandardMaterial
          color="#243850"
          roughness={0.18}
          metalness={0.95}
          emissive="#7a3a00"
          emissiveIntensity={0.18}
        />
      </mesh>
      <mesh position={[0, 0.07, 0.18]}>
        <boxGeometry args={[0.16, 0.04, 0.36]} />
        <meshStandardMaterial
          color="#304a65"
          roughness={0.2}
          metalness={0.92}
          emissive="#cc7700"
          emissiveIntensity={0.14}
        />
      </mesh>

      {/* ── Amber underbelly accent strip ── */}
      <mesh position={[0, -0.16, -0.05]}>
        <boxGeometry args={[0.08, 0.015, 0.9]} />
        <meshBasicMaterial color="#ff8800" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* ── Central fill light — warm amber tint ── */}
      <pointLight position={[0, 0, 0.3]} intensity={0.7} color="#ff9900" distance={2.8} />
    </group>
  );
}