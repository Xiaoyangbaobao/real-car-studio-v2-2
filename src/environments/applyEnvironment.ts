import * as THREE from 'three'
import type { LoadedCar } from '../loaders/loadCarModel'
import { loadEnvironment } from '../loaders/loadEnvironment'
import { createGradientTexture, type EnvironmentPreset } from './environmentPresets'
import { updateGroundForEnvironment } from './createGround'
import type { StudioLights } from '../scene/createLights'

export async function applyEnvironment(args: {
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  preset: EnvironmentPreset
  lights: StudioLights
  ground: THREE.Mesh
  car: LoadedCar
}) {
  const { scene, renderer, preset, lights, ground, car } = args
  const envMap = await loadEnvironment(renderer, preset.hdrPath)
  scene.environment = envMap.envMap

  // const bgTexture = createGradientTexture(preset.backgroundA, preset.backgroundB)
  scene.background = envMap.envMap
  scene.fog = new THREE.Fog(preset.fogColor, preset.fogNear, preset.fogFar)
  renderer.toneMappingExposure = preset.exposure

  lights.ambient.intensity = preset.ambientIntensity
  lights.key.intensity = preset.keyIntensity
  lights.rim.intensity = preset.rimIntensity
  lights.fill.intensity = preset.fillIntensity
  lights.topStrip.intensity = preset.topStripIntensity

  car.root.traverse((obj) => {
    const mesh = obj as THREE.Mesh
    if (!mesh.isMesh) return
    const material = mesh.material
    if (material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshPhysicalMaterial) {
      material.envMapIntensity = preset.envMapIntensity
      material.needsUpdate = true
    }
  })

  updateGroundForEnvironment(ground, preset)
}
