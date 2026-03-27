import { useState, type Dispatch, type KeyboardEvent, type SetStateAction } from 'react'
import { ProjectDetails } from './project-details'
import type { ProjectItem } from '../data/site'

type ProjectRowProps = ProjectItem & {
  setPreview: Dispatch<SetStateAction<string | null>>
  readMoreLabel: string
  arrowIcon: string
  closeIcon: string
  viewProjectLabel: string
  arrowUpIcon: string
}

export function ProjectRow({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview,
  readMoreLabel,
  arrowIcon,
  closeIcon,
  viewProjectLabel,
  arrowUpIcon,
}: ProjectRowProps) {
  const [isOpen, setIsOpen] = useState(false)
  const openDetails = () => setIsOpen(true)

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openDetails()
    }
  }

  return (
    <>
      <div
        className="flex-wrap items-center justify-between space-y-14 py-10 sm:flex sm:space-y-0"
        role="button"
        tabIndex={0}
        onClick={openDetails}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
      >
        <div>
          <p className="text-2xl">{title}</p>
          <div className="mt-2 flex gap-5 text-sand">
            {tags.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
        </div>
        <span className="hover-animation flex cursor-pointer items-center gap-1">
          {readMoreLabel}
          <img src={`/${arrowIcon}`} className="w-5" alt="" />
        </span>
      </div>
      <div className="h-px w-full bg-linear-to-r from-transparent via-neutral-700 to-transparent" />
      {isOpen && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setIsOpen(false)}
          closeIcon={closeIcon}
          viewProjectLabel={viewProjectLabel}
          arrowUpIcon={arrowUpIcon}
        />
      )}
    </>
  )
}
