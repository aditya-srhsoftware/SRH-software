"use client";

import { useEffect, useRef } from "react";
import {
  resolveHeroDistortionConfig,
  RIPPLE_COUNT,
  type HeroDistortionConfig,
} from "@/components/home/hero-distortion/config";
import { createProgram, createTexture, loadImage } from "@/components/home/hero-distortion/gl";
import {
  fragmentShaderSource,
  vertexShaderSource,
} from "@/components/home/hero-distortion/shaders";

type UseHeroDistortionOptions = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  containerRef: React.RefObject<HTMLElement | null>;
  imageSrc: string;
  enabled: boolean;
  config?: Partial<HeroDistortionConfig>;
  onReady?: (ready: boolean) => void;
};

type PointerState = {
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
  targetStrength: number;
  currentStrength: number;
  hasPointer: boolean;
  lastDropX: number;
  lastDropY: number;
  lastDropTime: number;
};

type Ripple = {
  x: number;
  y: number;
  born: number;
  amplitude: number;
};

export function useHeroDistortion({
  canvasRef,
  containerRef,
  imageSrc,
  enabled,
  config: configOverrides,
  onReady,
}: UseHeroDistortionOptions) {
  const configRef = useRef(resolveHeroDistortionConfig(configOverrides));
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    configRef.current = resolveHeroDistortionConfig(configOverrides);
  }, [configOverrides]);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    if (!enabled) {
      onReadyRef.current?.(false);
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return;
    }

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      return;
    }

    let disposed = false;
    let frame = 0;
    let program: WebGLProgram | null = null;
    let texture: WebGLTexture | null = null;
    let buffer: WebGLBuffer | null = null;
    let imageWidth = 1;
    let imageHeight = 1;
    const start = performance.now();

    const pointer: PointerState = {
      targetX: 0.5,
      targetY: 0.5,
      currentX: 0.5,
      currentY: 0.5,
      targetStrength: 0,
      currentStrength: 0,
      hasPointer: false,
      lastDropX: 0.5,
      lastDropY: 0.5,
      lastDropTime: -999,
    };

    const ripples: Ripple[] = Array.from({ length: RIPPLE_COUNT }, () => ({
      x: 0.5,
      y: 0.5,
      born: -999,
      amplitude: 0,
    }));
    let rippleWrite = 0;

    const ripplePos = new Float32Array(RIPPLE_COUNT * 2);
    const rippleAge = new Float32Array(RIPPLE_COUNT);
    const rippleAmp = new Float32Array(RIPPLE_COUNT);

    const uniforms = {
      resolution: null as WebGLUniformLocation | null,
      imageSize: null as WebGLUniformLocation | null,
      mouse: null as WebGLUniformLocation | null,
      strength: null as WebGLUniformLocation | null,
      time: null as WebGLUniformLocation | null,
      radius: null as WebGLUniformLocation | null,
      falloff: null as WebGLUniformLocation | null,
      refraction: null as WebGLUniformLocation | null,
      magnification: null as WebGLUniformLocation | null,
      chromatic: null as WebGLUniformLocation | null,
      ripple: null as WebGLUniformLocation | null,
      rippleFrequency: null as WebGLUniformLocation | null,
      brightness: null as WebGLUniformLocation | null,
      highlight: null as WebGLUniformLocation | null,
      baseZoom: null as WebGLUniformLocation | null,
      focusY: null as WebGLUniformLocation | null,
      intensity: null as WebGLUniformLocation | null,
      rippleStrength: null as WebGLUniformLocation | null,
      ripplePos: null as WebGLUniformLocation | null,
      rippleAge: null as WebGLUniformLocation | null,
      rippleAmp: null as WebGLUniformLocation | null,
      texture: null as WebGLUniformLocation | null,
    };

    const nowSeconds = () => (performance.now() - start) / 1000;

    const spawnRipple = (x: number, y: number, amplitude: number, born = nowSeconds()) => {
      ripples[rippleWrite] = {
        x,
        y,
        born,
        amplitude: Math.min(1.35, Math.max(0.2, amplitude)),
      };
      rippleWrite = (rippleWrite + 1) % RIPPLE_COUNT;
      pointer.lastDropX = x;
      pointer.lastDropY = y;
      pointer.lastDropTime = born;
    };

    const maybeTrailRipple = (x: number, y: number, speed: number) => {
      const config = configRef.current;
      const t = nowSeconds();
      const dist = Math.hypot(x - pointer.lastDropX, y - pointer.lastDropY);
      const elapsed = t - pointer.lastDropTime;

      if (dist < config.rippleSpacing && elapsed < 0.09) {
        return;
      }

      spawnRipple(x, y, 0.45 + Math.min(0.9, speed * 28), t);
    };

    const resize = () => {
      const config = configRef.current;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, config.maxDpr);
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      gl.viewport(0, 0, width, height);
    };

    const syncPointer = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (inside) {
        const x = (event.clientX - rect.left) / Math.max(rect.width, 1);
        const y = 1 - (event.clientY - rect.top) / Math.max(rect.height, 1);
        const nx = Math.min(1, Math.max(0, x));
        const ny = Math.min(1, Math.max(0, y));

        const dx = nx - pointer.targetX;
        const dy = ny - pointer.targetY;
        const speed = Math.hypot(dx, dy);
        const wasOutside = !pointer.hasPointer;

        pointer.targetX = nx;
        pointer.targetY = ny;
        pointer.hasPointer = true;
        pointer.targetStrength = 1;

        if (wasOutside) {
          const t = nowSeconds();
          spawnRipple(nx, ny, 1.15, t);
          spawnRipple(nx + dx * 0.35, ny + dy * 0.35, 0.7, t - 0.05);
        } else {
          maybeTrailRipple(nx, ny, speed);
        }
        return;
      }

      if (pointer.hasPointer) {
        // Preserve active ripples — soft exit splash only, never clear the pool
        spawnRipple(pointer.currentX, pointer.currentY, 0.8);
      }

      pointer.hasPointer = false;
      pointer.targetStrength = 0;
    };

    const onPointerLeaveWindow = () => {
      if (pointer.hasPointer) {
        spawnRipple(pointer.currentX, pointer.currentY, 0.65);
      }
      pointer.hasPointer = false;
      pointer.targetStrength = 0;
    };

    const hasActiveRipples = (time: number, life: number) => {
      for (let i = 0; i < RIPPLE_COUNT; i += 1) {
        const age = (time - ripples[i].born) / life;
        if (ripples[i].amplitude > 0 && age < 1) {
          return true;
        }
      }
      return false;
    };

    const render = () => {
      if (disposed || !program) {
        return;
      }

      const config = configRef.current;
      const isTablet =
        window.matchMedia("(max-width: 1024px) and (min-width: 768px)").matches;
      const intensity = config.intensity * (isTablet ? config.tabletIntensity : 1);

      pointer.currentX += (pointer.targetX - pointer.currentX) * config.follow;
      pointer.currentY += (pointer.targetY - pointer.currentY) * config.follow;

      const recoverRate =
        pointer.targetStrength > pointer.currentStrength
          ? config.follow
          : config.recover * 0.5;
      pointer.currentStrength +=
        (pointer.targetStrength - pointer.currentStrength) * recoverRate;

      const dpr = Math.min(window.devicePixelRatio || 1, config.maxDpr);
      const time = nowSeconds();
      const active = pointer.currentStrength > 0.001 || hasActiveRipples(time, config.rippleLife);

      for (let i = 0; i < RIPPLE_COUNT; i += 1) {
        const ripple = ripples[i];
        const age = Math.min(1, Math.max(0, (time - ripple.born) / config.rippleLife));
        ripplePos[i * 2] = ripple.x;
        ripplePos[i * 2 + 1] = ripple.y;
        rippleAge[i] = age;
        rippleAmp[i] = age >= 1 ? 0 : ripple.amplitude;
      }

      gl.useProgram(program);
      gl.clearColor(0.05, 0.02, 0.1, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.imageSize, imageWidth, imageHeight);
      gl.uniform2f(uniforms.mouse, pointer.currentX, pointer.currentY);
      gl.uniform1f(uniforms.strength, active ? pointer.currentStrength : 0);
      gl.uniform1f(uniforms.time, time);
      gl.uniform1f(uniforms.radius, config.radius * dpr);
      gl.uniform1f(uniforms.falloff, config.falloff);
      gl.uniform1f(uniforms.refraction, config.refraction);
      gl.uniform1f(uniforms.magnification, config.magnification);
      gl.uniform1f(uniforms.chromatic, config.chromatic);
      gl.uniform1f(uniforms.ripple, config.ripple);
      gl.uniform1f(uniforms.rippleFrequency, config.rippleFrequency);
      gl.uniform1f(uniforms.brightness, config.brightness);
      gl.uniform1f(uniforms.highlight, config.highlight);
      gl.uniform1f(uniforms.baseZoom, config.baseZoom);
      gl.uniform1f(uniforms.focusY, config.focusY);
      gl.uniform1f(uniforms.intensity, intensity);
      gl.uniform1f(uniforms.rippleStrength, config.rippleStrength);
      gl.uniform2fv(uniforms.ripplePos, ripplePos);
      gl.uniform1fv(uniforms.rippleAge, rippleAge);
      gl.uniform1fv(uniforms.rippleAmp, rippleAmp);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uniforms.texture, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frame = window.requestAnimationFrame(render);
    };

    const setup = async () => {
      try {
        const image = await loadImage(imageSrc);

        if (disposed) {
          return;
        }

        imageWidth = image.naturalWidth || image.width;
        imageHeight = image.naturalHeight || image.height;

        program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
        gl.useProgram(program);

        buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([
            -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
          ]),
          gl.STATIC_DRAW,
        );

        const position = gl.getAttribLocation(program, "aPosition");
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

        uniforms.resolution = gl.getUniformLocation(program, "uResolution");
        uniforms.imageSize = gl.getUniformLocation(program, "uImageSize");
        uniforms.mouse = gl.getUniformLocation(program, "uMouse");
        uniforms.strength = gl.getUniformLocation(program, "uStrength");
        uniforms.time = gl.getUniformLocation(program, "uTime");
        uniforms.radius = gl.getUniformLocation(program, "uRadius");
        uniforms.falloff = gl.getUniformLocation(program, "uFalloff");
        uniforms.refraction = gl.getUniformLocation(program, "uRefraction");
        uniforms.magnification = gl.getUniformLocation(program, "uMagnification");
        uniforms.chromatic = gl.getUniformLocation(program, "uChromatic");
        uniforms.ripple = gl.getUniformLocation(program, "uRipple");
        uniforms.rippleFrequency = gl.getUniformLocation(
          program,
          "uRippleFrequency",
        );
        uniforms.brightness = gl.getUniformLocation(program, "uBrightness");
        uniforms.highlight = gl.getUniformLocation(program, "uHighlight");
        uniforms.baseZoom = gl.getUniformLocation(program, "uBaseZoom");
        uniforms.focusY = gl.getUniformLocation(program, "uFocusY");
        uniforms.intensity = gl.getUniformLocation(program, "uIntensity");
        uniforms.rippleStrength = gl.getUniformLocation(program, "uRippleStrength");
        uniforms.ripplePos = gl.getUniformLocation(program, "uRipplePos[0]");
        uniforms.rippleAge = gl.getUniformLocation(program, "uRippleAge[0]");
        uniforms.rippleAmp = gl.getUniformLocation(program, "uRippleAmp[0]");
        uniforms.texture = gl.getUniformLocation(program, "uTexture");

        texture = createTexture(gl, image);
        resize();
        onReadyRef.current?.(true);
        frame = window.requestAnimationFrame(render);
      } catch {
        onReadyRef.current?.(false);
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    window.addEventListener("pointermove", syncPointer, { passive: true });
    window.addEventListener("pointerleave", onPointerLeaveWindow);

    void setup();

    return () => {
      disposed = true;
      onReadyRef.current?.(false);
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", syncPointer);
      window.removeEventListener("pointerleave", onPointerLeaveWindow);

      if (texture) {
        gl.deleteTexture(texture);
      }
      if (buffer) {
        gl.deleteBuffer(buffer);
      }
      if (program) {
        gl.deleteProgram(program);
      }
    };
  }, [canvasRef, containerRef, enabled, imageSrc]);
}
