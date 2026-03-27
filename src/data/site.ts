import lucasRaw from './lucas.json'
import siteJson from './site.json'

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
  company: string
  title: string
  description: string
  subDescription: string[]
  href: string
  logo: string
  image: string
  tags: ProjectTag[]
}

export type CompanyProjectItem = {
  id: string
  company: string
  role: string
  period: string
  title: string
  description: string
  screenshot: string
  href: string
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

export type FooterContactLink = {
  label: string
  href: string
  value: string
}

export type YoutubeVideoItem = {
  id: string
  title: string
}

export type FooterCtas = {
  linkedIn: { label: string; href: string }
  github: { label: string; href: string; icon: string }
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
  companyProjects: {
    sectionTitle: string
    sectionDescription: string
    viewProjectLabel: string
    linkPendingLabel: string
    items: CompanyProjectItem[]
  }
  educationAchievements: {
    sectionTitle: string
    educationTitle: string
    achievementsTitle: string
    education: {
      institution: string
      degree: string
      period: string
    }[]
    achievements: string[]
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
    contactLinks: FooterContactLink[]
    ctas: FooterCtas
    youtubeChannelUrl: string
    youtubeVideos: YoutubeVideoItem[]
    copyright: string
    latestVideosTitle: string
    visitChannelLabel: string
  }
  socials: SocialLink[]
  copyEmail: {
    email: string
    copyLabel: string
    copiedLabel: string
    copyIcon: string
    copyDoneIcon: string
  }
  cssDrawings: {
    sectionTitle: string
    iframeTitle: string
  }
  youtubeCarousel: {
    emptyState: string
  }
}

type LucasCv = {
  personal_info: {
    name: string
    title: string
    location: string
    work_mode: string
    contacts: {
      phone: string
      email: string
      linkedin: string
      github_main: string
      github_secondary: string
    }
  }
  summary: string
  skills: {
    core: string[]
    frontend: string[]
    backend: string[]
    testing: string[]
    data_visualization: string[]
    architecture: string[]
    tools: string[]
  }
  experience: {
    company: string
    role: string
    period: {
      start: string
      end: string
      duration: string
    }
    image?: string
    responsibilities?: string[]
    achievements?: string[]
    tech_stack: string[]
    projects?: (
      | string
      | {
        title: string
        period?: { start?: string; end?: string }
        description?: string
        skills?: string[]
        url?: string
        starred?: boolean
      }
    )[]
  }[]
  education: {
    institution: string
    degree: string
    period: string
  }[]
  languages: {
    language: string
    level: string
  }[]
  notable_strengths: string[]
  career_highlights: string[]
}

const lucas = lucasRaw as LucasCv
type ExperienceProject = NonNullable<LucasCv['experience'][number]['projects']>[number]
type ExperienceProjectObject = Exclude<ExperienceProject, string>

const availableLogoSlugs = new Set([
  'auth0',
  'azure',
  'blazor',
  'cplusplus',
  'csharp',
  'css3',
  'dotnet',
  'dotnetcore',
  'git',
  'github',
  'html5',
  'javascript',
  'jest',
  'microsoft',
  'microsoftsqlserver',
  'playwright',
  'react',
  'sqlite',
  'storybook',
  'stripe',
  'tailwindcss',
  'threejs',
  'vitejs',
  'visualstudiocode',
  'wordpress',
])

const techToLogoPath: Record<string, string> = {
  auth0: '/assets/logos/auth0.svg',
  azure: '/assets/logos/azure.svg',
  blazor: '/assets/logos/blazor.svg',
  cplusplus: '/assets/logos/cplusplus.svg',
  csharp: '/assets/logos/csharp.svg',
  css3: '/assets/logos/css3.svg',
  dotnet: '/assets/logos/dotnet.svg',
  dotnetcore: '/assets/logos/dotnetcore.svg',
  git: '/assets/logos/git.svg',
  github: '/assets/logos/github.svg',
  html5: '/assets/logos/html5.svg',
  javascript: '/assets/logos/javascript.svg',
  jest: '/assets/logos/jest.svg',
  microsoft: '/assets/logos/microsoft.svg',
  microsoftsqlserver: '/assets/logos/microsoftsqlserver.svg',
  playwright: '/assets/logos/playwright.svg',
  react: '/assets/logos/react.svg',
  sqlite: '/assets/logos/sqlite.svg',
  storybook: '/assets/logos/storybook.svg',
  stripe: '/assets/logos/stripe.svg',
  tailwindcss: '/assets/logos/tailwindcss.svg',
  threejs: '/assets/logos/threejs.svg',
  vitejs: '/assets/logos/vitejs.svg',
  visualstudiocode: '/assets/logos/visualstudiocode.svg',
  wordpress: '/assets/logos/wordpress.svg',
}

function formatMonthYear(value: string) {
  if (!value || value.toLowerCase() === 'present') return 'Present'
  const [year, month] = value.split('-')
  const monthNumber = Number(month)
  if (!year || !monthNumber) return value
  const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][monthNumber - 1]
  return `${monthName} ${year}`
}

