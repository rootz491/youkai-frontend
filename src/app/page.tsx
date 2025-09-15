import type { Metadata } from 'next'
import Landing from '@/pages/landing'

export const metadata: Metadata = {
  title: 'Studio Youkai - Artistic Journey & Sketch Portfolio',
  description: 'Welcome to Studio Youkai, a curated collection of artistic sketches and illustrations. Explore unique artworks that capture moments and emotions through creative expression.',
  keywords: [
    'art portfolio',
    'sketches',
    'illustrations',
    'digital art',
    'Studio Youkai',
    'artistic journey',
    'creative expression',
    'artwork collection'
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
    canonical: '/',
  },
  openGraph: {
    title: 'Studio Youkai - Artistic Journey & Sketch Portfolio',
    description: 'Explore a curated collection of artistic sketches and illustrations that capture moments and emotions through creative expression.',
    url: '/',
    siteName: 'Studio Youkai',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Studio Youkai - Art Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Youkai - Artistic Journey & Sketch Portfolio',
    description: 'Explore a curated collection of artistic sketches and illustrations that capture moments and emotions.',
    images: ['/og-image.jpg'],
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

export default function Home() {
  return <Landing />
}
