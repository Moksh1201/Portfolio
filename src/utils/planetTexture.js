import * as THREE from 'three';

function pseudoRandom(value) {
  return Math.abs(Math.sin(value * 12.9898) * 43758.5453123) % 1;
}

export function createPlanetTexture(primary, secondary, seed = 0) {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size * 0.36, size * 0.28, size * 0.08, size * 0.5, size * 0.5, size * 0.78);

  gradient.addColorStop(0, '#f3f7ff');
  gradient.addColorStop(0.14, primary);
  gradient.addColorStop(0.54, secondary);
  gradient.addColorStop(0.88, '#0a0d17');
  gradient.addColorStop(1, '#040609');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  ctx.globalCompositeOperation = 'overlay';
  for (let band = 0; band < 4; band += 1) {
    const y = size * (0.24 + band * 0.14 + Math.sin(seed * 1.3 + band) * 0.02);
    ctx.strokeStyle = `rgba(255,255,255,${0.02 + band * 0.01})`;
    ctx.lineWidth = 1.5 + band * 0.5;
    ctx.beginPath();
    ctx.ellipse(size / 2, y, size * (0.48 - band * 0.03), size * 0.07, Math.sin(seed + band) * 0.08, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalCompositeOperation = 'source-over';

  for (let crater = 0; crater < 24; crater += 1) {
    const radius = size * (0.02 + pseudoRandom(crater + seed) * 0.04);
    const x = size * pseudoRandom(crater * 3.7 + seed);
    const y = size * pseudoRandom(crater * 5.9 + seed);
    const opacity = 0.05 + pseudoRandom(crater * 1.2 + seed) * 0.06;
    const craterGradient = ctx.createRadialGradient(x, y, radius * 0.18, x, y, radius);
    craterGradient.addColorStop(0, `rgba(255,255,255,${opacity})`);
    craterGradient.addColorStop(0.55, `rgba(0,0,0,${opacity * 0.26})`);
    craterGradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = craterGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let speck = 0; speck < 260; speck += 1) {
    const x = size * pseudoRandom(speck * 7.3 + seed);
    const y = size * pseudoRandom(speck * 4.1 + seed);
    const dotSize = 1 + Math.round(pseudoRandom(speck * 2.9 + seed) * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.02 + pseudoRandom(speck + seed) * 0.04})`;
    ctx.fillRect(x, y, dotSize, dotSize);
  }

  ctx.globalCompositeOperation = 'soft-light';
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.beginPath();
  ctx.ellipse(size * 0.54, size * 0.3, size * 0.29, size * 0.24, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  return texture;
}