function toLogoSlug(tech: string) {
  const normalized = tech.trim().toLowerCase()
  const aliases: Record<string, string> = {
    'c#': 'csharp',
    '.net': 'dotnet',
    '.net core': 'dotnetcore',
    typescript: 'visualstudiocode',
    'next.js': 'vitejs',
    'node.js': 'javascript',
    'react native': 'react',
    redux: 'react',
    'vue.js': 'javascript',
    vuex: 'javascript',
    graphql: 'microsoftsqlserver',
    stylus: 'css3',
    'isomorphic apps': 'javascript',
    'styled-components': 'css3',
    'styled components': 'css3',
    'rest apis': 'javascript',
    'radix ui': 'react',
    mixpanel: 'microsoft',
    figma: 'microsoft',
    'tailwind css': 'tailwindcss',
    'plotly.js': 'javascript',
    storybook: 'storybook',
    'snowflake': 'microsoftsqlserver',
    jest: 'jest',
    playwright: 'playwright',
  }
  return aliases[normalized] ?? normalized.replace(/[.+/]/g, '').replace(/\s+/g, '')
}

function getLogoPath(tech: string) {
  const slug = toLogoSlug(tech)
  if (!availableLogoSlugs.has(slug)) return '/assets/logos/react.svg'
  return techToLogoPath[slug] ?? '/assets/logos/react.svg'
}

function toProjectTag(tech: string, index: number): ProjectTag {
  return {
    id: index + 1,
    name: tech,
    path: getLogoPath(tech),
  }
}

function isProjectObject(project: ExperienceProject): project is ExperienceProjectObject {
  return typeof project !== 'string'
}

function dedupeProjectTags(tags?: ProjectTag[] | null): ProjectTag[] {
  const seen = new Set<string>()
  const deduped: ProjectTag[] = []
  for (const tag of tags ?? []) {
    if (seen.has(tag.path)) continue
    seen.add(tag.path)
    deduped.push({ ...tag, id: deduped.length + 1 })
  }
  return deduped
}

function normalizeExperienceProjects(item: LucasCv['experience'][number], index: number): CompanyProjectItem[] {
  const period = `${formatMonthYear(item.period.start)} - ${formatMonthYear(item.period.end)}`
  const defaultDescription = item.achievements?.[0] ?? item.responsibilities?.[0] ?? `Project delivered at ${item.company}`
  const defaultTags = dedupeProjectTags(item.tech_stack?.slice(0, 6).map((tech, techIndex) => toProjectTag(tech, techIndex)))
  const defaultScreenshot = item.image ?? '/assets/projects/pluspower.png'
  const list = item.projects ?? []

  if (list.length === 0) {
    return [
      {
        id: `${item.company}-${index}-0`,
        company: item.company,
        role: item.role,
        period,
        title: `Project at ${item.company}`,
        description: defaultDescription,
        screenshot: defaultScreenshot,
        href: '',
        tags: defaultTags,
      },
    ]
  }

  return list.map((project, projectIndex) => {
    if (typeof project === 'string') {
      return {
        id: `${item.company}-${index}-${projectIndex}`,
        company: item.company,
        role: item.role,
        period,
        title: project,
        description: defaultDescription,
        screenshot: defaultScreenshot,
        href: '',
        tags: defaultTags,
      }
    }

    const stack = project.skills ?? item.tech_stack ?? []
    const projectTags = dedupeProjectTags(stack.slice(0, 6).map((tech, techIndex) => toProjectTag(tech, techIndex)))
    return {
      id: `${item.company}-${index}-${projectIndex}`,
      company: item.company,
      role: item.role,
      period,
      title: project.title,
      description: project.description ?? defaultDescription,
      screenshot: defaultScreenshot,
      href: project.url ?? '',
      tags: projectTags,
    }
  })
}

function toExperienceItem(item: LucasCv['experience'][number]): ExperienceItem {
  const start = formatMonthYear(item.period.start)
  const end = formatMonthYear(item.period.end)
  return {
    title: item.role,
    job: item.company,
    date: `${start} - ${end}`,
    contents: [...(item.responsibilities ?? []), ...(item.achievements ?? [])],
  }
}

