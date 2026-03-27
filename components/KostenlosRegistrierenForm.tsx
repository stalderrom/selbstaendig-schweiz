'use client';

import { useState } from 'react';
import Link from 'next/link';

const BENEFITS = [
  {
    icon: '🧭',
    title: 'Persönliches Cockpit',
    desc: 'Die Seite kennt dich: Kanton, Branche, Phase.',
  },
  {
    icon: '⏰',
    title: 'Deadline-Wächter',
    desc: 'Fristen-Erinnerungen per E-Mail — nie mehr CHF 500 Busse.',
  },
  {
    icon: '📁',
    title: 'Dokument-Archiv',
    desc: 'Alle Dokumente gespeichert, Kundendaten vorausgefüllt.',
  },
  {
    icon: '📊',
    title: 'Selbständigkeits-Score',
    desc: '10 Fragen. Sieh genau wo deine Lücken sind.',
  },
  {
    icon: '💬',
    title: '1 Experten-Frage/Monat',
    desc: 'Ein echter Mensch antwortet — nicht eine KI.',
  },
];

const TRUST = [
  'Keine KI-Antworten',
  'Schweizer Recht',
  'Datenschutz (DSG-konform)',
  'Jederzeit löschbar',
];

export default function KostenlosRegistrierenForm() {
  const [vorname, setVorname] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!vorname.trim() || !email.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vorname: vorname.trim(), email: email.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Fehler beim Registrieren. Bitte versuche es erneut.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setError('Keine Verbindung. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col justify-center py-12 px-4">

      {/* Main split */}
      <div className="max-w-5xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Left: Form */}
        <div>
          <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 rounded-full px-3 py-1 mb-6 uppercase tracking-widest">
            Kostenlos — für immer
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Dein Selbständigkeits-Cockpit.<br />
            <span className="text-blue-600">Gratis.</span>
          </h1>

          <p className="text-lg text-gray-500 mb-8 leading-relaxed">
            Einmal registrieren — und die Seite kennt dich.
            Deine Fristen, deine Dokumente, deine Lücken.
          </p>

          {submitted ? (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-3">✓</div>
              <p className="text-xl font-bold text-green-800 mb-1">Fast geschafft</p>
              <p className="text-green-700 text-sm">Check deine E-Mails — wir haben dir einen Bestätigungslink geschickt.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="vorname" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Vorname
                </label>
                <input
                  id="vorname"
                  type="text"
                  autoComplete="given-name"
                  value={vorname}
                  onChange={e => setVorname(e.target.value)}
                  placeholder="Max"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-900 text-base transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  E-Mail-Adresse
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="max@beispiel.ch"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-900 text-base transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-base hover:bg-blue-700 active:scale-[0.99] transition-all shadow-md mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Wird gesendet…' : 'Kostenloses Konto erstellen →'}
              </button>

              {error && (
                <p className="text-center text-sm text-red-600 pt-1">{error}</p>
              )}

              <p className="text-center text-xs text-gray-400 pt-1">
                Kein Abo. Keine Kreditkarte. Für immer kostenlos.
              </p>
            </form>
          )}

          <p className="text-center text-xs text-gray-400 mt-6">
            Bereits registriert?{' '}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Einloggen →
            </Link>
          </p>
        </div>

        {/* Right: Benefits */}
        <div className="lg:pt-24">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
            Was du bekommst
          </p>
          <ul className="space-y-5">
            {BENEFITS.map(b => (
              <li key={b.title} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl shrink-0">
                  {b.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{b.title}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trust row */}
      <div className="max-w-5xl mx-auto w-full mt-14 pt-8 border-t border-gray-100">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {TRUST.map(t => (
            <span key={t} className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <span className="text-green-500">✓</span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
