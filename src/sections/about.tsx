import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { AboutFloatingCard } from '../components/about-floating-card'
import { CopyEmailButton } from '../components/copy-email-button'
import { FrameworksOrbit } from '../components/frameworks-orbit'
import { Section } from '../components/section'
import { site, type GlobeMarker } from '../data/site'

const LazyGlobe = lazy(async () => {
  const m = await import('../components/globe')
  return { default: m.Globe }
})

function GlobeWhenVisible({ markers }: { markers: GlobeMarker[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin: '120px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative w-full min-w-[12rem] max-w-[min(100%,24rem)]">
      {show ? (
        <Suspense
          fallback={<div className="mx-auto aspect-square w-full max-w-[20rem] rounded-full bg-neutral-900/35" aria-hidden />}
        >
          <LazyGlobe markers={markers} />
        </Suspense>
      ) : (
        <div className="mx-auto aspect-square w-full max-w-[20rem] min-h-[12rem] rounded-full bg-neutral-900/20" aria-hidden />
      )}
    </div>
  )
}

function assetUrl(path: string) {
  return path.startsWith('/') ? path : `/${path}`
}

export function AboutSection() {
  const { about, globe, copyEmail } = site
  const grid2Container = useRef<HTMLDivElement>(null)

  return (
    <Section id="about">
      <h2 className="text-heading">{about.sectionTitle}</h2>
      <div className="mt-12 grid grid-cols-1 gap-4 md:auto-rows-[minmax(18rem,auto)] md:grid-cols-6">
        <div className="grid-1 grid-default-color flex flex-col justify-end">
          <img
            src={assetUrl(about.intro.image)}
            className={about.intro.imageClass}
            alt=""
            width={1328}
            height={813}
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-x-0 -bottom-4 h-1/2 bg-linear-to-t from-indigo sm:h-1/3" />
          <div className="relative z-10 mt-auto flex w-full flex-col gap-2 bg-black/20 p-6 backdrop-blur-lg">
            <p className="text-2xl font-bold">{about.intro.headline}</p>
            <p className="text-sm text-white/76">{about.intro.body}</p>
          </div>
        </div>

        <div className="grid-2 grid-default-color">
          <div ref={grid2Container} className="relative flex h-full w-full items-center justify-center">
            <p className="flex items-end text-5xl text-gray-500">{about.codeCraftLabel}</p>
            {about.floatingCards.map((card, i) => (
              <AboutFloatingCard key={i} card={card} containerRef={grid2Container} />
            ))}
          </div>
        </div>

        <div className="grid-3 grid-black-color">
          <div className="z-10 w-[50%]">
            <p className="headtext">{about.timezone.title}</p>
            <p className="subtext">{about.timezone.body}</p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <GlobeWhenVisible markers={globe.markers} />
          </figure>
        </div>

        <div className="grid-4 grid-special-color">
          <div className="flex size-full flex-col items-center justify-center gap-4">
            <p className="headtext text-center">{about.ctaProject.title}</p>
            <CopyEmailButton copyEmail={copyEmail} />
          </div>
        </div>

        <div className="grid-5 grid-default-color">
          <div className="z-10 w-[50%]">
            <p className="headtext">{about.techStack.title}</p>
            <p className="subtext">{about.techStack.body}</p>
          </div>
          <div className="absolute inset-y-0 start-[50%] h-full w-full md:inset-y-9 md:scale-125">
            <FrameworksOrbit skills={about.orbitSkills} />
          </div>
        </div>
      </div>
    </Section>
  )
}
