import { ReactNode } from 'react'
import { Button } from '../Button'
import { Heading, Text } from '../Typography'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  retryText?: string
  children?: ReactNode
  centered?: boolean
}

export default function ErrorState({ 
  title = 'Something went wrong',
  message = 'An error occurred while loading the content.',
  onRetry,
  retryText = 'Try Again',
  children,
  centered = true 
}: ErrorStateProps) {
  const content = children || (
    <div className="text-center space-y-4">
      <div className="text-red-500 text-4xl">⚠️</div>
      <Heading level={3} variant="secondary">{title}</Heading>
      <Text variant="error">{message}</Text>
      {onRetry && (
        <Button 
          variant="danger" 
          onClick={onRetry}
        >
          {retryText}
        </Button>
      )}
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