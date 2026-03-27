import { motion } from 'framer-motion'
import type { FooterCtas, SiteContent } from '../data/site'
import { FlipWords } from './flip-words'

type HeroTextProps = {
  hero: SiteContent['hero']
  ctas: FooterCtas
}

const variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
}

export function HeroText({ hero, ctas }: HeroTextProps) {
  const words = hero.flipWords
  const { desktop, mobile } = hero

  return (
    <div className="z-10 mx-auto mt-[12vh] md:mt-[20vh] w-full max-w-7xl bg-clip-text text-center md:text-left">
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
        <HeroCtas ctas={ctas} className="mt-4 w-full max-w-2xl flex flex-col gap-3 sm:flex-row sm:gap-4" transitionDelay={2.1} />
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
            <FlipWords words={words} className="text-5xl font-bold text-white my-4" />
          </motion.div>
          <motion.p className="text-4xl font-black text-neutral-300" variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.8 }}>
            {mobile.lineAfterFlip}
          </motion.p>
        </div>
        <HeroCtas ctas={ctas} className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" transitionDelay={2.1} />
      </div>
    </div>
  )
}

function HeroCtas({
  ctas,
  className,
  transitionDelay,
}: {
  ctas: FooterCtas
  className: string
  transitionDelay: number
}) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ delay: transitionDelay }}
    >
      <a
        href={ctas.github.href}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-center text-base font-semibold text-primary transition-opacity hover:opacity-90"
      >
        <img src={ctas.github.icon} className="h-7 w-7 shrink-0" alt="" aria-hidden />
        {ctas.github.label}
      </a>
      <a
        href={ctas.linkedIn.href}
        target="_blank"
        rel="noreferrer"
        className="flex flex-1 items-center justify-center rounded-xl border border-white/15 bg-linear-to-b from-royal to-lavender px-6 py-4 text-center text-base font-semibold text-white shadow-md shadow-royal/25 transition-[opacity,filter] hover:bg-white hover:outline-1 brightness-[1.03]"
      >
        {ctas.linkedIn.label}
      </a>

    </motion.div>
  )
}
