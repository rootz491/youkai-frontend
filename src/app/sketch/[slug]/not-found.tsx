import Container from '@/components/ui/Layout/Container'
import Section from '@/components/ui/Layout/Section'
import Heading from '@/components/ui/Typography/Heading'
import Text from '@/components/ui/Typography/Text'
import LinkButton from '@/components/ui/Button/LinkButton'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Section padding="xl" minHeight="screen">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-8">🎨</div>
            
            <Heading level={1} className="text-4xl mb-4">
              Sketch Not Found
            </Heading>
            
            <Text variant="muted" className="text-lg mb-8">
              The sketch you&apos;re looking for doesn&apos;t exist or may have been moved. 
              Let&apos;s get you back to exploring our gallery.
            </Text>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LinkButton 
                href="/gallery" 
                variant="primary"
                className="px-6 py-3"
              >
                Browse Gallery
              </LinkButton>
              
              <LinkButton 
                href="/" 
                variant="secondary"
                className="px-6 py-3"
              >
                Go Home
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}