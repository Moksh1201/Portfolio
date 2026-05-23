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
    const thruster = context.createOscillator();
    const noiseSource = context.createBufferSource();
    const noiseGain = context.createGain();
    const noiseFilter = context.createBiquadFilter();
    const filter = context.createBiquadFilter();
    const pulse = context.createGain();
    const thrusterGain = context.createGain();

    master.gain.value = 0.04;
    pulse.gain.value = 0.48;
    thrusterGain.gain.value = 0.05;
    noiseGain.gain.value = 0.07;
    filter.type = 'lowpass';
    filter.frequency.value = 860;
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 750;
    noiseFilter.Q.value = 1.8;

    lowDrone.type = 'sine';
    lowDrone.frequency.value = 46;
    shimmer.type = 'triangle';
    shimmer.frequency.value = 88;
    thruster.type = 'sawtooth';
    thruster.frequency.value = 180;

    const noiseBuffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    const channelData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < channelData.length; i += 1) {
      channelData[i] = Math.random() * 2 - 1;
    }
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    lowDrone.connect(filter);
    shimmer.connect(pulse);
    thruster.connect(thrusterGain);
    thrusterGain.connect(pulse);
    noiseSource.connect(noiseGain);
    noiseGain.connect(noiseFilter);
    noiseFilter.connect(pulse);
    pulse.connect(filter);
    filter.connect(master);
    master.connect(context.destination);

    lowDrone.start();
    shimmer.start();
    thruster.start();
    noiseSource.start();

    const pulseTimer = window.setInterval(() => {
      const now = context.currentTime;
      pulse.gain.cancelScheduledValues(now);
      pulse.gain.setValueAtTime(0.18, now);
      pulse.gain.linearRampToValueAtTime(0.56, now + 0.2);
      pulse.gain.linearRampToValueAtTime(0.22, now + 1.4);
      filter.frequency.cancelScheduledValues(now);
      filter.frequency.setValueAtTime(760, now);
      filter.frequency.linearRampToValueAtTime(900, now + 0.7);
    }, 1600);

    audioRef.current = {
      stop: () => {
        window.clearInterval(pulseTimer);
        lowDrone.stop();
        shimmer.stop();
        thruster.stop();
        noiseSource.stop();
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
