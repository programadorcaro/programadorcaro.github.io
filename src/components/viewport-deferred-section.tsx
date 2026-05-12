import { useEffect, useRef, useState, type ReactNode } from 'react'

type ViewportDeferredSectionProps = {
  children: ReactNode
  rootMargin?: string
}

export function ViewportDeferredSection({
  children,
  rootMargin = '0px 0px 40% 0px',
}: ViewportDeferredSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref} className={visible ? undefined : 'min-h-[min(42rem,80vh)]'}>
      {visible ? children : null}
    </div>
  )
}
