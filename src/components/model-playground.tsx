import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { MOUSE, TOUCH } from 'three'
import { Model } from './model'

const initialState = {
  position: [1.4, -1.75, 0] as [number, number, number],
  rotation: [-0.3, -0.9, -0.2] as [number, number, number],
  scale: 0.9,
  camera: [0, 1.5, 7.5] as [number, number, number],
  lightIntensity: 1,
  preset: 'city' as const,
}

export function ModelPlayground() {
  return (
    <section className="pointer-events-none absolute inset-0 z-0">
      <Canvas shadows camera={{ position: initialState.camera, fov: 40 }}>
        <color attach="background" args={['#0b1020']} />
        <ambientLight intensity={initialState.lightIntensity * 0.3} />
        <directionalLight castShadow position={[6, 10, 8]} intensity={initialState.lightIntensity} />
        <Environment preset={initialState.preset} />
        <Model position={initialState.position} rotation={initialState.rotation} scale={initialState.scale} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={1}
          maxPolarAngle={1.9}
          mouseButtons={{ LEFT: MOUSE.ROTATE, MIDDLE: undefined, RIGHT: undefined }}
          touches={{ ONE: TOUCH.ROTATE, TWO: undefined }}
        />
      </Canvas>
    </section>
  )
}
