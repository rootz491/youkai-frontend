'use client'

import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'

export default function SimpleDataTest() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🚀 Starting simple fetch test...')
        
        // Test 1: Fetch any document
        const anyDoc = await client.fetch('*[0]')
        console.log('📄 Any document:', anyDoc)
        
        // Test 2: Fetch all documents
        const allDocs = await client.fetch('*[0...3]')
        console.log('📄 All documents (first 3):', allDocs)
        
        // Test 3: Fetch sketch documents
        const sketches = await client.fetch('*[_type == "sketch"]')
        console.log('🎨 Sketch documents:', sketches)
        
        setData({
          anyDoc,
          allDocs,
          sketches,
          sketchCount: sketches?.length || 0
        })
        
      } catch (err) {
        console.error('❌ Fetch failed:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title">🧪 Simple Data Test</h3>
          <span className="loading loading-spinner loading-sm"></span>
          <p>Fetching data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-error">🧪 Simple Data Test - ERROR</h3>
          <div className="alert alert-error">
            <span>Error: {error}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h3 className="card-title text-success">🧪 Simple Data Test - SUCCESS</h3>
        
        <div className="stats stats-vertical lg:stats-horizontal shadow">
          <div className="stat">
            <div className="stat-title">Sketches Found</div>
            <div className="stat-value text-primary">{data.sketchCount}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Documents</div>
            <div className="stat-value text-secondary">{data.allDocs?.length || 0}</div>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            📊 Raw Data (Click to expand)
          </div>
          <div className="collapse-content">
            <pre className="text-xs overflow-auto max-h-96 bg-base-300 p-4 rounded">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
