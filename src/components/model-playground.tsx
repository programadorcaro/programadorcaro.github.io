import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import type { Group } from 'three'
import { MOUSE, TOUCH } from 'three'

const desktopState = {
  position: [1.4, -1.75, 0] as [number, number, number],
  rotation: [-0.3, -0.9, -0.2] as [number, number, number],
  scale: 0.9,
  camera: [0, 1.5, 7.5] as [number, number, number],
  lightIntensity: 1,
  preset: 'city' as const,
}

const mobileState = {
  position: [0.3, -1.15, 0] as [number, number, number],
  rotation: [-0.3, -0.9, -0.2] as [number, number, number],
  scale: 0.9,
  camera: [0, 1.5, 7.5] as [number, number, number],
  lightIntensity: 1,
  preset: 'city' as const,
}

const HERO_CLEAR = '#0b1020'

export function ModelPlayground() {
  const isMobile = useIsMobile()
  const prefersReducedMotion = usePrefersReducedMotion()
  const shouldLoadModel = useDeferredModelLoad()
  const activeState = isMobile ? mobileState : desktopState
  const frameLoopMode = isMobile || prefersReducedMotion ? 'demand' : 'always'
  const [contextLost, setContextLost] = useState(false)
  const onContextLost = useCallback(() => {
    setContextLost(true)
  }, [])

  useEffect(() => {
    useGLTF.preload('/models/hero.glb')
  }, [])

  if (contextLost) {
    return null
  }

  return (
    <section className="pointer-events-none absolute inset-0 z-[1] bg-[#0b1020]" style={{ touchAction: 'pan-y' }}>
      <Canvas
        className="h-full w-full [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full [&>canvas]:bg-[#0b1020]"
        dpr={isMobile ? [1, 1.05] : [1, 1.15]}
        gl={{ alpha: false, antialias: false, powerPreference: 'default' }}
        shadows={false}
        frameloop={frameLoopMode}
        performance={{ min: 0.6 }}
        camera={{ position: activeState.camera, fov: 40 }}
        onCreated={({ gl }) => {
          gl.setClearColor(HERO_CLEAR, 1)
          gl.domElement.style.background = HERO_CLEAR
        }}
      >
        <ContextLostGuard onLost={onContextLost} />
        <color attach="background" args={[HERO_CLEAR]} />
        <ambientLight intensity={activeState.lightIntensity * 0.3} />
        <directionalLight castShadow position={[6, 10, 8]} intensity={activeState.lightIntensity} />
        {!isMobile && (
          <Suspense fallback={null}>
            <Environment preset={activeState.preset} />
          </Suspense>
        )}
        <AnimatedModel isMobile={isMobile} state={activeState} shouldLoadModel={shouldLoadModel} frameLoopMode={frameLoopMode} />
        {!isMobile && (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate
            autoRotate={!prefersReducedMotion}
            autoRotateSpeed={0.5}
            minPolarAngle={1}
            maxPolarAngle={1.9}
            mouseButtons={{ LEFT: MOUSE.ROTATE, MIDDLE: undefined, RIGHT: undefined }}
            touches={{ ONE: TOUCH.ROTATE, TWO: undefined }}
          />
        )}
      </Canvas>
    </section>
  )
}

function ContextLostGuard({ onLost }: { onLost: () => void }) {
  const gl = useThree((s) => s.gl)
  useLayoutEffect(() => {
    const el = gl.domElement
    const handleLost = (event: Event) => {
      event.preventDefault()
      onLost()
    }
    el.addEventListener('webglcontextlost', handleLost)
    return () => el.removeEventListener('webglcontextlost', handleLost)
  }, [gl, onLost])
  return null
}

const LazyModel = lazy(async () => {
  const module = await import('./model')
  return { default: module.Model }
})

