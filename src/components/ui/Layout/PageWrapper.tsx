import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageWrapperProps {
  children: ReactNode
  className?: string
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={cn('bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen', className)}>
      {children}
    </div>
  )
}