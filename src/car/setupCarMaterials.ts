import * as THREE from 'three'
import type { CarParts } from './findCarParts'

export type CarMaterialOptions = {
  bodyColor?: THREE.ColorRepresentation
  envMapIntensity?: number
}

function applyMaterial(meshes: THREE.Mesh[], materialFactory: () => THREE.Material) {
  for (const mesh of meshes) {
    const mat = materialFactory()
    mesh.material = mat
    mesh.castShadow = true
    mesh.receiveShadow = true
  }
}

export function setupCarMaterials(
  parts: CarParts,
  options: CarMaterialOptions = {}
) {
  const bodyColor = options.bodyColor ?? '#111111'
  const envMapIntensity = options.envMapIntensity ?? 1.8

  // 1) 车身
  applyMaterial(parts.body, () => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(bodyColor),
      metalness: 0.85,
      roughness: 0.28,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      envMapIntensity,
      reflectivity: 1.0
    })
  })

  // 2) 玻璃
  applyMaterial(parts.glass, () => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#1d232a'),
      metalness: 0.0,
      roughness: 0.06,
      transmission: 0.15,
      transparent: true,
      opacity: 0.65,
      ior: 1.45,
      thickness: 0.02,
      envMapIntensity: envMapIntensity * 1.1
    })
  })

  // 3) 轮毂
  applyMaterial(parts.wheels, () => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#8c9199'),
      metalness: 0.95,
      roughness: 0.32,
      envMapIntensity: envMapIntensity * 0.9
    })
  })

  // 4) 轮胎
  applyMaterial(parts.tires, () => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#121212'),
      metalness: 0.0,
      roughness: 0.92,
      envMapIntensity: 0.2
    })
  })

  // 5) 前灯
  applyMaterial(parts.headlights, () => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f4f8ff'),
      metalness: 0.1,
      roughness: 0.02,
      transmission: 0.4,
      transparent: true,
      opacity: 0.95,
      envMapIntensity: envMapIntensity * 1.2,
      emissive: new THREE.Color('#dfe8ff'),
      emissiveIntensity: 0.0
    })
  })

  // 6) 尾灯
  applyMaterial(parts.taillights, () => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#6a0d12'),
      metalness: 0.05,
      roughness: 0.08,
      transmission: 0.1,
      transparent: true,
      opacity: 0.9,
      envMapIntensity: envMapIntensity,
      emissive: new THREE.Color('#ff2a2a'),
      emissiveIntensity: 0.0
    })
  })

  // 7) 镀铬 / 金属装饰
  applyMaterial(parts.chrome, () => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d7dbe0'),
      metalness: 1.0,
      roughness: 0.18,
      envMapIntensity: envMapIntensity * 1.2
    })
  })

  // 8) 内饰
  applyMaterial(parts.interior, () => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#202124'),
      metalness: 0.15,
      roughness: 0.78,
      envMapIntensity: 0.5
    })
  })

  // 9) 其他默认材质
  for (const mesh of parts.misc) {
    if (Array.isArray(mesh.material)) continue

    mesh.material = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#666666'),
      metalness: 0.25,
      roughness: 0.65,
      envMapIntensity: 0.6
    })

    mesh.castShadow = true
    mesh.receiveShadow = true
  }
}