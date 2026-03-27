import { Header } from './components/header'
import { HeroText } from './components/hero-text'
import { ModelPlayground } from './components/model-playground'
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

function App() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-primary text-white">
      <Header brandName={site.header.brandName} nav={site.header.nav} />

      <Section
        id="home"
        className="relative isolate flex h-[70dvh] w-full items-start justify-center overflow-hidden md:justify-start mt-0 md:mt-0"
      >
        <ModelPlayground />
        <HeroText hero={site.hero} ctas={site.footer.ctas} />
        <div className="inset-0 z-20" />
      </Section>

      <div className="container mx-auto max-w-7xl">
        <AboutSection />
        <ProjectsSection />
        <ExperiencesSection />
        <CompanyProjectsSection />
        <EducationAchievementsSection />
        <TestimonialSection />
        <ContactSection />
        <FooterSection />
      </div>
    </main>
  )
}

export default App
