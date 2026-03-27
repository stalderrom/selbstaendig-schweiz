import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vorname, email } = body;

    if (!vorname || !email) {
      return NextResponse.json({ error: 'Vorname und E-Mail sind erforderlich.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
    }

    // Log signup server-side (will appear in Vercel function logs)
    console.log(`[newsletter] signup: ${vorname} <${email}> at ${new Date().toISOString()}`);

    // If BREVO_API_KEY is configured, add contact to Brevo list
    const brevoApiKey = process.env.BREVO_API_KEY;
    if (brevoApiKey) {
      const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': brevoApiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          attributes: { VORNAME: vorname },
          listIds: [2],
          updateEnabled: true,
        }),
      });

      if (!brevoRes.ok) {
        const errText = await brevoRes.text();
        console.error(`[newsletter] Brevo error: ${brevoRes.status} ${errText}`);
        // Don't fail the request — signup is logged above
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[newsletter] error:', error);
    return NextResponse.json({ error: 'Interner Fehler. Bitte versuche es erneut.' }, { status: 500 });
  }
}
