import { ReactNode } from 'react'
import { Button } from '../Button'
import { Heading, Text } from '../Typography'

interface EmptyStateProps {
  icon?: string
  title?: string
  message?: string
  onAction?: () => void
  actionText?: string
  children?: ReactNode
  centered?: boolean
}

export default function EmptyState({ 
  icon = '🎨',
  title = 'No items found',
  message = 'There are no items to display at the moment.',
  onAction,
  actionText = 'Refresh',
  children,
  centered = true 
}: EmptyStateProps) {
  const content = children || (
    <div className="text-center space-y-4">
      <div className="text-6xl mb-4">{icon}</div>
      <Heading level={4} variant="secondary">{title}</Heading>
      <Text variant="muted" className="max-w-md mx-auto">
        {message}
      </Text>
      {onAction && (
        <Button 
          variant="primary" 
          onClick={onAction}
          className="mt-4"
        >
          {actionText}
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