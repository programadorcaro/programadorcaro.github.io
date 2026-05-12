import { useEffect, useState } from 'react'
import { Section } from '../components/section'
import { site, type CompanyProjectItem } from '../data/site'

const narrowQuery = '(max-width: 767px)'

function ProjectCard({
  project,
  viewProjectLabel,
  linkPendingLabel,
}: {
  project: CompanyProjectItem
  viewProjectLabel: string
  linkPendingLabel: string
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-midnight to-navy">
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
            {viewProjectLabel}
          </a>
        ) : (
          <span className="inline-flex text-sm text-neutral-500">{linkPendingLabel}</span>
        )}
      </div>
    </article>
  )
}

export function CompanyProjectsSection() {
  const { companyProjects } = site
  const [isNarrow, setIsNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(narrowQuery).matches,
  )
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(narrowQuery)
    const sync = () => setIsNarrow(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const limit = isNarrow ? 1 : 2
  const { items } = companyProjects
  const head = items.slice(0, limit)
  const tail = items.slice(limit)
  const hasMore = tail.length > 0
  const { viewProjectLabel, linkPendingLabel } = companyProjects

  return (
    <Section id="projects" className="w-full">
      <h2 className="text-heading">{companyProjects.sectionTitle}</h2>
      <p className="mt-4 max-w-3xl text-neutral-400">{companyProjects.sectionDescription}</p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {head.map((project) => (
          <ProjectCard key={project.id} project={project} viewProjectLabel={viewProjectLabel} linkPendingLabel={linkPendingLabel} />
        ))}
        {hasMore ? (
          <div
            className={`col-span-full grid min-h-0 transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="grid gap-6 md:grid-cols-2">
                {tail.map((project) => (
                  <ProjectCard key={project.id} project={project} viewProjectLabel={viewProjectLabel} linkPendingLabel={linkPendingLabel} />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? companyProjects.seeLessLabel : companyProjects.seeMoreLabel}
          </button>
        </div>
      ) : null}
    </Section>
  )
}
