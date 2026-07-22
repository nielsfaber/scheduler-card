import { Action } from "../../types";
import { isOnAction } from "./is_off_action";

const DEFAULT_ON_RGB: [number, number, number] = [67, 160, 71];

const MIN_ALPHA = 0.25;
const MAX_ALPHA = 0.85;
const DEFAULT_ALPHA = 0.75;

/**
 * Approximate RGB for a black-body color temperature (Tanner Helland's
 * fitting), clamped to the range light bulbs use.
 */
export const kelvinToRgb = (kelvin: number): [number, number, number] => {
  const t = Math.min(Math.max(kelvin, 1000), 12000) / 100;
  let r: number, g: number, b: number;

  if (t <= 66) {
    r = 255;
    g = 99.4708025861 * Math.log(t) - 161.1195681661;
    b = t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  } else {
    r = 329.698727446 * Math.pow(t - 60, -0.1332047592);
    g = 288.1221695283 * Math.pow(t - 60, -0.0755148492);
    b = 255;
  }

  const clamp = (v: number) => Math.round(Math.min(Math.max(v, 0), 255));
  return [clamp(r), clamp(g), clamp(b)];
};

const miredToKelvin = (mired: number) => Math.round(1e6 / mired);

/**
 * Compute a display color for a slot's action, or null when the action has
 * no color-relevant settings (caller falls back to its static styling).
 *
 * - color temperature (kelvin or mireds) tints the slot to the bulb's tone
 * - brightness scales the opacity, so a dim setting looks dim
 */
export const computeActionColor = (action: Action): { rgb: [number, number, number]; alpha: number } | null => {
  if (!isOnAction(action)) return null;

  const data = action.service_data || {};

  let kelvin: number | undefined;
  if (typeof data.color_temp_kelvin === 'number') kelvin = data.color_temp_kelvin;
  else if (typeof data.color_temp === 'number') kelvin = miredToKelvin(data.color_temp);

  let brightnessPct: number | undefined;
  if (typeof data.brightness === 'number') brightnessPct = (data.brightness / 255) * 100;
  else if (typeof data.brightness_pct === 'number') brightnessPct = data.brightness_pct;

  if (kelvin === undefined && brightnessPct === undefined) return null;

  const rgb = kelvin !== undefined ? kelvinToRgb(kelvin) : DEFAULT_ON_RGB;
  const alpha = brightnessPct !== undefined
    ? MIN_ALPHA + (MAX_ALPHA - MIN_ALPHA) * Math.min(Math.max(brightnessPct, 0), 100) / 100
    : DEFAULT_ALPHA;

  return { rgb, alpha };
};
