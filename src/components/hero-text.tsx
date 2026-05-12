import { m } from 'framer-motion'
import { useMemo } from 'react'
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
  const isNarrow = useMemo(
    () => (typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false),
    [],
  )
  const d1 = isNarrow ? 0 : 1
  const d12 = isNarrow ? 0.06 : 1.2
  const d15 = isNarrow ? 0.12 : 1.5
  const d18 = isNarrow ? 0.18 : 1.8
  const dCta = isNarrow ? 0.28 : 2.1

  return (
    <div className="z-10 mx-auto mt-[12vh] md:mt-[20vh] w-full max-w-7xl bg-clip-text text-center md:text-left">
      <div className="hidden flex-col gap-6 md:flex md:w-min">
        <m.h1
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: d1 }}
        >
          {desktop.greeting}
        </m.h1>
        <div className="flex w-min flex-col items-start">
          <m.p
            className="text-5xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: d12 }}
          >
            {desktop.lineBeforeFlip} <br /> {desktop.lineBreak}
          </m.p>
          <m.div variants={variants} initial="hidden" animate="visible" transition={{ delay: d15 }}>
            <FlipWords words={words} className="text-8xl font-black text-white" />
          </m.div>
          <m.p
            className="mt-2 text-4xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: d18 }}
          >
            {desktop.lineAfterFlip}
          </m.p>
        </div>
        <HeroCtas
          ctas={ctas}
          className="mt-4 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:gap-4"
          transitionDelay={dCta}
        />
      </div>

      <div className="flex flex-col items-center gap-6 text-center md:hidden">
        <m.p
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: d1 }}
        >
          {mobile.greeting}
        </m.p>
        <div className="flex w-full max-w-full flex-col items-center text-center">
          <m.p
            className="text-5xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: d12 }}
          >
            {mobile.lineBeforeFlip}
          </m.p>
          <m.div className="w-full" variants={variants} initial="hidden" animate="visible" transition={{ delay: d15 }}>
            <FlipWords center words={words} className="my-4 text-5xl font-bold text-white" />
          </m.div>
          <m.p
            className="text-4xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: d18 }}
          >
            {mobile.lineAfterFlip}
          </m.p>
        </div>
        <HeroCtas
          ctas={ctas}
          className="mt-2 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:gap-4"
          transitionDelay={dCta}
        />
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
    <m.div
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
        <img
          src={ctas.github.icon}
          width={28}
          height={28}
          decoding="async"
          fetchPriority="high"
          className="h-7 w-7 shrink-0"
          alt=""
          aria-hidden
        />
        {ctas.github.label}
      </a>
      <a
        href={ctas.linkedIn.href}
        target="_blank"
        rel="noreferrer"
        className="flex flex-1 items-center justify-center rounded-xl border border-white/15 bg-linear-to-b from-royal to-lavender px-6 py-4 text-center text-base font-semibold text-white shadow-md shadow-royal/25 transition-[opacity,filter] hover:bg-white hover:outline-1 brightness-[1.03] md:max-w-[70%]"
      >
        {ctas.linkedIn.label}
      </a>
    </m.div>
  )
}
