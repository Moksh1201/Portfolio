import * as THREE from 'three';

export function createPlanetTexture(primary, secondary, seed = 0) {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size * 0.36, size * 0.3, size * 0.1, size * 0.5, size * 0.5, size * 0.72);

  gradient.addColorStop(0, '#f8fbff');
  gradient.addColorStop(0.18, primary);
  gradient.addColorStop(0.62, secondary);
  gradient.addColorStop(1, '#090c1a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  for (let index = 0; index < 70; index += 1) {
    const y = ((index * 41 + seed * 29) % size) + Math.sin(index * 0.7 + seed) * 18;
    const height = 4 + ((index + seed) % 9);
    const alpha = 0.04 + ((index + seed) % 5) * 0.018;
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.beginPath();
    ctx.ellipse(size / 2, y, size * (0.18 + ((index + seed) % 7) * 0.045), height, Math.sin(index) * 0.04, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let index = 0; index < 180; index += 1) {
    const x = (Math.sin(index * 12.989 + seed) * 43758.5453) % 1;
    const y = (Math.sin(index * 78.233 + seed) * 24634.6345) % 1;
    ctx.fillStyle = `rgba(255,255,255,${0.08 + (index % 4) * 0.04})`;
    ctx.fillRect(Math.abs(x) * size, Math.abs(y) * size, 1 + (index % 3), 1 + (index % 2));
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}
