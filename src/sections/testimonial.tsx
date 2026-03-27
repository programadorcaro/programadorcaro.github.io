import { twMerge } from 'tailwind-merge'
import { Marquee } from '../components/marquee'
import { site } from '../data/site'
import type { TestimonialItem } from '../data/site'

function ReviewCard({ img, name, username, body }: TestimonialItem) {
  return (
    <figure
      className={twMerge(
        'relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border border-gray-50/[.1] bg-gradient-to-r bg-indigo to-storm p-4 hover:bg-royal hover-animation',
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full bg-white/10" width={32} height={32} alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">{name}</figcaption>
          <p className="text-xs font-medium text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}

export function TestimonialSection() {
  const items = site.testimonials.items
  const firstRow = items.slice(0, items.length / 2)
  const secondRow = items.slice(items.length / 2)

  return (
    <div className="mt-25 items-start md:mt-35">
      <h2 className="text-heading">{site.testimonials.sectionTitle}</h2>
      <div className="relative mt-12 flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-primary"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-primary"></div>
      </div>
    </div>
  )
}
