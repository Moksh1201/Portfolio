import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

export default function CanvasHealthProbe() {
  const reported = useRef(false);
  const { gl } = useThree();

  const report = () => {
    if (reported.current) {
      return;
    }

    const context = gl.getContext();
    const sample = new Uint8Array(4);
    const width = context.drawingBufferWidth;
    const height = context.drawingBufferHeight;
    let litPixels = 0;
    let neonPixels = 0;
    let samples = 0;

    for (let y = 0.12; y <= 0.88; y += 0.095) {
      for (let x = 0.08; x <= 0.92; x += 0.07) {
        context.readPixels(Math.floor(width * x), Math.floor(height * y), 1, 1, context.RGBA, context.UNSIGNED_BYTE, sample);
        const [red, green, blue] = sample;
        const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;
        if (luminance > 8) {
          litPixels += 1;
        }
        if ((blue > 24 && green > 18) || (red > 28 && blue > 28)) {
          neonPixels += 1;
        }
        samples += 1;
      }
    }

    gl.domElement.dataset.pixelHealth = JSON.stringify({ litPixels, neonPixels, samples, width, height });
    reported.current = true;
  };

  useEffect(() => {
    const timers = [1400, 2600, 4200].map((delay) => window.setTimeout(report, delay));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  useFrame((state) => {
    if (state.clock.elapsedTime >= 1.1) {
      report();
    }
  }, 2);

  return null;
}
