import { useRef } from 'react'
import { AboutFloatingCard } from '../components/about-floating-card'
import { CopyEmailButton } from '../components/copy-email-button'
import { FrameworksOrbit } from '../components/frameworks-orbit'
import { Globe } from '../components/globe'
import { Section } from '../components/section'
import { site } from '../data/site'

function assetUrl(path: string) {
  return path.startsWith('/') ? path : `/${path}`
}

export function AboutSection() {
  const { about, globe, copyEmail } = site
  const grid2Container = useRef<HTMLDivElement>(null)

  return (
    <Section id="about">
      <h2 className="text-heading">{about.sectionTitle}</h2>
      <div className="mt-12 grid grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-6">
        <div className="grid-1 grid-default-color flex items-end">
          <img src={assetUrl(about.intro.image)} className={about.intro.imageClass} alt="" />
          <div className="z-10">
            <p className="headtext">{about.intro.headline}</p>
            <p className="subtext">{about.intro.body}</p>
          </div>
          <div className="pointer-events-none absolute inset-x-0 -bottom-4 h-1/2 bg-gradient-to-t from-indigo sm:h-1/3" />
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
            <Globe markers={globe.markers} />
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
