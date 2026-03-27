import { useState, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ProjectRow } from '../components/project-row'
import { Section } from '../components/section'
import { site } from '../data/site'

export function ProjectsSection() {
  const { projects, companyProjects } = site
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 10, stiffness: 50 })
  const springY = useSpring(y, { damping: 10, stiffness: 50 })
  const [preview, setPreview] = useState<string | null>(null)
  const projectsByCompany = new Map(companyProjects.items.map((item) => [item.company, [] as typeof companyProjects.items]))

  for (const project of companyProjects.items) {
    const list = projectsByCompany.get(project.company)
    if (list) list.push(project)
    else projectsByCompany.set(project.company, [project])
  }

  const handleMouseMove = (e: MouseEvent) => {
    x.set(e.clientX + 20)
    y.set(e.clientY + 20)
  }

  return (
    <Section id="work" onMouseMove={handleMouseMove} className="relative">
      <h2 className="text-heading">{projects.sectionTitle}</h2>
      <div className="mt-12 h-px w-full bg-linear-to-r from-transparent via-neutral-700 to-transparent" />
      {projects.items.map((project) => (
        <div key={project.id}>
          <ProjectRow
            {...project}
            setPreview={setPreview}
            readMoreLabel={projects.readMore}
            arrowIcon={projects.arrowIcon}
            closeIcon={projects.closeIcon}
            viewProjectLabel={projects.viewProject}
            arrowUpIcon={projects.arrowUpIcon}
          />
          <div className="ml-8 mb-6 space-y-3">
            {(projectsByCompany.get(project.company) ?? []).map((companyProject) => (
              <div
                key={companyProject.id}
                className="cursor-pointer rounded-md border border-white/10 px-4 py-3 hover:bg-white/5"
                role="button"
                tabIndex={0}
                onMouseEnter={() => setPreview(project.image)}
                onMouseLeave={() => setPreview(null)}
                onClick={() => {
                  if (companyProject.href) window.open(companyProject.href, '_blank', 'noopener,noreferrer')
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    if (companyProject.href) window.open(companyProject.href, '_blank', 'noopener,noreferrer')
                  }
                }}
              >
                <p className="text-base font-medium">{companyProject.title}</p>
                <p className="mt-1 text-sm text-neutral-400">{companyProject.description}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-sand">
                  {companyProject.tags.slice(0, 6).map((tag) => (
                    <span key={`${companyProject.id}-${tag.id}`}>{tag.name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {preview && (
        <motion.img
          className="pointer-events-none fixed left-0 top-0 z-50 h-56 w-80 rounded-lg object-cover shadow-lg"
          src={preview}
          style={{ x: springX, y: springY }}
          alt=""
        />
      )}
    </Section>
  )
}
