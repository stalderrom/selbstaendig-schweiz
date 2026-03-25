'use client';

import { useState } from 'react';
import Link from 'next/link';

const STAGES = [
  { id: 1, label: 'Phase 1', sub: 'Gründung', desc: 'Noch nicht oder gerade gegründet' },
  { id: 2, label: 'Phase 2', sub: 'Aufbau', desc: '0–1 Jahr selbständig' },
  { id: 3, label: 'Phase 3', sub: 'Wachstum', desc: '1–3 Jahre selbständig' },
  { id: 4, label: 'Phase 4', sub: 'Etabliert', desc: '3+ Jahre selbständig' },
];

const EXPERTS = [
  {
    id: 'treuhand',
    role: 'Treuhänder',
    specialty: 'AHV, Steuern & Buchhaltung',
    icon: '🧾',
    helps: ['AHV/IV-Anmeldung', 'Steuererklärung & Optimierung', 'Buchhaltung & Jahresabschluss', 'MWST-Abrechnung'],
    phases: [1, 2, 3, 4],
    priceHint: 'Ab Beratung CHF 99/Mo',
    highlight: true,
  },
  {
    id: 'anwalt',
    role: 'Anwalt & Rechtsberatung',
    specialty: 'AGB, Verträge & Datenschutz',
    icon: '⚖️',
    helps: ['AGB & Allgemeine Bedingungen', 'Kundenverträge prüfen & erstellen', 'Datenschutz (DSG)', 'Streitigkeiten & Mahnwesen'],
    phases: [1, 2],
    priceHint: 'Ab Beratung CHF 99/Mo',
    highlight: false,
  },
  {
    id: 'brand-stratege',
    role: 'Brand Stratege',
    specialty: 'Positionierung, Naming & Markenversprechen',
    icon: '🧭',
    helps: ['Markenpositionierung', 'Naming & Tagline', 'Zielgruppenanalyse', 'Differenzierung — bevor designed wird'],
    phases: [1, 2],
    priceHint: 'Ab Fragen CHF 29/Mo',
    highlight: false,
  },
  {
    id: 'brand-designer',
    role: 'Brand Designer',
    specialty: 'Logo, CI/CD & visuelle Identität',
    icon: '🎨',
    helps: ['Logo & Corporate Identity', 'Visitenkarten & Briefpapier', 'Farb- & Typografie-System', 'Auf Basis echter Strategie'],
    phases: [2],
    priceHint: 'Ab Flatrate CHF 349/Mo',
    highlight: false,
  },
  {
    id: 'copywriter',
    role: 'Copywriter & Texter',
    specialty: 'Website-Text, Angebote & E-Mail-Sequenzen',
    icon: '✍️',
    helps: ['Website-Text der konvertiert', 'Angebots- & Leistungsseiten', 'Cold-Email-Sequenzen', 'LinkedIn-Profil & Bio'],
    phases: [2, 3],
    priceHint: 'Ab Flatrate CHF 349/Mo',
    highlight: false,
  },
  {
    id: 'webdesign',
    role: 'Web-Designer',
    specialty: 'Conversion-fokussiert — keine Kunstprojekte',
    icon: '💻',
    helps: ['Website-Konzept & Conversion', 'Landing Pages', 'SEO-Grundstruktur', 'Messbare Anfragen generieren'],
    phases: [2, 3],
    priceHint: 'Ab Flatrate CHF 349/Mo',
    highlight: false,
  },
  {
    id: 'fotograf',
    role: 'Personal Brand Fotograf',
    specialty: 'Fotos die Vertrauen schaffen',
    icon: '📸',
    helps: ['Personal Brand Shooting', 'Briefing: welche Bilder du brauchst', 'Wirkung & Positionierung durch Fotos', 'Content-Fotos für Social Media'],
    phases: [2, 3],
    priceHint: 'Ab Flatrate CHF 349/Mo',
    highlight: false,
  },
  {
    id: 'sales',
    role: 'Sales-Spezialist',
    specialty: 'Erster Auftrag, Abschluss & Referral-System',
    icon: '🤝',
    helps: ['Angebot formulieren das verkauft', 'Verkaufsgespräch üben & verbessern', 'Referral-System aufbauen', 'Preisverhandlung & Einwände'],
    phases: [2, 3],
    priceHint: 'Ab Beratung CHF 99/Mo',
    highlight: false,
  },
  {
    id: 'marketing',
    role: 'Marketing & Positionierung',
    specialty: 'Kunden gewinnen & Reichweite aufbauen',
    icon: '📣',
    helps: ['Kanal-Strategie (wo bist du sichtbar?)', 'Content-Plan & Themen', 'LinkedIn & Online-Präsenz', 'Marketing-Audit'],
    phases: [2, 3, 4],
    priceHint: 'Ab Beratung CHF 99/Mo',
    highlight: false,
  },
  {
    id: 'tech',
    role: 'Tech-Stack Berater',
    specialty: 'Richtige Tools, richtig eingerichtet',
    icon: '⚙️',
    helps: ['Welche Tools du wirklich brauchst', 'Buchhaltungs-Software & CRM', 'Automatisierungen einrichten', '5h/Woche sparen durch richtige Tools'],
    phases: [2, 3],
    priceHint: 'Ab Fragen CHF 29/Mo',
    highlight: false,
  },
  {
    id: 'coach',
    role: 'Business Coach',
    specialty: 'Strategie, Skalierung & Mindset',
    icon: '🚀',
    helps: ['Geschäftsstrategie & Fokus', 'Preise und Wert kommunizieren', 'Skalierung & Systeme aufbauen', 'Mindset & Entscheidungen'],
    phases: [2, 3, 4],
    priceHint: 'Ab Beratung CHF 99/Mo',
    highlight: false,
  },
];

