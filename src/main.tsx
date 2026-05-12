import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

function scheduleSwetrix() {
  const run = () => {
    void import('swetrix').then((Swetrix) => {
      Swetrix.init('LcYLP3MNYXyP', {
        apiURL: 'https://api-analytics.usekit.dev/log',
      })
      Swetrix.trackViews()
    })
  }
  if (typeof window === 'undefined') return
  const idle = window.requestIdleCallback?.(run, { timeout: 4000 })
  if (idle === undefined) {
    window.addEventListener('load', run, { once: true })
  }
}

if (import.meta.env.PROD) {
  scheduleSwetrix()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
