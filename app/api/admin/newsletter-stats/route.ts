import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthorized } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const brevoApiKey = process.env.BREVO_API_KEY;

  if (!brevoApiKey) {
    return NextResponse.json({
      configured: false,
      message: 'Brevo not configured. Set BREVO_API_KEY.',
      total: 0,
      data: [],
    });
  }

  try {
    // Fetch contact stats from Brevo list 2
    const [contactsRes, listRes] = await Promise.all([
      fetch('https://api.brevo.com/v3/contacts?limit=1&listId=2', {
        headers: { 'api-key': brevoApiKey },
      }),
      fetch('https://api.brevo.com/v3/contacts/lists/2', {
        headers: { 'api-key': brevoApiKey },
      }),
    ]);

    if (!contactsRes.ok || !listRes.ok) {
      return NextResponse.json({ error: 'Brevo API error' }, { status: 500 });
    }

    const [contactsData, listData] = await Promise.all([
      contactsRes.json(),
      listRes.json(),
    ]);

    return NextResponse.json({
      configured: true,
      total: contactsData.count ?? 0,
      list: {
        id: listData.id,
        name: listData.name,
        totalBlacklisted: listData.totalBlacklisted ?? 0,
        totalSubscribers: listData.totalSubscribers ?? 0,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
