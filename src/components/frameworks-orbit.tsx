import { OrbitingCircles } from './orbiting-circles'

type FrameworksOrbitProps = {
  skills: string[]
}

function OrbitIcon({ src }: { src: string }) {
  return <img src={src} alt="" className="rounded-sm duration-200 hover:scale-110" />
}

export function FrameworksOrbit({ skills }: FrameworksOrbitProps) {
  const inner = [...skills]
  const outer = [...skills].reverse()
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {inner.map((skill) => (
          <OrbitIcon key={`in-${skill}`} src={`/assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {outer.map((skill) => (
          <OrbitIcon key={`out-${skill}`} src={`/assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  )
}
