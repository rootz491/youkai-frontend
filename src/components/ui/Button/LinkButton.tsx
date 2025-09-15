import Link from 'next/link'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface LinkButtonProps {
  children: ReactNode
  href: string
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

const variants = {
  primary: 'text-gray-600 hover:text-gray-800',
  secondary: 'text-blue-600 hover:text-blue-800',
  ghost: 'text-gray-500 hover:text-gray-700'
}

export default function LinkButton({ 
  children, 
  href,
  className,
  variant = 'primary'
}: LinkButtonProps) {
  return (
    <Link 
      href={href}
      className={cn(
        'inline-flex items-center transition-colors',
        variants[variant],
        className
      )}
    >
      {children}
    </Link>
  )
}