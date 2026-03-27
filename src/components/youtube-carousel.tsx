import useEmblaCarousel from 'embla-carousel-react'
import type { YoutubeVideoItem } from '../data/site'

const GAP_PX = 16

type YoutubeCarouselProps = {
  videos: YoutubeVideoItem[]
}

export function YoutubeCarousel({ videos }: YoutubeCarouselProps) {
  const validVideos = videos.filter((video) => isYoutubeVideoId(video.id))

  const [emblaRef] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: false,
    },
    [],
  )

  if (validVideos.length === 0) {
    return (
      <p className="text-sm text-neutral-400">
        Add valid YouTube video IDs in <code>src/data/site.ts</code> to render the carousel.
      </p>
    )
  }

  return (
    <div className="w-full" style={{ ['--carousel-gap' as string]: `${GAP_PX}px` }}>
      <div className="overflow-hidden" ref={emblaRef} aria-label="YouTube videos carousel">
        <div className="flex touch-pan-y">
          {validVideos.map((video, index) => (
            <div
              key={video.id}
              className={`youtube-carousel-slide min-w-0 shrink-0 grow-0 ${index < validVideos.length - 1 ? 'me-4' : ''}`}
            >
              <article className="overflow-hidden rounded-xl border border-white/10 bg-midnight">
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <p className="px-4 py-3 text-sm text-neutral-200">{video.title}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function isYoutubeVideoId(value: string) {
  return /^[A-Za-z0-9_-]{11}$/.test(value)
}
