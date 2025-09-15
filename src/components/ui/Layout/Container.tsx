import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-8xl',
  full: 'max-w-full'
}

const paddings = {
  none: '',
  sm: 'px-2 py-2',
  md: 'px-4 py-4',
  lg: 'px-6 py-8'
}

export default function Container({ 
  children, 
  className,
  size = 'lg',
  padding = 'md'
}: ContainerProps) {
  return (
    <div 
      className={cn(
        'mx-auto',
        sizes[size],
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  )
}