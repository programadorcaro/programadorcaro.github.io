import { Section } from "../components/section";

export function CSSDrawingsSection() {
  return (
    <Section id="css-drawings" className="relative">
      <h2 className="text-heading">I make drawings with CSS</h2>

      {/* <div className="grid grid-cols-[1fr_1fr] mt-12">
        <div className="bg-pink-400">a</div>
        <div className="bg-blue-400">b</div>
      </div> */}

      <div className="mt-12 w-full aspect-video overflow-hidden rounded-lg">
        <iframe
          src="https://lucasmaiaesilva.github.io/playground/gameboy/"
          title="Game Boy — CSS playground"
          className="h-full w-full border-0"
          loading="lazy"
        />
      </div>
    </Section>
  )
}