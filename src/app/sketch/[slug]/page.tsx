import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchSketchBySlug, fetchAllSketchSlugs, getSketchNavigation } from '@/services/sanity/sketch'
import { SketchHeader } from '@/components/sketch-components/SketchHeader'
import { SketchImageGallery } from '@/components/sketch-components/SketchImageGallery'
import { SketchNavigation } from '@/components/sketch-components/SketchNavigation'
import { RelatedSketches } from '@/components/sketch-components/RelatedSketches'
import Footer from '@/components/common/Footer'

interface SketchPageProps {
  params: {
    slug: string
  }
}

// Generate static params for ISR
export async function generateStaticParams() {
  try {
    const slugs = await fetchAllSketchSlugs()
    return slugs.map((slug) => ({
      slug: slug,
    }))
  } catch (error) {
    console.error('Failed to generate static params:', error)
    return []
  }
}

// Generate metadata for each sketch
export async function generateMetadata({ params }: SketchPageProps): Promise<Metadata> {
  try {
    const sketchData = await fetchSketchBySlug(params.slug)
    
    if (!sketchData) {
      return {
        title: 'Sketch Not Found | Studio Youkai',
        description: 'The requested sketch could not be found.'
      }
    }

    const { sketch, processedImages } = sketchData
    const firstImage = processedImages[0]

    return {
      title: `${sketch.title || 'Untitled Sketch'} | Studio Youkai`,
      description: sketch.description || 'Original artwork from Studio Youkai',
      keywords: sketch.tags ? sketch.tags.join(', ') : undefined,
      openGraph: {
        title: sketch.title || 'Untitled Sketch',
        description: sketch.description || 'Original artwork from Studio Youkai',
        type: 'article',
        publishedTime: sketch.createdAt,
        images: firstImage ? [
          {
            url: firstImage.url,
            width: firstImage.width,
            height: firstImage.height,
            alt: firstImage.alt || sketch.title || 'Sketch'
          }
        ] : undefined,
        siteName: 'Studio Youkai'
      },
      twitter: {
        card: 'summary_large_image',
        title: sketch.title || 'Untitled Sketch',
        description: sketch.description || 'Original artwork from Studio Youkai',
        images: firstImage ? [firstImage.url] : undefined
      }
    }
  } catch (error) {
    console.error('Failed to generate metadata:', error)
    return {
      title: 'Sketch | Studio Youkai',
      description: 'Original artwork from Studio Youkai'
    }
  }
}

export default async function SketchPage({ params }: SketchPageProps) {
  try {
    // Fetch main sketch data
    const sketchData = await fetchSketchBySlug(params.slug)
    
    if (!sketchData) {
      notFound()
    }

    const { sketch, processedImages, relatedSketches } = sketchData

    // Fetch navigation sketches
    const navigation = await getSketchNavigation(sketch._id)

    return (
      <main className="min-h-screen bg-gray-50">
        {/* Sketch Header */}
        <SketchHeader
          title={sketch.title}
          description={sketch.description}
          createdAt={sketch.createdAt}
          tags={sketch.tags}
        />

        {/* Image Gallery */}
        <SketchImageGallery 
          images={processedImages}
          sketchTitle={sketch.title}
        />

        {/* Navigation */}
        <SketchNavigation
          previousSketch={navigation.previous}
          nextSketch={navigation.next}
        />

        {/* Related Sketches */}
        <RelatedSketches sketches={relatedSketches} />

        {/* Footer */}
        <Footer 
          title="Studio Youkai"
          description="Creating art that speaks to the soul. Every sketch tells a story, every illustration captures a moment."
          variant="light"
        />
      </main>
    )
  } catch (error) {
    console.error('Error rendering sketch page:', error)
    notFound()
  }
}