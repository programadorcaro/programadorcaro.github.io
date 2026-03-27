import { Section } from '../components/section'
import { site } from '../data/site'

export function EducationAchievementsSection() {
  const { educationAchievements } = site

  return (
    <Section id="education">
      <h2 className="text-heading">{educationAchievements.sectionTitle}</h2>
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="grid-default-color rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-white">{educationAchievements.educationTitle}</h3>
          <div className="mt-6 space-y-6">
            {educationAchievements.education.map((item) => (
              <article key={`${item.institution}-${item.degree}`}>
                <p className="text-lg font-medium text-white">{item.degree}</p>
                <p className="text-base text-neutral-300">{item.institution}</p>
                <p className="text-sm text-neutral-400">{item.period}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid-special-color rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-white">{educationAchievements.achievementsTitle}</h3>
          <ul className="mt-6 space-y-4">
            {educationAchievements.achievements.map((achievement) => (
              <li key={achievement} className="rounded-lg border border-white/10 bg-primary/30 p-4 text-neutral-200">
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
