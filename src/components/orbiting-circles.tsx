import { twMerge } from 'tailwind-merge'
import { Children, type ReactNode } from 'react'

type OrbitingCirclesProps = {
  className?: string
  children?: ReactNode
  reverse?: boolean
  duration?: number
  radius?: number
  path?: boolean
  iconSize?: number
  speed?: number
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed
  const childArray = Children.toArray(children).filter(Boolean)
  return (
    <>
      {path && (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="pointer-events-none absolute inset-0 size-full">
          <circle className="stroke-1 stroke-white/10" cx="50%" cy="50%" r={radius} fill="none" />
        </svg>
      )}
      {Children.map(childArray, (child, index) => {
        const angle = (360 / childArray.length) * index
        return (
          <div
            key={index}
            style={
              {
                '--duration': calculatedDuration,
                '--radius': radius,
                '--angle': angle,
                '--icon-size': `${iconSize}px`,
              } as React.CSSProperties
            }
            className={twMerge(
              `absolute flex size-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center rounded-full ${reverse ? '[animation-direction:reverse]' : ''}`,
              className,
            )}
            {...props}
          >
            {child}
          </div>
        )
      })}
    </>
  )
}
