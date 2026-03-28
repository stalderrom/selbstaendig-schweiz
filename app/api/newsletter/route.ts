import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vorname, email, consent } = body;

    if (!vorname || !email || consent !== true) {
      return NextResponse.json({ error: 'Vorname, E-Mail und Zustimmung sind erforderlich.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
    }

    const consentTimestamp = new Date().toISOString();

    // Log signup server-side (will appear in Vercel function logs)
    console.log(`[newsletter] signup: ${vorname} <${email}> (consent=true) at ${consentTimestamp}`);

    // If BREVO_API_KEY is configured, create Brevo contact flow
    const brevoApiKey = process.env.BREVO_API_KEY;
    if (brevoApiKey) {
      const listId = Number(process.env.BREVO_LIST_ID ?? '2');
      const doiTemplateId = process.env.BREVO_DOI_TEMPLATE_ID;
      const doiRedirectUrl = process.env.BREVO_DOI_REDIRECT_URL;

      let brevoRes: Response;

      if (doiTemplateId && doiRedirectUrl) {
        brevoRes = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'api-key': brevoApiKey,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            email,
            attributes: {
              VORNAME: vorname,
              CONSENT_SOURCE: 'selbständig-schweiz.ch-kostenlos-registrieren',
              CONSENT_AT: consentTimestamp,
            },
            includeListIds: [listId],
            templateId: Number(doiTemplateId),
            redirectionUrl: doiRedirectUrl,
          }),
        });
      } else {
        brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'api-key': brevoApiKey,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            email,
            attributes: {
              VORNAME: vorname,
              CONSENT_SOURCE: 'selbständig-schweiz.ch-kostenlos-registrieren',
              CONSENT_AT: consentTimestamp,
            },
            listIds: [listId],
            updateEnabled: true,
          }),
        });
      }

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
