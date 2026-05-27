import { useLayoutEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedTypingTitle({ text, className = '', as = 'h2', start = 'top 84%', once = true }) {
  const Wrapper = as;
  const wrapperRef = useRef(null);
  const letterRefs = useRef([]);
  const letters = useMemo(() => text.split(''), [text]);

  useLayoutEffect(() => {
    letterRefs.current = [];
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start,
          toggleActions: 'play none none none',
          once,
          markers: false
        }
      });

      timeline.fromTo(
        letterRefs.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.18,
          stagger: 0.06,
          ease: 'power3.out'
        }
      );

      return () => timeline.kill();
    }, wrapperRef);

    return () => ctx.revert();
  }, [letters, once, start]);

  return (
    <Wrapper ref={wrapperRef} className={className} aria-label={text}>
      {letters.map((char, index) => (
        <span
          key={`${char}-${index}`}
          ref={(element) => {
            if (element) {
              letterRefs.current[index] = element;
            }
          }}
          style={{ display: 'inline-block', opacity: 0, transform: 'translateY(18px)' }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Wrapper>
  );
}
