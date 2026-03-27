import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import * as Swetrix from 'swetrix'

const projectId = import.meta.env.VITE_SWETRIX_PROJECT_ID
const apiURL = import.meta.env.VITE_SWETRIX_API_URL

if (projectId) {
  Swetrix.init(projectId, {
    apiURL: apiURL,
  })
  Swetrix.trackViews()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
