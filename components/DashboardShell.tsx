'use client';

import { useState } from 'react';
import Link from 'next/link';

const KANTONE = [
  'Aargau','Appenzell Ausserrhoden','Appenzell Innerrhoden','Basel-Landschaft','Basel-Stadt',
  'Bern','Freiburg','Genf','Glarus','Graubünden','Jura','Luzern','Neuenburg','Nidwalden',
  'Obwalden','Schaffhausen','Schwyz','Solothurn','St. Gallen','Thurgau','Tessin','Uri',
  'Waadt','Wallis','Zug','Zürich',
];

const KANTON_ABBR: Record<string, string> = {
  'Aargau': 'AG', 'Appenzell Ausserrhoden': 'AR', 'Appenzell Innerrhoden': 'AI',
  'Basel-Landschaft': 'BL', 'Basel-Stadt': 'BS', 'Bern': 'BE', 'Freiburg': 'FR',
  'Genf': 'GE', 'Glarus': 'GL', 'Graubünden': 'GR', 'Jura': 'JU', 'Luzern': 'LU',
  'Neuenburg': 'NE', 'Nidwalden': 'NW', 'Obwalden': 'OW', 'Schaffhausen': 'SH',
  'Schwyz': 'SZ', 'Solothurn': 'SO', 'St. Gallen': 'SG', 'Thurgau': 'TG',
  'Tessin': 'TI', 'Uri': 'UR', 'Waadt': 'VD', 'Wallis': 'VS', 'Zug': 'ZG', 'Zürich': 'ZH',
};

const BRANCHEN = [
  'IT / Freelancer','Beratung / Coaching','Design / Kreativ','Marketing / Kommunikation',
  'Handwerk / Bau','Gesundheit / Therapie','Recht / Treuhand','Architektur',
  'Fotografie / Video','Gastronomie / Event','Bildung / Training','Reinigung / Facility',
  'Andere',
];

const PHASEN = [
  { value: '1', label: 'Phase 1 — Gründung (noch nicht gegründet)' },
  { value: '2', label: 'Phase 2 — Aufbau (0–1 Jahr)' },
  { value: '3', label: 'Phase 3 — Wachstum (1–3 Jahre)' },
  { value: '4', label: 'Phase 4 — Etabliert (3+ Jahre)' },
];

const SCHRITTE: Record<string, { icon: string; text: string; status: 'done' | 'warn' | 'todo' }[]> = {
  '1': [
    { icon: '❌', text: 'Rechtsform wählen (Einzelfirma empfohlen)', status: 'todo' },
    { icon: '❌', text: 'AHV-Anmeldung als Selbständiger vorbereiten', status: 'todo' },
    { icon: '⚠️', text: 'MWST-Schwelle kennen (CHF 100\'000)', status: 'warn' },
  ],
  '2': [
    { icon: '✅', text: 'AHV angemeldet', status: 'done' },
    { icon: '⚠️', text: 'MWST-Pflicht prüfen (ab CHF 100\'000 Umsatz)', status: 'warn' },
    { icon: '❌', text: 'Schriftliche Kundenverträge noch ausstehend', status: 'todo' },
  ],
  '3': [
    { icon: '✅', text: 'AHV & Steuern im Griff', status: 'done' },
    { icon: '⚠️', text: 'Säule 3a einrichten (Steueroptimierung)', status: 'warn' },
    { icon: '❌', text: 'KTG-Versicherung noch nicht abgeschlossen', status: 'todo' },
  ],
  '4': [
    { icon: '✅', text: 'Buchhaltung & Steuern geregelt', status: 'done' },
    { icon: '⚠️', text: 'GmbH-Gründung prüfen (ab ~CHF 100k Gewinn)', status: 'warn' },
    { icon: '❌', text: 'Nachfolgeplanung & Vorsorge optimieren', status: 'todo' },
  ],
};

type Section = 'cockpit' | 'fristen' | 'dokumente' | 'score' | 'frage';

const NAV: { id: Section; icon: string; label: string }[] = [
  { id: 'cockpit',   icon: '🧭', label: 'Cockpit' },
  { id: 'fristen',   icon: '⏰', label: 'Fristen' },
  { id: 'dokumente', icon: '📁', label: 'Dokumente' },
  { id: 'score',     icon: '📊', label: 'Score' },
  { id: 'frage',     icon: '💬', label: 'Experten-Frage' },
];

const TITLES: Record<Section, string> = {
  cockpit:   'Mein Cockpit',
  fristen:   'Meine Fristen',
  dokumente: 'Dokument-Archiv',
  score:     'Selbständigkeits-Score',
  frage:     'Experten-Frage',
};

