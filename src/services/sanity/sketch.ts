import { client, urlFor } from '@/lib/sanity'
import { Sketch, SketchImage } from '@/types/sketch'

// Interface for sketch slug response
interface SketchSlugResponse {
  slug: {
    current: string
  }
}

// Sanity query for fetching a single sketch by slug
const getSketchBySlugQuery = () => {
  return `*[_type == "sketch" && slug.current == $slug][0] {
    _id,
    title,
    description,
    images[] {
      asset,
      alt,
      caption
    },
    tags,
    createdAt,
    featured,
    slug
  }`
}

// Query for getting all sketch slugs (for static generation)
const getAllSketchSlugsQuery = () => {
  return `*[_type == "sketch" && defined(slug.current)] {
    slug
  }`
}

// Query for getting related sketches (by tags)
const getRelatedSketchesQuery = (tags: string[], currentId: string, limit = 4) => {
  const tagsFilter = tags.map(tag => `"${tag}" in tags`).join(' || ')
  
  return `*[_type == "sketch" && _id != $currentId && (${tagsFilter})] | order(_id) [0...${limit}] {
    _id,
    title,
    images[0] {
      asset,
      alt
    },
    slug
  }`
}

// Interface for sketch slug response
interface SketchSlugResponse {
  slug: {
    current: string
  }
}

// Interface for processed sketch image
export interface ProcessedSketchImage {
  url: string
  alt?: string
  caption?: string
  width: number
  height: number
}

// Interface for sketch detail response
export interface SketchDetailResponse {
  sketch: Sketch
  processedImages: ProcessedSketchImage[]
  relatedSketches: Sketch[]
}

/**
 * Fetch detailed sketch data by slug
 */
export async function fetchSketchBySlug(slug: string): Promise<SketchDetailResponse | null> {
  try {
    const sketch = await client.fetch(getSketchBySlugQuery(), { slug })
    
    if (!sketch) {
      return null
    }

    // Process images with different sizes for detail view
    const processedImages = processImageDetails(sketch.images || [])
    
    // Fetch related sketches based on tags
    const relatedSketches = sketch.tags && sketch.tags.length > 0 
      ? await fetchRelatedSketches(sketch.tags, sketch._id)
      : []

    return {
      sketch,
      processedImages,
      relatedSketches
    }
  } catch (error) {
    console.error('Sketch Service: Failed to fetch sketch by slug:', error)
    return null
  }
}

/**
 * Fetch all sketch slugs for static generation
 */
export async function fetchAllSketchSlugs(): Promise<string[]> {
  try {
    const sketches: SketchSlugResponse[] = await client.fetch(getAllSketchSlugsQuery())
    return sketches
      .filter((sketch: SketchSlugResponse) => sketch.slug?.current)
      .map((sketch: SketchSlugResponse) => sketch.slug.current)
  } catch (error) {
    console.error('Sketch Service: Failed to fetch sketch slugs:', error)
    return []
  }
}

/**
 * Fetch related sketches based on tags
 */
export async function fetchRelatedSketches(tags: string[], currentId: string): Promise<Sketch[]> {
  try {
    if (!tags || tags.length === 0) {
      return []
    }

    const relatedSketches = await client.fetch(getRelatedSketchesQuery(tags, currentId), { 
      currentId 
    })
    
    return relatedSketches || []
  } catch (error) {
    console.error('Sketch Service: Failed to fetch related sketches:', error)
    return []
  }
}

/**
 * Process sketch images for detail view with multiple sizes
 */
function processImageDetails(images: SketchImage[]): ProcessedSketchImage[] {
  return images.map((image, index) => {
    const baseUrl = urlFor(image.asset)
    
    return {
      url: baseUrl.width(1200).quality(90).url(),
      alt: image.alt || `Sketch image ${index + 1}`,
      caption: image.caption,
      width: 1200,
      height: 800 // This could be dynamic based on image metadata
    }
  })
}

/**
 * Check if a sketch exists by slug (for validation)
 */
export async function checkSketchExists(slug: string): Promise<boolean> {
  try {
    const result = await client.fetch(
      `count(*[_type == "sketch" && slug.current == $slug])`,
      { slug }
    )
    return result > 0
  } catch (error) {
    console.error('Sketch Service: Failed to check sketch existence:', error)
    return false
  }
}

/**
 * Get next and previous sketches for navigation
 */
export async function getSketchNavigation(currentId: string): Promise<{
  previous: Sketch | null
  next: Sketch | null
}> {
  try {
    const [previous, next] = await Promise.all([
      // Get previous sketch
      client.fetch(
        `*[_type == "sketch" && _id < $currentId] | order(_id desc)[0] {
          _id, title, slug
        }`,
        { currentId }
      ),
      // Get next sketch
      client.fetch(
        `*[_type == "sketch" && _id > $currentId] | order(_id asc)[0] {
          _id, title, slug
        }`,
        { currentId }
      )
    ])

    return {
      previous: previous || null,
      next: next || null
    }
  } catch (error) {
    console.error('Sketch Service: Failed to get sketch navigation:', error)
    return { previous: null, next: null }
  }
}