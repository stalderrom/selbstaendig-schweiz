import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthorized } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({
      configured: false,
      message: 'Supabase not configured. Set SUPABASE_URL and SUPABASE_SERVICE_KEY.',
      data: [],
    });
  }

  // Query affiliate_clicks for last 30 days, grouped by partner
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/affiliate_clicks?select=partner&clicked_at=gte.${since}`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `Supabase error: ${res.status} ${text}` }, { status: 500 });
    }

    const rows: { partner: string }[] = await res.json();

    // Aggregate by partner client-side
    const counts: Record<string, number> = {};
    for (const row of rows) {
      counts[row.partner] = (counts[row.partner] ?? 0) + 1;
    }

    const data = Object.entries(counts)
      .map(([partner, clicks]) => ({ partner, clicks }))
      .sort((a, b) => b.clicks - a.clicks);

    return NextResponse.json({
      configured: true,
      period: 'last_30_days',
      total: rows.length,
      data,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
