import { motion } from 'framer-motion'
import type { SiteContent } from '../data/site'
import { FlipWords } from './flip-words'

type HeroTextProps = {
  hero: SiteContent['hero']
}

const variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
}

export function HeroText({ hero }: HeroTextProps) {
  const words = hero.flipWords
  const { desktop, mobile } = hero

  return (
    <div className="z-10 mx-auto mt-[20vh] w-full max-w-7xl bg-clip-text text-center md:text-left">
      <div className="hidden flex-col gap-6 md:flex">
        <motion.h1 className="text-4xl font-medium" variants={variants} initial="hidden" animate="visible" transition={{ delay: 1 }}>
          {desktop.greeting}
        </motion.h1>
        <div className="flex flex-col items-start">
          <motion.p className="text-5xl font-medium text-neutral-300" variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.2 }}>
            {desktop.lineBeforeFlip} <br /> {desktop.lineBreak}
          </motion.p>
          <motion.div variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.5 }}>
            <FlipWords words={words} className="text-8xl font-black text-white" />
          </motion.div>
          <motion.p className="mt-2 text-4xl font-medium text-neutral-300" variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.8 }}>
            {desktop.lineAfterFlip}
          </motion.p>
        </div>
      </div>

      <div className="flex flex-col space-y-6 md:hidden">
        <motion.p className="text-4xl font-medium" variants={variants} initial="hidden" animate="visible" transition={{ delay: 1 }}>
          {mobile.greeting}
        </motion.p>
        <div>
          <motion.p className="text-5xl font-black text-neutral-300" variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.2 }}>
            {mobile.lineBeforeFlip}
          </motion.p>
          <motion.div variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.5 }}>
            <FlipWords words={words} className="text-7xl font-bold text-white" />
          </motion.div>
          <motion.p className="text-4xl font-black text-neutral-300" variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.8 }}>
            {mobile.lineAfterFlip}
          </motion.p>
        </div>
      </div>
    </div>
  )
}
