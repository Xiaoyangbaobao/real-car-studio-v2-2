import * as THREE from 'three'

export function createScene() {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#06080b')
  scene.fog = new THREE.Fog('#0c1117', 18, 44)
  return scene
}
