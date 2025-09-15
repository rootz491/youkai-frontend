'use client'

import { useRouter } from 'next/navigation'
import { HeroSection } from '@/components/landing-components/HeroSection'
import { FeaturesSection } from '@/components/landing-components/FeaturesSection'
import Footer from '@/components/common/Footer'

const socialLinks = [
  { label: 'Instagram', href: '#1' },
  { label: 'Twitter', href: '#2' },
  { label: 'Behance', href: '#3' },
  { label: 'Contact', href: '#4' }
]

export default function Landing() {
  const router = useRouter()
  
  const handleAboutClick = () => {
    router.push('/about')
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
      />
    </main>
  )
}
