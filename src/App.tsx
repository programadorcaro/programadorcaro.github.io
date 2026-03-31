import { lazy, Suspense, useEffect, useState } from 'react'
import { Header } from './components/header'
import { HeroText } from './components/hero-text'
import { Section } from './components/section'
import { site } from './data/site'
import { AboutSection } from './sections/about'
import { ContactSection } from './sections/contact'
import { CompanyProjectsSection } from './sections/company-projects'
import { EducationAchievementsSection } from './sections/education-achievements'
import { ExperiencesSection } from './sections/experiences'
import { FooterSection } from './sections/footer'
import { ProjectsSection } from './sections/projects'
import { TestimonialSection } from './sections/testimonial'
import { CSSDrawingsSection } from './sections/css-drawings-section'

function App() {
  const shouldLoadHero3d = useDeferredHero3dLoad()

  return (
    <main className="min-h-screen overflow-x-hidden bg-primary text-white">
      <Header brandName={site.header.brandName} nav={site.header.nav} />

      <Section
        id="home"
        className="relative isolate flex h-dvh md:h-[70dvh] w-full items-start justify-center overflow-hidden md:justify-start mt-0 md:mt-0"
      >
        {shouldLoadHero3d ? (
          <Suspense fallback={<HeroModelFallback />}>
            <LazyModelPlayground />
          </Suspense>
        ) : (
          <HeroModelFallback />
        )}
        <HeroText hero={site.hero} ctas={site.footer.ctas} />
        <div className="inset-0 z-20" />
      </Section>

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
    </main>
  )
}

export default App

const LazyModelPlayground = lazy(async () => {
  const module = await import('./components/model-playground')
  return { default: module.ModelPlayground }
})

function HeroModelFallback() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_72%_30%,rgba(122,87,219,0.34),rgba(3,4,18,0.9)_35%,#030412_70%)]"
    />
  )
}

function useDeferredHero3dLoad() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const scheduleLoad = () => setShouldLoad(true)
    const idleCallback = window.requestIdleCallback?.(scheduleLoad, { timeout: 1200 })
    if (!idleCallback) {
      const timer = window.setTimeout(scheduleLoad, 400)
      return () => window.clearTimeout(timer)
    }

    return () => {
      window.cancelIdleCallback?.(idleCallback)
    }
  }, [])

  return shouldLoad
}
