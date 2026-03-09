import * as THREE from 'three'

export type CarParts = {
  body: THREE.Mesh[]
  glass: THREE.Mesh[]
  wheels: THREE.Mesh[]
  tires: THREE.Mesh[]
  headlights: THREE.Mesh[]
  taillights: THREE.Mesh[]
  chrome: THREE.Mesh[]
  interior: THREE.Mesh[]
  misc: THREE.Mesh[]
  allMeshes: THREE.Mesh[]
}

function includesOneOf(name: string, keywords: string[]) {
  const n = name.toLowerCase()
  return keywords.some((k) => n.includes(k))
}

function classifyMesh(mesh: THREE.Mesh, parts: CarParts) {
  const name = mesh.name.toLowerCase()

  // 1. 先识别玻璃
  if (
    includesOneOf(name, [
      'glass',
      'window',
      'windshield',
      'windscreen',
      'rear_glass',
      'side_glass',
      'body_win_',
      'body_win'
    ])
  ) {
    parts.glass.push(mesh)
    return
  }

  // 2. 再识别车身
  if (
    includesOneOf(name, [
      'body_body_paint',
      'car_body',
      'paint',
      'bonnet',
      'hood',
      'door',
      'fender',
      'bumper',
      'trunk',
      'roof',
      'panel'
    ])
  ) {
    parts.body.push(mesh)
    return
  }

  if (
    includesOneOf(name, [
      'wheel',
      'rim',
      'alloy',
      'disk'
    ])
  ) {
    parts.wheels.push(mesh)
    return
  }

  if (
    includesOneOf(name, [
      'tire',
      'tyre',
      'rubber'
    ])
  ) {
    parts.tires.push(mesh)
    return
  }

  if (
    includesOneOf(name, [
      'headlight',
      'head_light',
      'drl',
      'frontlight',
      'front_light'
    ])
  ) {
    parts.headlights.push(mesh)
    return
  }

  if (
    includesOneOf(name, [
      'taillight',
      'tail_light',
      'rearlight',
      'rear_light',
      'brakelight',
      'brake_light'
    ])
  ) {
    parts.taillights.push(mesh)
    return
  }

  if (
    includesOneOf(name, [
      'chrome',
      'trim',
      'badge',
      'logo',
      'grill',
      'grille'
    ])
  ) {
    parts.chrome.push(mesh)
    return
  }

  if (
    includesOneOf(name, [
      'interior',
      'seat',
      'dashboard',
      'steering',
      'cabin',
      'console'
    ])
  ) {
    parts.interior.push(mesh)
    return
  }

  parts.misc.push(mesh)
}

export function findCarParts(root: THREE.Object3D): CarParts {
  const parts: CarParts = {
    body: [],
    glass: [],
    wheels: [],
    tires: [],
    headlights: [],
    taillights: [],
    chrome: [],
    interior: [],
    misc: [],
    allMeshes: []
  }

  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh
    if (!mesh.isMesh) return

    parts.allMeshes.push(mesh)
    classifyMesh(mesh, parts)
  })

  return parts
}