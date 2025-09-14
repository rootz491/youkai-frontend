import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'
import type { QueryParams } from 'next-sanity'

export function useSanityData<T>(query: string, params?: QueryParams) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = params 
          ? await client.fetch<T>(query, params)
          : await client.fetch<T>(query)
        setData(result)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [query, params])

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = params 
        ? await client.fetch<T>(query, params)
        : await client.fetch<T>(query)
      setData(result)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}
