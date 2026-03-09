import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { findCarParts, type CarParts } from '../car/findCarParts'
import { setupCarMaterials } from '../car/setupCarMaterials'

export type LoadedCar = {
  root: THREE.Object3D
  parts: CarParts
  isFallback: boolean
}

const carModelUrl = new URL('../../static/models/car.glb', import.meta.url).toString()

function createFallbackCar(): THREE.Group {
  const root = new THREE.Group()
  root.name = 'FallbackCar'

  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: '#12161e',
    metalness: 0.8,
    roughness: 0.3,
    clearcoat: 1,
    clearcoatRoughness: 0.08
  })
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#18202a',
    transparent: true,
    opacity: 0.65,
    roughness: 0.08,
    transmission: 0.15
  })
  const tireMaterial = new THREE.MeshStandardMaterial({ color: '#111111', roughness: 0.9 })
  const metalMaterial = new THREE.MeshStandardMaterial({ color: '#b9c1cb', metalness: 1, roughness: 0.25 })
  const lightMaterial = new THREE.MeshStandardMaterial({ color: '#f3f7ff', emissive: '#dfe8ff', emissiveIntensity: 0 })

  const base = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.58, 1.9), bodyMaterial)
  base.name = 'Car_Body_Base'
  base.position.y = 0.72
  root.add(base)

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.62, 1.52), bodyMaterial)
  cabin.name = 'Car_Body_Cabin'
  cabin.position.set(-0.08, 1.18, 0)
  root.add(cabin)

  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.32, 1.7), bodyMaterial)
  nose.name = 'Car_Body_Nose'
  nose.position.set(2.18, 0.67, 0)
  root.add(nose)

  const rear = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.35, 1.72), bodyMaterial)
  rear.name = 'Car_Body_Rear'
  rear.position.set(-2.18, 0.69, 0)
  root.add(rear)

  const windshield = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.38, 1.4), glassMaterial)
  windshield.name = 'Glass_Front'
  windshield.position.set(0.45, 1.22, 0)
  root.add(windshield)

  const rearGlass = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.3, 1.36), glassMaterial)
  rearGlass.name = 'Glass_Rear'
  rearGlass.position.set(-0.78, 1.22, 0)
  root.add(rearGlass)

  const wheelPositions = [
    [1.35, 0.34, 1.0],
    [1.35, 0.34, -1.0],
    [-1.35, 0.34, 1.0],
    [-1.35, 0.34, -1.0]
  ] as const

  wheelPositions.forEach(([x, y, z], index) => {
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.32, 24), tireMaterial)
    tire.name = `Tire_${index}`
    tire.rotation.z = Math.PI / 2
    tire.position.set(x, y, z)
    root.add(tire)

    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.34, 20), metalMaterial)
    rim.name = `Wheel_${index}`
    rim.rotation.z = Math.PI / 2
    rim.position.set(x, y, z)
    root.add(rim)
  })

  const headlightL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.36), lightMaterial)
  headlightL.name = 'Headlight_L'
  headlightL.position.set(2.63, 0.78, 0.56)
  root.add(headlightL)

  const headlightR = headlightL.clone()
  headlightR.name = 'Headlight_R'
  headlightR.position.z = -0.56
  root.add(headlightR)

  const taillightL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.4), lightMaterial)
  taillightL.name = 'Taillight_L'
  taillightL.position.set(-2.64, 0.78, 0.54)
  root.add(taillightL)

  const taillightR = taillightL.clone()
  taillightR.name = 'Taillight_R'
  taillightR.position.z = -0.54
  root.add(taillightR)

  return root
}

export async function loadCarModel(scene: THREE.Scene): Promise<LoadedCar> {
  const loader = new GLTFLoader()

  try {
    const gltf = await loader.loadAsync(carModelUrl)
    const root = gltf.scene
    root.position.y = 0
    root.rotation.y = Math.PI * 0.08

    const parts = findCarParts(root)
    setupCarMaterials(parts)
    scene.add(root)

    return { root, parts, isFallback: false }
  } catch {
    const root = createFallbackCar()
    const parts = findCarParts(root)
    setupCarMaterials(parts)
    scene.add(root)
    return { root, parts, isFallback: true }
  }
}