const orbitSkills = Array.from(
  new Set([
    ...lucas.skills.core,
    ...lucas.skills.frontend,
    ...lucas.skills.backend,
    ...lucas.skills.testing,
    ...lucas.skills.tools,
    ...lucas.skills.data_visualization,
    ...lucas.experience.flatMap((item) =>
      (item.projects ?? [])
        .filter(isProjectObject)
        .flatMap((project) => project.skills ?? []),
    ),
  ]),
)
  .map((skill) => toLogoSlug(skill))
  .filter((slug) => availableLogoSlugs.has(slug))

export const site: SiteContent = {
  header: {
    brandName: siteJson.header.brandName,
    nav: siteJson.header.nav,
  },
  hero: {
    flipWords: ['Scalable', 'Secure', 'Product-Driven'],
    desktop: {
      greeting: `Hi, I'm ${lucas.personal_info.name.split(' ')[0]}`,
      lineBeforeFlip: 'Senior Software Engineer',
      lineBreak: 'Building',
      lineAfterFlip: 'Web Platforms',
    },
    mobile: {
      greeting: `Hi, I'm ${lucas.personal_info.name.split(' ')[0]}`,
      lineBeforeFlip: 'Building',
      lineAfterFlip: 'Web Platforms',
    },
  },
  about: {
    sectionTitle: 'About Me',
    intro: {
      image: 'assets/coding-pov.png',
      imageClass: 'absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]',
      headline: lucas.personal_info.title,
      body: lucas.summary,
    },
    codeCraftLabel: 'ENGINEERING CRAFT',
    floatingCards: [
      { kind: 'text', text: 'React', style: { rotate: '65deg', top: '24%', left: '18%' } },
      { kind: 'text', text: 'Next.js', style: { rotate: '-28deg', top: '62%', left: '50%' } },
      { kind: 'text', text: 'TypeScript', style: { rotate: '88deg', bottom: '25%', left: '72%' } },
      { kind: 'text', text: 'Node.js', style: { rotate: '-38deg', top: '52%', left: '2%' } },
      { kind: 'text', text: 'Design Systems', style: { rotate: '16deg', top: '8%', left: '36%' } },
      { kind: 'image', image: 'assets/logos/react.svg', style: { rotate: '28deg', top: '72%', left: '70%' } },
      { kind: 'image', image: 'assets/logos/tailwindcss.svg', style: { rotate: '-36deg', top: '72%', left: '24%' } },
      { kind: 'image', image: 'assets/logos/javascript.svg', style: { rotate: '-48deg', top: '4%', left: '9%' } },
    ],
    timezone: {
      title: 'Location',
      body: `${lucas.personal_info.location}. ${lucas.personal_info.work_mode} work.`,
    },
    ctaProject: {
      title: "Let's build high-impact products together.",
    },
    techStack: {
      title: 'Tech Stack',
      body: 'I work across frontend and full-stack systems with a focus on scalability, maintainability, and product outcomes.',
    },
    orbitSkills,
  },
  globe: {
    markers: [
      { location: [-19.9167, -43.9345], size: 0.12 },
      { location: [-23.5505, -46.6333], size: 0.09 },
      { location: [40.7128, -74.006], size: 0.08 },
      { location: [51.5072, -0.1276], size: 0.07 },
      { location: [38.7223, -9.1393], size: 0.06 },
    ],
  },
  projects: {
    sectionTitle: 'Selected Impact',
    readMore: 'Read More',
    viewProject: 'View Project',
    arrowIcon: 'assets/arrow-right.svg',
    closeIcon: 'assets/close.svg',
    arrowUpIcon: 'assets/arrow-up.svg',
    items: lucas.experience.map((item, index) => {
      const firstProject =
        (item.projects ?? []).find(isProjectObject) ?? null
      const summary =
        firstProject?.description ?? item.achievements?.[0] ?? item.responsibilities?.[0] ?? `Key initiatives delivered at ${item.company}`
      const sourceSkills = firstProject?.skills?.length ? firstProject.skills : item.tech_stack ?? []
      const tags = dedupeProjectTags(sourceSkills.slice(0, 6).map((tech, techIndex) => toProjectTag(tech, techIndex))).slice(0, 4)
      return {
        id: index + 1,
        company: item.company,
        title: `${item.company} - ${item.role}`,
        description: summary,
        subDescription: [
          ...(item.responsibilities ?? []).slice(0, 2),
          ...(item.achievements ?? []).slice(0, 2),
        ],
        href: '',
        logo: '',
        image: item.image ?? tags[0]?.path ?? '/assets/logos/react.svg',
        tags,
      }
    }),
  },
  experiences: {
    sectionTitle: 'Work Experience',
    items: lucas.experience.map(toExperienceItem),
  },
  companyProjects: {
    sectionTitle: 'Projects',
    sectionDescription: 'Projects linked to each company role. This section is ready for LinkedIn public export enrichment.',
    viewProjectLabel: siteJson.companyProjectsLabels.viewProjectLabel,
    linkPendingLabel: siteJson.companyProjectsLabels.linkPendingLabel,
    items: lucas.experience.flatMap(normalizeExperienceProjects),
  },
  educationAchievements: {
    sectionTitle: 'Education & Achievements',
    educationTitle: 'School',
    achievementsTitle: 'Career Highlights',
    education: lucas.education,
    achievements: lucas.career_highlights,
  },
  testimonials: {
    sectionTitle: 'What Defines My Work',
    items: lucas.notable_strengths.map((strength, index) => ({
      name: strength,
      username: `#strength${index + 1}`,
      body: `Applied in production environments while building resilient and maintainable software systems.`,
      img: `https://robohash.org/strength-${index + 1}?set=set4`,
    })),
  },
  contact: {
    sectionTitle: "Let's Talk",
    description: 'If you are building a platform and need a senior engineer focused on quality and scale, I would love to hear about it.',
    fields: {
      fullName: 'Full Name',
      email: 'Email',
      message: 'Message',
    },
    placeholders: {
      fullName: 'Your name',
      email: 'your@email.com',
      message: 'Tell me about your project...',
    },
    submit: 'Send',
    submitting: 'Sending...',
    alerts: {
      success: 'Your message has been sent!',
      error: 'Something went wrong!',
      errorConfig: 'Contact form is not configured. Set VITE_EMAILJS_* environment variables.',
    },
    alertBadges: {
      success: 'Success',
      failure: 'Failed',
    },
    emailTemplate: {
      toName: lucas.personal_info.name,
      toEmail: lucas.personal_info.contacts.email,
    },
    particles: {
      quantity: 100,
      ease: 80,
      color: '#ffffff',
    },
  },
  footer: {
    legalLinks: [
      { label: 'Main GitHub', href: lucas.personal_info.contacts.github_main },
      { label: 'Secondary GitHub', href: lucas.personal_info.contacts.github_secondary },
    ],
    contactLinks: [
      {
        label: 'Main GitHub',
        href: 'https://github.com/lucasmaiaesilva',
        value: 'github.com/lucasmaiaesilva',
      },
      {
        label: 'Second GitHub',
        href: 'https://github.com/programadorcaro',
        value: 'github.com/programadorcaro',
      },
      {
        label: 'WhatsApp',
        href: 'https://wa.me/5531993190165',
        value: '+55 31 99319-0165',
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/lucasmaiaesilva/',
        value: 'linkedin.com/in/lucasmaiaesilva',
      },
      {
        label: 'YouTube Channel',
        href: 'https://www.youtube.com/@programadorcaro_',
        value: 'youtube.com/@programadorcaro_',
      },
      {
        label: 'Email',
        href: 'mailto:lucasmaiaesilva@gmail.com',
        value: 'lucasmaiaesilva@gmail.com',
      },
    ],
    ctas: {
      linkedIn: {
        label: 'Check my LinkedIn',
        href: 'https://www.linkedin.com/in/lucasmaiaesilva/',
      },
      github: {
        label: '',
        href: 'https://github.com/lucasmaiaesilva',
        icon: '/assets/logos/github.svg',
      },
    },
    youtubeChannelUrl: 'https://www.youtube.com/@programadorcaro_',
    youtubeVideos: [
      { id: 'h-LYdI_eNeA', title: 'Programador Caro - Video 1' },
      { id: 'vB8JPyotv5U', title: 'Programador Caro - Video 2' },
    ],
    copyright: `© ${new Date().getFullYear()} ${lucas.personal_info.name}. All rights reserved.`,
    latestVideosTitle: siteJson.footerLabels.latestVideosTitle,
    visitChannelLabel: siteJson.footerLabels.visitChannelLabel,
  },
  cssDrawings: {
    sectionTitle: siteJson.cssDrawings.sectionTitle,
    iframeTitle: siteJson.cssDrawings.iframeTitle,
  },
  youtubeCarousel: {
    emptyState: siteJson.youtubeCarousel.emptyState,
  },
  socials: [
    {
      name: 'WhatsApp',
      href: `https://wa.me/${lucas.personal_info.contacts.phone.replace(/\D/g, '')}`,
      icon: '/assets/socials/whatsApp.svg',
    },
    {
      name: 'Linkedin',
      href: lucas.personal_info.contacts.linkedin,
      icon: '/assets/socials/linkedIn.svg',
    },
    {
      name: 'GitHub',
      href: lucas.personal_info.contacts.github_main,
      icon: '/assets/logos/github.svg',
    },
  ],
  copyEmail: {
    email: lucas.personal_info.contacts.email,
    copyLabel: 'Copy Email Address',
    copiedLabel: 'Email copied',
    copyIcon: 'assets/copy.svg',
    copyDoneIcon: 'assets/copy-done.svg',
  },
}
