import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuftragsbestaetigungGenerator from '@/components/AuftragsbestaetigungGenerator';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Auftragsbestätigung erstellen Schweiz – kostenlos, sofort als PDF',
  description: 'Auftragsbestätigung kostenlos erstellen: Formular ausfüllen, Logo hochladen, sofort als PDF downloaden. Korrekte Schweizer Vorlage mit allen Pflichtangaben. Ohne Anmeldung.',
  keywords: [
    'auftragsbestätigung erstellen schweiz',
    'auftragsbestätigung vorlage schweiz kostenlos',
    'auftragsbestätigung generator schweiz',
    'auftragsbestätigung muster schweiz',
    'auftragsbestätigung pdf erstellen',
    'auftragsbestätigung schweiz selbständige',
    'auftragsbestätigung online erstellen',
    'auftragsbestätigung kostenlos',
  ],
  alternates: {
    canonical: 'https://www.selbständig-schweiz.ch/tools/auftragsbestaetigung',
  },
  openGraph: {
    title: 'Auftragsbestätigung erstellen Schweiz – kostenlos als PDF',
    description: 'Formular ausfüllen, Logo hochladen, PDF downloaden. Schweizer Vorlage mit allen Pflichtangaben. Kostenlos & ohne Anmeldung.',
    type: 'website',
  },
};

