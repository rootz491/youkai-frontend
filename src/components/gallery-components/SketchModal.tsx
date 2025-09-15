'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { fetchSketchBySlug, getSketchNavigation } from '@/services/sanity/sketch'
import { SketchImageGallery } from '@/components/sketch-components/SketchImageGallery'
import Button from '@/components/ui/Button/Button'
import { LoadingState } from '@/components/ui/States'
import Heading from '@/components/ui/Typography/Heading'
import Text from '@/components/ui/Typography/Text'
import type { Sketch } from '@/types/sketch'
import type { ProcessedSketchImage } from '@/services/sanity/sketch'

interface SketchModalProps {
  slug: string
  onClose: () => void
}

export function SketchModal({ slug, onClose }: SketchModalProps) {
  const router = useRouter()
  const [sketch, setSketch] = useState<Sketch | null>(null)
  const [images, setImages] = useState<ProcessedSketchImage[]>([])
  const [navigation, setNavigation] = useState<{ previous: Sketch | null; next: Sketch | null }>({
    previous: null,
    next: null
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSketch = async () => {
      try {
        setLoading(true)
        setError(null)

        const sketchData = await fetchSketchBySlug(slug)
        
        if (!sketchData) {
          setError('Sketch not found')
          return
        }

        setSketch(sketchData.sketch)
        setImages(sketchData.processedImages)

        // Fetch navigation
        const nav = await getSketchNavigation(sketchData.sketch._id)
        setNavigation(nav)

      } catch (err) {
        console.error('Failed to load sketch:', err)
        setError('Failed to load sketch')
      } finally {
        setLoading(false)
      }
    }

    loadSketch()
  }, [slug])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
    if (e.key === 'ArrowLeft' && navigation.previous) {
      router.push(`/gallery?sketch=${navigation.previous.slug?.current}`)
    }
    if (e.key === 'ArrowRight' && navigation.next) {
      router.push(`/gallery?sketch=${navigation.next.slug?.current}`)
    }
  }, [navigation, onClose, router])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="flex h-full">
        {/* Modal Content */}
        <div className="flex-1 flex flex-col max-h-full overflow-hidden bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onClose}
                className="flex items-center gap-2"
              >
                <ChevronLeft size={20} />
                Back to Gallery
              </Button>
              
              {sketch && (
                <Link href={`/sketch/${slug}`}>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <ExternalLink size={16} />
                    Full Page
                  </Button>
                </Link>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={onClose}
              className="p-2"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center h-full">
                <LoadingState message="Loading sketch..." />
              </div>
            )}

            {error && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Text variant="error" className="text-lg mb-4">{error}</Text>
                  <Button onClick={onClose} variant="primary">
                    Back to Gallery
                  </Button>
                </div>
              </div>
            )}

            {sketch && !loading && !error && (
              <div>
                {/* Sketch Info */}
                <div className="p-6 border-b border-gray-100">
                  <Heading level={1} className="text-3xl md:text-4xl mb-4">
                    {sketch.title || 'Untitled Sketch'}
                  </Heading>

                  {sketch.description && (
                    <Text className="text-lg mb-4 leading-relaxed" variant="muted">
                      {sketch.description}
                    </Text>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {sketch.createdAt && (
                      <Text variant="muted" className="text-sm">
                        Created on {formatDate(sketch.createdAt)}
                      </Text>
                    )}

                    {sketch.tags && sketch.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {sketch.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Gallery */}
                <div className="p-6">
                  <SketchImageGallery 
                    images={images}
                    sketchTitle={sketch.title}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation Footer */}
          {(navigation.previous || navigation.next) && (
            <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex-1">
                {navigation.previous && (
                  <Button
                    variant="ghost"
                    onClick={() => router.push(`/gallery?sketch=${navigation.previous?.slug?.current}`)}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft size={16} />
                    <div className="text-left">
                      <Text className="text-sm" variant="muted">Previous</Text>
                      <Text className="text-sm font-medium">
                        {navigation.previous.title || 'Untitled'}
                      </Text>
                    </div>
                  </Button>
                )}
              </div>

              <div className="flex-1 text-right">
                {navigation.next && (
                  <Button
                    variant="ghost"
                    onClick={() => router.push(`/gallery?sketch=${navigation.next?.slug?.current}`)}
                    className="flex items-center gap-2 ml-auto"
                  >
                    <div className="text-right">
                      <Text className="text-sm" variant="muted">Next</Text>
                      <Text className="text-sm font-medium">
                        {navigation.next.title || 'Untitled'}
                      </Text>
                    </div>
                    <ChevronRight size={16} />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}