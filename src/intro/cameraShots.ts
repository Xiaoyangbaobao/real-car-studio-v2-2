export const cameraShots = {
  introClose: {
    position: { x: 1.15, y: 0.82, z: 2.5 },
    target: { x: 0.6, y: 0.75, z: 0 }
  },
  introFront: {
    position: { x: 2.6, y: 1.02, z: 4.9 },
    target: { x: 0.12, y: 0.85, z: 0 }
  },
  introSweep: {
    position: { x: 4.25, y: 1.26, z: 6.35 },
    target: { x: 0, y: 0.92, z: 0 }
  },
  hero: {
    position: { x: 3.7, y: 1.42, z: 7.55 },
    target: { x: 0, y: 0.95, z: 0 }
  },
  front: {
    position: { x: 0, y: 1.15, z: 7.2 },
    target: { x: 0, y: 0.95, z: 0 }
  },
  side: {
    position: { x: 7.0, y: 1.2, z: 0.1 },
    target: { x: 0, y: 0.95, z: 0 }
  },
  rear: {
    position: { x: 0, y: 1.18, z: -7.0 },
    target: { x: 0, y: 0.92, z: 0 }
  }
} as const
