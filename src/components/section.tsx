import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { cn } from '../lib/utils'

export const Section = forwardRef<ElementRef<'section'>, ComponentPropsWithoutRef<'section'>>(function Section(
  { className, ...props },
  ref,
) {
  return <section ref={ref} className={cn('mt-20 md:mt-30 px-6', className)} {...props} />
})

Section.displayName = 'Section'
