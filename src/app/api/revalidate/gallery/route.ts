import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // Optional: Add webhook secret validation for security
    const secret = request.nextUrl.searchParams.get('secret')
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET
    
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Revalidate the gallery page
    revalidatePath('/gallery')
    
    // Optionally revalidate the home page if it shows gallery content
    revalidatePath('/')
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      message: 'Gallery pages revalidated successfully' 
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ 
      message: 'Error revalidating', 
      error: err instanceof Error ? err.message : 'Unknown error' 
    }, { status: 500 })
  }
}

// Handle GET requests for testing
export async function GET() {
  return NextResponse.json({ 
    message: 'Gallery revalidation endpoint. Use POST to trigger revalidation.',
    usage: 'POST /api/revalidate/gallery?secret=YOUR_SECRET'
  })
}