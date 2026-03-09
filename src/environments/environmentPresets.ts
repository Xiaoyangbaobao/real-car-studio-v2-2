export type EnvironmentName = 'desert' | 'beach' | 'snow'

export type EnvironmentPreset = {
  name: EnvironmentName
  hdrPath: string
  backgroundA: string
  backgroundB: string
  fogColor: string
  fogNear: number
  fogFar: number
  exposure: number
  ambientIntensity: number
  keyIntensity: number
  rimIntensity: number
  fillIntensity: number
  topStripIntensity: number
  envMapIntensity: number
  groundColor: string
  groundRoughness: number
  groundMetalness: number
}

const desertHdrUrl = new URL('../../static/hdri/desert.hdr', import.meta.url).toString()
const beachHdrUrl = new URL('../../static/hdri/beach.hdr', import.meta.url).toString()
const snowHdrUrl = new URL('../../static/hdri/snow.hdr', import.meta.url).toString()

console.log('desertHdrUrl', desertHdrUrl)

export const environmentPresets: Record<EnvironmentName, EnvironmentPreset> = {
  desert: {
    name: 'desert',
    hdrPath: desertHdrUrl,
    backgroundA: '#e1b176',
    backgroundB: '#6e5038',
    fogColor: '#b4865f',
    fogNear: 20,
    fogFar: 48,
    exposure: 1.04,
    ambientIntensity: 0.26,
    keyIntensity: 1.8,
    rimIntensity: 0.95,
    fillIntensity: 0.78,
    topStripIntensity: 1.8,
    envMapIntensity: 1.6,
    groundColor: '#927052',
    groundRoughness: 0.98,
    groundMetalness: 0.02
  },
  beach: {
    name: 'beach',
    hdrPath: beachHdrUrl,
    backgroundA: '#b3dcf2',
    backgroundB: '#6fa0bb',
    fogColor: '#b2d8e8',
    fogNear: 22,
    fogFar: 52,
    exposure: 1.08,
    ambientIntensity: 0.36,
    keyIntensity: 1.42,
    rimIntensity: 0.8,
    fillIntensity: 1.05,
    topStripIntensity: 1.45,
    envMapIntensity: 1.45,
    groundColor: '#cab79d',
    groundRoughness: 0.76,
    groundMetalness: 0.03
  },
  snow: {
    name: 'snow',
    hdrPath: snowHdrUrl,
    backgroundA: '#eef7ff',
    backgroundB: '#9cb7ca',
    fogColor: '#d9eaf7',
    fogNear: 24,
    fogFar: 56,
    exposure: 1.16,
    ambientIntensity: 0.48,
    keyIntensity: 1.35,
    rimIntensity: 1.08,
    fillIntensity: 1.12,
    topStripIntensity: 1.6,
    envMapIntensity: 1.72,
    groundColor: '#f0f5f8',
    groundRoughness: 0.94,
    groundMetalness: 0
  }
}


import * as THREE from 'three'

export function createGradientTexture(topHex: string, bottomHex: string) {
  const canvas = document.createElement('canvas')
  canvas.width = 8
  canvas.height = 256
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  gradient.addColorStop(0, topHex)
  gradient.addColorStop(1, bottomHex)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}
