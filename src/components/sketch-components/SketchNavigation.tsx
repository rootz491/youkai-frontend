import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Container from '@/components/ui/Layout/Container'
import Section from '@/components/ui/Layout/Section'
import Heading from '@/components/ui/Typography/Heading'
import Text from '@/components/ui/Typography/Text'
import { Sketch } from '@/types/sketch'

interface SketchNavigationProps {
  previousSketch?: Sketch | null
  nextSketch?: Sketch | null
}

interface NavigationCardProps {
  sketch: Sketch
  direction: 'previous' | 'next'
}

function NavigationCard({ sketch, direction }: NavigationCardProps) {
  const isPrevious = direction === 'previous'
  
  return (
    <Link 
      href={`/sketch/${sketch.slug?.current}`}
      className="group block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300"
    >
      <div className={`flex items-center gap-3 ${isPrevious ? 'flex-row' : 'flex-row-reverse'}`}>
        {isPrevious ? (
          <ChevronLeft size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
        ) : (
          <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
        )}
        
        <div className={`flex-1 ${isPrevious ? 'text-left' : 'text-right'}`}>
          <Text variant="muted" className="text-sm mb-1">
            {isPrevious ? 'Previous' : 'Next'}
          </Text>
          <Heading 
            level={4} 
            className="text-lg group-hover:text-gray-900 transition-colors"
          >
            {sketch.title || 'Untitled Sketch'}
          </Heading>
        </div>
      </div>
    </Link>
  )
}

export function SketchNavigation({ 
  previousSketch, 
  nextSketch 
}: SketchNavigationProps) {
  // Don't render if no navigation options available
  if (!previousSketch && !nextSketch) {
    return null
  }

  return (
    <Section padding="lg" background="gray">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Previous sketch */}
          <div className="flex justify-start">
            {previousSketch ? (
              <NavigationCard sketch={previousSketch} direction="previous" />
            ) : (
              <div /> // Empty div to maintain grid layout
            )}
          </div>

          {/* Next sketch */}
          <div className="flex justify-end">
            {nextSketch ? (
              <NavigationCard sketch={nextSketch} direction="next" />
            ) : (
              <div /> // Empty div to maintain grid layout
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}