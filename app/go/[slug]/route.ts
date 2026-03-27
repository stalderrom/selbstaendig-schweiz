import { NextRequest, NextResponse } from 'next/server';

// Affiliate redirect map — slug → destination URL
const AFFILIATE_LINKS: Record<string, string> = {
  'bexio': 'https://www.bexio.com/?partner=selbstaendig-schweiz',
  'banana': 'https://www.banana.ch/?ref=selbstaendig-schweiz',
  'brevo': 'https://www.brevo.com/?utm_source=selbstaendig-schweiz',
  'calendly': 'https://calendly.com/?utm_source=selbstaendig-schweiz',
  'hostpoint': 'https://www.hostpoint.ch/?partner=selbstaendig-schweiz',
  'quickfile': 'https://www.quickfile.ch/?ref=selbstaendig-schweiz',
  'postfinance': 'https://www.postfinance.ch/de/privat/produkte/konto-karte/konto-eroeffnen.html',
  'neon': 'https://www.neon-free.ch/?ref=selbstaendig-schweiz',
  'wise': 'https://wise.com/invite/selbstaendig-schweiz',
  'helsana': 'https://www.helsana.ch/de/business/krankenkasse/krankentaggeld.html',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const destination = AFFILIATE_LINKS[slug];

  if (!destination) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Log the click (server-side only — no PII stored)
  console.log(`[affiliate] click: ${slug} at ${new Date().toISOString()}`);

  return NextResponse.redirect(destination, {
    status: 302,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
