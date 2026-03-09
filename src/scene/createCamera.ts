import * as THREE from 'three'

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(3.8, 1.4, 7.2)
  return camera
}
