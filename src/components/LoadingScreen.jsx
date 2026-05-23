import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const shipRef = useRef(null);
  const progressRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let completed = false;
    const finish = () => {
      if (completed) {
        return;
      }
      completed = true;
      setVisible(false);
      onCompleteRef.current?.();
    };

    const timeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: finish
    });

    timeline
      .fromTo(shipRef.current, { x: -70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 })
      .to(progressRef.current, { scaleX: 1, duration: 1.1 }, 0.15)
      .to(shipRef.current, { x: 92, y: -18, opacity: 0, duration: 0.55 }, 1.2);

    const fallback = window.setTimeout(finish, 2300);

    return () => {
      window.clearTimeout(fallback);
      timeline.kill();
    };
  }, []);

  return (
    <>
      {visible ? (
        <div className="loader-overlay fixed inset-0 z-50 grid place-items-center bg-void">
          <div className="w-[min(520px,calc(100%-32px))] rounded-lg border border-cyan/25 bg-hull/70 p-7 shadow-glow backdrop-blur-2xl">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm font-black uppercase text-ion">Initializing ship core</p>
              <p className="text-sm font-black text-cyan">MM-01</p>
            </div>
            <div ref={shipRef} className="loader-ship mx-auto mb-8 h-12 w-28">
              <div className="relative h-full w-full">
                <span className="absolute left-0 top-1/2 h-3 w-12 -translate-y-1/2 rounded-full bg-cyan/40 blur-md" />
                <span className="absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 border-b-[16px] border-l-[58px] border-t-[16px] border-b-transparent border-l-cyan border-t-transparent" />
                <span className="absolute left-8 top-1/2 h-5 w-12 -translate-y-1/2 rounded-full bg-white" />
                <span className="absolute left-2 top-1/2 h-3 w-9 -translate-y-1/2 rounded-full bg-magenta shadow-magenta" />
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div ref={progressRef} className="h-full origin-left scale-x-0 bg-gradient-to-r from-cyan via-ion to-magenta" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
