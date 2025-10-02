import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const origin = req.headers.get('origin') || '*'
  const requestHeaders = req.headers.get('access-control-request-headers') || 'Content-Type, Authorization'

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    const res = new NextResponse(null, { status: 204 })
    res.headers.set('Access-Control-Allow-Origin', origin)
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.headers.set('Access-Control-Allow-Headers', requestHeaders)
    res.headers.set('Access-Control-Max-Age', '86400')
    return res
  }

  // For actual requests, ensure CORS/response headers are present
  const res = NextResponse.next()
  res.headers.set('Access-Control-Allow-Origin', origin)
  res.headers.set('Access-Control-Expose-Headers', 'Content-Disposition')
  return res
}

export const config = {
  matcher: ['/api/:path*'],
}
