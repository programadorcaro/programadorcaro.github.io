import { Section } from '../components/section'
import { site } from '../data/site'

export function CompanyProjectsSection() {
  const { companyProjects } = site

  return (
    <Section id="projects" className="w-full">
      <h2 className="text-heading">{companyProjects.sectionTitle}</h2>
      <p className="mt-4 max-w-3xl text-neutral-400">{companyProjects.sectionDescription}</p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {companyProjects.items.map((project) => (
          <article key={project.id} className="overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-midnight to-navy">
            <img src={project.screenshot} alt={project.title} className="h-48 w-full object-cover" />
            <div className="space-y-4 p-5">
              <div className="space-y-1">
                <p className="text-sm text-neutral-400">{project.company}</p>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-sm text-neutral-500">
                  {project.role} · {project.period}
                </p>
              </div>
              <p className="text-sm text-neutral-300">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={`${project.id}-${tag.id}`} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-2 py-1 text-xs text-neutral-300">
                    <img src={tag.path} alt={tag.name} className="size-4 rounded-sm" />
                    {tag.name}
                  </span>
                ))}
              </div>
              {project.href ? (
                <a href={project.href} target="_blank" rel="noreferrer" className="inline-flex text-sm font-medium text-sand hover:underline">
                  {companyProjects.viewProjectLabel}
                </a>
              ) : (
                <span className="inline-flex text-sm text-neutral-500">{companyProjects.linkPendingLabel}</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
