import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TextProps {
  children: ReactNode
  className?: string
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
  variant?: 'primary' | 'secondary' | 'muted' | 'accent' | 'error' | 'success'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right'
  as?: 'p' | 'span' | 'div'
}

const sizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl'
}

const variants = {
  primary: 'text-gray-900',
  secondary: 'text-gray-700',
  muted: 'text-gray-600',
  accent: 'text-blue-600',
  error: 'text-red-600',
  success: 'text-green-600'
}

const weights = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
}

const alignments = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
}

export default function Text({ 
  children, 
  className,
  size = 'base',
  variant = 'primary',
  weight = 'normal',
  align = 'left',
  as: Component = 'p'
}: TextProps) {
  return (
    <Component 
      className={cn(
        sizes[size],
        variants[variant],
        weights[weight],
        alignments[align],
        className
      )}
    >
      {children}
    </Component>
  )
}