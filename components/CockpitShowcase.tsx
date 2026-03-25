'use client';

import { useState } from 'react';
import Link from 'next/link';

const FEATURES = [
  {
    id: 'cockpit',
    icon: '🧭',
    title: 'Dein persönliches Cockpit',
    subtitle: 'Die Seite kennt dich',
    problem: 'Jedes Mal von vorne anfangen, generische Inhalte die nicht zu dir passen.',
    solution: 'Du gibst einmal ein: Kanton, Branche, Phase. Danach siehst du nur was für dich relevant ist — die richtigen Artikel, die richtigen Tools, dein nächster Schritt.',
    example: '"Du bist IT-Freelancer in Zürich, 8 Monate selbständig → das sind deine 3 nächsten Schritte."',
    color: 'blue',
  },
  {
    id: 'fristen',
    icon: '⏰',
    title: 'Schweizer Deadline-Wächter',
    subtitle: 'Nie wieder eine Frist verpassen',
    problem: 'Verpasste Fristen kosten in der Schweiz schnell CHF 500–2\'000 — und niemand sagt dir wann sie fällig sind.',
    solution: 'Basierend auf deinem Kanton und Gründungsdatum bekommst du automatische E-Mail-Erinnerungen: Steuererklärung, AHV-Abrechnung, MWST-Schwelle, AHV-Anmeldung.',
    example: '"In 30 Tagen: Steuererklärung Kanton Zürich. Hier ist was du brauchst."',
    color: 'amber',
  },
  {
    id: 'archiv',
    icon: '📁',
    title: 'Dokument-Archiv',
    subtitle: 'Alles gespeichert — immer verfügbar',
    problem: 'Auftragsbestätigung ausfüllen, PDF downloaden, Tab schliessen — nächste Woche alles wieder von vorne.',
    solution: 'Alle Dokumente die du erstellst werden gespeichert. Kundendaten werden beim nächsten Dokument automatisch vorausgefüllt. Du siehst deine ganze Geschichte.',
    example: '"Auftragsbestätigung an Müller AG — letzte Woche. Mit einem Klick anpassen und neu senden."',
    color: 'green',
  },
  {
    id: 'score',
    icon: '📊',
    title: 'Selbständigkeits-Score',
    subtitle: 'Wie gut bist du abgesichert?',
    problem: 'Du weisst nicht was du nicht weisst. Viele Selbständige merken Lücken erst wenn es zu spät ist.',
    solution: '10 Fragen, 2 Minuten. Du bekommst einen Score und siehst genau wo deine Lücken sind — mit direktem Link zum richtigen Artikel oder Experten.',
    example: '"Score: 61/100. Fehlend: KTG-Versicherung, schriftliche Kundenverträge. Hier was du tun kannst."',
    color: 'purple',
  },
  {
    id: 'frage',
    icon: '💬',
    title: '1 kostenlose Experten-Frage pro Monat',
    subtitle: 'Ein echter Mensch antwortet',
    problem: 'Fragen googeln und hoffen dass die Antwort stimmt — obwohl die Situation in der Schweiz oft anders ist.',
    solution: 'Einmal pro Monat kannst du eine Frage stellen — per Text, Sprache oder Foto. Ein echter Experte aus unserem Netzwerk antwortet innerhalb von 24 Stunden.',
    example: '"Ich habe einen Brief vom Steueramt. Was bedeutet das?" → Antwort morgen früh.'  ,
    color: 'rose',
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; badge: string; example: string }> = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   icon: 'bg-blue-100',   badge: 'bg-blue-100 text-blue-700',   example: 'bg-blue-50 border-blue-100 text-blue-800' },
  amber:  { bg: 'bg-amber-50',  border: 'border-amber-200',  icon: 'bg-amber-100',  badge: 'bg-amber-100 text-amber-700', example: 'bg-amber-50 border-amber-100 text-amber-800' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  icon: 'bg-green-100',  badge: 'bg-green-100 text-green-700', example: 'bg-green-50 border-green-100 text-green-800' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-100', badge: 'bg-purple-100 text-purple-700', example: 'bg-purple-50 border-purple-100 text-purple-800' },
  rose:   { bg: 'bg-rose-50',   border: 'border-rose-200',   icon: 'bg-rose-100',   badge: 'bg-rose-100 text-rose-700',   example: 'bg-rose-50 border-rose-100 text-rose-800' },
};

export default function CockpitShowcase() {
  const [active, setActive] = useState('cockpit');
  const feature = FEATURES.find(f => f.id === active)!;
  const c = colorMap[feature.color];

  return (
    <div className="max-w-5xl mx-auto">

      <div className="text-center mb-10">
        <p className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 rounded-full px-3 py-1 mb-4 uppercase tracking-widest">
          Kostenlos — für immer
        </p>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Das Selbständigkeits-Cockpit
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Anonymous auf der Seite surfen kann jeder. Das Cockpit kennt dich — deine Fristen, deine Dokumente, deine Lücken.
        </p>
        <p className="text-sm text-gray-400 mt-2">Kostenlos. Immer.</p>
      </div>

      {/* Feature tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {FEATURES.map(f => (
          <button
            key={f.id}
            onClick={() => setActive(f.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
              active === f.id
                ? `${colorMap[f.color].bg} ${colorMap[f.color].border} text-gray-900 shadow-sm`
                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            <span>{f.icon}</span>
            <span className="hidden sm:inline">{f.title.split(' ').slice(0, 3).join(' ')}</span>
          </button>
        ))}
      </div>

      {/* Feature detail */}
      <div className={`rounded-2xl border-2 ${c.border} ${c.bg} p-8 transition-all`}>
        <div className="flex items-start gap-5">
          <div className={`w-14 h-14 rounded-2xl ${c.icon} flex items-center justify-center text-3xl shrink-0`}>
            {feature.icon}
          </div>
          <div className="flex-1">
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${c.badge} mb-2 inline-block`}>
              {feature.subtitle}
            </span>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>

            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Das Problem heute</p>
                <p className="text-sm text-gray-600">{feature.problem}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Mit dem Cockpit</p>
                <p className="text-sm text-gray-700 font-medium">{feature.solution}</p>
              </div>
            </div>

            <div className={`rounded-xl border ${c.example.split(' ').slice(2).join(' ')} ${c.example.split(' ').slice(0, 2).join(' ')} px-4 py-3`}>
              <p className="text-xs font-semibold opacity-60 mb-1">Beispiel</p>
              <p className="text-sm italic">{feature.example}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-5 gap-2 mt-6">
        {FEATURES.map(f => (
          <button
            key={f.id}
            onClick={() => setActive(f.id)}
            className={`rounded-xl p-3 text-center transition-all border-2 ${
              active === f.id
                ? `${colorMap[f.color].border} ${colorMap[f.color].bg}`
                : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="text-2xl mb-1">{f.icon}</div>
            <p className="text-xs font-semibold text-gray-700 leading-tight">{f.subtitle}</p>
          </button>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <Link
          href="#warteliste"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md"
        >
          Kostenlosen Account erstellen →
        </Link>
        <p className="text-gray-400 text-xs mt-2">Kein Abo. Kein Kreditkarte. Für immer kostenlos.</p>
      </div>
    </div>
  );
}
