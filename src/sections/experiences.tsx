import { Timeline } from '../components/timeline'
import { Section } from '../components/section'
import { site } from '../data/site'

export function ExperiencesSection() {
  const { experiences } = site
  return (
    <Section className="w-full">
      <Timeline title={experiences.sectionTitle} items={experiences.items} />
    </Section>
  )
}
