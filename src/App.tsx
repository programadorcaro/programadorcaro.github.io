import { lazy, Suspense, useEffect, useState } from 'react'
import { LazyMotion, domMax } from 'framer-motion'
import { HeroStaticBackdrop } from './components/hero-static-backdrop'
import { Header } from './components/header'
import { HeroText } from './components/hero-text'
import { Section } from './components/section'
import { site } from './data/site'

const AboutSection = lazy(async () => {
  const m = await import('./sections/about')
  return { default: m.AboutSection }
})
const ProjectsSection = lazy(async () => {
  const m = await import('./sections/projects')
  return { default: m.ProjectsSection }
})
const ExperiencesSection = lazy(async () => {
  const m = await import('./sections/experiences')
  return { default: m.ExperiencesSection }
})
const CompanyProjectsSection = lazy(async () => {
  const m = await import('./sections/company-projects')
  return { default: m.CompanyProjectsSection }
})
const EducationAchievementsSection = lazy(async () => {
  const m = await import('./sections/education-achievements')
  return { default: m.EducationAchievementsSection }
})
const CSSDrawingsSection = lazy(async () => {
  const m = await import('./sections/css-drawings-section')
  return { default: m.CSSDrawingsSection }
})
const TestimonialSection = lazy(async () => {
  const m = await import('./sections/testimonial')
  return { default: m.TestimonialSection }
})
const ContactSection = lazy(async () => {
  const m = await import('./sections/contact')
  return { default: m.ContactSection }
})
const FooterSection = lazy(async () => {
  const m = await import('./sections/footer')
  return { default: m.FooterSection }
})

function App() {
  const shouldLoadHero3d = useDeferredHero3dLoad()

  return (
    <main className="min-h-screen overflow-x-hidden bg-primary text-white">
      <LazyMotion features={domMax} strict>
        <Header brandName={site.header.brandName} nav={site.header.nav} />

        <Section
          id="home"
          className="relative isolate flex h-dvh md:h-[70dvh] w-full items-start justify-center overflow-hidden md:justify-start mt-0 md:mt-0"
        >
          <HeroStaticBackdrop />
          {shouldLoadHero3d ? (
            <Suspense fallback={null}>
              <LazyModelPlayground />
            </Suspense>
          ) : null}
          <HeroText hero={site.hero} ctas={site.footer.ctas} />
          <div className="inset-0 z-20" />
        </Section>
      </LazyMotion>

      <Suspense fallback={null}>
        <div className="container mx-auto max-w-7xl">
          <AboutSection />
          <ProjectsSection />
          <ExperiencesSection />
          <CompanyProjectsSection />
          <EducationAchievementsSection />
          <CSSDrawingsSection />
          <TestimonialSection />
          <ContactSection />
          <FooterSection />
        </div>
      </Suspense>
    </main>
  )
}

export default App

const LazyModelPlayground = lazy(async () => {
  const module = await import('./components/model-playground')
  return { default: module.ModelPlayground }
})

function useDeferredHero3dLoad() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    let cancelled = false

    const schedule3d = () => {
      if (cancelled) return
      const run = () => {
        if (!cancelled) setShouldLoad(true)
      }
      const id = window.requestIdleCallback?.(run, { timeout: 6000 })
      if (id === undefined) {
        timeoutId = window.setTimeout(run, 2000)
      } else {
        idleId = id
      }
    }

    const afterReady = () => {
      void document.fonts.ready.then(() => {
        if (!cancelled) schedule3d()
      })
    }

    if (document.readyState === 'complete') {
      afterReady()
    } else {
      window.addEventListener('load', afterReady, { once: true })
    }

    return () => {
      cancelled = true
      window.removeEventListener('load', afterReady)
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId)
      if (timeoutId !== undefined) clearTimeout(timeoutId)
    }
  }, [])

  return shouldLoad
}
