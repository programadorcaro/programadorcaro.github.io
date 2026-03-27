import lucasRaw from './lucas.json'

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
    responsibilities?: string[]
    achievements?: string[]
    tech_stack: string[]
    project?: string
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
    'tailwind css': 'tailwindcss',
    'plotly.js': 'javascript',
    'node.js': 'nodejs',
    typescript: 'typescript',
    'react native': 'react',
    'radix ui': 'radixui',
    'rest apis': 'restapis',
    graphql: 'graphql',
    storybook: 'storybook',
    'styled components': 'css3',
    'styled-components': 'css3',
    mixpanel: 'mixpanel',
    'snowflake': 'microsoftsqlserver',
    figma: 'figma',
    'next.js': 'nextjs',
    'vue.js': 'vuejs',
    vuex: 'vuex',
    jest: 'jest',
    playwright: 'playwright',
    'isomorphic apps': 'isomorphicapps',
    stylus: 'stylus',
  }
  return aliases[normalized] ?? normalized.replace(/[.+/]/g, '').replace(/\s+/g, '')
}

function getLogoPath(tech: string) {
  const slug = toLogoSlug(tech)
  return availableLogoSlugs.has(slug) ? `/assets/logos/${slug}.svg` : '/assets/logos/react.svg'
}

function toProjectTag(tech: string, index: number): ProjectTag {
  return {
    id: index + 1,
    name: tech,
    path: getLogoPath(tech),
  }
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
  ]),
)
  .map((skill) => toLogoSlug(skill))
  .filter((slug) => availableLogoSlugs.has(slug))

export const site: SiteContent = {
  header: {
    brandName: 'Lucas Maia',
    nav: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Work', href: '#work' },
      { label: 'Education', href: '#education' },
      { label: 'Contact', href: '#contact' },
    ],
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
    items: lucas.experience.slice(0, 5).map((item, index) => {
      const summary = item.project ?? `Key initiatives delivered at ${item.company}`
      const tags = item.tech_stack.slice(0, 4).map((tech, techIndex) => toProjectTag(tech, techIndex))
      return {
        id: index + 1,
        title: `${item.company} - ${item.role}`,
        description: summary,
        subDescription: [
          ...(item.responsibilities ?? []).slice(0, 2),
          ...(item.achievements ?? []).slice(0, 2),
        ],
        href: '',
        logo: '',
        image: tags[0]?.path ?? '/assets/logos/react.svg',
        tags,
      }
    }),
  },
  experiences: {
    sectionTitle: 'Work Experience',
    items: lucas.experience.map(toExperienceItem),
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
    copyright: `© ${new Date().getFullYear()} ${lucas.personal_info.name}. All rights reserved.`,
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
