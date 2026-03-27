import { site } from '../data/site'
import { Section } from '../components/section'
import { YoutubeCarousel } from '../components/youtube-carousel'

export function FooterSection() {
  const { footer, socials } = site

  return (
    <Section className="flex flex-col gap-6 pb-6 text-sm text-neutral-400">
      <div className="mb-4 h-px w-full bg-linear-to-r from-transparent via-neutral-700 to-transparent" />

      <div className="w-full">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-white">{footer.latestVideosTitle}</h3>
          <a href={footer.youtubeChannelUrl} target="_blank" rel="noreferrer" className="text-sm text-neutral-300 hover:text-white">
            {footer.visitChannelLabel}
          </a>
        </div>
        <YoutubeCarousel videos={footer.youtubeVideos} />
      </div>

      <div className="grid w-full gap-2 md:grid-cols-2">
        {footer.contactLinks.map((contact) => (
          <a
            key={contact.href}
            href={contact.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-white/10 px-3 py-2 text-neutral-300 transition-colors hover:text-white"
          >
            <span className="font-medium text-white">{contact.label}: </span>
            {contact.value}
          </a>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {footer.legalLinks.map((link, index) => (
            <span key={link.href + link.label} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">|</span> : null}
              <a href={link.href} className="hover:text-white">
                {link.label}
              </a>
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {socials.map((social, index) => (
            <a href={social.href || '#'} key={`${social.name}-${index}`} target="_blank" rel="noreferrer">
              <img src={social.icon} className="h-5 w-5" alt={social.name} />
            </a>
          ))}
        </div>
      </div>
      <p>{footer.copyright}</p>
    </Section>
  )
}
