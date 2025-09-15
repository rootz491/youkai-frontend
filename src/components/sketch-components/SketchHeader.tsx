import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Heading from '@/components/ui/Typography/Heading'
import Text from '@/components/ui/Typography/Text'
import Button from '@/components/ui/Button/Button'
import Container from '@/components/ui/Layout/Container'
import Section from '@/components/ui/Layout/Section'

interface SketchHeaderProps {
  title?: string
  description?: string
  createdAt?: string
  tags?: string[]
  backUrl?: string
  backLabel?: string
}

export function SketchHeader({
  title = "Untitled Sketch",
  description,
  createdAt,
  tags = [],
  backUrl = "/gallery",
  backLabel = "Back to Gallery"
}: SketchHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Section padding="lg" background="white">
      <Container>
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href={backUrl}>
            <Button variant="ghost" className="flex items-center gap-2 p-0 h-auto font-normal text-gray-600 hover:text-gray-900">
              <ArrowLeft size={16} />
              {backLabel}
            </Button>
          </Link>
        </div>

        {/* Sketch Header Info */}
        <div className="max-w-4xl">
          <Heading level={1} className="text-4xl md:text-5xl mb-4">
            {title}
          </Heading>

          {description && (
            <Text className="text-lg md:text-xl mb-6 leading-relaxed" variant="muted">
              {description}
            </Text>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            {createdAt && (
              <Text variant="muted" className="text-sm">
                Created on {formatDate(createdAt)}
              </Text>
            )}

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}