type Profile = {
  kanton: string;
  branche: string;
  andereText: string;
  phase: string;
  gegruendet: string;
};

function calcDauer(gegruendet: string): string {
  if (!gegruendet) return '';
  const start = new Date(gegruendet);
  const now = new Date(2026, 2, 16);
  const totalDays = Math.floor((now.getTime() - start.getTime()) / 86400000);
  if (totalDays < 0) return 'in der Zukunft';
  if (totalDays < 30) return totalDays === 0 ? 'heute gegründet' : `seit ${totalDays} Tag${totalDays === 1 ? '' : 'en'}`;
  const totalMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (totalMonths < 12) return `seit ${totalMonths} Monat${totalMonths === 1 ? '' : 'en'}`;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (months === 0) return `seit ${years} Jahr${years === 1 ? '' : 'en'}`;
  return `seit ${years} Jahr${years === 1 ? '' : 'en'} und ${months} Monat${months === 1 ? '' : 'en'}`;
}

function SectionCockpit({ profile, onSave }: { profile: Profile; onSave: (p: Profile, consented: boolean) => void }) {
  const [editing, setEditing] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [consented, setConsented] = useState<boolean | null>(null);
  const [draft, setDraft] = useState<Profile>(profile);

  const phaseLabel = PHASEN.find(p => p.value === profile.phase)?.label.split(' — ')[1] ?? '';
  const brancheDisplay = profile.branche === 'Andere' ? (profile.andereText || 'Andere') : profile.branche;
  const dauerLabel = calcDauer(profile.gegruendet);

  function handleEditOpen() {
    setDraft(profile);
    setShowConsent(false);
    setEditing(true);
  }

  function handleCancel() {
    setEditing(false);
    setShowConsent(false);
  }

  function handleConsent(yes: boolean) {
    setConsented(yes);
    onSave(draft, yes);
    setEditing(false);
    setShowConsent(false);
  }

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
              {PHASEN.find(p => p.value === profile.phase)?.label}
            </p>
            <h2 className="text-xl font-bold text-gray-900">Guten Tag, Max.</h2>
            <p className="text-gray-500 text-sm mt-1">Du bist {dauerLabel} selbständig.</p>
          </div>
          {!editing && (
            <button
              onClick={handleEditOpen}
              className="text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              Profil bearbeiten
            </button>
          )}
        </div>

        {editing ? (
          <div className="mt-5 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Kanton</label>
              <select
                value={draft.kanton}
                onChange={e => setDraft(d => ({ ...d, kanton: e.target.value }))}
                className="w-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white transition-colors"
              >
                {KANTONE.map(k => <option key={k}>{k}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Branche</label>
              <select
                value={draft.branche}
                onChange={e => setDraft(d => ({ ...d, branche: e.target.value }))}
                className="w-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white transition-colors"
              >
                {BRANCHEN.map(b => <option key={b}>{b}</option>)}
              </select>
              {draft.branche === 'Andere' && (
                <input
                  type="text"
                  value={draft.andereText}
                  onChange={e => setDraft(d => ({ ...d, andereText: e.target.value }))}
                  placeholder="Was genau machst du? z.B. «Hundetrainerin» oder «Landschaftsgärtner»"
                  className="mt-2 w-full border-2 border-blue-200 focus:border-blue-500 focus:outline-none rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white transition-colors"
                  autoFocus
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Phase</label>
              <select
                value={draft.phase}
                onChange={e => setDraft(d => ({ ...d, phase: e.target.value }))}
                className="w-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white transition-colors"
              >
                {PHASEN.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Selbständig seit</label>
              <input
                type="date"
                value={draft.gegruendet}
                max={new Date().toISOString().slice(0, 10)}
                onChange={e => setDraft(d => ({ ...d, gegruendet: e.target.value }))}
                className="w-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white transition-colors"
              />
              {draft.gegruendet && (
                <p className="text-xs text-blue-600 mt-1 ml-1">{calcDauer(draft.gegruendet)}</p>
              )}
            </div>

            {showConsent ? (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-2">
                <p className="text-sm font-semibold text-gray-800 mb-1">Darf selbständig-schweiz.ch diese Angaben speichern?</p>
                <p className="text-xs text-gray-500 mb-1">
                  Gespeichert werden: <strong>Kanton, Branche, Phase, Gründungsdatum</strong>.
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Diese Daten werden von selbständig-schweiz.ch für Analysen und Marketing verwendet — z.B. um dir passende Inhalte und Angebote zu zeigen. Keine Weitergabe an Dritte. Jederzeit in den Einstellungen löschbar.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleConsent(true)}
                    className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ja, speichern
                  </button>
                  <button
                    onClick={() => handleConsent(false)}
                    className="bg-white text-gray-600 border border-gray-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Nein, nur für diese Sitzung
                  </button>
                  <button onClick={handleCancel} className="text-xs text-gray-400 hover:text-gray-600 px-2 py-2 transition-colors">
                    Abbrechen
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => setShowConsent(true)}
                  className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Speichern
                </button>
                <button onClick={handleCancel} className="text-sm text-gray-400 hover:text-gray-600 px-3 py-2 transition-colors">
                  Abbrechen
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-5 flex flex-wrap gap-3">
            {[
              { label: 'Kanton', value: profile.kanton },
              { label: 'Branche', value: brancheDisplay },
              { label: 'Phase', value: phaseLabel },
              { label: 'Selbständig seit', value: dauerLabel },
            ].map(item => (
              <div key={item.label} className="bg-gray-50 rounded-xl px-4 py-2.5">
                <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.value}</p>
              </div>
            ))}
            {consented === false && <p className="w-full text-xs text-gray-400 mt-1">Nur für diese Sitzung gespeichert.</p>}
            {consented === true && <p className="w-full text-xs text-green-600 mt-1">✓ Gespeichert</p>}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Deine nächsten Schritte — {brancheDisplay}, {profile.kanton}
        </p>
        <div className="space-y-3">
          {(SCHRITTE[profile.phase] ?? SCHRITTE['2']).map((step, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3.5 rounded-xl border ${
                step.status === 'done' ? 'bg-green-50 border-green-100' :
                step.status === 'warn' ? 'bg-amber-50 border-amber-100' :
                'bg-red-50 border-red-100'
              }`}
            >
              <span className="text-lg shrink-0">{step.icon}</span>
              <p className={`text-sm font-medium ${
                step.status === 'done' ? 'text-green-800' :
                step.status === 'warn' ? 'text-amber-800' : 'text-red-800'
              }`}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionFristen({ profile }: { profile: Profile }) {
  const abbr = KANTON_ABBR[profile.kanton] ?? profile.kanton.slice(0, 2).toUpperCase();
  const deadlines = [
    { urgency: 'red',   label: `Steuererklärung Kanton ${profile.kanton}`, date: '31. März 2026',       hint: 'In 15 Tagen fällig' },
    { urgency: 'amber', label: 'AHV-Akontobeiträge',                        date: '30. April 2026',      hint: 'In 45 Tagen' },
    { urgency: 'green', label: 'MWST-Abrechnung Q1',                        date: '30. Mai 2026',        hint: 'Noch 75 Tage' },
    { urgency: 'green', label: 'Steuererklärung (Verlängerung möglich)',     date: '30. September 2026',  hint: 'Verlängerung beantragen' },
  ];
  return (
    <div className="space-y-4">
      {deadlines.map((d, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
          <div className={`w-3 h-3 rounded-full shrink-0 ${
            d.urgency === 'red' ? 'bg-red-500' : d.urgency === 'amber' ? 'bg-amber-400' : 'bg-green-500'
          }`} />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm">{d.label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{d.date}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              d.urgency === 'red' ? 'bg-red-50 text-red-600' :
              d.urgency === 'amber' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
            }`}>{d.hint}</span>
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">{abbr}</span>
          </div>
        </div>
      ))}
      <p className="text-xs text-gray-400 text-center pt-2">
        E-Mail-Erinnerungen sind aktiv. Du wirst 30 und 7 Tage vorher informiert.
      </p>
    </div>
  );
}

function SectionDokumente() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
      <div className="text-5xl mb-4">📁</div>
      <p className="font-semibold text-gray-700 mb-1">Noch keine Dokumente gespeichert.</p>
      <p className="text-sm text-gray-400 mb-6">Erstelle dein erstes Dokument — es wird hier automatisch archiviert.</p>
      <Link href="/tools/auftragsbestaetigung" className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors">
        Auftragsbestätigung erstellen →
      </Link>
    </div>
  );
}

function SectionScore({ profile }: { profile: Profile }) {
  const isEarly = profile.phase === '1' || profile.phase === '2';
  const categories = [
    { label: 'Rechtliches & Verträge', pct: isEarly ? 40 : 65, color: isEarly ? 'bg-red-400' : 'bg-amber-400' },
    { label: 'Finanzen & Steuern',     pct: isEarly ? 75 : 85, color: 'bg-green-500' },
    { label: 'Versicherungen',          pct: isEarly ? 55 : 70, color: 'bg-amber-400' },
  ];
  const score = Math.round(categories.reduce((s, c) => s + c.pct, 0) / categories.length);
  const missing = isEarly
    ? ['KTG-Versicherung', 'Schriftliche Kundenverträge', 'Offizielle AGB']
    : ['Säule 3a maximiert', 'Nachfolgeplanung'];
  const scoreColor = score >= 70 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-center gap-8">
        <div className="relative shrink-0">
          <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="10" />
            <circle
              cx="50" cy="50" r="40" fill="none"
              stroke={scoreColor} strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 40 * score / 100} ${2 * Math.PI * 40}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{score}</span>
            <span className="text-xs text-gray-400">/ 100</span>
          </div>
        </div>
        <div className="flex-1 w-full space-y-4">
          {categories.map(c => (
            <div key={c.label}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-700 font-medium">{c.label}</span>
                <span className="text-sm font-bold text-gray-600">{c.pct}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Was fehlt noch?</p>
        <ul className="space-y-2 mb-5">
          {missing.map(m => (
            <li key={m} className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-red-400">✗</span> {m}
            </li>
          ))}
        </ul>
        <button className="text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
          Score neu berechnen
        </button>
      </div>
    </div>
  );
}

function SectionFrage() {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="space-y-4 max-w-2xl">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <p className="font-semibold text-gray-900">Deine monatliche Experten-Frage</p>
          <span className="text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">1 von 1 verfügbar</span>
        </div>
        {submitted ? (
          <div className="text-center py-6">
            <div className="text-3xl mb-2">✓</div>
            <p className="font-semibold text-green-800">Frage eingereicht</p>
            <p className="text-sm text-gray-500 mt-1">Du erhältst eine Antwort innerhalb von 24 Stunden.</p>
          </div>
        ) : (
          <>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              rows={4}
              placeholder="Deine Frage — z.B. «Ich habe einen Brief vom Steueramt bekommen. Was bedeutet das?»"
              className="w-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-gray-800 resize-none transition-colors"
            />
            <p className="text-xs text-gray-400 mt-2 mb-4">Foto oder Dokument anhängen (optional) — per E-Mail nach dem Einreichen möglich.</p>
            <button
              onClick={() => text.trim() && setSubmitted(true)}
              disabled={!text.trim()}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Frage einreichen →
            </button>
          </>
        )}
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-xl shrink-0">💬</span>
        <div>
          <p className="text-sm text-gray-600">Ein echter Experte antwortet innerhalb von 24 Stunden — kein Chatbot, kein KI.</p>
          <p className="text-xs text-gray-400 mt-1.5">
            Mehr Fragen?{' '}
            <Link href="/experten" className="text-blue-600 font-medium hover:underline">Ab CHF 29/Mo unbegrenzt →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardShell() {
  const [active, setActive] = useState<Section>('cockpit');
  const [profile, setProfile] = useState<Profile>({
    kanton: 'Zürich',
    branche: 'IT / Freelancer',
    andereText: '',
    phase: '2',
    gegruendet: '2025-11-01',
  });

  function handleSave(p: Profile) {
    setProfile(p);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed inset-y-0 left-0">
        <div className="px-5 pt-5 pb-4 border-b border-gray-100">
          <Link href="/" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors">
            selbständig-schweiz.ch
          </Link>
        </div>
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">M</div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Max Muster</p>
            <p className="text-xs text-gray-400">Free — {profile.kanton}</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                active === item.id ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-gray-100 space-y-2">
          <Link href="/experten" className="block text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Upgrade auf Fragen CHF 29/Mo →
          </Link>
          <button className="block text-xs text-gray-400 hover:text-gray-600 transition-colors">Abmelden</button>
        </div>
      </aside>

      {/* Mobile tab bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex z-50">
        {NAV.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex-1 flex flex-col items-center py-2.5 text-xs font-medium transition-colors ${
              active === item.id ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <span className="text-lg mb-0.5">{item.icon}</span>
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-base font-bold text-gray-900">{TITLES[active]}</h1>
          <Link href="/experten" className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors">
            Upgrade
          </Link>
        </header>
        <main className="flex-1 px-4 sm:px-6 py-6 pb-24 md:pb-6">
          {active === 'cockpit'   && <SectionCockpit profile={profile} onSave={handleSave} />}
          {active === 'fristen'   && <SectionFristen profile={profile} />}
          {active === 'dokumente' && <SectionDokumente />}
          {active === 'score'     && <SectionScore profile={profile} />}
          {active === 'frage'     && <SectionFrage />}
        </main>
      </div>
    </div>
  );
}
