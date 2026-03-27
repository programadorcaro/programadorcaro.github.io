import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { ExperienceItem } from '../data/site'

type TimelineProps = {
  title: string
  items: ExperienceItem[]
}

export function Timeline({ title, items }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div className="relative" ref={containerRef}>
      <h2 className="text-heading">{title}</h2>
      <div ref={ref} className="relative pb-20">
        {items.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-10 md:pt-40">
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:max-w-sm md:flex-row lg:max-w-sm">
              <div className="absolute -left-[15px] flex h-10 w-10 items-center justify-center rounded-full bg-midnight">
                <div className="h-4 w-4 rounded-full border border-neutral-700 bg-neutral-800 p-2" />
              </div>
              <div className="hidden flex-col gap-2 text-xl font-bold text-neutral-300 md:flex md:pl-20 md:text-4xl">
                <h3>{item.date}</h3>
                <h3 className="text-3xl text-neutral-400">{item.title}</h3>
                <h3 className="text-3xl text-neutral-500">{item.job}</h3>
              </div>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <div className="mb-4 block text-left text-2xl font-bold text-neutral-300 md:hidden">
                <h3>{item.date}</h3>
                <h3>{item.job}</h3>
              </div>
              {item.contents.map((content, i) => (
                <p key={i} className="mb-3 font-normal text-neutral-400">
                  {content}
                </p>
              ))}
            </div>
          </div>
        ))}
        <div
          style={{ height: `${height}px` }}
          className="absolute left-1 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-1"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-purple-500 via-lavender/50 to-transparent from-[0%] via-[10%]"
          />
        </div>
      </div>
    </div>
  )
}
