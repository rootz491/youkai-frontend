'use client'

import Heading from '@/components/ui/Typography/Heading'
import Text from '@/components/ui/Typography/Text'
import LinkButton from '@/components/ui/Button/LinkButton'
import Button from '@/components/ui/Button/Button'
import Section from '@/components/ui/Layout/Section'

interface HeroSectionProps {
  title?: string
  subtitle?: string
  description?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  onSecondaryButtonClick?: () => void
}

export function HeroSection({
  title = "Studio Youkai",
  subtitle = "Welcome to my artistic journey.",
  description = "Explore my collection of sketches and illustrations.",
  primaryButtonText = "Explore Gallery",
  primaryButtonHref = "/gallery",
  secondaryButtonText = "About Me",
  onSecondaryButtonClick
}: HeroSectionProps) {
  return (
    <Section minHeight="screen" className="flex flex-col items-center justify-center">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <Heading 
          level={1} 
          className="studio-youkai-title text-6xl md:text-8xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6"
        >
          {title}
        </Heading>
        
        <div className="mb-8">
          <Text className="text-xl md:text-2xl leading-relaxed">
            {subtitle}
            <br />
            {description}
          </Text>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LinkButton 
            href={primaryButtonHref}
            variant="primary"
            className="px-8 py-4 rounded-full text-lg font-medium"
          >
            {primaryButtonText}
          </LinkButton>
          
          <Button 
            variant="outline"
            className="px-8 py-4 rounded-full border-2 text-lg font-medium"
            onClick={onSecondaryButtonClick}
          >
            {secondaryButtonText}
          </Button>
        </div>
      </div>
    </Section>
  )
}