import { motion } from 'framer-motion'
import type { RefObject } from 'react'
import type { FloatingCard } from '../data/site'

type AboutFloatingCardProps = {
  card: FloatingCard
  containerRef: RefObject<HTMLDivElement | null>
}

export function AboutFloatingCard({ card, containerRef }: AboutFloatingCardProps) {
  const style = {
    rotate: card.style.rotate,
    ...(card.style.top !== undefined ? { top: card.style.top } : {}),
    ...(card.style.left !== undefined ? { left: card.style.left } : {}),
    ...(card.style.bottom !== undefined ? { bottom: card.style.bottom } : {}),
  }

  if (card.kind === 'image') {
    return (
      <motion.img
        className="absolute w-15 cursor-grab"
        src={card.image}
        alt=""
        style={style}
        whileHover={{ scale: 1.05 }}
        drag
        dragConstraints={containerRef}
        dragElastic={1}
      />
    )
  }

  return (
    <motion.div
      className="absolute w-48 cursor-grab rounded-full bg-storm px-1 py-4 text-center text-xl font-extralight ring ring-gray-700"
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
    >
      {card.text}
    </motion.div>
  )
}
