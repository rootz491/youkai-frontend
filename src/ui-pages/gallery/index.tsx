'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { client, urlFor } from '@/lib/sanity'
import { Sketch } from '@/types/sketch'
import Masonry from '@/components/Masonry'
import Link from 'next/link'

// Sanity query for paginated sketches
const getPaginatedSketches = (lastCreatedAt?: string, limit = 12) => {
  const dateFilter = lastCreatedAt ? ` && createdAt < "${lastCreatedAt}"` : ''
  return `*[_type == "sketch"${dateFilter}] | order(createdAt desc)[0...${limit}] {
    _id,
    title,
    description,
    images,
    tags,
    createdAt,
    featured,
    slug
  }`
}

interface MasonryItem {
  id: string
  img: string
  url: string
  height: number
}

export default function GalleryPage() {
  const [sketches, setSketches] = useState<Sketch[]>([])
  const [allItems, setAllItems] = useState<MasonryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)

  // Use refs to access current state in scroll handler without causing re-renders
  const stateRef = useRef({ loadingMore: false, hasMore: true, sketches: [] as Sketch[] })
  
  // Update refs when state changes
  useEffect(() => {
    stateRef.current = { loadingMore, hasMore, sketches }
  }, [loadingMore, hasMore, sketches])

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await client.fetch(getPaginatedSketches())
      setSketches(data || [])
      
      if (data && data.length > 0) {
        // Convert sketches to masonry items with unique IDs
        const masonryItems = data
          .filter((sketch: Sketch) => sketch.images && sketch.images.length > 0)
          .map((sketch: Sketch, index: number) => ({
            id: `${sketch._id}-initial-${index}`, // Ensure unique IDs
            img: urlFor(sketch.images[0].asset).width(600).quality(80).url(),
            url: sketch.slug?.current ? `/sketch/${sketch.slug.current}` : '#',
            height: Math.floor(Math.random() * 200) + 350
          }))
        setAllItems(masonryItems)
        setHasMore(data.length === 12)
      } else {
        // No data found
        setAllItems([])
        setHasMore(false)
      }
      
    } catch (err) {
      console.error('Gallery: Failed to fetch sketches:', err)
      setError('Unable to load gallery data')
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
      
      // Load more real data
      const lastSketch = currentState.sketches[currentState.sketches.length - 1]
      const newData = await client.fetch(getPaginatedSketches(lastSketch.createdAt))
      
      if (newData && newData.length > 0) {
        // Filter out any sketches that already exist to prevent duplicates
        const existingIds = new Set(currentState.sketches.map(sketch => sketch._id))
        const uniqueNewData = newData.filter((sketch: Sketch) => !existingIds.has(sketch._id))
        
        if (uniqueNewData.length > 0) {
          setSketches(prev => [...prev, ...uniqueNewData])
          
          const newMasonryItems = uniqueNewData
            .filter((sketch: Sketch) => sketch.images && sketch.images.length > 0)
            .map((sketch: Sketch, index: number) => ({
              id: `${sketch._id}-${Date.now()}-${index}`, // Ensure unique IDs
              img: urlFor(sketch.images[0].asset).width(600).quality(80).url(),
              url: sketch.slug?.current ? `/sketch/${sketch.slug.current}` : '#',
              height: Math.floor(Math.random() * 200) + 350
            }))
          
          setAllItems(prev => [...prev, ...newMasonryItems])
          setHasMore(newData.length === 12)
        } else {
          // No new unique items found
          setHasMore(false)
        }
      } else {
        setHasMore(false)
      }
      
    } catch (err) {
      console.error('Failed to load more data:', err)
    } finally {
      setLoadingMore(false)
    }
  }, []) // Remove all dependencies to prevent useEffect array size changes

  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleScroll = () => {
      // Debounce scroll events to prevent multiple rapid calls
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const currentState = stateRef.current
        if (window.innerHeight + document.documentElement.scrollTop >= 
            document.documentElement.offsetHeight - 1000 && !currentState.loadingMore) {
          loadMoreData()
        }
      }, 100) // 100ms debounce
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [loadMoreData]) // Only loadMoreData as dependency, which is now stable

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