import Heading from '@/components/ui/Typography/Heading'
import Text from '@/components/ui/Typography/Text'
import Container from '@/components/ui/Layout/Container'
import Section from '@/components/ui/Layout/Section'
import { FeatureCard } from './FeatureCard'

interface Feature {
  icon: string
  title: string
  description: string
}

interface FeaturesSectionProps {
  title?: string
  subtitle?: string
  features?: Feature[]
}

const defaultFeatures: Feature[] = [
  {
    icon: "🎨",
    title: "Original Sketches",
    description: "Hand-drawn artwork that captures moments and emotions"
  },
  {
    icon: "✨",
    title: "Digital Art",
    description: "Modern illustrations blending traditional and digital techniques"
  },
  {
    icon: "📚",
    title: "Story Illustrations",
    description: "Visual narratives that bring stories to life"
  }
]

export function FeaturesSection({
  title = "What You'll Find",
  subtitle = "Discover the art that speaks to your soul",
  features = defaultFeatures
}: FeaturesSectionProps) {
  return (
    <Section padding="xl">
      <Container size="lg">
        <div className="text-center mb-12">
          <Heading level={2} className="text-4xl mb-4">
            {title}
          </Heading>
          <Text className="text-xl" variant="muted">
            {subtitle}
          </Text>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}