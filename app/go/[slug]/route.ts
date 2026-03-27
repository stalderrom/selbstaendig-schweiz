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

async function trackClickInSupabase(partner: string, referrer: string | null) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
  if (!supabaseUrl || !supabaseKey) return;

  try {
    await fetch(`${supabaseUrl}/rest/v1/affiliate_clicks`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        partner,
        referrer: referrer ?? null,
        clicked_at: new Date().toISOString(),
      }),
    });
  } catch {
    // Non-fatal — tracking failure should not break redirects
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const destination = AFFILIATE_LINKS[slug];

  if (!destination) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const referrer = request.headers.get('referer');
  console.log(`[affiliate] click: ${slug} at ${new Date().toISOString()}`);

  // Fire-and-forget Supabase tracking (does not block redirect)
  trackClickInSupabase(slug, referrer);

  return NextResponse.redirect(destination, {
    status: 302,
    headers: { 'Cache-Control': 'no-store' },
  });
}
