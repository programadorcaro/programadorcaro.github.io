import { twMerge } from 'tailwind-merge'
import type { ComponentProps } from 'react'

type MarqueeProps = ComponentProps<'div'> & {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  vertical?: boolean
  repeat?: number
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={twMerge(
        'group flex overflow-hidden p-2 [gap:var(--gap)] [--duration:40s] [--gap:1rem]',
        vertical ? 'flex-col' : 'flex-row',
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          className={twMerge(
            'flex shrink-0 justify-around [gap:var(--gap)]',
            vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
            reverse && '[animation-direction:reverse]',
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
