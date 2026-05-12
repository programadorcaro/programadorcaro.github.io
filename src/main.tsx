import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import * as Swetrix from 'swetrix'

if (import.meta.env.PROD) {
  Swetrix.init('LcYLP3MNYXyP', {
    apiURL: 'https://api-analytics.usekit.dev/log',
  })
  Swetrix.trackViews()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
