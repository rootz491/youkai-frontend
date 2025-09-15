import { client, urlFor } from '@/lib/sanity'
import { Sketch } from '@/types/sketch'

// Configuration - easily changeable pagination limit
const PAGINATION_LIMIT = 10;

// Sanity query for initial sketches (no pagination)
const getInitialSketchesQuery = (limit = PAGINATION_LIMIT) => {
  return `*[_type == "sketch"] | order(_id) [0...${limit}] {
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

// Sanity query for paginated sketches using _id
const getPaginatedSketchesQuery = (lastId: string, limit = PAGINATION_LIMIT) => {
  return `*[_type == "sketch" && _id > $lastId] | order(_id) [0...${limit}] {
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

// Interface for processed masonry items
export interface MasonryItem {
  id: string
  img: string
  url: string
  height: number
}

// Interface for gallery data response
export interface GalleryDataResponse {
  sketches: Sketch[]
  masonryItems: MasonryItem[]
  hasMore: boolean
}

/**
 * Fetch initial gallery data from Sanity
 */
export async function fetchInitialGalleryData(): Promise<GalleryDataResponse> {
  try {
    const data = await client.fetch(getInitialSketchesQuery())
    
    if (data && data.length > 0) {
      const masonryItems = convertSketchesToMasonryItems(data, 'initial')
      
      return {
        sketches: data,
        masonryItems,
        hasMore: data.length === PAGINATION_LIMIT
      }
    } else {
      return {
        sketches: [],
        masonryItems: [],
        hasMore: false
      }
    }
  } catch (error) {
    console.error('Gallery Service: Failed to fetch initial data:', error)
    throw new Error('Unable to load gallery data')
  }
}

/**
 * Fetch more gallery data for infinite scroll
 */
export async function fetchMoreGalleryData(
  existingSketches: Sketch[]
): Promise<GalleryDataResponse> {
  try {
    if (existingSketches.length === 0) {
      throw new Error('No existing sketches to paginate from')
    }

    const lastSketch = existingSketches[existingSketches.length - 1]
    const newData = await client.fetch(getPaginatedSketchesQuery(lastSketch._id), { lastId: lastSketch._id })
    
    if (newData && newData.length > 0) {
      // Filter out any sketches that already exist to prevent duplicates
      const existingIds = new Set(existingSketches.map(sketch => sketch._id))
      const uniqueNewData = newData.filter((sketch: Sketch) => !existingIds.has(sketch._id))
      
      if (uniqueNewData.length > 0) {
        const newMasonryItems = convertSketchesToMasonryItems(uniqueNewData, 'paginated')
        
        return {
          sketches: uniqueNewData,
          masonryItems: newMasonryItems,
          hasMore: newData.length === PAGINATION_LIMIT
        }
      } else {
        // No new unique items found
        return {
          sketches: [],
          masonryItems: [],
          hasMore: false
        }
      }
    } else {
      return {
        sketches: [],
        masonryItems: [],
        hasMore: false
      }
    }
  } catch (error) {
    console.error('Gallery Service: Failed to fetch more data:', error)
    throw new Error('Failed to load more gallery data')
  }
}

/**
 * Convert Sanity sketches to masonry items
 */
function convertSketchesToMasonryItems(
  sketches: Sketch[], 
  type: 'initial' | 'paginated'
): MasonryItem[] {
  return sketches
    .filter((sketch: Sketch) => sketch.images && sketch.images.length > 0)
    .map((sketch: Sketch, index: number) => ({
      id: `${sketch._id}-${type}-${Date.now()}-${index}`, // Ensure unique IDs
      img: urlFor(sketch.images[0].asset).width(600).quality(80).url(),
      url: sketch.slug?.current ? `/sketch/${sketch.slug.current}` : '#',
      height: Math.floor(Math.random() * 200) + 350 // Random height between 350-550
    }))
}

/**
 * Get total count of published sketches (for statistics)
 */
export async function getSketchCount(): Promise<number> {
  try {
    const result = await client.fetch(`count(*[_type == "sketch"])`)
    return result || 0
  } catch (error) {
    console.error('Gallery Service: Failed to get sketch count:', error)
    return 0
  }
}

/**
 * Search sketches by title or tags
 */
export async function searchSketches(query: string, limit = PAGINATION_LIMIT): Promise<Sketch[]> {
  try {
    const searchQuery = `*[_type == "sketch" && (
      title match "${query}*" || 
      tags[] match "${query}*"
    )] | order(_id)[0...${limit}] {
      _id,
      title,
      description,
      images,
      tags,
      createdAt,
      featured,
      slug
    }`
    
    const data = await client.fetch(searchQuery)
    return data || []
  } catch (error) {
    console.error('Gallery Service: Failed to search sketches:', error)
    return []
  }
}