import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: {
    default: 'Studio Youkai - Artistic Journey & Portfolio',
    template: '%s | Studio Youkai'
  },
  description: 'A showcase of artistic sketches and illustrations by Studio Youkai',
  generator: 'Next.js',
  applicationName: 'Studio Youkai Portfolio',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'art',
    'portfolio',
    'sketches',
    'illustrations',
    'digital art',
    'Studio Youkai'
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
  category: 'art',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#1f2937' }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body className={inter.className}>
        <main className="min-h-screen bg-base-200">
          {children}
        </main>
      </body>
    </html>
  )
}
