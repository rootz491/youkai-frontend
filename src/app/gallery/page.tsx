import type { Metadata } from 'next'
import GalleryPage from '@/ui-pages/gallery'

export const metadata: Metadata = {
  title: 'Art Gallery - Studio Youkai | Browse Complete Artwork Collection',
  description: 'Browse the complete collection of artistic sketches and illustrations by Studio Youkai. Discover unique artworks with infinite scroll through our curated gallery of creative expressions.',
  keywords: [
    'art gallery',
    'artwork collection',
    'sketches gallery',
    'illustrations',
    'digital art gallery',
    'Studio Youkai gallery',
    'art browse',
    'creative portfolio',
    'artistic works'
  ],
  authors: [{ name: 'Studio Youkai' }],
  creator: 'Studio Youkai',
  publisher: 'Studio Youkai',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://youkai-frontend.vercel.app'),
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Art Gallery - Studio Youkai | Browse Complete Artwork Collection',
    description: 'Browse the complete collection of artistic sketches and illustrations. Discover unique artworks through our curated gallery of creative expressions.',
    url: '/gallery',
    siteName: 'Studio Youkai',
    images: [
      {
        url: '/og-gallery.jpg',
        width: 1200,
        height: 630,
        alt: 'Studio Youkai Art Gallery - Complete Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Art Gallery - Studio Youkai | Browse Complete Artwork Collection',
    description: 'Browse the complete collection of artistic sketches and illustrations. Discover unique artworks through our curated gallery.',
    images: ['/og-gallery.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function Gallery() {
  return <GalleryPage />
}
