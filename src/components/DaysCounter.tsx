"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  className?: string;
};

const DURATION = 1400;

export function DaysCounter({ value, className }: Props) {
  const [displayed, setDisplayed] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = null;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frameId: number;

    function tick(timestamp: number) {
      if (prefersReducedMotion) {
        setDisplayed(value);
        return;
      }

      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [value]);

  return (
    <p
      className={`mt-3 font-display text-5xl font-medium text-stone-800 tabular-nums ${className ?? ""}`}
    >
      {displayed}
    </p>
  );
}
