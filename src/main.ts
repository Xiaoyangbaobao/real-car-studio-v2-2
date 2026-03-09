import './styles.scss'
import * as THREE from 'three'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js'
import { createRenderer } from './scene/createRenderer'
import { createScene } from './scene/createScene'
import { createCamera } from './scene/createCamera'
import { createControls } from './scene/createControls'
import { createLights } from './scene/createLights'
import { createComposer } from './scene/createComposer'
import { createGround } from './environments/createGround'
import { environmentPresets, type EnvironmentName } from './environments/environmentPresets'
import { applyEnvironment } from './environments/applyEnvironment'
import { loadCarModel } from './loaders/loadCarModel'
import { createIntroTimeline } from './intro/introTimeline'
import { bindUI } from './ui/bindUI'
import { createLoadingOverlay } from './ui/loadingOverlay'

async function bootstrap() {
  RectAreaLightUniformsLib.init()

  const canvas = document.querySelector<HTMLCanvasElement>('#webgl')
  if (!canvas) throw new Error('Canvas #webgl not found')

  const loading = createLoadingOverlay()
  loading.setText('Creating renderer…')

  const scene = createScene()
  const renderer = createRenderer(canvas)
  const composer = createComposer(renderer)
  const camera = createCamera()
  const controls = createControls(camera, renderer.domElement)
  controls.enabled = false

  const lights = createLights(scene)
  const ground = createGround(scene)

  loading.setText('Loading car model…')
  const car = await loadCarModel(scene)

  let currentEnvironment: EnvironmentName = 'desert'
  loading.setText(`Applying ${currentEnvironment} environment…`)
  await applyEnvironment({
    scene,
    renderer,
    preset: environmentPresets[currentEnvironment],
    lights,
    ground,
    car
  })

  const intro = createIntroTimeline({
    camera,
    controls,
    lights,
    car,
    onStart: () => {
      document.body.classList.remove('intro-complete')
      controls.enabled = false
    },
    onComplete: () => {
      document.body.classList.add('intro-complete')
      controls.enabled = true
    }
  })

  bindUI({
    camera,
    controls,
    car,
    onReplayIntro: () => {
      intro.restart()
    },
    onChangeEnvironment: async (name) => {
      currentEnvironment = name
      await applyEnvironment({
        scene,
        renderer,
        preset: environmentPresets[name],
        lights,
        ground,
        car
      })
    }
  })

  function resize() {
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    composer.setSize(width, height)
  }

  window.addEventListener('resize', resize)
  resize()

  const clock = new THREE.Clock()
  loading.hide()
  intro.play()

  function animate() {
    requestAnimationFrame(animate)
    const elapsed = clock.getElapsedTime()

    if (document.body.classList.contains('intro-complete')) {
      car.root.rotation.y += 0.0014
    } else if (car.isFallback) {
      car.root.position.y = Math.sin(elapsed * 1.2) * 0.01
    }

    controls.update()
    composer.render(scene, camera)
  }

  animate()
}

bootstrap().catch((error) => {
  console.error(error)
  const text = document.querySelector<HTMLElement>('[data-loading-text]')
  if (text) text.textContent = 'Something went wrong. Check the console for details.'
})
