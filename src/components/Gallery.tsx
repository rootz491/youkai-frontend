'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import { Sketch } from '@/types/sketch'

// Simple query to test
const simpleSketchQuery = `*[_type == "sketch"]{
  _id,
  title,
  description,
  images,
  tags,
  createdAt,
  featured,
  slug
}`

export default function Gallery() {
  const [sketches, setSketches] = useState<Sketch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSketches = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('🎨 Gallery: Starting fetch...')
        
        // First, try a simple query
        const data = await client.fetch(simpleSketchQuery)
        console.log('🎨 Gallery: Fetched data:', data)
        
        setSketches(data || [])
        
      } catch (error) {
        console.error('❌ Gallery: Error fetching sketches:', error)
        setError('Failed to load sketches. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchSketches()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg mb-4"></div>
          <p className="text-sm opacity-70">Loading your gallery...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="text-error text-lg mb-2">⚠️</div>
          <p className="text-error">{error}</p>
          <button 
            className="btn btn-outline btn-sm mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (sketches.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-lg font-medium mb-2">No sketches found</h3>
          <p className="text-sm opacity-70">Start creating content in your Sanity CMS to see it here!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Gallery</h2>
        <p className="text-base-content/70">
          Showcasing {sketches.length} sketch{sketches.length !== 1 ? 'es' : ''}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sketches.map((sketch) => (
          <div key={sketch._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            {sketch.images?.[0] && (
              <figure className="relative h-64 overflow-hidden">
                <Image
                  src={urlFor(sketch.images[0].asset).width(400).height(300).url()}
                  alt={sketch.images[0].alt || sketch.title || 'Sketch'}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {sketch.featured && (
                  <div className="badge badge-secondary absolute top-2 right-2">
                    ⭐ Featured
                  </div>
                )}
              </figure>
            )}
            <div className="card-body">
              {sketch.title && (
                <h2 className="card-title text-lg">{sketch.title}</h2>
              )}
              {sketch.description && (
                <p className="text-sm opacity-70 line-clamp-3">{sketch.description}</p>
              )}
              {sketch.tags && sketch.tags.length > 0 && (
                <div className="card-actions justify-end flex-wrap mt-2">
                  {sketch.tags.map((tag, index) => (
                    <div key={index} className="badge badge-outline badge-sm">
                      {tag}
                    </div>
                  ))}
                </div>
              )}
              <div className="text-xs opacity-50 mt-2 flex items-center justify-between">
                <span>{new Date(sketch.createdAt).toLocaleDateString()}</span>
                {sketch.slug?.current && (
                  <span className="text-primary">View Details →</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}