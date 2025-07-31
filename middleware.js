import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function middleware(request) {
  // Log all visits including bots directly to database
  const logVisit = async () => {
    try {
      // Try to get the original path from the URL
      const url = new URL(request.url);
      const fullUrl = url.pathname + url.search;
      
      // Debug logging
      console.log('Request URL:', request.url);
      console.log('NextURL pathname:', request.nextUrl.pathname);
      console.log('URL pathname:', url.pathname);
      console.log('Full URL to log:', fullUrl);
      
      await sql`
        INSERT INTO therapy_appointments (path, user_agent, ip_address, request_method)
        VALUES (
          ${fullUrl}, 
          ${request.headers.get('user-agent') || 'Unknown'}, 
          ${request.headers.get('x-forwarded-for') || request.ip || 'Unknown'}, 
          ${request.method}
        )
      `;
      console.log('Middleware logged visit:', fullUrl);
    } catch (error) {
      console.error('Middleware logging error:', error);
    }
  };

  logVisit();

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 