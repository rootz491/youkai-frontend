'use client'

import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'

interface DebugInfo {
  projectId: string
  dataset: string
  apiVersion: string
  connectionStatus: 'testing' | 'success' | 'failed'
  error?: string
  dataCount?: number
}

export default function SanityConnectionTest() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4ggmuz20',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
    connectionStatus: 'testing'
  })

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('🔍 Testing Sanity connection with config:', {
          projectId: debugInfo.projectId,
          dataset: debugInfo.dataset,
          apiVersion: debugInfo.apiVersion
        })

        // Test basic connection
        const allDocs = await client.fetch('*[0...1]')
        console.log('📄 Sample documents:', allDocs)

        // Test sketch documents specifically
        const sketches = await client.fetch('*[_type == "sketch"]')
        console.log('🎨 Sketch documents:', sketches)

        setDebugInfo(prev => ({
          ...prev,
          connectionStatus: 'success',
          dataCount: sketches.length
        }))
      } catch (error) {
        console.error('❌ Sanity connection failed:', error)
        setDebugInfo(prev => ({
          ...prev,
          connectionStatus: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        }))
      }
    }
    
    testConnection()
  }, [debugInfo.projectId, debugInfo.dataset, debugInfo.apiVersion])

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h3 className="card-title">🔧 Sanity Connection Debug</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="stat bg-base-200 rounded">
            <div className="stat-title">Project ID</div>
            <div className="stat-value text-sm">{debugInfo.projectId}</div>
          </div>
          <div className="stat bg-base-200 rounded">
            <div className="stat-title">Dataset</div>
            <div className="stat-value text-sm">{debugInfo.dataset}</div>
          </div>
          <div className="stat bg-base-200 rounded">
            <div className="stat-title">API Version</div>
            <div className="stat-value text-sm">{debugInfo.apiVersion}</div>
          </div>
        </div>

        {debugInfo.connectionStatus === 'testing' && (
          <div className="alert alert-info">
            <span className="loading loading-spinner loading-sm"></span>
            Testing Sanity connection...
          </div>
        )}

        {debugInfo.connectionStatus === 'success' && (
          <div className="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>✅ Connection successful! Found {debugInfo.dataCount} sketch documents.</span>
          </div>
        )}

        {debugInfo.connectionStatus === 'failed' && (
          <div className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <span>❌ Connection failed: {debugInfo.error}</span>
              <div className="text-xs mt-2 opacity-70">
                Check your project ID, dataset, and make sure your Sanity project is accessible.
              </div>
            </div>
          </div>
        )}

        <div className="text-xs opacity-60 mt-4">
          Open browser console (F12) to see detailed logs.
        </div>
      </div>
    </div>
  )
}
