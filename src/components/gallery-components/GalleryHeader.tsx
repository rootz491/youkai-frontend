import { LinkButton } from '../ui/Button'
import { Container } from '../ui/Layout'
import { Heading, Text } from '../ui/Typography'

interface GalleryHeaderProps {
  itemCount: number
  onBackClick?: () => void
  backHref?: string
}

export default function GalleryHeader({ 
  itemCount, 
  backHref = '/' 
}: GalleryHeaderProps) {
  return (
    <Container>
      <LinkButton href={backHref} variant='ghost' className="mb-8">
        ← Back to Home
      </LinkButton>

      <div className="text-center mb-12">
        <Heading level={1} align="center" className="mb-4">
          Art Gallery
        </Heading>
        <Text size="xl" variant="muted" align="center" className="max-w-2xl mx-auto">
          Discover {itemCount} unique artworks in our curated collection
        </Text>
      </div>
    </Container>
  )
}