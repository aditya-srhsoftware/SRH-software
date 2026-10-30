import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

export function smoothScrollTo(top: number) {
  if (lenisInstance) {
    lenisInstance.scrollTo(top, { duration: 1.05 });
    return;
  }

  window.scrollTo({ top, behavior: "smooth" });
}