export default function ExpertenSection() {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  const filtered = activePhase
    ? EXPERTS.filter(e => e.phases.includes(activePhase))
    : EXPERTS;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Stage Selector */}
      <div className="mb-10">
        <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          Wo stehst du gerade?
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActivePhase(null)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
              activePhase === null
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            Alle anzeigen
          </button>
          {STAGES.map(stage => (
            <button
              key={stage.id}
              onClick={() => setActivePhase(activePhase === stage.id ? null : stage.id)}
              className={`px-5 py-2.5 rounded-xl border-2 transition-all ${
                activePhase === stage.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              <span className="block text-xs opacity-75">{stage.label}</span>
              <span className="font-semibold text-sm">{stage.sub}</span>
            </button>
          ))}
        </div>
        {activePhase && (
          <p className="text-center text-sm text-gray-500 mt-3">
            {STAGES.find(s => s.id === activePhase)?.desc} — {filtered.length} Experten verfügbar
          </p>
        )}
      </div>

      {/* Expert Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(expert => (
          <div
            key={expert.id}
            id={expert.id}
            className={`bg-white rounded-2xl border-2 p-6 flex flex-col shadow-sm hover:shadow-md transition-all ${
              expert.highlight ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-200'
            }`}
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl shrink-0">
                {expert.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm leading-tight">{expert.role}</p>
                <p className="text-xs text-gray-500 mt-0.5">{expert.specialty}</p>
              </div>
            </div>

            {/* Hilft bei */}
            <div className="mb-4 flex-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Hilft bei:</p>
              <ul className="space-y-1.5">
                {expert.helps.map(h => (
                  <li key={h} className="flex items-start gap-1.5 text-xs text-gray-700">
                    <span className="text-blue-500 mt-0.5 shrink-0">✓</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Phases */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {expert.phases.map(p => (
                <span key={p} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  Phase {p}
                </span>
              ))}
            </div>

            {/* Price hint */}
            <p className="text-xs text-blue-600 font-medium mb-4">{expert.priceHint}</p>

            {/* CTA */}
            <Link
              href="#warteliste"
              className="block w-full text-center bg-blue-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Auf Warteliste →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
