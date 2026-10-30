export const vertexShaderSource = `#version 300 es
precision highp float;

in vec2 aPosition;
out vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const fragmentShaderSource = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uImageSize;
uniform vec2 uMouse;
uniform float uStrength;
uniform float uTime;
uniform float uRadius;
uniform float uFalloff;
uniform float uRefraction;
uniform float uMagnification;
uniform float uChromatic;
uniform float uRipple;
uniform float uRippleFrequency;
uniform float uBrightness;
uniform float uHighlight;
uniform float uBaseZoom;
uniform float uFocusY;
uniform float uIntensity;
uniform float uRippleStrength;
uniform vec2 uRipplePos[12];
uniform float uRippleAge[12];
uniform float uRippleAmp[12];

vec2 coverUv(vec2 uv, float zoom) {
  float canvasAspect = uResolution.x / max(uResolution.y, 1.0);
  float imageAspect = uImageSize.x / max(uImageSize.y, 1.0);

  vec2 scale;
  if (canvasAspect > imageAspect) {
    scale = vec2(1.0, imageAspect / canvasAspect);
  } else {
    scale = vec2(canvasAspect / imageAspect, 1.0);
  }

  scale /= zoom;
  vec2 focus = vec2(0.5, uFocusY);
  vec2 offset = (vec2(1.0) - scale) * focus;
  return uv * scale + offset;
}

float softMask(float dist, float radius) {
  float inner = radius * 0.16;
  float outer = radius * uFalloff;
  float m = 1.0 - smoothstep(inner, outer, dist);
  return m * m * (3.0 - 2.0 * m);
}

float layeredRipple(float dist, float time) {
  float f = uRippleFrequency;
  float a = sin(dist * f * 0.02 - time * 1.7);
  float b = sin(dist * f * 0.042 - time * 2.55 + 1.1);
  float c = sin(dist * f * 0.078 - time * 3.6 + 2.2);
  float wave = a * 0.5 + b * 0.32 + c * 0.18;
  float envelope = exp(-dist / (uRadius * 1.75));
  return wave * envelope;
}

// Expanding multi-ring source; energy decays smoothly with age (no idle motion)
vec2 rippleSource(vec2 pixel, int i) {
  float age = uRippleAge[i];
  float amp = uRippleAmp[i];
  if (age >= 0.999 || amp < 0.001) {
    return vec2(0.0);
  }

  vec2 origin = uRipplePos[i] * uResolution;
  float dist = distance(pixel, origin);
  float damp = pow(1.0 - age, 1.55);
  damp *= smoothstep(1.0, 0.82, age);

  float travel = uRadius * (0.35 + age * 4.2);
  float width = uRadius * (0.16 + age * 0.55);

  float ring1 = exp(-pow((dist - travel) / max(width, 1.0), 2.0));
  float ring2 = exp(-pow((dist - travel * 0.58) / max(width * 0.72, 1.0), 2.0));
  float ring3 = exp(-pow((dist - travel * 1.22) / max(width * 1.12, 1.0), 2.0));
  float rings = ring1 * 0.52 + ring2 * 0.3 + ring3 * 0.18;

  float phase =
    sin(dist * 0.038 - age * 14.0) * 0.55 +
    sin(dist * 0.07 - age * 21.0 + 1.3) * 0.3 +
    sin(dist * 0.11 - age * 28.0 + 2.1) * 0.15;

  float height = rings * phase * damp * amp * uRippleStrength;

  vec2 radial = (pixel - origin) / max(dist, 1.0);
  vec2 tangent = vec2(-radial.y, radial.x);
  return radial * height + tangent * height * 0.22;
}

vec2 sumRipples(vec2 pixel) {
  vec2 total = vec2(0.0);
  total += rippleSource(pixel, 0);
  total += rippleSource(pixel, 1);
  total += rippleSource(pixel, 2);
  total += rippleSource(pixel, 3);
  total += rippleSource(pixel, 4);
  total += rippleSource(pixel, 5);
  total += rippleSource(pixel, 6);
  total += rippleSource(pixel, 7);
  total += rippleSource(pixel, 8);
  total += rippleSource(pixel, 9);
  total += rippleSource(pixel, 10);
  total += rippleSource(pixel, 11);
  return total;
}

void main() {
  vec2 pixel = vUv * uResolution;
  vec2 mouse = uMouse * uResolution;
  float dist = distance(pixel, mouse);
  float radius = uRadius;
  float strength = uStrength * uIntensity;
  float mask = softMask(dist, radius) * strength;

  // Static cover crop — no Ken Burns / idle animation
  float zoom = 1.0 + uBaseZoom;
  vec2 stillUv = coverUv(vUv, zoom);

  vec2 wakeOffset = sumRipples(pixel);
  vec2 wakeUv = wakeOffset / max(uResolution.y, 1.0) * uIntensity;
  float wakeEnergy = length(wakeUv);

  // Perfectly still when nothing is interacting
  if (strength < 0.001 && wakeEnergy < 0.00001) {
    fragColor = vec4(texture(uTexture, stillUv).rgb, 1.0);
    return;
  }

  vec2 dir = (pixel - mouse) / max(radius, 1.0);
  float dirLen = length(dir);
  vec2 safeDir = dirLen > 0.0001 ? dir / dirLen : vec2(0.0);
  vec2 tangent = vec2(-safeDir.y, safeDir.x);

  float liveRipple = layeredRipple(dist, uTime) * uRipple * mask;
  float radialPush = uRefraction * mask * (0.55 + 0.45 * (1.0 - mask));

  vec2 lensOffset = safeDir * radialPush;
  lensOffset += safeDir * liveRipple;
  lensOffset += tangent * liveRipple * 0.7;

  vec2 totalOffset = lensOffset + wakeUv;

  float mag = uMagnification * mask;
  vec2 zoomed = mix(vUv, uMouse + (vUv - uMouse) * (1.0 - mag), mask);
  vec2 distortedUv = coverUv(zoomed, zoom) - totalOffset;

  float chroma = uChromatic * (mask * 0.75 + wakeEnergy * 12.0);
  float r = texture(uTexture, distortedUv + safeDir * chroma).r;
  float g = texture(uTexture, distortedUv).g;
  float b = texture(uTexture, distortedUv - safeDir * chroma * 0.85).b;
  vec3 color = vec3(r, g, b);

  float interact = smoothstep(0.0, 1.0, clamp(mask * 1.05 + wakeEnergy * 55.0, 0.0, 1.0));
  vec3 still = texture(uTexture, stillUv).rgb;
  color = mix(still, color, interact);

  float specular = pow(max(1.0 - dist / (radius * 0.9), 0.0), 5.5) * uHighlight * mask;
  float glow = exp(-dist / (radius * 0.62)) * uBrightness * mask;
  color += vec3(glow + specular);

  float rim = smoothstep(radius * 0.55, radius * 0.88, dist) *
    (1.0 - smoothstep(radius * 0.88, radius * 1.35, dist));
  color += vec3(0.78, 0.88, 1.0) * rim * 0.055 * strength;

  fragColor = vec4(color, 1.0);
}
`;
