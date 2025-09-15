import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HeadingProps {
  children: ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  variant?: 'primary' | 'secondary' | 'muted'
  align?: 'left' | 'center' | 'right'
}

const variants = {
  primary: 'text-gray-900',
  secondary: 'text-gray-700',
  muted: 'text-gray-600'
}

const levels = {
  1: 'text-5xl font-bold',
  2: 'text-4xl font-bold',
  3: 'text-3xl font-semibold',
  4: 'text-2xl font-semibold',
  5: 'text-xl font-medium',
  6: 'text-lg font-medium'
}

const alignments = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
}

export default function Heading({ 
  children, 
  level = 1, 
  className, 
  variant = 'primary',
  align = 'left'
}: HeadingProps) {
  const baseClasses = cn(
    levels[level],
    variants[variant],
    alignments[align],
    className
  )
  
  switch (level) {
    case 1:
      return <h1 className={baseClasses}>{children}</h1>
    case 2:
      return <h2 className={baseClasses}>{children}</h2>
    case 3:
      return <h3 className={baseClasses}>{children}</h3>
    case 4:
      return <h4 className={baseClasses}>{children}</h4>
    case 5:
      return <h5 className={baseClasses}>{children}</h5>
    case 6:
      return <h6 className={baseClasses}>{children}</h6>
    default:
      return <h1 className={baseClasses}>{children}</h1>
  }
}