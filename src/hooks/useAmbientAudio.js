import { useEffect, useRef, useState } from 'react';

export function useAmbientAudio(enabled) {
  const audioRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!enabled) {
      audioRef.current?.stop();
      audioRef.current = null;
      setIsRunning(false);
      return undefined;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      setIsRunning(false);
      return undefined;
    }

    const context = new AudioContext();
    const master = context.createGain();
    const lowDrone = context.createOscillator();
    const shimmer = context.createOscillator();
    const filter = context.createBiquadFilter();
    const pulse = context.createGain();

    master.gain.value = 0.025;
    pulse.gain.value = 0.55;
    filter.type = 'lowpass';
    filter.frequency.value = 780;

    lowDrone.type = 'sine';
    lowDrone.frequency.value = 47;
    shimmer.type = 'triangle';
    shimmer.frequency.value = 94;

    lowDrone.connect(filter);
    shimmer.connect(pulse);
    pulse.connect(filter);
    filter.connect(master);
    master.connect(context.destination);

    lowDrone.start();
    shimmer.start();

    const pulseTimer = window.setInterval(() => {
      const now = context.currentTime;
      pulse.gain.cancelScheduledValues(now);
      pulse.gain.setValueAtTime(0.25, now);
      pulse.gain.linearRampToValueAtTime(0.72, now + 0.8);
      pulse.gain.linearRampToValueAtTime(0.24, now + 1.7);
    }, 1900);

    audioRef.current = {
      stop: () => {
        window.clearInterval(pulseTimer);
        lowDrone.stop();
        shimmer.stop();
        context.close();
      }
    };
    setIsRunning(true);

    return () => {
      audioRef.current?.stop();
      audioRef.current = null;
      setIsRunning(false);
    };
  }, [enabled]);

  return { isRunning };
}
