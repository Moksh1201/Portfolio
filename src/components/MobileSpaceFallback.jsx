import { useEffect, useRef } from 'react';

export default function MobileSpaceFallback() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let frame = 0;
    let animationFrame = 0;

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.4 + Math.random() * 1.8,
      speed: 0.2 + Math.random() * 0.9,
      color: ['#45d9ff', '#7dffce', '#ff4fd8', '#ffffff'][Math.floor(Math.random() * 4)]
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const reportHealth = () => {
      const sample = context.getImageData(0, 0, canvas.width, canvas.height).data;
      let litPixels = 0;
      let neonPixels = 0;
      const step = Math.max(4, Math.floor(sample.length / 400));

      for (let index = 0; index < sample.length; index += step * 4) {
        const red = sample[index];
        const green = sample[index + 1];
        const blue = sample[index + 2];
        const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;
        if (luminance > 8) {
          litPixels += 1;
        }
        if ((blue > 30 && green > 24) || (red > 38 && blue > 30)) {
          neonPixels += 1;
        }
      }

      canvas.dataset.pixelHealth = JSON.stringify({ litPixels, neonPixels, samples: Math.floor(sample.length / (step * 4)), width: canvas.width, height: canvas.height });
    };

    const draw = () => {
      frame += 0.016;
      const width = window.innerWidth;
      const height = window.innerHeight;

      context.clearRect(0, 0, width, height);
      const backdrop = context.createRadialGradient(width * 0.58, height * 0.38, 10, width * 0.5, height * 0.5, height * 0.8);
      backdrop.addColorStop(0, 'rgba(69, 217, 255, 0.28)');
      backdrop.addColorStop(0.36, 'rgba(168, 85, 247, 0.14)');
      backdrop.addColorStop(1, 'rgba(2, 3, 10, 1)');
      context.fillStyle = backdrop;
      context.fillRect(0, 0, width, height);

      stars.forEach((star, index) => {
        const y = ((star.y * height + frame * 28 * star.speed) % height) - 4;
        const x = star.x * width + Math.sin(frame + index) * 9;
        context.beginPath();
        context.fillStyle = star.color;
        context.globalAlpha = 0.35 + Math.sin(frame * 3 + index) * 0.22;
        context.arc(x, y, star.r, 0, Math.PI * 2);
        context.fill();
      });

      context.globalAlpha = 1;
      context.save();
      context.translate(width * 0.58 + Math.sin(frame) * 18, height * 0.45 + Math.cos(frame * 0.7) * 14);
      context.rotate(Math.sin(frame * 0.8) * 0.18);
      context.fillStyle = 'rgba(69, 217, 255, 0.18)';
      context.beginPath();
      context.arc(0, 0, 92, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = 'rgba(125,255,206,0.48)';
      context.lineWidth = 2;
      context.beginPath();
      context.ellipse(0, 0, 142, 36, -0.35, 0, Math.PI * 2);
      context.stroke();
      context.fillStyle = '#f7fbff';
      context.beginPath();
      context.moveTo(0, -28);
      context.lineTo(58, 0);
      context.lineTo(0, 28);
      context.lineTo(-24, 12);
      context.lineTo(-24, -12);
      context.closePath();
      context.fill();
      context.fillStyle = '#45d9ff';
      context.fillRect(-48, -12, 34, 24);
      context.fillStyle = 'rgba(255,79,216,0.78)';
      context.beginPath();
      context.ellipse(-56, 0, 34, 11, 0, 0, Math.PI * 2);
      context.fill();
      context.restore();

      if (frame > 0.8 && !canvas.dataset.pixelHealth) {
        reportHealth();
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    const healthTimer = window.setTimeout(reportHealth, 1500);
    window.addEventListener('resize', resize);

    return () => {
      window.clearTimeout(healthTimer);
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="mobile-space-fallback" className="fixed inset-0 z-[1] block h-screen w-screen md:hidden" aria-hidden="true" />;
}
