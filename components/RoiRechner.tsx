'use client';

import { useState } from 'react';

const EXPERTS = [
  { name: 'Treuhänder (Steuererklärung + AHV + laufend)', min: 3000, max: 6000, tiers: [2, 3, 4, 5] },
  { name: 'Anwalt (AGB erstellen + 2 Verträge prüfen)', min: 2000, max: 4000, tiers: [2, 3, 4, 5] },
  { name: 'Brand Stratege (Positionierungs-Workshop)', min: 2000, max: 4000, tiers: [3, 4, 5] },
  { name: 'Brand Designer (Logo + Corporate Identity)', min: 2000, max: 5000, tiers: [3, 4, 5] },
  { name: 'Copywriter (Website-Texte + Angebote)', min: 2000, max: 4000, tiers: [3, 4, 5] },
  { name: 'Web-Designer (Website mit Conversion-Fokus)', min: 3000, max: 8000, tiers: [3, 4, 5] },
  { name: 'Business Coach (6 Sitzungen)', min: 1800, max: 3000, tiers: [2, 3, 4, 5] },
  { name: 'Marketing-Beratung (Jahresplanung)', min: 1500, max: 3000, tiers: [2, 3, 4, 5] },
  { name: 'Sales-Coaching (3 Sitzungen)', min: 900, max: 1800, tiers: [2, 3, 4, 5] },
  { name: 'Fotograf (Personal Brand Shooting)', min: 800, max: 2000, tiers: [3, 4, 5] },
  { name: 'Tech-Berater (Tool-Setup & Automatisierung)', min: 500, max: 1500, tiers: [2, 3, 4, 5] },
];

const TIERS = [
  { id: 1, name: 'Free', price: 0, label: 'Free — CHF 0' },
  { id: 2, name: 'Fragen', price: 29, label: 'Fragen — CHF 29/Mo' },
  { id: 3, name: 'Beratung', price: 99, label: 'Beratung — CHF 99/Mo' },
  { id: 4, name: 'Flatrate', price: 349, label: 'Flatrate — CHF 349/Mo' },
  { id: 5, name: 'Vollservice', price: 749, label: 'Vollservice — CHF 749/Mo' },
];

function fmt(n: number) {
  return "CHF " + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

export default function RoiRechner() {
  const [selectedTier, setSelectedTier] = useState(4);

  const tier = TIERS.find(t => t.id === selectedTier)!;
  const aboJahr = tier.price * 12;

  const included = EXPERTS.filter(e => e.tiers.includes(selectedTier));
  const notIncluded = EXPERTS.filter(e => !e.tiers.includes(selectedTier));

  const marketMin = included.reduce((s, e) => s + e.min, 0);
  const marketMax = included.reduce((s, e) => s + e.max, 0);
  const savings = Math.round((marketMin + marketMax) / 2) - aboJahr;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
        Was du sonst pro Jahr zahlst
      </h2>
      <p className="text-gray-500 text-center mb-8 text-sm">
        Wähle deine Stufe — sieh sofort was du sparst.
      </p>

      {/* Tier Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {TIERS.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTier(t.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
              selectedTier === t.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Summary bar */}
      {selectedTier === 1 ? (
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-1">Verpasste Frist vermieden</p>
            <p className="text-2xl font-bold text-blue-700">CHF 500–2'000</p>
            <p className="text-xs text-blue-400 mt-1">Busse / Verzugszins gespart</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">1 Experten-Frage/Monat</p>
            <p className="text-2xl font-bold text-green-700">CHF 150–300</p>
            <p className="text-xs text-green-400 mt-1">Wert pro Monat</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
            <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide mb-1">Dein Preis</p>
            <p className="text-2xl font-bold text-amber-700">CHF 0</p>
            <p className="text-xs text-amber-400 mt-1">für immer kostenlos</p>
          </div>
        </div>
      ) : selectedTier > 1 ? (
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-xs text-red-500 font-semibold uppercase tracking-wide mb-1">Marktpreis einzeln</p>
            <p className="text-2xl font-bold text-red-600">{fmt(marketMin)}–</p>
            <p className="text-2xl font-bold text-red-600">{fmt(marketMax)}</p>
            <p className="text-xs text-red-400 mt-1">pro Jahr</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-500 font-semibold uppercase tracking-wide mb-1">Dein Abo-Preis</p>
            <p className="text-2xl font-bold text-blue-600">{fmt(aboJahr)}</p>
            <p className="text-xs text-blue-400 mt-1">pro Jahr ({fmt(tier.price)}/Mo)</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">Du sparst mindestens</p>
            <p className="text-2xl font-bold text-green-600">{fmt(savings)}</p>
            <p className="text-xs text-green-400 mt-1">pro Jahr</p>
          </div>
        </div>
      ) : null}

      {/* Table */}
      {selectedTier > 1 && (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="text-left p-3 font-semibold">Experte</th>
                <th className="text-right p-3 font-semibold whitespace-nowrap">Marktpreis/Jahr</th>
                <th className="text-right p-3 font-semibold">In deinem Abo</th>
              </tr>
            </thead>
            <tbody>
              {included.map((e, i) => (
                <tr key={e.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-3 text-gray-800 font-medium">{e.name}</td>
                  <td className="p-3 text-right text-red-500 font-semibold whitespace-nowrap">
                    {fmt(e.min)}–{fmt(e.max).replace('CHF ', '')}
                  </td>
                  <td className="p-3 text-right">
                    <span className="inline-block bg-green-100 text-green-700 font-bold text-xs px-2 py-1 rounded-full">
                      ✓ inklusive
                    </span>
                  </td>
                </tr>
              ))}
              {notIncluded.map((e, i) => (
                <tr key={e.name} className="bg-gray-50 opacity-40">
                  <td className="p-3 text-gray-500 line-through">{e.name}</td>
                  <td className="p-3 text-right text-gray-400 whitespace-nowrap line-through">
                    {fmt(e.min)}–{fmt(e.max).replace('CHF ', '')}
                  </td>
                  <td className="p-3 text-right">
                    <span className="inline-block text-gray-400 text-xs px-2 py-1">
                      nicht enthalten
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-900 text-white font-bold">
                <td className="p-3">Total inklusive Experten</td>
                <td className="p-3 text-right text-red-300 whitespace-nowrap">
                  {fmt(marketMin)}–{fmt(marketMax)}
                </td>
                <td className="p-3 text-right text-green-300">
                  {fmt(aboJahr)}/Jahr
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {selectedTier > 1 && (
        <p className="text-center text-sm text-gray-500 mt-5">
          Und das ohne stundenlange Suche, ohne Vergleichen, ohne das Risiko den Falschen zu wählen.
        </p>
      )}
    </div>
  );
}
