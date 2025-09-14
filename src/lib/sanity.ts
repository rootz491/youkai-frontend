import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4ggmuz20'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03'

export const client = createClient({
  projectId,
  dataset,
  useCdn: false, // Disable CDN to use direct API
  apiVersion,
  perspective: 'published', // Ensure we're getting published content
})

// Log configuration for debugging
if (typeof window !== 'undefined') {
  console.log('🔧 Sanity Client Config:', {
    projectId,
    dataset,
    apiVersion,
    url: `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`
  })
}

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

// Test connection function
export const testConnection = async () => {
  try {
    const result = await client.fetch('*[_type == "sketch"][0]')
    console.log('✅ Sanity connection successful:', result ? 'Data found' : 'No data yet')
    return true
  } catch (error) {
    console.error('❌ Sanity connection failed:', error)
    return false
  }
}

// GROQ queries
export const sketchesQuery = `
  *[_type == "sketch"] | order(createdAt desc) {
    _id,
    title,
    description,
    images,
    tags,
    createdAt,
    featured,
    slug
  }
`

export const featuredSketchesQuery = `
  *[_type == "sketch" && featured == true] | order(createdAt desc) {
    _id,
    title,
    description,
    images,
    tags,
    createdAt,
    featured,
    slug
  }
`

// Additional useful queries
export const singleSketchQuery = `
  *[_type == "sketch" && slug.current == $slug][0] {
    _id,
    title,
    description,
    images,
    tags,
    createdAt,
    featured,
    slug
  }
`