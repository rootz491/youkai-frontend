'use client'

import { useState, useEffect, useCallback, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  fetchInitialGalleryData, 
  fetchMoreGalleryData,
  type MasonryItem,
  type Sketch 
} from '@/services/sanity'
import { PageWrapper, Container } from '@/components/ui/Layout'
import { LoadingState, ErrorState, EmptyState } from '@/components/ui/States'
import { GalleryHeader, GalleryContent } from '@/components/gallery-components'
import { SketchModal } from '@/components/gallery-components/SketchModal'
import Footer from '@/components/common/Footer'

function GalleryPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedSketch = searchParams.get('sketch')
  
  const [sketches, setSketches] = useState<Sketch[]>([])
  const [allItems, setAllItems] = useState<MasonryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const stateRef = useRef({ loadingMore: false, hasMore: true, sketches: [] as Sketch[] })

  useEffect(() => {
    stateRef.current = { loadingMore, hasMore, sketches }
  }, [loadingMore, hasMore, sketches])

  const handleCloseModal = useCallback(() => {
    router.push('/gallery')
  }, [router])

  const handleItemClick = useCallback((item: MasonryItem) => {
    // Extract slug from the URL path (e.g., '/sketch/my-sketch' -> 'my-sketch')
    const slug = item.url.split('/').pop()
    if (slug) {
      router.push(`/gallery?sketch=${slug}`)
    }
  }, [router])

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await fetchInitialGalleryData()

      setSketches(result.sketches)
      setAllItems(result.masonryItems)
      setHasMore(result.hasMore)
    } catch (err) {
      console.error('Gallery: Failed to fetch sketches:', err)
      setError('Unable to load gallery data')
      setSketches([])
      setAllItems([])
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }, [])

  const loadMoreData = useCallback(async () => {
    const currentState = stateRef.current
    if (currentState.loadingMore || !currentState.hasMore || currentState.sketches.length === 0) return
    
    try {
      setLoadingMore(true)
      
      const result = await fetchMoreGalleryData(currentState.sketches)
      
      if (result.sketches.length > 0) {
        setSketches(prev => [...prev, ...result.sketches])
        setAllItems(prev => [...prev, ...result.masonryItems])
        setHasMore(result.hasMore)
      } else {
        setHasMore(false)
      }
      
    } catch (err) {
      console.error('Failed to load more data:', err)
    } finally {
      setLoadingMore(false)
    }
  }, [])

  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const currentState = stateRef.current
        if (window.innerHeight + document.documentElement.scrollTop >= 
            document.documentElement.offsetHeight - 1000 && 
            !currentState.loadingMore && currentState.hasMore && currentState.sketches.length > 0) {
          loadMoreData()
        }
      }, 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [loadMoreData])

  if (loading) {
    return (
      <>
        <PageWrapper>
          <Container>
            <GalleryHeader itemCount={0} />
            <LoadingState message="Loading gallery..." />
          </Container>
          <Footer />
        </PageWrapper>

        {/* Sketch Modal */}
        {selectedSketch && (
          <SketchModal 
            slug={selectedSketch}
            onClose={handleCloseModal}
          />
        )}
      </>
    )
  }

  if (error) {
    return (
      <>
        <PageWrapper>
          <Container>
            <GalleryHeader itemCount={0} />
            <ErrorState 
              message={error}
              onRetry={loadInitialData}
            />
          </Container>
          <Footer />
        </PageWrapper>

        {/* Sketch Modal */}
        {selectedSketch && (
          <SketchModal 
            slug={selectedSketch}
            onClose={handleCloseModal}
          />
        )}
      </>
    )
  }

  if (allItems.length === 0) {
    return (
      <>
        <PageWrapper>
          <Container>
            <GalleryHeader itemCount={0} />
            <EmptyState 
              title="No Artworks Found"
              message="The gallery is currently empty. Check back later for new artworks, or contact the artist to see their latest creations."
              onAction={loadInitialData}
              actionText="Refresh Gallery"
              centered={true}
            />
          </Container>
          <Footer />
        </PageWrapper>

        {/* Sketch Modal */}
        {selectedSketch && (
          <SketchModal 
            slug={selectedSketch}
            onClose={handleCloseModal}
          />
        )}
      </>
    )
  }

  return (
    <>
      <PageWrapper>
        <GalleryHeader itemCount={allItems.length} />
        <GalleryContent 
          items={allItems}
          loadingMore={loadingMore}
          hasMore={hasMore}
          showEndMessage={true}
          onItemClick={handleItemClick}
        />
        <Footer />
      </PageWrapper>

      {/* Sketch Modal */}
      {selectedSketch && (
        <SketchModal 
          slug={selectedSketch}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}

export default function GalleryPage() {
  return (
    <Suspense fallback={
      <PageWrapper>
        <Container>
          <LoadingState message="Loading gallery..." />
        </Container>
        <Footer />
      </PageWrapper>
    }>
      <GalleryPageContent />
    </Suspense>
  )
}