import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // Optional: Add webhook secret validation
    const secret = request.nextUrl.searchParams.get('secret')
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET
    
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Get the tag to revalidate from the request body
    const body = await request.json()
    const { tag } = body
    
    if (tag) {
      revalidateTag(tag)
      return NextResponse.json({ 
        revalidated: true, 
        tag,
        now: Date.now() 
      })
    }
    
    return NextResponse.json({ 
      message: 'No tag specified' 
    }, { status: 400 })
    
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ 
      message: 'Error revalidating', 
      error: err instanceof Error ? err.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Sanity webhook revalidation endpoint',
    usage: 'POST /api/revalidate with { "tag": "gallery" } in body'
  })
}