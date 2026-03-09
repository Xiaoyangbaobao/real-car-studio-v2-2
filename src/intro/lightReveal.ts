import type { StudioLights } from '../scene/createLights'

export function resetLightReveal(lights: StudioLights) {
  lights.ambient.intensity = 0.03
  lights.key.intensity = 0
  lights.rim.intensity = 0
  lights.fill.intensity = 0
  lights.topStrip.intensity = 0
}