// ─── Structured Data ─────────────────────────────────────────────────────────

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Auftragsbestätigung Generator Schweiz',
  description: 'Kostenloser Online-Generator für Auftragsbestätigungen nach Schweizer Standard. Formular ausfüllen, Logo hochladen, PDF downloaden.',
  url: 'https://www.selbständig-schweiz.ch/tools/auftragsbestaetigung',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CHF',
  },
  featureList: [
    'Schweizer Auftragsbestätigung-Vorlage',
    'Logo hochladen',
    'Mehrere Positionen mit automatischer Berechnung',
    'MWST-Berechnung (8.1%, 3.8%, 2.6%)',
    'Rabatt-Funktion',
    'PDF-Download kostenlos',
    'Ohne Anmeldung',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Ist dieser Auftragsbestätigung-Generator wirklich kostenlos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, vollständig kostenlos und ohne Anmeldung. Du füllst das Formular aus, siehst die Vorschau in Echtzeit und downloadest das fertige Dokument als PDF – direkt aus dem Browser, ohne dass Daten gespeichert werden.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Angaben muss eine Auftragsbestätigung in der Schweiz zwingend enthalten?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pflichtangaben nach Schweizer Recht: Name und Adresse beider Parteien, Leistungsbeschreibung und Menge, Preis (exkl./inkl. MWST), Zahlungsbedingungen (Frist), Datum. Bei MWST-Pflicht (ab CHF 100\'000 Jahresumsatz): MWST-Nummer und ausgewiesene MWST. Optional aber empfohlen: Auftragsnummer, Referenznummer des Kunden, IBAN für Zahlungsangaben, AGB-Verweis.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie unterscheidet sich eine Auftragsbestätigung von einer Rechnung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Auftragsbestätigung: Dokument vor Beginn der Arbeit – du bestätigst dem Kunden, dass du seinen Auftrag annimmst und zu welchen Konditionen (Art. 1 OR). Rechnung: Zahlungsaufforderung nach Erbringung der Leistung. Bei grossen Aufträgen folgt auf die Auftragsbestätigung eine Rechnung. Bei kleineren Aufträgen kann die Rechnung direkt als erste Dokument kommen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ist eine per PDF versendete Auftragsbestätigung rechtsgültig?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Elektronisch versendete Dokumente (E-Mail mit PDF) sind in der Schweiz rechtsgültig (Art. 1 ff. OR). Wichtig: Klare Betreffzeile, eindeutige Dokument-Nummer und eine Bitte um schriftliche Gegenbestätigung durch den Kunden. Widerspricht der Auftraggeber nicht innerhalb angemessener Frist, gilt der Auftrag zu den bestätigten Konditionen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ab welchem Auftragswert empfiehlt sich eine Auftragsbestätigung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Empfehlung: Ab CHF 500 Auftragswert. Bei Projekten über CHF 2\'000 ist sie praktisch unverzichtbar – sie schützt dich bei Streitigkeiten über Leistungsumfang, Preis und Ausliefertermin. Bei laufenden Mandaten (Retainer) reicht oft ein einmaliger Rahmenvertrag, der mit einer monatlichen Rechnung kombiniert wird.',
      },
    },
    {
      '@type': 'Question',
      name: 'Muss ich MWST auf der Auftragsbestätigung ausweisen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nur wenn du MWST-pflichtig bist (Jahresumsatz über CHF 100\'000). Dann musst du deine MWST-Nummer, den Steuersatz (meist 8.1% Normalsatz) und den MWST-Betrag separat ausweisen. Der Generator unterstützt alle Schweizer MWST-Sätze: 8.1% (Normalsatz), 3.8% (Beherbergung), 2.6% (Reduziert).',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Auftragsbestätigung erstellen Schweiz',
  description: 'In 5 Schritten zur professionellen Auftragsbestätigung.',
  totalTime: 'PT5M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Deine Angaben eingeben',
      text: 'Gib Firmenname, Adresse, Telefon, E-Mail, MWST-Nummer und IBAN ein. Optional: Logo hochladen (PNG/JPG).',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Kundenangaben eingeben',
      text: 'Name und Adresse des Kunden eingeben. Diese erscheinen im Adressfeld des Dokuments.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Auftragsnummer und Betreff festlegen',
      text: 'Vergib eine Auftragsnummer (z.B. AB-2026-001), Datum und einen Betreff für das Dokument.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Leistungen und Preise eingeben',
      text: 'Füge alle Positionen ein: Beschreibung, Menge, Einheit (Std., Tage, Stk.) und Einzelpreis. Der Betrag wird automatisch berechnet.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'PDF downloaden und senden',
      text: 'Zahlungsfrist und MWST-Satz wählen, optional Bemerkungen hinzufügen. Dann auf «Als PDF downloaden» klicken und das Dokument per E-Mail an den Kunden senden.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.selbständig-schweiz.ch/' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.selbständig-schweiz.ch/tools' },
    { '@type': 'ListItem', position: 3, name: 'Auftragsbestätigung Generator', item: 'https://www.selbständig-schweiz.ch/tools/auftragsbestaetigung' },
  ],
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AuftragsbestaetigungPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/tools" className="hover:text-blue-600 transition-colors">Tools</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-700">Auftragsbestätigung</span>
          </nav>
        </div>

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Auftragsbestätigung erstellen
          </h1>
          <p className="text-gray-500 text-lg mb-1">
            Kostenlos, ohne Anmeldung – professionelles Schweizer Dokument in 5 Minuten.
          </p>
        </div>

        {/* Tool */}
        <AuftragsbestaetigungGenerator />

        {/* SEO Content */}
        <div className="max-w-5xl mx-auto px-4 pb-16 pt-12 space-y-12">

          {/* ── Was ist eine Auftragsbestätigung? ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Was ist eine Auftragsbestätigung in der Schweiz?
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Die Auftragsbestätigung (Order Confirmation) ist ein schriftliches Dokument, mit dem du dem Kunden
              bestätigst, dass du seinen Auftrag annimmst – und zu welchen Konditionen. Rechtliche Grundlage:
              Art. 1 des Obligationenrechts (OR). Widerspricht der Auftraggeber nicht innerhalb angemessener Frist,
              gilt der Vertrag zu den bestätigten Bedingungen als abgeschlossen.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="text-left p-3 font-semibold">Dokument</th>
                    <th className="text-left p-3 font-semibold">Zeitpunkt</th>
                    <th className="text-left p-3 font-semibold">Zweck</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Offerte', 'Vor Auftragserteilung', 'Angebot des Auftragnehmers – noch nicht bindend'],
                    ['Auftragsbestätigung', 'Nach Auftragserteilung', 'Bestätigung des angenommenen Auftrags – Vertrag entsteht'],
                    ['Rechnung', 'Nach Leistungserbringung', 'Zahlungsaufforderung für erbrachte Leistungen'],
                  ].map(([dok, zeit, zweck], i) => (
                    <tr key={dok} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 font-semibold text-gray-900">{dok}</td>
                      <td className="p-3 text-gray-700">{zeit}</td>
                      <td className="p-3 text-gray-600 text-xs">{zweck}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Pflichtangaben ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Pflichtangaben in der Auftragsbestätigung Schweiz
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Gesetzlich vorgeschrieben (OR) und für MWST-Pflichtige (MWSTG) sind folgende Angaben:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-green-200 bg-green-50 rounded-xl p-4">
                <p className="font-semibold text-green-800 text-sm mb-3">✅ Immer erforderlich</p>
                <ul className="space-y-1.5 text-xs text-green-700">
                  {[
                    'Name und Adresse des Auftragnehmers (du)',
                    'Name und Adresse des Auftraggebers (Kunden)',
                    'Leistungsbeschreibung (was genau)',
                    'Menge / Umfang der Leistung',
                    'Preis (Einzelpreis und Gesamtbetrag)',
                    'Zahlungsbedingungen (Frist)',
                    'Datum des Dokuments',
                  ].map(i => <li key={i} className="flex gap-1.5"><span>•</span><span>{i}</span></li>)}
                </ul>
              </div>
              <div className="border border-blue-200 bg-blue-50 rounded-xl p-4">
                <p className="font-semibold text-blue-800 text-sm mb-3">💡 Bei MWST-Pflicht zusätzlich</p>
                <ul className="space-y-1.5 text-xs text-blue-700">
                  {[
                    'Deine MWST-Nummer (CHE-xxx.xxx.xxx MWST)',
                    'Angewendeter MWST-Satz (z.B. 8.1%)',
                    'MWST-Betrag separat ausgewiesen',
                    'Leistung als exkl. oder inkl. MWST deklariert',
                  ].map(i => <li key={i} className="flex gap-1.5"><span>•</span><span>{i}</span></li>)}
                </ul>
                <p className="text-xs text-blue-500 mt-3">MWST-Pflicht ab CHF 100'000 Jahresumsatz</p>
              </div>
            </div>
          </div>

          {/* ── 5 Schritte ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Auftragsbestätigung in 5 Schritten erstellen
            </h2>
            <div className="space-y-3">
              {[
                ['1', 'Deine Angaben', 'Firmenname, Adresse, Telefon, E-Mail, MWST-Nr. und IBAN. Optional: Logo hochladen.'],
                ['2', 'Kundenangaben', 'Name und Adresse des Kunden – erscheinen im Adressfeld des Dokuments.'],
                ['3', 'Auftragsnummer und Datum', 'Vergib eine Nummer (z.B. AB-2026-001) und das aktuelle Datum.'],
                ['4', 'Leistungen eingeben', 'Jede Position einzeln: Beschreibung, Menge, Einheit, Preis – Berechnung erfolgt automatisch.'],
                ['5', 'PDF downloaden und senden', 'Zahlungsfrist und MWST wählen, dann als PDF downloaden und per E-Mail an den Kunden senden.'],
              ].map(([num, title, desc]) => (
                <div key={num} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    {num}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{title}</p>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Tipps ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              5 Tipps für professionelle Auftragsbestätigungen
            </h2>
            <div className="space-y-3">
              {[
                ['📬', 'Sofort senden', 'Sende die Auftragsbestätigung innerhalb von 24 Stunden nach dem Gespräch oder mündlicher Vereinbarung. Je früher, desto weniger Spielraum für Missverständnisse.'],
                ['✍️', 'Gegenbestätigung bitten', 'Bitte den Kunden explizit um eine kurze E-Mail-Bestätigung («Bestätigt, Danke»). Das schützt dich rechtlich am besten.'],
                ['📝', 'Leistung präzise beschreiben', 'Vage Beschreibungen wie «Webseite» kosten dich später Zeit und Nerven. Besser: «WordPress-Webseite inkl. 5 Unterseiten, Kontaktformular, Mobile-Optimierung».'],
                ['🔢', 'Konsistente Nummerierung', 'Nutze eine klare Nummerierung (AB-2026-001, AB-2026-002 usw.). Das erleichtert die Buchhaltung und macht Dokumente nachvollziehbar.'],
                ['📂', 'Archivieren', 'Speichere alle Auftragsbestätigungen lokal und in der Cloud. Du wirst sie brauchen: für die Steuer, bei Streitigkeiten, für Revisionen.'],
              ].map(([emoji, title, desc]) => (
                <div key={title} className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-xl shrink-0">{emoji}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-0.5">{title}</p>
                    <p className="text-xs text-gray-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── FAQ ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Häufige Fragen zur Auftragsbestätigung Schweiz
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: 'Ist dieser Generator wirklich kostenlos?',
                  a: 'Ja, vollständig kostenlos und ohne Anmeldung. Du füllst das Formular aus, siehst die Vorschau live und downloadest das PDF direkt – keine Daten werden gespeichert oder weitergegeben.',
                },
                {
                  q: 'Kann ich mein Logo einbinden?',
                  a: 'Ja. Lade einfach dein Logo als PNG oder JPG hoch – es erscheint oben links im Dokument. Das Logo wird nicht gespeichert, sondern nur lokal im Browser verarbeitet.',
                },
                {
                  q: 'Ist die Auftragsbestätigung rechtlich bindend?',
                  a: 'Ja, wenn der Kunde nicht innerhalb angemessener Frist widerspricht (Art. 1 OR). Lass dir zur Sicherheit immer eine kurze schriftliche Gegenbestätigung per E-Mail geben.',
                },
                {
                  q: 'Kann ich auch ohne MWST eine Auftragsbestätigung erstellen?',
                  a: "Ja. Im Generator kannst du unter «Konditionen» einfach «Keine MWST» auswählen. Wenn du unter CHF 100\u2019000 Jahresumsatz bist, bist du nicht MWST-pflichtig.",
                },
                {
                  q: 'Was ist der Unterschied zwischen Auftragsbestätigung und Offerte?',
                  a: 'Die Offerte ist ein Angebot – noch nicht verbindlich. Die Auftragsbestätigung kommt danach, wenn der Kunde zugestimmt hat. Mit ihr entsteht der Vertrag.',
                },
              ].map(({ q, a }, i) => (
                <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition-colors list-none text-sm">
                    <span>{q}</span>
                    <span className="shrink-0 text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 pb-4 pt-1 text-sm text-gray-600 border-t border-gray-100">{a}</div>
                </details>
              ))}
            </div>
          </div>

          {/* ── Internal links ── */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                href: '/artikel/auftragsbestaetigung-vorlage-schweiz',
                title: 'Auftragsbestätigung Vorlage',
                desc: 'Rechtliche Grundlagen, Pflichtangaben, Muster-Text',
                color: 'border-blue-200 hover:border-blue-400',
              },
              {
                href: '/artikel/offerte-erstellen-schweiz',
                title: 'Offerte erstellen Schweiz',
                desc: 'Professionelle Angebote – was muss rein, was nicht',
                color: 'border-gray-200 hover:border-blue-300',
              },
              {
                href: '/artikel/rechnungsvorlage-schweiz',
                title: 'Rechnungsvorlage Schweiz',
                desc: 'QR-Rechnung, Pflichtangaben, kostenlose Vorlage',
                color: 'border-gray-200 hover:border-blue-300',
              },
            ].map(({ href, title, desc, color }) => (
              <Link
                key={href}
                href={href}
                className={`block border-2 ${color} rounded-xl p-4 transition-all hover:shadow-md`}
              >
                <p className="font-semibold text-gray-900 mb-1 text-sm">{title}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </Link>
            ))}
          </div>

          {/* ── Experten CTA ── */}
          <div className="border-2 border-blue-200 bg-blue-50 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl shrink-0">
              ⚖️
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 mb-1">Brauchst du Hilfe mit Verträgen oder AGB?</p>
              <p className="text-sm text-gray-600">
                Unsere kuratierten Anwälte kennen die Situation von Selbständigen aus eigener Erfahrung — kein Juristendeutsch, direkte Antworten.
              </p>
            </div>
            <Link
              href="/experten#anwalt"
              className="shrink-0 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Anwalt finden →
            </Link>
          </div>

          {/* ── CTA ── */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-center shadow-lg">
            <p className="text-2xl font-bold text-white mb-3">Weitere kostenlose Tools</p>
            <p className="text-blue-100 mb-6 text-sm">
              Stundensatz berechnen, Brutto-Netto-Rechner und mehr – alles kostenlos für Selbständige in der Schweiz.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/rechner/stundensatz"
                className="inline-block bg-white text-blue-700 px-5 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-md text-sm"
              >
                Stundensatz Rechner →
              </Link>
              <Link
                href="/artikel"
                className="inline-block bg-blue-500 text-white px-5 py-3 rounded-xl font-bold hover:bg-blue-400 transition-all shadow-md text-sm"
              >
                Alle Artikel →
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
