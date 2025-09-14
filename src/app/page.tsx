import SketchGallery from '@/components/Gallery'
import SanityConnectionTest from '@/components/SanityConnectionTest'
import SimpleDataTest from '@/components/SimpleDataTest'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <div className="hero min-h-[50vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Studio Youkai</h1>
            <p className="py-6">
              Welcome to my artistic journey. Explore my collection of sketches and illustrations.
            </p>
          </div>
        </div>
      </div>
      
      {/* Debug Components */}
      <div className="container mx-auto px-4 py-4 space-y-4">
        <SanityConnectionTest />
        <SimpleDataTest />
      </div>
      
      {/* Gallery Section */}
      <SketchGallery />
    </main>
  )
}
