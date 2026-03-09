import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

export type LoadedEnvironment = {
  envMap: THREE.Texture | null
  sourceTexture: THREE.DataTexture | THREE.Texture | null
}

const rgbeLoader = new RGBELoader()

export async function loadEnvironment(
  renderer: THREE.WebGLRenderer,
  hdrPath?: string
): Promise<LoadedEnvironment> {
  if (!hdrPath) {
    return {
      envMap: null,
      sourceTexture: null
    }
  }

  try {
    const pmrem = new THREE.PMREMGenerator(renderer)
    pmrem.compileEquirectangularShader()

    const hdrTexture = await rgbeLoader.loadAsync(hdrPath)
    const envMap = pmrem.fromEquirectangular(hdrTexture).texture

    pmrem.dispose()

    return {
      envMap,
      sourceTexture: hdrTexture
    }
  } catch (error) {
    console.error(`[loadEnvironment] Failed to load HDR: ${hdrPath}`, error)

    return {
      envMap: null,
      sourceTexture: null
    }
  }
}

export function disposeLoadedEnvironment(env: LoadedEnvironment) {
  env.envMap?.dispose()
  env.sourceTexture?.dispose()
}