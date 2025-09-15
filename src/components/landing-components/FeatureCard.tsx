import Heading from '@/components/ui/Typography/Heading'
import Text from '@/components/ui/Typography/Text'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  className?: string
}

export function FeatureCard({ 
  icon, 
  title, 
  description, 
  className 
}: FeatureCardProps) {
  return (
    <div className={cn(
      "text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg",
      className
    )}>
      <div className="text-4xl mb-4">{icon}</div>
      <Heading level={3} className="text-xl mb-2">
        {title}
      </Heading>
      <Text variant="muted">
        {description}
      </Text>
    </div>
  )
}
