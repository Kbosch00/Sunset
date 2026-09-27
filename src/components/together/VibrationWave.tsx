"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  strength: number;
  maxStrength?: number;
};

const WIDTH = 220;
const HEIGHT = 64;
const POINTS = 60;

export function VibrationWave({ strength, maxStrength = 20 }: Props) {
  const [path, setPath] = useState("");
  const strengthRef = useRef(strength);
  const phaseRef = useRef(0);
  useEffect(() => {
    strengthRef.current = strength;
  }, [strength]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function buildPath(phase: number, currentStrength: number) {
      const ratio = Math.min(1, Math.max(0, currentStrength / maxStrength));
      const amplitude = ratio * (HEIGHT / 2 - 6);
      const frequency = 2 + ratio * 3;

      const points: string[] = [];
      for (let i = 0; i <= POINTS; i++) {
        const x = (i / POINTS) * WIDTH;
        const t = (i / POINTS) * Math.PI * 2 * frequency + phase;
        const y = HEIGHT / 2 + Math.sin(t) * amplitude;
        points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      }
      return `M${points.join(" L")}`;
    }

    if (prefersReducedMotion) {
      setPath(buildPath(0, strengthRef.current));
      return;
    }

    let frameId: number;

    function tick() {
      const current = strengthRef.current;
      const ratio = Math.min(1, Math.max(0, current / maxStrength));
      phaseRef.current += 0.05 + ratio * 0.15;
      setPath(buildPath(phaseRef.current, current));
      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [maxStrength]);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-16 w-full max-w-55 text-rose-400"
      aria-hidden="true"
    >
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
