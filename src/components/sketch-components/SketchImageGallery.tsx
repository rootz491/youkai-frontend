'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Container from '@/components/ui/Layout/Container'
import Section from '@/components/ui/Layout/Section'
import Button from '@/components/ui/Button/Button'
import Text from '@/components/ui/Typography/Text'
import { ProcessedSketchImage } from '@/services/sanity/sketch'

interface SketchImageGalleryProps {
  images: ProcessedSketchImage[]
  sketchTitle?: string
}

export function SketchImageGallery({ 
  images, 
  sketchTitle = "Sketch" 
}: SketchImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImageIndex(null)
  }

  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1)
    }
  }

  const goToNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') goToPrevious()
    if (e.key === 'ArrowRight') goToNext()
  }

  if (!images || images.length === 0) {
    return (
      <Section padding="lg">
        <Container>
          <div className="text-center py-12">
            <Text variant="muted">No images available for this sketch.</Text>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <>
      <Section padding="lg">
        <Container>
          <div className="grid gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.url}
                  alt={image.alt || `${sketchTitle} - Image ${index + 1}`}
                  width={image.width}
                  height={image.height}
                  className="w-full h-auto object-cover"
                  priority={index === 0}
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                
                {/* Caption if available */}
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <Text className="text-white text-sm">
                      {image.caption}
                    </Text>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <Button
            variant="ghost"
            className="absolute top-4 right-4 z-60 text-white hover:bg-white/20"
            onClick={closeLightbox}
          >
            <X size={24} />
          </Button>

          {/* Previous button */}
          {selectedImageIndex > 0 && (
            <Button
              variant="ghost"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-60 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
            >
              <ChevronLeft size={32} />
            </Button>
          )}

          {/* Next button */}
          {selectedImageIndex < images.length - 1 && (
            <Button
              variant="ghost"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-60 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
            >
              <ChevronRight size={32} />
            </Button>
          )}

          {/* Main image */}
          <div 
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImageIndex].url}
              alt={images[selectedImageIndex].alt || `${sketchTitle} - Image ${selectedImageIndex + 1}`}
              width={images[selectedImageIndex].width}
              height={images[selectedImageIndex].height}
              className="max-w-full max-h-[90vh] object-contain"
            />
            
            {/* Image caption in lightbox */}
            {images[selectedImageIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <Text className="text-white text-center">
                  {images[selectedImageIndex].caption}
                </Text>
              </div>
            )}
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full">
            <Text className="text-white text-sm">
              {selectedImageIndex + 1} of {images.length}
            </Text>
          </div>
        </div>
      )}
    </>
  )
}