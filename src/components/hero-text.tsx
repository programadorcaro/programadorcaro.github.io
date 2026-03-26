import { motion } from 'framer-motion'
import { FlipWords } from './flip-words'

const words = ['Secure', 'Modern', 'Scalable']
const variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
}

export function HeroText() {
  return (
    <div className="z-10 mt-20 rounded-3xl bg-clip-text text-center md:mt-40 md:text-left">
      <div className="c-space hidden flex-col md:flex">
        <motion.h1 className="text-4xl font-medium" variants={variants} initial="hidden" animate="visible" transition={{ delay: 1 }}>
          Hi I&apos;m Ali
        </motion.h1>
        <div className="flex flex-col items-start">
          <motion.p className="text-5xl font-medium text-neutral-300" variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.2 }}>
            A Developer <br /> Dedicated to Crafting
          </motion.p>
          <motion.div variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.5 }}>
            <FlipWords words={words} className="text-8xl font-black text-white" />
          </motion.div>
          <motion.p className="text-4xl font-medium text-neutral-300" variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.8 }}>
            Web Solutions
          </motion.p>
        </div>
      </div>

      <div className="flex flex-col space-y-6 md:hidden">
        <motion.p className="text-4xl font-medium" variants={variants} initial="hidden" animate="visible" transition={{ delay: 1 }}>
          Hi, I&apos;m Ali
        </motion.p>
        <div>
          <motion.p className="text-5xl font-black text-neutral-300" variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.2 }}>
            Building
          </motion.p>
          <motion.div variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.5 }}>
            <FlipWords words={words} className="text-7xl font-bold text-white" />
          </motion.div>
          <motion.p className="text-4xl font-black text-neutral-300" variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.8 }}>
            Web Applications
          </motion.p>
        </div>
      </div>
    </div>
  )
}
