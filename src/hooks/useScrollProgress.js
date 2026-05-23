import { useLenis } from 'lenis/react';
import { useCallback, useEffect, useRef, useState } from 'react';

function getProgress() {
  if (typeof window === 'undefined') {
    return 0;
  }

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  return Math.min(1, Math.max(0, scrollTop / maxScroll));
}

export function useScrollProgress(sectionCount) {
  const [state, setState] = useState({ progress: 0, velocity: 0, activeIndex: 0 });
  const previous = useRef({ progress: 0, time: performance.now() });

  const update = useCallback(
    (progressValue) => {
      const now = performance.now();
      const elapsed = Math.max(16, now - previous.current.time);
      const velocity = (progressValue - previous.current.progress) / elapsed;
      const activeIndex = Math.min(sectionCount - 1, Math.max(0, Math.round(progressValue * (sectionCount - 1))));

      previous.current = { progress: progressValue, time: now };
      setState({ progress: progressValue, velocity, activeIndex });
    },
    [sectionCount]
  );

  const handleLenisScroll = useCallback(
    (lenis) => {
      update(lenis.progress ?? getProgress());
    },
    [update]
  );

  useLenis(handleLenisScroll, [handleLenisScroll], 0);

  useEffect(() => {
    const handleScroll = () => update(getProgress());
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [update]);

  return state;
}
