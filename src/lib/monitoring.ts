import { useEffect } from 'react'

// Declare global types for New Relic browser agent
declare global {
  interface Window {
    newrelic?: {
      setPageViewName: (name: string) => void
      addPageAction: (name: string, attributes?: Record<string, string | number | boolean>) => void
      setCustomAttribute: (name: string, value: string | number) => void
      noticeError: (error: Error) => void
    }
  }
}

/**
 * Custom hook for New Relic browser monitoring
 * Use this to track page views and custom events
 */
export const useNewRelic = (pageName: string) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.newrelic) {
      // Set custom page view name for better analytics
      window.newrelic.setPageViewName(pageName)
    }
  }, [pageName])
}

/**
 * Track custom events in New Relic
 */
export const trackEvent = (eventName: string, attributes?: Record<string, string | number | boolean>) => {
  if (typeof window !== 'undefined' && window.newrelic) {
    window.newrelic.addPageAction(eventName, attributes)
  }
}

/**
 * Set custom attributes for the current page
 */
export const setCustomAttribute = (name: string, value: string | number) => {
  if (typeof window !== 'undefined' && window.newrelic) {
    window.newrelic.setCustomAttribute(name, value)
  }
}

/**
 * Track errors in New Relic
 */
export const trackError = (error: Error) => {
  if (typeof window !== 'undefined' && window.newrelic) {
    window.newrelic.noticeError(error)
  }
}

/**
 * Gallery-specific tracking functions
 */
export const galleryTracking = {
  // Track when gallery loads
  trackGalleryLoad: (itemCount: number) => {
    trackEvent('gallery_loaded', { item_count: itemCount })
    setCustomAttribute('gallery_items', itemCount)
  },

  // Track when user opens a sketch modal
  trackSketchView: (sketchSlug: string) => {
    trackEvent('sketch_viewed', { sketch_slug: sketchSlug })
  },

  // Track when user clicks on gallery item
  trackGalleryItemClick: (itemId: string, itemType: string) => {
    trackEvent('gallery_item_clicked', { 
      item_id: itemId, 
      item_type: itemType 
    })
  },

  // Track image load performance
  trackImageLoad: (imageUrl: string, loadTime: number) => {
    trackEvent('image_loaded', { 
      image_url: imageUrl, 
      load_time_ms: loadTime 
    })
  },

  // Track modal interactions
  trackModalAction: (action: 'open' | 'close' | 'navigate', sketchSlug?: string) => {
    const attributes: Record<string, string | number | boolean> = { action }
    if (sketchSlug) {
      attributes.sketch_slug = sketchSlug
    }
    trackEvent('modal_action', attributes)
  }
}

/**
 * Performance tracking utilities
 */
export const performanceTracking = {
  // Track page load performance
  trackPageLoad: (pageName: string) => {
    if (typeof window !== 'undefined') {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        trackEvent('page_performance', {
          page: pageName,
          load_time: navigation.loadEventEnd - navigation.loadEventStart,
          dom_content_loaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          first_paint: navigation.responseEnd - navigation.requestStart
        })
      }
    }
  },

  // Track API response times
  trackAPICall: (endpoint: string, duration: number, success: boolean) => {
    trackEvent('api_call', {
      endpoint,
      duration_ms: duration,
      success
    })
  }
}