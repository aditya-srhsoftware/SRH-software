"use client";

import { useEffect } from "react";
import { getLenis } from "@/lib/lenis";

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) {
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();

    return () => {
      document.body.style.overflow = previous;
      getLenis()?.start();
    };
  }, [locked]);
}
