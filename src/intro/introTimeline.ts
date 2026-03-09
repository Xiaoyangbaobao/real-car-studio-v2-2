import gsap from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { StudioLights } from '../scene/createLights'
import type { LoadedCar } from '../loaders/loadCarModel'
import { cameraShots } from './cameraShots'
import { resetLightReveal } from './lightReveal'

export function createIntroTimeline(args: {
  camera: THREE.PerspectiveCamera
  controls: OrbitControls
  lights: StudioLights
  car: LoadedCar
  onStart?: () => void
  onComplete?: () => void
}) {
  const { camera, controls, lights, car, onStart, onComplete } = args

  const setHeadlights = (value: number) => {
    for (const mesh of car.parts.headlights) {
      const material = mesh.material
      if (material instanceof THREE.MeshStandardMaterial) {
        material.emissiveIntensity = value
      }
    }
  }

  const reset = () => {
    resetLightReveal(lights)
    setHeadlights(0)
    car.root.rotation.y = 0
    Object.assign(camera.position, cameraShots.introClose.position)
    Object.assign(controls.target, cameraShots.introClose.target)
    controls.update()
  }

  reset()

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.inOut' },
    onStart,
    onComplete
  })

  tl.add(() => reset(), 0)

  tl.to(lights.ambient, { intensity: 0.12, duration: 1.0 }, 0)
  tl.to(lights.topStrip, { intensity: 1.45, duration: 1.6 }, 0.1)
  tl.to(camera.position, { ...cameraShots.introFront.position, duration: 2.2 }, 0.2)
  tl.to(controls.target, { ...cameraShots.introFront.target, duration: 2.2 }, 0.2)

  tl.to(lights.key, { intensity: 1.4, duration: 1.25 }, 1.8)
  tl.to({}, { duration: 0.01, onComplete: () => setHeadlights(1.5) }, 2.4)

  tl.to(lights.fill, { intensity: 0.72, duration: 1.2 }, 2.4)
  tl.to(camera.position, { ...cameraShots.introSweep.position, duration: 2.2 }, 2.5)
  tl.to(controls.target, { ...cameraShots.introSweep.target, duration: 2.2 }, 2.5)
  tl.to(car.root.rotation, { y: Math.PI * 0.12, duration: 2.2 }, 2.5)

  tl.to(lights.rim, { intensity: 1.0, duration: 1.4 }, 4.0)
  tl.to(camera.position, { ...cameraShots.hero.position, duration: 1.9 }, 4.8)
  tl.to(controls.target, { ...cameraShots.hero.target, duration: 1.9 }, 4.8)

  return {
    play: () => tl.play(0),
    restart: () => tl.restart(),
    timeline: tl,
    reset
  }
}
