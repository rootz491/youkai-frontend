import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  background?: 'none' | 'gradient' | 'white' | 'gray'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  minHeight?: 'none' | 'screen' | 'auto'
}

const backgrounds = {
  none: '',
  gradient: 'bg-gradient-to-br from-gray-50 to-gray-100',
  white: 'bg-white',
  gray: 'bg-gray-50'
}

const paddings = {
  none: '',
  sm: 'py-4',
  md: 'py-8',
  lg: 'py-12',
  xl: 'py-16'
}

const minHeights = {
  none: '',
  screen: 'min-h-screen',
  auto: 'min-h-auto'
}

export default function Section({ 
  children, 
  className,
  background = 'none',
  padding = 'md',
  minHeight = 'none'
}: SectionProps) {
  return (
    <section 
      className={cn(
        backgrounds[background],
        paddings[padding],
        minHeights[minHeight],
        className
      )}
    >
      {children}
    </section>
  )
}