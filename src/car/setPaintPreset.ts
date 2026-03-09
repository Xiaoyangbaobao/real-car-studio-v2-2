import * as THREE from 'three'
import type { CarParts } from './findCarParts'

export type PaintPreset = 'gloss-black' | 'pearl-white' | 'racing-red' | 'matte-gray' | 'metallic-blue'

export function setPaintPreset(parts: CarParts, preset: PaintPreset) {
  const apply = (
    color: THREE.ColorRepresentation,
    metalness: number,
    roughness: number,
    clearcoat: number,
    clearcoatRoughness: number
  ) => {
    for (const mesh of parts.body) {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]

      for (const material of materials) {
        if (material instanceof THREE.MeshPhysicalMaterial) {
          material.color.set(color)
          material.metalness = metalness
          material.roughness = roughness
          material.clearcoat = clearcoat
          material.clearcoatRoughness = clearcoatRoughness
          material.needsUpdate = true
        } else if (material instanceof THREE.MeshStandardMaterial) {
          material.color.set(color)
          material.metalness = metalness
          material.roughness = roughness
          material.needsUpdate = true
        }
      }
    }
  }

  switch (preset) {
    case 'gloss-black':
      apply('#111111', 0.85, 0.28, 1.0, 0.08)
      break
    case 'pearl-white':
      apply('#f3f3ef', 0.65, 0.22, 1.0, 0.05)
      break
    case 'racing-red':
      apply('#9f0f17', 0.8, 0.24, 1.0, 0.07)
      break
    case 'matte-gray':
      apply('#676a70', 0.35, 0.62, 0.15, 0.4)
      break
    case 'metallic-blue':
      apply('#1f4e8c', 0.88, 0.2, 1.0, 0.06)
      break
  }
}