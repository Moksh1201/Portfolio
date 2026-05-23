import { useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getPointOnCurve, getTangentOnCurve } from '../utils/spacePath.js';

const cameraTarget = new THREE.Vector3();
const desiredPosition = new THREE.Vector3();
const desiredLook = new THREE.Vector3();

export default function CameraRig({ curve, progress, selectedProject }) {
  const { camera, pointer } = useThree();
  const selectedVector = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const basePoint = getPointOnCurve(curve, progress);
    const tangent = getTangentOnCurve(curve, progress);
    const right = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize();
    const up = new THREE.Vector3(0, 1, 0);

    if (selectedProject) {
      selectedVector.fromArray(selectedProject.position);
      desiredPosition.copy(selectedVector).add(new THREE.Vector3(0.45 + pointer.x * 0.55, 1.25 - pointer.y * 0.35, 4.7));
      desiredLook.copy(selectedVector);
    } else {
      desiredPosition
        .copy(basePoint)
        .addScaledVector(tangent, -5.1)
        .addScaledVector(right, pointer.x * 1.35)
        .addScaledVector(up, 0.78 - pointer.y * 0.5);
      desiredLook.copy(basePoint).addScaledVector(tangent, 0.95).addScaledVector(right, pointer.x * 0.45);
    }

    const smooth = 1 - Math.pow(0.001, delta);
    camera.position.lerp(desiredPosition, smooth * 0.08);
    cameraTarget.lerp(desiredLook, smooth * 0.1);
    camera.lookAt(cameraTarget);
    camera.rotation.z += (pointer.x * -0.035 - camera.rotation.z) * 0.035;
  });

  return null;
}
