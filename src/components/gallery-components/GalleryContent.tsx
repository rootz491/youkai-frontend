import Masonry from '../Masonry'
import { LoadingSpinner } from '../ui/States'
import { Text } from '../ui/Typography'
import { Container } from '../ui/Layout'
import { MasonryItem } from '@/services/sanity'

interface GalleryContentProps {
  items: MasonryItem[]
  loadingMore: boolean
  hasMore: boolean
  showEndMessage: boolean
  onItemClick?: (item: MasonryItem) => void
}

export default function GalleryContent({ 
  items, 
  loadingMore, 
  hasMore, 
  showEndMessage,
  onItemClick
}: GalleryContentProps) {
  return (
    <Container>
      <div className="w-full">
        <Masonry 
          items={items}
          ease="power2.out" // or "power3.out"
          duration={0.8}
          stagger={0.08}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.96}
          blurToFocus={true}
          colorShiftOnHover={false}
          onItemClick={onItemClick}
        />

        {/* Loading indicator for infinite scroll */}
        {loadingMore && (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        )}

        {/* End of content indicator */}
        {showEndMessage && !hasMore && items.length > 0 && (
          <div className="text-center py-16">
            <Text variant="muted" size="lg">
              🎨 You&apos;ve seen all the artworks!
            </Text>
          </div>
        )}
      </div>
    </Container>
  )
}