function AnimatedModel({
  isMobile,
  state,
  shouldLoadModel,
  frameLoopMode,
}: {
  isMobile: boolean
  state: typeof desktopState
  shouldLoadModel: boolean
  frameLoopMode: 'always' | 'demand' | 'never'
}) {
  const groupRef = useRef<Group>(null)
  const progress = useMobileScrollProgress(isMobile)
  const targets = useMemo(
    () => ({
      position: [
        state.position,
        [state.position[0] - 0.35, state.position[1] - 0.45, state.position[2]],
        [state.position[0] - 0.6, state.position[1] - 0.85, state.position[2]],
      ] as [number, number, number][],
      rotation: [
        state.rotation,
        [state.rotation[0] + 0.08, state.rotation[1] + 0.28, state.rotation[2]],
        [state.rotation[0] + 0.16, state.rotation[1] + 0.44, state.rotation[2]],
      ] as [number, number, number][],
    }),
    [state.position, state.rotation],
  )

  useFrame((rootState) => {
    const group = groupRef.current
    if (!group) return

    if (!isMobile) {
      group.position.set(state.position[0], state.position[1], state.position[2])
      group.rotation.set(state.rotation[0], state.rotation[1], state.rotation[2])
    } else {
      const targetPosition = interpolateKeyframes(targets.position, progress)
      const targetRotation = interpolateKeyframes(targets.rotation, progress)

      group.position.x += (targetPosition[0] - group.position.x) * 0.08
      group.position.y += (targetPosition[1] - group.position.y) * 0.08
      group.position.z += (targetPosition[2] - group.position.z) * 0.08

      group.rotation.x += (targetRotation[0] - group.rotation.x) * 0.08
      group.rotation.y += (targetRotation[1] - group.rotation.y) * 0.08
      group.rotation.z += (targetRotation[2] - group.rotation.z) * 0.08
    }

    if (frameLoopMode === 'demand') {
      rootState.invalidate()
    }
  })

  return (
    <group ref={groupRef} position={state.position} rotation={state.rotation}>
      {shouldLoadModel && (
        <Suspense fallback={null}>
          <LazyModel scale={state.scale} />
        </Suspense>
      )}
    </group>
  )
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const onChange = () => setIsMobile(mediaQuery.matches)

    onChange()
    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

function useMobileScrollProgress(isMobile: boolean) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isMobile) {
      return
    }

    let frame = 0
    let previousProgress = -1
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const range = Math.max(window.innerHeight * 0.7, 1)
        const nextProgress = Math.min(Math.max(window.scrollY / range, 0), 1)
        if (Math.abs(nextProgress - previousProgress) < 0.01) return
        previousProgress = nextProgress
        setProgress(nextProgress)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [isMobile])

  return isMobile ? progress : 0
}

function useDeferredModelLoad() {
  const [shouldLoadModel, setShouldLoadModel] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const scheduleLoad = () => setShouldLoadModel(true)
    const idleCallback = window.requestIdleCallback?.(scheduleLoad, { timeout: 4000 })
    if (!idleCallback) {
      const timer = window.setTimeout(scheduleLoad, 1600)
      return () => window.clearTimeout(timer)
    }

    return () => {
      window.cancelIdleCallback?.(idleCallback)
    }
  }, [])

  return shouldLoadModel
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setPrefersReducedMotion(mediaQuery.matches)
    onChange()
    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  return prefersReducedMotion
}

function interpolateKeyframes(values: [number, number, number][], progress: number): [number, number, number] {
  if (values.length === 1) return values[0]

  const scaled = progress * (values.length - 1)
  const index = Math.floor(scaled)
  const localProgress = scaled - index
  const start = values[Math.min(index, values.length - 1)]
  const end = values[Math.min(index + 1, values.length - 1)]

  return [
    start[0] + (end[0] - start[0]) * localProgress,
    start[1] + (end[1] - start[1]) * localProgress,
    start[2] + (end[2] - start[2]) * localProgress,
  ]
}
