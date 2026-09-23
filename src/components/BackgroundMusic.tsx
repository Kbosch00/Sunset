"use client";

import { useEffect, useRef, useState } from "react";

const AUDIO_SRC = "background.mp3";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTime = () => setCurrent(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  function expand() {
    setOpen(true);
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch(() => {});
  }

  function collapse() {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlaying(false);
    setCurrent(0);
    setOpen(false);
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }

  function onSeek(value: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrent(value);
  }

  return (
    <div className="fixed top-10 right-4 z-40 sm:bottom-24">
      {!open ? (
        <button
          type="button"
          onClick={expand}
          className="
            flex items-center gap-2 rounded-full
            border border-stone-200/80 bg-white/75
            px-3.5 py-2.5 text-xs tracking-wide text-stone-600
            shadow-md shadow-stone-300/20 backdrop-blur-md
            transition hover:bg-white hover:text-stone-800 cursor-pointer
          "
          aria-label="Abrir música"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-500">
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="currentColor"
            >
              <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
            </svg>
          </span>
        </button>
      ) : (
        <div
          className="
            w-[min(100vw-2rem,18rem)] rounded-2xl
            border border-stone-200/80 bg-white/80
            p-3 shadow-lg shadow-stone-300/25 backdrop-blur-md
          "
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="truncate text-xs font-medium text-stone-700">
              Nothing{"'"}s Gonna Hurt You Baby
            </p>
            <button
              type="button"
              onClick={collapse}
              className="rounded-full px-2 py-1 text-[11px] text-stone-400 transition hover:bg-stone-100 hover:text-stone-600 cursor-pointer"
              aria-label="Cerrar y silenciar"
            >
              Cerrar
            </button>
          </div>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="mb-1 h-1 w-full cursor-pointer appearance-none rounded-full bg-stone-200 accent-rose-400"
            aria-label="Progreso"
          />

          <div className="mb-2 flex justify-between text-[10px] tabular-nums text-stone-400">
            <span>{formatTime(current)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="
                flex h-10 w-10 items-center justify-center rounded-full
                bg-rose-500 text-white shadow-md shadow-rose-200/50
                transition hover:bg-rose-600 active:scale-95 cursor-pointer
              "
              aria-label={playing ? "Pausar" : "Reproducir"}
            >
              {playing ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 translate-x-0.5"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
