import { ReactNode } from 'react'
import LoadingSpinner from './LoadingSpinner'
import { Text } from '../Typography'

interface LoadingStateProps {
  message?: string
  children?: ReactNode
  centered?: boolean
}

export default function LoadingState({ 
  message = 'Loading...', 
  children,
  centered = true 
}: LoadingStateProps) {
  const content = children || (
    <div className="text-center space-y-4">
      <LoadingSpinner className="mx-auto" />
      <Text variant="muted">{message}</Text>
    </div>
  )

  if (centered) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        {content}
      </div>
    )
  }

  return <div>{content}</div>
}