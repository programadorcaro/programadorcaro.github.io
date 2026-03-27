import { useState, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ProjectRow } from '../components/project-row'
import { Section } from '../components/section'
import { site } from '../data/site'

export function ProjectsSection() {
  const { projects } = site
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 10, stiffness: 50 })
  const springY = useSpring(y, { damping: 10, stiffness: 50 })
  const [preview, setPreview] = useState<string | null>(null)

  const handleMouseMove = (e: MouseEvent) => {
    x.set(e.clientX + 20)
    y.set(e.clientY + 20)
  }

  return (
    <Section id="work" onMouseMove={handleMouseMove} className="relative">
      <h2 className="text-heading">{projects.sectionTitle}</h2>
      <div className="mt-12 h-px w-full bg-linear-to-r from-transparent via-neutral-700 to-transparent" />
      {projects.items.map((project) => (
        <ProjectRow
          key={project.id}
          {...project}
          setPreview={setPreview}
          readMoreLabel={projects.readMore}
          arrowIcon={projects.arrowIcon}
          closeIcon={projects.closeIcon}
          viewProjectLabel={projects.viewProject}
          arrowUpIcon={projects.arrowUpIcon}
        />
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
