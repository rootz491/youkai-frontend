import Container from '@/components/ui/Layout/Container'
import Section from '@/components/ui/Layout/Section'
import { LoadingState } from '@/components/ui/States'

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Section padding="xl" minHeight="screen">
        <Container>
          <LoadingState message="Loading sketch details..." />
        </Container>
      </Section>
    </main>
  )
}