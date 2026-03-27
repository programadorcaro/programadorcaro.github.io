import raw from './site.json'

export type NavItem = {
  label: string
  href: string
}

export type ProjectTag = {
  id: number
  name: string
  path: string
}

export type ProjectItem = {
  id: number
  title: string
  description: string
  subDescription: string[]
  href: string
  logo: string
  image: string
  tags: ProjectTag[]
}

export type ExperienceItem = {
  title: string
  job: string
  date: string
  contents: string[]
}

export type TestimonialItem = {
  name: string
  username: string
  body: string
  img: string
}

export type SocialLink = {
  name: string
  href: string
  icon: string
}

export type FloatingCardStyle = {
  rotate: string
  top?: string
  left?: string
  bottom?: string
}

export type FloatingCard =
  | { kind: 'text'; text: string; style: FloatingCardStyle }
  | { kind: 'image'; image: string; style: FloatingCardStyle }

export type GlobeMarker = {
  location: [number, number]
  size: number
}

export type SiteContent = {
  header: {
    brandName: string
    nav: NavItem[]
  }
  hero: {
    flipWords: string[]
    desktop: {
      greeting: string
      lineBeforeFlip: string
      lineBreak: string
      lineAfterFlip: string
    }
    mobile: {
      greeting: string
      lineBeforeFlip: string
      lineAfterFlip: string
    }
  }
  about: {
    sectionTitle: string
    intro: {
      image: string
      imageClass: string
      headline: string
      body: string
    }
    codeCraftLabel: string
    floatingCards: FloatingCard[]
    timezone: { title: string; body: string }
    ctaProject: { title: string }
    techStack: { title: string; body: string }
    orbitSkills: string[]
  }
  globe: {
    markers: GlobeMarker[]
  }
  projects: {
    sectionTitle: string
    readMore: string
    viewProject: string
    arrowIcon: string
    closeIcon: string
    arrowUpIcon: string
    items: ProjectItem[]
  }
  experiences: {
    sectionTitle: string
    items: ExperienceItem[]
  }
  testimonials: {
    sectionTitle: string
    items: TestimonialItem[]
  }
  contact: {
    sectionTitle: string
    description: string
    fields: { fullName: string; email: string; message: string }
    placeholders: { fullName: string; email: string; message: string }
    submit: string
    submitting: string
    alerts: { success: string; error: string; errorConfig: string }
    alertBadges: { success: string; failure: string }
    emailTemplate: { toName: string; toEmail: string }
    particles: { quantity: number; ease: number; color: string }
  }
  footer: {
    legalLinks: { label: string; href: string }[]
    copyright: string
  }
  socials: SocialLink[]
  copyEmail: {
    email: string
    copyLabel: string
    copiedLabel: string
    copyIcon: string
    copyDoneIcon: string
  }
}

export const site = raw as SiteContent
