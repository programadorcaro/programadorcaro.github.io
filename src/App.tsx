import { Header } from './components/header'
import { HeroText } from './components/hero-text'
import { ModelPlayground } from './components/model-playground'

function App() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-primary text-white">
      <Header />

      <section id="home" className="relative isolate flex h-[100dvh] w-full items-start justify-center overflow-hidden md:justify-start">
        <ModelPlayground />
        <HeroText />
        <div className="inset-0 z-20" />
      </section>
      <div className="h-[70dvh]" />
    </main>
  )
}

export default App
