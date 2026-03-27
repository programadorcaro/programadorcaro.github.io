import { Section } from '../components/section'
import { site } from '../data/site'

export function CSSDrawingsSection() {
  const { cssDrawings } = site
  return (
    <Section id="css-drawings" className="relative">
      <h2 className="text-heading">{cssDrawings.sectionTitle}</h2>

      {/* <div className="grid grid-cols-[1fr_1fr] mt-12">
        <div className="bg-pink-400">a</div>
        <div className="bg-blue-400">b</div>
      </div> */}

      <div className="mt-12 w-full aspect-video overflow-hidden rounded-lg">
        <iframe
          src="https://lucasmaiaesilva.github.io/playground/gameboy/"
          title={cssDrawings.iframeTitle}
          className="h-full w-full border-0"
          loading="lazy"
        />
      </div>
    </Section>
  )
}