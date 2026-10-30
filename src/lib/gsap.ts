"use client";

import { gsap, CSSPlugin } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Explicit registration prevents Turbopack/webpack from tree-shaking CSSPlugin
// (gsap package sets "sideEffects": false), which otherwise causes:
// "Invalid property force3D … Missing plugin? gsap.registerPlugin()"
gsap.registerPlugin(CSSPlugin, ScrollTrigger);

export { gsap, CSSPlugin, ScrollTrigger };
export default gsap;
