'use client'

import { PageWrapper } from '@/components/ui/Layout'
import { AboutHero } from '@/components/about-components'
import Footer from '@/components/common/Footer'

export default function AboutPage() {
  return (
    <>
      <PageWrapper>
        <AboutHero />
      </PageWrapper>
      <Footer />
    </>
  )
}