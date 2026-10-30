"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import heroImage from "@/assets/images/hero-img.png";
import { HeroDistortion } from "@/components/home/hero-distortion";
import { cn } from "@/lib/utils";

export function HeroBackground() {
  const [canvasReady, setCanvasReady] = useState(false);

  const handleReadyChange = useCallback((ready: boolean) => {
    setCanvasReady(ready);
  }, []);

  return (
    <>
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className={cn(
          "object-cover object-[68%_30%] transition-opacity duration-500 sm:object-[center_35%]",
          canvasReady ? "opacity-0" : "animate-hero-zoom opacity-100",
        )}
      />
      <HeroDistortion
        imageSrc={heroImage.src}
        onReadyChange={handleReadyChange}
      />
    </>
  );
}
