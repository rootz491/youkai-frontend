'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Masonry from '@/components/Masonry'
import { 
  fetchInitialGalleryData, 
  fetchMoreGalleryData,
  type MasonryItem,
  type Sketch 
} from '@/services/sanity'

export default function GalleryPage() {
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
            document.documentElement.offsetHeight - 1000 && !currentState.loadingMore) {
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8">
            ← Back to Home
          </Link>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600">Loading gallery...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8">
            ← Back to Home
          </Link>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="text-red-500 text-4xl">⚠️</div>
              <p className="text-red-600">{error}</p>
              <button 
                onClick={loadInitialData}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (allItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8">
            ← Back to Home
          </Link>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🎨</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Artworks Found</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                The gallery is currently empty. Check back later for new artworks, or contact the artist to see their latest creations.
              </p>
              <button 
                onClick={loadInitialData}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mt-4"
              >
                Refresh Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors">
          ← Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Art Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover {allItems.length} unique artworks in our curated collection
          </p>
        </div>

        <div className="relative">
          <Masonry 
            items={allItems}
            ease="power3.out"
            duration={0.8}
            stagger={0.08}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.96}
            blurToFocus={true}
            colorShiftOnHover={false}
          />

          {/* Loading indicator for infinite scroll */}
          {loadingMore && (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
            </div>
          )}

          {/* End of content indicator */}
          {!hasMore && allItems.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">🎨 You&apos;ve seen all the artworks!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}