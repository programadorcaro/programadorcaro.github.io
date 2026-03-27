import { useState } from 'react'
import { motion } from 'framer-motion'
import type { NavItem } from '../data/site'

type HeaderProps = {
  brandName: string
  nav: NavItem[]
}

export function Header({ brandName, nav }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const handleNavClick = (href: string) => {
    setIsOpen(false)
    if (!href.startsWith('#')) return

    const target = document.querySelector<HTMLElement>(href)
    if (!target) return

    window.history.replaceState(null, '', href)
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="fixed z-20 w-full bg-primary/40 px-3 py-4 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <a href="/" className="text-xl font-bold transition-colors hover:text-neutral-200  text-white">
            {brandName}
          </a>

          <button
            onClick={() => setIsOpen((open) => !open)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            type="button"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          <nav className="hidden sm:flex">
            <Navigation nav={nav} onNavigate={handleNavClick} />
          </nav>
        </div>
      </div>

      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: '100vh' }}
          transition={{ duration: 1 }}
        >
          <nav className="py-12">
            <Navigation nav={nav} onNavigate={handleNavClick} />
          </nav>
        </motion.div>
      )}
    </header>
  )
}

function Navigation({ nav, onNavigate }: { nav: NavItem[]; onNavigate: (href: string) => void }) {
  return (
    <ul className="nav-ul">
      {nav.map((item) => (
        <li key={item.href} className="nav-li">
          <a
            className="nav-link"
            href={item.href}
            onClick={(event) => {
              event.preventDefault()
              onNavigate(item.href)
            }}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

function MenuIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}
