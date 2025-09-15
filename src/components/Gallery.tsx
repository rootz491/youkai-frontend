'use client'

import { useState, useEffect } from 'react'
import { client, urlFor } from '@/lib/sanity'
import { Sketch } from '@/types/sketch'
import Masonry from './Masonry'

// Sanity query to fetch sketch data
const sketchQuery = `*[_type == "sketch"] | order(createdAt desc) {
  _id,
  title,
  description,
  images,
  tags,
  createdAt,
  featured,
  slug
}`

// Demo items for fallback
const demoItems = [
  {
    id: 'demo-1',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    url: '#',
    height: 450
  },
  {
    id: 'demo-2', 
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    url: '#',
    height: 350
  },
  {
    id: 'demo-3',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80', 
    url: '#',
    height: 400
  },
  {
    id: 'demo-4',
    img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
    url: '#', 
    height: 500
  },
  {
    id: 'demo-5',
    img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
    url: '#',
    height: 380
  },
  {
    id: 'demo-6',
    img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80',
    url: '#',
    height: 420
  }
]

export default function Gallery() {
  const [sketches, setSketches] = useState<Sketch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSketches = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const data = await client.fetch(sketchQuery)
        setSketches(data || [])
        
      } catch (err) {
        console.error('Gallery: Failed to fetch sketches:', err)
        setError('Unable to load gallery data')
      } finally {
        setLoading(false)
      }
    }

    fetchSketches()
  }, [])

  const getMasonryItems = () => {
    if (sketches.length > 0) {
      return sketches
        .filter(sketch => sketch.images && sketch.images.length > 0)
        .map(sketch => ({
          id: sketch._id,
          img: urlFor(sketch.images[0].asset)
            .width(600)
            .quality(80)
            .url(),
          url: sketch.slug?.current ? `/sketch/${sketch.slug.current}` : '#',
          height: Math.floor(Math.random() * 200) + 350 // Random height between 350-550
        }))
    }
    return demoItems
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-4xl">⚠️</div>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const masonryItems = getMasonryItems()

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Art Gallery
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {sketches.length > 0 
            ? `Discover ${sketches.length} unique artworks in our curated collection`
            : 'A curated collection of artistic inspirations'
          }
        </p>
      </div>
      
      <div className="h-[70vh] w-full">
        <Masonry 
          items={masonryItems}
          ease="power3.out"
          duration={0.8}
          stagger={0.12}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.96}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </div>
    </div>
  )
}