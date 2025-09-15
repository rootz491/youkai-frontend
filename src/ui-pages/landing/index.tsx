'use client'

import { HeroSection } from '@/components/landing-components/HeroSection'
import { FeaturesSection } from '@/components/landing-components/FeaturesSection'
import Footer from '@/components/common/Footer'

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'Contact', href: '#' }
]

export default function Landing() {
  const handleAboutClick = () => {
    // TODO: Navigate to about page or show about modal
    console.log('About button clicked')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <HeroSection onSecondaryButtonClick={handleAboutClick} />

      <FeaturesSection />

      <Footer 
        title="Studio Youkai"
        description="Creating art that speaks to the soul. Every sketch tells a story, every illustration captures a moment."
        links={socialLinks}
        copyright="© 2025 Studio Youkai. All rights reserved."
        variant="dark"
      />
    </main>
  )
}
