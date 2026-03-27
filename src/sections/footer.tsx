import { site } from '../data/site'
import { Section } from '../components/section'

export function FooterSection() {
  const { footer, socials } = site

  return (
    <Section className="flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400">
      <div className="mb-4 h-px w-full bg-linear-to-r from-transparent via-neutral-700 to-transparent" />
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
      <p>{footer.copyright}</p>
    </Section>
  )
}
