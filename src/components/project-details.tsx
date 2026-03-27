import { motion } from 'framer-motion'
import type { ProjectTag } from '../data/site'

type ProjectDetailsProps = {
  title: string
  description: string
  subDescription: string[]
  image: string
  tags: ProjectTag[]
  href: string
  closeModal: () => void
  closeIcon: string
  viewProjectLabel: string
  arrowUpIcon: string
}

export function ProjectDetails({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
  closeIcon,
  viewProjectLabel,
  arrowUpIcon,
}: ProjectDetailsProps) {
  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-hidden backdrop-blur-sm">
      <motion.div
        className="relative max-w-2xl rounded-2xl border border-white/10 bg-gradient-to-l from-midnight to-navy shadow-sm"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-5 top-5 rounded-sm bg-midnight p-2 hover:bg-gray-500"
        >
          <img src={`/${closeIcon}`} className="w-6" alt="Close" />
        </button>
        <img src={image} alt={title} className="w-full rounded-t-2xl" />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold text-white">{title}</h5>
          <p className="mb-3 font-normal text-neutral-400">{description}</p>
          {subDescription.map((subDesc, index) => (
            <p key={index} className="mb-3 font-normal text-neutral-400">
              {subDesc}
            </p>
          ))}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-3">
              {tags.map((tag) => (
                <img key={tag.id} src={tag.path} alt={tag.name} className="size-10 rounded-lg hover-animation" />
              ))}
            </div>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex cursor-pointer items-center gap-1 font-medium hover-animation"
              >
                {viewProjectLabel}
                <img src={`/${arrowUpIcon}`} className="size-4" alt="" />
              </a>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-1 font-medium text-neutral-500">
                {viewProjectLabel}
                <img src={`/${arrowUpIcon}`} className="size-4 opacity-50" alt="" />
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
