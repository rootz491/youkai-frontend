import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Layout/Container'
import Section from '@/components/ui/Layout/Section'
import Heading from '@/components/ui/Typography/Heading'
import Text from '@/components/ui/Typography/Text'
import { Sketch } from '@/types/sketch'
import { urlFor } from '@/lib/sanity'

interface RelatedSketchesProps {
  sketches: Sketch[]
  title?: string
}

interface RelatedSketchCardProps {
  sketch: Sketch
}

function RelatedSketchCard({ sketch }: RelatedSketchCardProps) {
  const imageUrl = sketch.images?.[0] 
    ? urlFor(sketch.images[0].asset).width(400).height(300).quality(80).url()
    : '/placeholder-sketch.jpg' // You might want to add a placeholder image

  return (
    <Link 
      href={`/sketch/${sketch.slug?.current}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={sketch.images?.[0]?.alt || sketch.title || 'Related sketch'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <Heading 
          level={4} 
          className="text-lg mb-2 group-hover:text-gray-900 transition-colors line-clamp-2"
        >
          {sketch.title || 'Untitled Sketch'}
        </Heading>
        
        {sketch.description && (
          <Text 
            variant="muted" 
            className="text-sm line-clamp-2"
          >
            {sketch.description}
          </Text>
        )}
      </div>
    </Link>
  )
}

export function RelatedSketches({ 
  sketches, 
  title = "Related Sketches" 
}: RelatedSketchesProps) {
  if (!sketches || sketches.length === 0) {
    return null
  }

  return (
    <Section padding="xl" background="gray">
      <Container>
        <div className="text-center mb-12">
          <Heading level={2} className="text-3xl mb-4">
            {title}
          </Heading>
          <Text variant="muted" className="text-lg">
            Discover more sketches you might enjoy
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sketches.map((sketch) => (
            <RelatedSketchCard 
              key={sketch._id} 
              sketch={sketch} 
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}