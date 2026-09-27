"use client";

import { useRef, useState } from "react";

type Props = {
  disabled?: boolean;
  onChange: (strength: number) => void;
  onRelease: (strength: number) => void;
};

const MAX_STRENGTH = 20;
const THROTTLE_MS = 200;

export function LiveIntensitySlider({ disabled, onChange, onRelease }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [strength, setStrength] = useState(0);
  const [dragging, setDragging] = useState(false);
  const lastSentRef = useRef(0);

  function strengthFromClientY(clientY: number) {
    const track = trackRef.current;
    if (!track) return strength;
    const rect = track.getBoundingClientRect();
    const ratio = 1 - (clientY - rect.top) / rect.height;
    const clamped = Math.min(1, Math.max(0, ratio));
    return Math.round(clamped * MAX_STRENGTH);
  }

  function handleDragTo(clientY: number) {
    const next = strengthFromClientY(clientY);
    setStrength(next);

    const now = Date.now();
    if (now - lastSentRef.current >= THROTTLE_MS) {
      lastSentRef.current = now;
      onChange(next);
    }
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled) return;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleDragTo(e.clientY);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    setDragging(false);
    const finalValue = strengthFromClientY(e.clientY);
    setStrength(finalValue);
    onRelease(finalValue);
  }

  const percent = (strength / MAX_STRENGTH) * 100;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={(e) => dragging && handleDragTo(e.clientY)}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative h-56 w-14 touch-none rounded-full bg-stone-100 ${
          disabled ? "opacity-40" : "cursor-pointer"
        }`}
      >
        <div
          className="absolute bottom-0 left-0 w-full rounded-full bg-rose-300/80 transition-[height] duration-75"
          style={{ height: `${percent}%` }}
        />

        <div
          className="absolute left-1/2 h-8 w-8 -translate-x-1/2 rounded-full border-2 border-white bg-rose-500 shadow-md transition-[bottom] duration-75"
          style={{ bottom: `calc(${percent}% - 16px)` }}
        />
      </div>
      <p className="font-display text-2xl text-stone-700 tabular-nums">
        {strength}
      </p>
    </div>
  );
}
