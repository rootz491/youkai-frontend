import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Youkai - Sketch Portfolio',
  description: 'A showcase of my artistic sketches and illustrations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <main className="min-h-screen bg-base-200">
          {children}
        </main>
      </body>
    </html>
  )
}
