'use client'

import Link from 'next/link'

export default function Landing() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="studio-youkai-title text-6xl md:text-8xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
            Studio Youkai
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Welcome to my artistic journey. 
            <br />
            Explore my collection of sketches and illustrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/gallery"
              className="px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300 text-lg font-medium text-center"
            >
              Explore Gallery
            </Link>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 text-lg font-medium">
              About Me
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What You&apos;ll Find</h2>
            <p className="text-xl text-gray-600">Discover the art that speaks to your soul</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">Original Sketches</h3>
              <p className="text-gray-600">Hand-drawn artwork that captures moments and emotions</p>
            </div>
            
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2">Digital Art</h3>
              <p className="text-gray-600">Modern illustrations blending traditional and digital techniques</p>
            </div>
            
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Story Illustrations</h3>
              <p className="text-gray-600">Visual narratives that bring stories to life</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="studio-youkai-title text-2xl font-bold mb-4">Studio Youkai</h3>
          <p className="text-gray-400 mb-6">
            Creating art that speaks to the soul. Every sketch tells a story, every illustration captures a moment.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Behance</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-500">
            © 2025 Studio Youkai. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
