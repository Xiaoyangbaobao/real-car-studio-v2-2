import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function createControls(camera: THREE.PerspectiveCamera, domElement: HTMLCanvasElement) {
  const controls = new OrbitControls(camera, domElement)
  controls.enableDamping = true
  controls.enablePan = false
  controls.rotateSpeed = 0.6
  controls.minDistance = 3
  controls.maxDistance = 14
  controls.minPolarAngle = Math.PI * 0.18
  controls.maxPolarAngle = Math.PI * 0.48
  controls.target.set(0, 0.95, 0)
  return controls
}
