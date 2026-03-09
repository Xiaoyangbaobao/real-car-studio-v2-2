import * as THREE from 'three'

export function createComposer(renderer: THREE.WebGLRenderer) {
  return {
    render: (scene: THREE.Scene, camera: THREE.Camera) => renderer.render(scene, camera),
    setSize: (width: number, height: number) => renderer.setSize(width, height)
  }
}
