import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: resolveBasePath(),
  plugins: [react(), tailwindcss()],
})

function resolveBasePath(): string {
  const repository = process.env.GITHUB_REPOSITORY
  if (!repository) {
    return '/'
  }

  const [owner, repo] = repository.split('/')
  if (!owner || !repo) {
    return '/'
  }

  const isUserPagesRepo = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`
  return isUserPagesRepo ? '/' : `/${repo}/`
}
