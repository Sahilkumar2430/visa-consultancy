import { useEffect, useState } from 'react';

export function useCountUp(end, duration = 2000, start = 0, isVisible = true) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isVisible) return;
    let raf;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (end - start) * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start, isVisible]);

  return count;
}