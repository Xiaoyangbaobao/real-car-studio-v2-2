import gsap from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { setPaintPreset, type PaintPreset } from '../car/setPaintPreset'
import type { EnvironmentName } from '../environments/environmentPresets'
import { cameraShots } from '../intro/cameraShots'
import type { LoadedCar } from '../loaders/loadCarModel'

export function bindUI(args: {
  camera: THREE.PerspectiveCamera
  controls: OrbitControls
  car: LoadedCar
  onChangeEnvironment: (name: EnvironmentName) => Promise<void>
  onReplayIntro: () => void
}) {
  const { camera, controls, car, onChangeEnvironment, onReplayIntro } = args

  const activate = (selector: string, value: string, attr: string) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
      element.classList.toggle('is-active', element.dataset[attr] === value)
    })
  }

  document.querySelectorAll<HTMLElement>('[data-env]').forEach((button) => {
    button.addEventListener('click', async () => {
      const env = button.dataset.env as EnvironmentName
      activate('[data-env]', env, 'env')
      await onChangeEnvironment(env)
    })
  })

  const views = {
    hero: cameraShots.hero,
    front: cameraShots.front,
    side: cameraShots.side,
    rear: cameraShots.rear
  }

  document.querySelectorAll<HTMLElement>('[data-view]').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.view as keyof typeof views
      const view = views[key]
      activate('[data-view]', key, 'view')

      gsap.to(camera.position, {
        ...view.position,
        duration: 1.35,
        ease: 'power2.inOut'
      })

      gsap.to(controls.target, {
        ...view.target,
        duration: 1.35,
        ease: 'power2.inOut'
      })
    })
  })

  document.querySelectorAll<HTMLElement>('[data-paint]').forEach((button) => {
    button.addEventListener('click', () => {
      const preset = button.dataset.paint as PaintPreset
      activate('[data-paint]', preset, 'paint')
      console.log('body:', car.parts.body.map(m => m.name))
      console.log('glass:', car.parts.glass.map(m => m.name))
      setPaintPreset(car.parts, preset)
    })
  })

  document
    .querySelector<HTMLElement>('[data-replay-intro]')
    ?.addEventListener('click', () => {
      onReplayIntro()
    })

  activate('[data-env]', 'desert', 'env')
  activate('[data-view]', 'hero', 'view')
  activate('[data-paint]', 'gloss-black', 'paint')
}