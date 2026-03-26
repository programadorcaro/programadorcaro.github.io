import { Header } from './components/header'
import { HeroText } from './components/hero-text'
import { ModelPlayground } from './components/model-playground'

function App() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-primary text-white">
      <Header />

      <section id="home" className="c-space relative isolate flex h-[100dvh] w-full items-start justify-center overflow-hidden md:justify-start">
        <ModelPlayground />
        <HeroText />
      </section>
    </main>
  )
}

export default App
