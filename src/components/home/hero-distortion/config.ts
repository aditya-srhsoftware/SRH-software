export type HeroDistortionConfig = {
  /** Overall effect strength multiplier */
  intensity: number;
  /** Lens radius in CSS pixels */
  radius: number;
  /** Soft edge falloff multiplier */
  falloff: number;
  /** Background sample offset strength */
  refraction: number;
  /** Extra zoom inside the lens */
  magnification: number;
  /** RGB channel split amount */
  chromatic: number;
  /** Live cursor ripple amplitude */
  ripple: number;
  /** Live cursor ripple frequency */
  rippleFrequency: number;
  /** Soft brightness boost under the lens */
  brightness: number;
  /** Specular highlight strength */
  highlight: number;
  /** How quickly the lens follows the cursor (0–1) */
  follow: number;
  /** How quickly the live cursor lens fades on leave */
  recover: number;
  /** Continuous Ken Burns zoom amount (kept for cover crop; unused while idle) */
  baseZoom: number;
  /** Ken Burns cycle duration in seconds */
  zoomDuration: number;
  /** Vertical focal point for cover crop (0–1) */
  focusY: number;
  /** Max device pixel ratio */
  maxDpr: number;
  /** Tablet intensity scale */
  tabletIntensity: number;
  /** How long spawned ripples live (seconds) */
  rippleLife: number;
  /** Expanding ripple distortion strength */
  rippleStrength: number;
  /** Minimum UV distance before dropping a new ripple */
  rippleSpacing: number;
};

/** Simultaneous expanding ripple sources */
export const RIPPLE_COUNT = 12;

export const defaultHeroDistortionConfig: HeroDistortionConfig = {
  intensity: 0.9,
  radius: 185,
  falloff: 1.8,
  refraction: 0.024,
  magnification: 0.028,
  chromatic: 0.0015,
  ripple: 0.009,
  rippleFrequency: 12,
  brightness: 0.048,
  highlight: 0.095,
  follow: 0.09,
  recover: 0.035,
  baseZoom: 0,
  zoomDuration: 28,
  focusY: 0.35,
  maxDpr: 1.75,
  tabletIntensity: 0.65,
  rippleLife: 3.2,
  rippleStrength: 0.022,
  rippleSpacing: 0.02,
};

export function resolveHeroDistortionConfig(
  overrides?: Partial<HeroDistortionConfig>,
): HeroDistortionConfig {
  return {
    ...defaultHeroDistortionConfig,
    ...overrides,
  };
}
