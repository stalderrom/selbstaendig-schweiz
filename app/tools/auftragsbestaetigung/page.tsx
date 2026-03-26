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
    canonical: 'https://www.selbstaendig-schweiz.ch/tools/auftragsbestaetigung',
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
  url: 'https://www.selbstaendig-schweiz.ch/tools/auftragsbestaetigung',
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.selbstaendig-schweiz.ch/' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.selbstaendig-schweiz.ch/tools' },
    { '@type': 'ListItem', position: 3, name: 'Auftragsbestätigung Generator', item: 'https://www.selbstaendig-schweiz.ch/tools/auftragsbestaetigung' },
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

      <main className="bg-warm-white">
        {/* Breadcrumb */}
        <div className="border-b border-warm-200 bg-warm-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-warm-500">
              <Link href="/" className="hover:text-warm-900 transition-colors">Home</Link>
              <span className="text-warm-300">/</span>
              <span className="text-warm-700">Auftragsbestätigung erstellen</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
          <p className="category-label text-accent mb-3">Tool</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warm-900 mb-2">
            Auftragsbestätigung erstellen
          </h1>
          <p className="text-warm-600 text-lg mb-1">
            Kostenlos, ohne Anmeldung – professionelles Schweizer Dokument in 5 Minuten.
          </p>
        </div>

        {/* Tool */}
        <AuftragsbestaetigungGenerator />

        {/* SEO Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-12 space-y-12">

          {/* ── Was ist eine Auftragsbestätigung? ── */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-warm-900 mb-4">
              Was ist eine Auftragsbestätigung in der Schweiz?
            </h2>
            <p className="text-warm-700 text-sm mb-5 leading-relaxed">
              Die Auftragsbestätigung (Order Confirmation) ist ein schriftliches Dokument, mit dem du dem Kunden
              bestätigst, dass du seinen Auftrag annimmst – und zu welchen Konditionen. Rechtliche Grundlage:
              Art. 1 des Obligationenrechts (OR). Widerspricht der Auftraggeber nicht innerhalb angemessener Frist,
              gilt der Vertrag zu den bestätigten Bedingungen als abgeschlossen.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-warm-200">
                <thead>
                  <tr className="bg-warm-900 text-warm-white">
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
                    <tr key={dok} className={i % 2 === 0 ? 'bg-warm-white' : 'bg-warm-50'}>
                      <td className="p-3 font-semibold text-warm-900">{dok}</td>
                      <td className="p-3 text-warm-700">{zeit}</td>
                      <td className="p-3 text-warm-600 text-xs">{zweck}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Pflichtangaben ── */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-warm-900 mb-4">
              Pflichtangaben in der Auftragsbestätigung Schweiz
            </h2>
            <p className="text-sm text-warm-600 mb-5 leading-relaxed">
              Gesetzlich vorgeschrieben (OR) und für MWST-Pflichtige (MWSTG) sind folgende Angaben:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-warm-200 bg-warm-50 p-5">
                <p className="category-label text-warm-700 mb-3">Immer erforderlich</p>
                <ul className="space-y-2 text-sm text-warm-700">
                  {[
                    'Name und Adresse des Auftragnehmers (du)',
                    'Name und Adresse des Auftraggebers (Kunden)',
                    'Leistungsbeschreibung (was genau)',
                    'Menge / Umfang der Leistung',
                    'Preis (Einzelpreis und Gesamtbetrag)',
                    'Zahlungsbedingungen (Frist)',
                    'Datum des Dokuments',
                  ].map(i => <li key={i} className="flex gap-2"><span className="text-accent mt-0.5">·</span><span>{i}</span></li>)}
                </ul>
              </div>
              <div className="border border-accent-light bg-accent-50 p-5">
                <p className="category-label text-accent mb-3">Bei MWST-Pflicht zusätzlich</p>
                <ul className="space-y-2 text-sm text-warm-700">
                  {[
                    'Deine MWST-Nummer (CHE-xxx.xxx.xxx MWST)',
                    'Angewendeter MWST-Satz (z.B. 8.1%)',
                    'MWST-Betrag separat ausgewiesen',
                    'Leistung als exkl. oder inkl. MWST deklariert',
                  ].map(i => <li key={i} className="flex gap-2"><span className="text-accent mt-0.5">·</span><span>{i}</span></li>)}
                </ul>
                <p className="text-xs text-warm-500 mt-4">MWST-Pflicht ab CHF 100'000 Jahresumsatz</p>
              </div>
            </div>
          </div>

          {/* ── 5 Schritte ── */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-warm-900 mb-5">
              Auftragsbestätigung in 5 Schritten erstellen
            </h2>
            <div className="space-y-4">
              {[
                ['1', 'Deine Angaben', 'Firmenname, Adresse, Telefon, E-Mail, MWST-Nr. und IBAN. Optional: Logo hochladen.'],
                ['2', 'Kundenangaben', 'Name und Adresse des Kunden – erscheinen im Adressfeld des Dokuments.'],
                ['3', 'Auftragsnummer und Datum', 'Vergib eine Nummer (z.B. AB-2026-001) und das aktuelle Datum.'],
                ['4', 'Leistungen eingeben', 'Jede Position einzeln: Beschreibung, Menge, Einheit, Preis – Berechnung erfolgt automatisch.'],
                ['5', 'PDF downloaden und senden', 'Zahlungsfrist und MWST wählen, dann als PDF downloaden und per E-Mail an den Kunden senden.'],
              ].map(([num, title, desc]) => (
                <div key={num} className="flex gap-4 items-start border-t border-warm-200 pt-4">
                  <div className="w-7 h-7 bg-accent text-white text-xs font-bold font-serif flex items-center justify-center shrink-0 mt-0.5">
                    {num}
                  </div>
                  <div>
                    <p className="font-semibold text-warm-900 text-sm mb-1">{title}</p>
                    <p className="text-sm text-warm-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Tipps ── */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-warm-900 mb-5">
              5 Tipps für professionelle Auftragsbestätigungen
            </h2>
            <div className="space-y-3">
              {[
                ['Sofort senden', 'Sende die Auftragsbestätigung innerhalb von 24 Stunden nach dem Gespräch oder mündlicher Vereinbarung. Je früher, desto weniger Spielraum für Missverständnisse.'],
                ['Gegenbestätigung bitten', 'Bitte den Kunden explizit um eine kurze E-Mail-Bestätigung («Bestätigt, Danke»). Das schützt dich rechtlich am besten.'],
                ['Leistung präzise beschreiben', 'Vage Beschreibungen wie «Webseite» kosten dich später Zeit und Nerven. Besser: «WordPress-Webseite inkl. 5 Unterseiten, Kontaktformular, Mobile-Optimierung».'],
                ['Konsistente Nummerierung', 'Nutze eine klare Nummerierung (AB-2026-001, AB-2026-002 usw.). Das erleichtert die Buchhaltung und macht Dokumente nachvollziehbar.'],
                ['Archivieren', 'Speichere alle Auftragsbestätigungen lokal und in der Cloud. Du wirst sie brauchen: für die Steuer, bei Streitigkeiten, für Revisionen.'],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-4 p-4 bg-warm-50 border border-warm-200">
                  <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                  <div>
                    <p className="font-semibold text-warm-900 text-sm mb-0.5">{title}</p>
                    <p className="text-sm text-warm-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── FAQ ── */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-warm-900 mb-5">
              Häufige Fragen zur Auftragsbestätigung Schweiz
            </h2>
            <div className="space-y-0">
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
                <details key={i} className="group border-t border-warm-200 last:border-b">
                  <summary className="flex items-center justify-between gap-3 py-4 cursor-pointer font-semibold text-warm-900 hover:text-accent transition-colors list-none text-sm">
                    <span>{q}</span>
                    <span className="shrink-0 text-warm-400 group-open:rotate-180 transition-transform text-xs">▼</span>
                  </summary>
                  <div className="pb-4 text-sm text-warm-600 leading-relaxed">{a}</div>
                </details>
              ))}
            </div>
          </div>

          {/* ── Internal links ── */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { href: '/artikel/auftragsbestaetigung-vorlage-schweiz', title: 'Auftragsbestätigung Vorlage', desc: 'Rechtliche Grundlagen, Pflichtangaben, Muster-Text' },
              { href: '/artikel/offerte-erstellen-schweiz', title: 'Offerte erstellen Schweiz', desc: 'Professionelle Angebote – was muss rein, was nicht' },
              { href: '/artikel/rechnungsvorlage-schweiz', title: 'Rechnungsvorlage Schweiz', desc: 'QR-Rechnung, Pflichtangaben, kostenlose Vorlage' },
            ].map(({ href, title, desc }) => (
              <Link key={href} href={href} className="group block border-t-2 border-warm-200 hover:border-accent pt-4 transition-colors">
                <p className="font-serif font-bold text-warm-900 mb-1 text-sm group-hover:text-accent transition-colors">{title}</p>
                <p className="text-xs text-warm-500">{desc}</p>
              </Link>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="bg-ink p-10 text-center">
            <p className="category-label text-accent-mid mb-4">Weitere Tools & Ratgeber</p>
            <p className="font-serif text-2xl font-bold text-warm-white mb-3 leading-tight">
              Weitere kostenlose Tools
            </p>
            <p className="text-warm-500 mb-8 text-sm leading-relaxed">
              Stundensatz berechnen, Brutto-Netto-Rechner und mehr – alles kostenlos für Selbständige in der Schweiz.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/rechner/stundensatz" className="inline-block bg-accent text-white px-6 py-3 text-sm font-semibold hover:bg-accent-dark transition-colors">
                Stundensatz Rechner →
              </Link>
              <Link href="/artikel" className="inline-block border border-warm-600 text-warm-300 px-6 py-3 text-sm font-semibold hover:border-warm-400 hover:text-warm-white transition-colors">
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
