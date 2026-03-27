import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { cn } from '../lib/utils'

export const Section = forwardRef<ElementRef<'section'>, ComponentPropsWithoutRef<'section'>>(function Section(
  { className, ...props },
  ref,
) {
  return <section ref={ref} className={cn('mt-20 px-6 scroll-mt-24 md:mt-30 md:scroll-mt-28', className)} {...props} />
})

Section.displayName = 'Section'
