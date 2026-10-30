"use client";

import { useEffect, useRef, useState } from "react";
import type { HeroDistortionConfig } from "@/components/home/hero-distortion/config";
import { useHeroDistortion } from "@/components/home/hero-distortion/use-hero-distortion";
import { cn } from "@/lib/utils";

type HeroDistortionProps = {
  imageSrc: string;
  className?: string;
  config?: Partial<HeroDistortionConfig>;
  onReadyChange?: (ready: boolean) => void;
};

function canUseHeroDistortion() {
  if (typeof window === "undefined") {
    return false;
  }

  const motionOk = window.matchMedia(
    "(prefers-reduced-motion: no-preference)",
  ).matches;
  const pointerOk = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const desktopOk = window.matchMedia("(min-width: 768px)").matches;

  return motionOk && pointerOk && desktopOk;
}

export function HeroDistortion({
  imageSrc,
  className,
  config,
  onReadyChange,
}: HeroDistortionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => {
      const next = canUseHeroDistortion();
      setEnabled(next);
      onReadyChange?.(next);
    };

    sync();

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const desktop = window.matchMedia("(min-width: 768px)");

    motion.addEventListener("change", sync);
    pointer.addEventListener("change", sync);
    desktop.addEventListener("change", sync);

    return () => {
      motion.removeEventListener("change", sync);
      pointer.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
    };
  }, [onReadyChange]);

  useHeroDistortion({
    canvasRef,
    containerRef,
    imageSrc,
    enabled,
    config,
    onReady: onReadyChange,
  });

  if (!enabled) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
}
