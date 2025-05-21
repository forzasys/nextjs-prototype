import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1');

  const response = NextResponse.next();

  // TODO now is demo, need to set cache control in "real life", 
  const cacheMap: Record<number, string> = {
    1: 's-maxage=30, stale-while-revalidate=60',
    2: 's-maxage=600, stale-while-revalidate=1200',
  };

  const cacheControl = cacheMap[page] || 'no-store';

  response.headers.set('Cache-Control', cacheControl);
  response.headers.set('Vary', 'Cookie');

  return response;
}

export const config = {
  matcher: ['/highlights'],
};