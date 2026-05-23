import * as THREE from 'three';

export const pathPoints = [
  new THREE.Vector3(0, 1.2, 7),
  new THREE.Vector3(-4, 2.1, -4),
  new THREE.Vector3(5.4, -0.9, -14),
  new THREE.Vector3(-9.5, 1.8, -24),
  new THREE.Vector3(7.4, -1.2, -38),
  new THREE.Vector3(-6.2, 2.1, -54),
  new THREE.Vector3(8.2, 0.4, -72)
];

export function createJourneyCurve() {
  return new THREE.CatmullRomCurve3(pathPoints, false, 'catmullrom', 0.42);
}

export function getPointOnCurve(curve, progress) {
  return curve.getPointAt(Math.min(1, Math.max(0, progress)));
}

export function getTangentOnCurve(curve, progress) {
  return curve.getTangentAt(Math.min(1, Math.max(0, progress))).normalize();
}
