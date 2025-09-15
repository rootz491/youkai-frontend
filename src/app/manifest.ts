import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Studio Youkai - Art Portfolio',
    short_name: 'Studio Youkai',
    description: 'A curated collection of artistic sketches and illustrations by Studio Youkai',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#1f2937',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['art', 'portfolio', 'gallery', 'creative'],
    lang: 'en',
    orientation: 'portrait-primary',
  }
}