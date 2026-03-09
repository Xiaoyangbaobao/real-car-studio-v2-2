import * as THREE from 'three'

export type StudioLights = {
  ambient: THREE.AmbientLight
  key: THREE.DirectionalLight
  rim: THREE.DirectionalLight
  fill: THREE.DirectionalLight
  topStrip: THREE.RectAreaLight
}

export function createLights(scene: THREE.Scene): StudioLights {
  const ambient = new THREE.AmbientLight(0xffffff, 0.05)
  scene.add(ambient)

  const key = new THREE.DirectionalLight(0xffffff, 0)
  key.position.set(4, 5.5, 3)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  key.shadow.camera.near = 0.5
  key.shadow.camera.far = 20
  key.shadow.bias = -0.0002
  scene.add(key)

  const rim = new THREE.DirectionalLight(0xc6d9ff, 0)
  rim.position.set(-5, 4, -4)
  scene.add(rim)

  const fill = new THREE.DirectionalLight(0xffffff, 0)
  fill.position.set(0, 2.5, 6)
  scene.add(fill)

  const topStrip = new THREE.RectAreaLight(0xffffff, 0, 4.8, 0.18)
  topStrip.position.set(0, 3.2, 0)
  topStrip.rotation.x = -Math.PI / 2
  scene.add(topStrip)

  return { ambient, key, rim, fill, topStrip }
}
