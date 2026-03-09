import * as THREE from 'three'
import type { EnvironmentPreset } from './environmentPresets'

export function createGround(scene: THREE.Scene) {
  const geometry = new THREE.CircleGeometry(18, 96)
  const material = new THREE.MeshStandardMaterial({
    color: '#8a8a8a',
    roughness: 0.9,
    metalness: 0
  })

  const ground = new THREE.Mesh(geometry, material)
  ground.name = 'StudioGround'
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  ground.position.y = -0.01
  scene.add(ground)
  return ground
}

export function updateGroundForEnvironment(ground: THREE.Mesh, preset: EnvironmentPreset) {
  const material = ground.material as THREE.MeshStandardMaterial
  material.color.set(preset.groundColor)
  material.roughness = preset.groundRoughness
  material.metalness = preset.groundMetalness
  material.needsUpdate = true
}
