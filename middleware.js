import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function middleware(request) {
  // Log all visits including bots directly to database
  const logVisit = async () => {
    try {
      const fullUrl = request.nextUrl.pathname + request.nextUrl.search;
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

  // Fire and forget - don't wait for response
  logVisit();

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 