'use client';

import { useEffect, useState } from 'react';

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? '';

interface AffiliateStats {
  configured: boolean;
  message?: string;
  period?: string;
  total?: number;
  data?: { partner: string; clicks: number }[];
  error?: string;
}

interface NewsletterStats {
  configured: boolean;
  message?: string;
  total?: number;
  list?: { name: string; totalSubscribers: number; totalBlacklisted: number };
  error?: string;
}

function StatCard({ label, value, target, unit = '' }: { label: string; value: string | number; target?: number; unit?: string }) {
  const numVal = typeof value === 'number' ? value : parseFloat(String(value)) || 0;
  const pct = target ? Math.min(100, Math.round((numVal / target) * 100)) : null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900">
        {typeof value === 'number' ? value.toLocaleString('de-CH') : value}
        {unit && <span className="text-lg font-normal text-gray-400 ml-1">{unit}</span>}
      </p>
      {target && pct !== null && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{pct}% of goal</span>
            <span>Target: {target.toLocaleString('de-CH')}{unit}</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [affiliateStats, setAffiliateStats] = useState<AffiliateStats | null>(null);
  const [newsletterStats, setNewsletterStats] = useState<NewsletterStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [secret, setSecret] = useState(ADMIN_SECRET);
  const [authed, setAuthed] = useState(false);

  async function load(adminSecret: string) {
    setLoading(true);
    const headers = { 'x-admin-secret': adminSecret };
    const [affRes, nlRes] = await Promise.all([
      fetch('/api/admin/affiliate-stats', { headers }),
      fetch('/api/admin/newsletter-stats', { headers }),
    ]);
    if (affRes.status === 401 || nlRes.status === 401) {
      setLoading(false);
      return false;
    }
    const [aff, nl] = await Promise.all([affRes.json(), nlRes.json()]);
    setAffiliateStats(aff);
    setNewsletterStats(nl);
    setLoading(false);
    return true;
  }

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    const ok = await load(secret);
    if (ok) setAuthed(true);
    else alert('Falsches Passwort');
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <form onSubmit={handleAuth} className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-sm shadow-sm">
          <h1 className="text-xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
          <input
            type="password"
            value={secret}
            onChange={e => setSecret(e.target.value)}
            placeholder="Admin Secret"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Einloggen
          </button>
        </form>
      </div>
    );
  }

  const totalClicks = affiliateStats?.total ?? 0;
  const newsletterTotal = newsletterStats?.total ?? 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">KPI Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">Selbständig-Schweiz.ch — Ziel 2027</p>
          </div>
          <button
            onClick={() => load(secret)}
            className="text-sm text-blue-600 hover:underline"
          >
            {loading ? 'Lädt…' : 'Aktualisieren'}
          </button>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard label="Monatliche Leser" value="—" target={50000} unit="" />
          <StatCard label="Newsletter Abonnenten" value={newsletterTotal} target={5000} />
          <StatCard label="Affiliate Klicks (30 Tage)" value={totalClicks} />
        </div>

        {/* Revenue placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <StatCard label="Affiliate Revenue / Monat" value="—" target={10000} unit="CHF" />
          <StatCard label="Artikel total" value={102} />
        </div>

        {/* Affiliate breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Affiliate Klicks — letzte 30 Tage</h2>
          {!affiliateStats?.configured ? (
            <p className="text-sm text-amber-600 bg-amber-50 rounded-lg p-3">
              {affiliateStats?.message ?? 'Nicht konfiguriert'}
            </p>
          ) : affiliateStats.data?.length === 0 ? (
            <p className="text-sm text-gray-400">Noch keine Klicks aufgezeichnet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-gray-500 font-medium">Partner</th>
                  <th className="text-right py-2 text-gray-500 font-medium">Klicks</th>
                </tr>
              </thead>
              <tbody>
                {affiliateStats.data?.map(row => (
                  <tr key={row.partner} className="border-b border-gray-50">
                    <td className="py-2 text-gray-900 font-medium">{row.partner}</td>
                    <td className="py-2 text-right text-gray-600">{row.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Newsletter stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Newsletter (Brevo)</h2>
          {!newsletterStats?.configured ? (
            <p className="text-sm text-amber-600 bg-amber-50 rounded-lg p-3">
              {newsletterStats?.message ?? 'Brevo nicht konfiguriert'}
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Abonnenten total</p>
                <p className="text-2xl font-bold text-gray-900">{newsletterStats.total?.toLocaleString('de-CH')}</p>
              </div>
              <div>
                <p className="text-gray-500">Liste</p>
                <p className="font-medium text-gray-700">{newsletterStats.list?.name ?? '—'}</p>
              </div>
            </div>
          )}
        </div>

        {/* Search Console setup instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="font-semibold text-gray-900 mb-3">Google Search Console — Setup</h2>
          <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
            <li>Gehe zu <strong>search.google.com/search-console</strong></li>
            <li>Klicke auf "Property hinzufügen" → URL-Präfix: <code className="bg-white px-1 rounded">https://www.selbstaendig-schweiz.ch</code></li>
            <li>Verifiziere mit dem HTML-Tag (Google liefert einen Meta-Tag → in <code>app/layout.tsx</code> metadata.verification einfügen)</li>
            <li>Nach Verifizierung: Sitemaps → <code className="bg-white px-1 rounded">https://www.selbstaendig-schweiz.ch/sitemap.xml</code> einreichen</li>
            <li>Prüfe nach 24–48h "Coverage" und "Performance" für erste Daten</li>
          </ol>
        </div>

        <p className="text-xs text-gray-300 mt-6 text-center">
          Gesichert mit ADMIN_SECRET Header-Authentifizierung
        </p>
      </div>
    </div>
  );
}
