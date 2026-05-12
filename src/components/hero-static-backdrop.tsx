export function HeroStaticBackdrop() {
  const base = import.meta.env.BASE_URL

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-primary"
    >
      <picture className="absolute inset-0 block h-full w-full">
        <source
          media="(max-width: 767px)"
          srcSet={`${base}assets/backgroundMobile.webp`}
          type="image/webp"
        />
        <img
          src={`${base}assets/backgroundDesktop.webp`}
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
        />
      </picture>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(122,87,219,0.22),rgba(3,4,18,0.55)_40%,#030412_72%)]" />
    </div>
  )
}
