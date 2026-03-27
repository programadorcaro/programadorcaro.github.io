import createGlobe from 'cobe'
import { useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import type { GlobeMarker } from '../data/site'

const MOVEMENT_DAMPING = 1400

const BASE_GLOBE = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1] as [number, number, number],
  markerColor: [1, 1, 1] as [number, number, number],
  glowColor: [1, 1, 1] as [number, number, number],
  markers: [] as GlobeMarker[],
}

type GlobeProps = {
  className?: string
  markers: GlobeMarker[]
}

export function Globe({ className, markers }: GlobeProps) {
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const config = useMemo(
    () => ({
      ...BASE_GLOBE,
      markers,
    }),
    [markers],
  )

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab'
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener('resize', onResize)
    onResize()

    const globe = createGlobe(canvas, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 0.005
        state.phi = phiRef.current + rs.get()
        state.width = widthRef.current * 2
        state.height = widthRef.current * 2
      },
    })

    requestAnimationFrame(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = '1'
    })

    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [rs, config])

  return (
    <div className={twMerge('mx-auto aspect-[1/1] w-full max-w-[600px]', className)}>
      <canvas
        className="size-[30rem] opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  )
}
