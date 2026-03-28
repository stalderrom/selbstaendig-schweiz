import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUNYCODE_DOMAIN = 'xn--selbstndig-schweiz-qtb.ch';
const PRIMARY_DOMAIN = 'www.selbstaendig-schweiz.ch';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  if (hostname.includes(PUNYCODE_DOMAIN)) {
    const url = request.nextUrl.clone();
    url.hostname = PRIMARY_DOMAIN;
    url.port = '';
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
