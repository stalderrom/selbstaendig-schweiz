import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BruttoNettoRechner from '@/components/BruttoNettoRechner';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Brutto-Netto-Rechner Schweiz 2026 – Lohn berechnen nach Kanton',
  description: 'Kostenloser Brutto-Netto-Rechner Schweiz 2026: brutto zu netto & netto zu brutto, alle 26 Kantone, AHV, BVG, Quellensteuer, 13. Monatslohn, Grenzgänger, Selbständige.',
  keywords: [
    'brutto netto rechner schweiz',
    'rechner brutto netto',
    'brutto zu netto schweiz',
    'netto zu brutto schweiz',
    'brutto zu netto rechner schweiz',
    'rechner netto zu brutto',
    'nettolohn rechner schweiz',
    'quellensteuer rechner',
    'lohnrechner schweiz 2026',
  ],
  alternates: {
    canonical: 'https://www.selbständig-schweiz.ch/rechner/brutto-netto',
  },
  openGraph: {
    title: 'Brutto-Netto-Rechner Schweiz 2026',
    description: 'Brutto zu Netto & Netto zu Brutto – alle 26 Kantone, AHV, BVG, Quellensteuer sofort berechnen.',
    type: 'website',
  },
};

// ─── Structured Data ─────────────────────────────────────────────────────────

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was wird vom Bruttolohn in der Schweiz abgezogen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In der Schweiz werden vom Bruttolohn abgezogen: AHV/IV/EO (5.3% Arbeitnehmeranteil), ALV (1.1% bis CHF 148\'200 Jahreslohn), NBUV (Nichtberufsunfallversicherung, ~0.8%), BVG/Pensionskasse (altersabhängig, 3.5–9%) und Einkommenssteuer (Quellensteuertarif je nach Kanton, Zivilstand). Nicht abgezogen: Krankenkasse – diese wird separat bezahlt (durchschnittlich CHF 430/Monat 2026).',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie berechne ich meinen Nettolohn in der Schweiz (brutto zu netto)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nettolohn = Bruttolohn – AHV/IV/EO (5.3%) – ALV (1.1%) – NBUV (~0.8%) – BVG (3.5–9% je nach Alter) – Einkommenssteuer (je nach Kanton 6–34% effektiv). Bei CHF 8\'000 Brutto in Zürich (ledig, 35 Jahre) resultiert ein Nettogehalt von ca. CHF 5\'900–6\'100/Monat.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welcher Kanton hat die tiefsten Steuern für Arbeitnehmer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zug hat die tiefsten kombinierten Steuern (Bund + Kanton + Gemeinde) in der Schweiz. Bei CHF 96\'000 Jahreslohn beträgt der effektive Satz in Zug ca. 9%, in Genf ca. 21%, in Bern ca. 19%. Bei CHF 8\'000 Bruttogehalt/Monat ergibt sich zwischen Zug und Genf ein jährlicher Netto-Unterschied von rund CHF 11\'000–14\'000.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie funktioniert Quellensteuer bei Ausweis B in der Schweiz?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Personen mit Aufenthaltsbewilligung B zahlen Quellensteuer – der Arbeitgeber zieht die Steuer direkt vom Lohn ab und überweist sie an den Kanton. Bei Teilzeit wird der Satz auf Basis des hochgerechneten 100%-Lohns ermittelt. Ab CHF 120\'000 Jahreslohn ist eine nachträgliche ordentliche Veranlagung obligatorisch. Antrag auf Korrektur: bis 31. März des Folgejahres.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was bringt der 13. Monatslohn netto in der Schweiz?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Der 13. Monatslohn erhöht den Jahresbruttolohn auf 13× den Monatslohn. Durch die progressive Besteuerung fällt mehr Steuer an. Bei CHF 8\'000 Brutto in Zürich bringt der 13. Monatslohn nach Steuern und Sozialabgaben effektiv ca. CHF 4\'500–5\'000 netto – weniger als ein normaler Monatsnettogehalt, weil der Grenzsteuersatz steigt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was verdient ein Selbständiger (Einzelfirma) netto im Vergleich zu einem Angestellten?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Selbständige (Einzelfirma) zahlen AHV/IV/EO 10.1% (doppelter Satz, kein Arbeitgeberanteil), keine Pflicht-ALV, keine NBUV, kein obligatorisches BVG. Dazu Einkommenssteuer auf den Reingewinn. Als Vorsorge-Alternative empfiehlt sich die Säule 3a (max. CHF 40\'320/Jahr 2026, voll abzugsfähig).',
      },
    },
    {
      '@type': 'Question',
      name: 'Was verdient ein Grenzgänger (G-Ausweis) netto in der Schweiz?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Grenzgänger (Ausweis G) aus Deutschland und Frankreich zahlen eine Sonderquellensteuer von ca. 4.5% in der Schweiz; aus Italien gelten spezifische Kantonssätze. Zusätzlich fallen Schweizer Sozialabgaben an (AHV 5.3%, ALV 1.1%, BVG, NBUV). Im Wohnsitzland (DE, FR, IT) muss i.d.R. ebenfalls Einkommensteuer bezahlt werden – die Schweizer Steuer wird dort angerechnet.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist der Mindestlohn in der Schweiz 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Es gibt keinen nationalen Mindestlohn in der Schweiz. Einige Kantone haben eigene Mindestlöhne: Genf CHF 24.32/h, Basel-Stadt CHF 21.50/h, Neuenburg CHF 21.09/h, Jura CHF 20.40/h, Tessin CHF 19.00/h (Quellen: kantonale Erlasse 2025/2026). Viele Branchen regeln Mindestlöhne über Gesamtarbeitsverträge (GAV).',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie hoch sind die Medianlöhne in der Schweiz nach Branche 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Laut BFS-Lohnstrukturerhebung und Lohnrechner.ch: IT-Entwickler (Senior) CHF 10\'500–13\'000/Mt., Finanzen/Controlling CHF 8\'500–11\'000/Mt., Buchhalter CHF 6\'500–8\'500/Mt., Pflege HF CHF 5\'200–6\'500/Mt., Projektleitung CHF 9\'000–12\'000/Mt. Die Spanne zwischen tiefstem und höchstem Kanton beträgt typisch CHF 10\'000–18\'000/Jahr netto (Quelle: BFS SAKE 2024).',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Brutto zu Netto berechnen – Schweiz 2026',
  description: 'So berechnen Sie Ihren Schweizer Nettolohn aus dem Bruttolohn – Schritt für Schritt.',
  totalTime: 'PT2M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Bruttolohn eingeben',
      text: 'Tragen Sie Ihren monatlichen oder jährlichen Bruttolohn (vor allen Abzügen) in den Rechner ein. Bei Teilzeit: 100%-Lohn eingeben und Pensum separat einstellen.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Kanton und Alter auswählen',
      text: 'Wählen Sie Ihren Arbeitskanton für den korrekten Steuersatz und tragen Sie Ihr Alter für die BVG-Berechnung ein.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Optionen einstellen',
      text: 'Aktivieren Sie 13. Monatslohn falls zutreffend. Ausweis B/L? → «Quellensteuer (B/L)» aktivieren. Selbständig? → «Selbständig» wählen.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Ergebnis ablesen',
      text: 'Der Nettolohn wird sofort berechnet – mit Aufschlüsselung aller Abzüge (AHV, ALV, BVG, NBUV, Steuer) und dem Jahreswert.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Kantone vergleichen',
      text: 'Tab «Kantonsvergleich»: alle 26 Kantone sortiert nach Nettolohn – sehen Sie auf einen Blick, wo sich Ihr Lohn am meisten auszahlt.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.selbständig-schweiz.ch/' },
    { '@type': 'ListItem', position: 2, name: 'Rechner', item: 'https://www.selbständig-schweiz.ch/rechner' },
    { '@type': 'ListItem', position: 3, name: 'Brutto-Netto-Rechner', item: 'https://www.selbständig-schweiz.ch/rechner/brutto-netto' },
  ],
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BruttoNettoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 pt-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/rechner" className="hover:text-blue-600 transition-colors">Rechner</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-700">Brutto-Netto-Rechner Schweiz 2026</span>
          </nav>
        </div>

        <BruttoNettoRechner />

        {/* SEO content below calculator */}
        <div className="max-w-4xl mx-auto px-4 pb-16 space-y-12">

          {/* ── Section 1: Abzüge Überblick ── */}
          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-bold text-gray-900">Brutto zu Netto in der Schweiz 2026 – alle Abzüge</h2>
            <p className="text-gray-600">
              Der Brutto-Netto-Rechner berechnet Ihren Nettolohn nach Schweizer Recht für 2026.
              Anders als deutsche Rechner berücksichtigt er die spezifischen Schweizer
              Sozialabgaben (AHV/IV/EO, ALV, NBUV, BVG) sowie die kantonale Einkommenssteuer –
              die je nach Kanton zwischen rund 3% (Zug) und über 28% (Waadt, Genf) effektiv variieren kann.
            </p>
            <p className="text-gray-600">
              Wichtig: Die Krankenkasse (KVG) wird in der Schweiz <strong>nicht</strong> vom Lohn abgezogen –
              sie ist eine Prämie, die direkt an die Krankenkasse bezahlt wird. Der Durchschnitt liegt 2026 bei
              rund CHF 430/Monat pro erwachsene Person (Quelle: BAG Prämienübersicht 2026).
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6">Alle Abzüge im Überblick 2026</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Abzug</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Satz (AN)</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Grundlage</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Rechtsgrundlage</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['AHV/IV/EO', '5.3%', 'Gesamter Bruttolohn', 'AHVG Art. 5'],
                    ['ALV', '1.1%', 'Bis CHF 148\'200/Jahr', 'AVIG Art. 3'],
                    ['NBUV', '~0.8%', 'Gesamter Bruttolohn', 'UVG Art. 91'],
                    ['BVG (Pensionskasse)', '3.5–9%', 'Koordinierter Lohn', 'BVG Art. 8, 16'],
                    ['Einkommenssteuer', '3–28% eff.', 'Steuerbares Einkommen', 'DBG + kant. Steuergesetze'],
                  ].map(([abzug, satz, basis, recht]) => (
                    <tr key={abzug} className="border-t border-gray-100">
                      <td className="p-3 border border-gray-200 font-medium text-gray-800">{abzug}</td>
                      <td className="p-3 border border-gray-200 text-gray-700">{satz}</td>
                      <td className="p-3 border border-gray-200 text-gray-600 text-xs">{basis}</td>
                      <td className="p-3 border border-gray-200 text-gray-500 text-xs">{recht}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Quellen: AHVG, AVIG, UVG, BVG (Stand 2026). Arbeitgeber zahlt zusätzlich je 5.3% AHV + ALV-Anteil + BVG-Anteil.
            </p>
          </div>

          {/* ── Section 2: Schritt-für-Schritt ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Brutto-Netto berechnen – Schritt für Schritt 2026</h2>
            <ol className="space-y-4">
              {[
                {
                  n: 1,
                  title: 'Bruttolohn eingeben',
                  text: 'Tragen Sie Ihren Bruttolohn ein – monatlich oder jährlich (Schalter /Mt. bzw. /Jahr). Bei 13. Monatslohn: Jahresbetrag ÷ 13 oder Monatswert eingeben und Toggle aktivieren. Bei Teilzeit: 100%-Lohn eingeben, Pensum separat setzen – der Rechner berechnet den Ist-Lohn automatisch.',
                },
                {
                  n: 2,
                  title: 'Kanton und Alter wählen',
                  text: 'Der Kanton bestimmt Ihren Steuersatz (effektive Differenz zwischen Zug und Genf: bis CHF 14\'000/Jahr bei CHF 8\'000/Mt. Brutto). Das Alter bestimmt den BVG-Satz: 25–34 Jahre 3.5%, 35–44 Jahre 5%, 45–54 Jahre 7.5%, 55–65 Jahre 9% (BVG Art. 16, Anhang).',
                },
                {
                  n: 3,
                  title: 'Optionen aktivieren',
                  text: '13. Monatslohn: erhöht die Steuerlast progressiv – der Nettowert ist typisch 10–15% tiefer als ein normaler Monatsnettogehalt. Quellensteuer B/L: aktivieren wenn Ausweis B oder L, damit die Quellensteuer-Hochrechnung korrekt berechnet wird. Selbständig: schaltet auf AHV 10.1% (Einzelfirma), ohne BVG/ALV/NBUV.',
                },
                {
                  n: 4,
                  title: 'Ergebnis lesen',
                  text: 'Tab «Ergebnis» zeigt Nettolohn monatlich und jährlich sowie alle Abzüge einzeln. Die Balkengrafik visualisiert die Verteilung. Tab «Kantonsvergleich» listet alle 26 Kantone sortiert nach Nettolohn – so sehen Sie, welcher Wohnort sich finanziell am meisten lohnt.',
                },
                {
                  n: 5,
                  title: 'Szenarien vergleichen',
                  text: 'Tabs «13. Monatslohn», «Quellensteuer B/L» und «Selbständig» zeigen direkte Vorher-Nachher-Vergleiche. Für Gehaltsverhandlungen: nutzen Sie den Kantonsvergleich, um zu verstehen, was ein Brutto-Angebot aus einem anderen Kanton netto bedeutet.',
                },
              ].map(({ n, title, text }) => (
                <li key={n} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mt-0.5">{n}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{title}</p>
                    <p className="text-sm text-gray-600 mt-1">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* ── Section 3: Kantonsvergleich ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Kantonsvergleich Nettolohn 2026: Zürich, Zug, Genf, Basel</h2>
            <p className="text-sm text-gray-600 mb-4">
              Basis: CHF 8'000/Mt. Brutto, ledig, konfessionslos, 35 Jahre, ohne 13. Monatslohn.
              Steuer inkl. Bundes-, Kantons- und Gemeindesteuer (Hauptort). Sozialabgaben identisch.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="text-left p-3 font-semibold">Kanton</th>
                    <th className="text-right p-3 font-semibold">Eff. Steuersatz</th>
                    <th className="text-right p-3 font-semibold">Steuer/Mt.</th>
                    <th className="text-right p-3 font-semibold">Netto/Mt.</th>
                    <th className="text-right p-3 font-semibold">Netto/Jahr</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Zug', '~9%',  'CHF 720',   'CHF 6\'350', 'CHF 76\'200'],
                    ['Schwyz', '~10%', 'CHF 800', 'CHF 6\'270', 'CHF 75\'240'],
                    ['Uri', '~11%', 'CHF 880',   'CHF 6\'190', 'CHF 74\'280'],
                    ['Nidwalden', '~11%', 'CHF 880', 'CHF 6\'190', 'CHF 74\'280'],
                    ['Appenzell I.Rh.', '~12%', 'CHF 960', 'CHF 6\'110', 'CHF 73\'320'],
                    ['Zürich', '~14%', 'CHF 1\'120', 'CHF 5\'950', 'CHF 71\'400'],
                    ['Thurgau', '~15%', 'CHF 1\'200', 'CHF 5\'870', 'CHF 70\'440'],
                    ['Basel-Stadt', '~17%', 'CHF 1\'360', 'CHF 5\'710', 'CHF 68\'520'],
                    ['Bern', '~19%', 'CHF 1\'520', 'CHF 5\'550', 'CHF 66\'600'],
                    ['Genf', '~21%', 'CHF 1\'680', 'CHF 5\'390', 'CHF 64\'680'],
                  ].map(([kanton, rate, tax, net, netYear], i) => (
                    <tr key={kanton} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 border-b border-gray-100 font-medium text-gray-800">{kanton}</td>
                      <td className="p-3 border-b border-gray-100 text-right text-gray-700">{rate}</td>
                      <td className="p-3 border-b border-gray-100 text-right text-gray-700">{tax}</td>
                      <td className="p-3 border-b border-gray-100 text-right font-semibold text-gray-900">{net}</td>
                      <td className="p-3 border-b border-gray-100 text-right text-gray-700">{netYear}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Richtwerte auf Basis interpolierter Steuertabellen (Hauptort, 2026). Exakte Werte variieren je nach Konfession,
              Gemeinde und abzugsfähigen Kosten. Quelle: kantonale Steuertarife, ESTV Steuerrechner.
            </p>
            <p className="text-sm text-gray-600 mt-3">
              <strong>Fazit:</strong> Bei CHF 8'000/Mt. Brutto ergibt sich zwischen Zug und Genf ein jährlicher
              Netto-Unterschied von rund <strong>CHF 11'500</strong> – allein durch den Wohnkanton.
              Der vollständige Vergleich aller 26 Kantone ist direkt im Rechner oben abrufbar (Tab «Kantonsvergleich»).
            </p>
          </div>

          {/* ── Section 4: Grenzgänger ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Grenzgänger Schweiz 2026: Brutto-Netto für CH-DE, CH-FR, CH-IT</h2>
            <p className="text-sm text-gray-600 mb-4">
              Grenzgänger (Ausweis G) unterliegen einem speziellen Steuerregime: Die Schweiz besteuert
              nur einen Teil des Einkommens, der Rest wird im Wohnsitzland versteuert.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Korridor</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">CH-Quellensteuer</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Besteuerung Wohnsitzland</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Abkommen</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['CH–DE (Schweiz/Deutschland)', '4.5% Pauschalsteuer', 'Deutschland besteuert volles Einkommen, CH-Steuer wird angerechnet', 'DBA CH-DE, Art. 15a'],
                    ['CH–FR (Schweiz/Frankreich)', '4.5% an CH-Kanton', 'Frankreich besteuert, Anrechnung nach Kantonszugehörigkeit', 'DBA CH-FR, Art. 17'],
                    ['CH–IT (Schweiz/Italien)', 'Kantonaler Satz (variiert)', 'Neues Abkommen 2024: anteilige Besteuerung', 'Rev. DBA CH-IT 2024'],
                  ].map(([korridor, ch, wohn, abk]) => (
                    <tr key={korridor} className="border-t border-gray-100">
                      <td className="p-3 border border-gray-200 font-medium text-gray-800">{korridor}</td>
                      <td className="p-3 border border-gray-200 text-gray-700">{ch}</td>
                      <td className="p-3 border border-gray-200 text-gray-600 text-xs">{wohn}</td>
                      <td className="p-3 border border-gray-200 text-gray-500 text-xs">{abk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
              <strong>Schweizer Sozialabgaben gelten für alle Grenzgänger:</strong> AHV 5.3%, ALV 1.1%,
              BVG (ab CHF 22'050 Jahreslohn), NBUV ~0.8%. Diese Abzüge sind identisch mit Schweizer Arbeitnehmern.
              Krankenkasse: Grenzgänger können sich je nach Kanton entweder in der Schweiz oder im Wohnsitzland versichern
              (Wahlrecht, EFTA/EU-Abkommen).
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Quellen: ESTV Merkblatt Grenzgänger, SECO, DBA-Texte (Stand 2026). Für individuelle Fälle: kantonales Steueramt.
            </p>
          </div>

          {/* ── Section 5: 13. Monatslohn & Bonus ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">13. Monatslohn & Bonus in der Schweiz 2026: Was bleibt netto?</h2>
            <p className="text-sm text-gray-600 mb-4">
              Rund 90% aller Schweizer Arbeitnehmenden erhalten einen 13. Monatslohn – er ist in vielen
              Gesamtarbeitsverträgen (GAV) und Einzelarbeitsverträgen verankert (Quelle: BFS SAKE 2024).
              Steuerlich wird er wie regulärer Lohn behandelt und erhöht den Jahresbruttolohn auf 13 Monatslöhne.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Brutto/Mt.</th>
                    <th className="text-right p-3 border border-gray-200 font-semibold text-gray-700">13. Mt. brutto</th>
                    <th className="text-right p-3 border border-gray-200 font-semibold text-gray-700">Mehrsteuer/Jahr</th>
                    <th className="text-right p-3 border border-gray-200 font-semibold text-gray-700">13. Mt. netto (ZH)</th>
                    <th className="text-right p-3 border border-gray-200 font-semibold text-gray-700">Eff. Netto-%</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['CHF 5\'000', 'CHF 5\'000', '~CHF 400', '~CHF 3\'100', '~62%'],
                    ['CHF 8\'000', 'CHF 8\'000', '~CHF 900', '~CHF 4\'700', '~59%'],
                    ['CHF 12\'000', 'CHF 12\'000', '~CHF 2\'000', '~CHF 6\'500', '~54%'],
                    ['CHF 18\'000', 'CHF 18\'000', '~CHF 4\'200', '~CHF 8\'800', '~49%'],
                  ].map(([brutto, mon13, steuer, netto, effpct]) => (
                    <tr key={brutto} className="border-t border-gray-100">
                      <td className="p-3 border border-gray-200 font-medium text-gray-800">{brutto}</td>
                      <td className="p-3 border border-gray-200 text-right text-gray-700">{mon13}</td>
                      <td className="p-3 border border-gray-200 text-right text-red-600">{steuer}</td>
                      <td className="p-3 border border-gray-200 text-right font-semibold text-gray-900">{netto}</td>
                      <td className="p-3 border border-gray-200 text-right text-gray-600">{effpct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Richtwerte für Kanton Zürich, ledig, konfessionslos, 35 Jahre. Werte variieren je nach Kanton und Zivilstand.
              Genaue Berechnung: im Rechner oben Tab «13. Monatslohn».
            </p>
            <p className="text-sm text-gray-600 mt-3">
              <strong>Bonus:</strong> Ein einmaliger Bonus wird ebenfalls wie Lohn besteuert und erhöht das steuerbare
              Jahreseinkommen. Bei progressiver Besteuerung kostet ein CHF 10'000 Bonus in Zürich
              (CHF 100'000 Jahreslohn) rund CHF 3'500–4'000 mehr Steuern – netto verbleiben ca. CHF 6'000–6'500.
            </p>
          </div>

          {/* ── Section 6: Branchen-Benchmarks ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Brutto-Benchmarks nach Branche und Kader Schweiz 2026</h2>
            <p className="text-sm text-gray-600 mb-4">
              Gehaltsverhandlung: Wer seinen Marktwert kennt, verhandelt besser. Diese Richtwerte basieren
              auf der BFS-Lohnstrukturerhebung (LSE 2022, Fortschreibung 2026), Lohnrechner.ch und Salarium.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Berufsfeld</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Erfahrungsstufe</th>
                    <th className="text-right p-3 border border-gray-200 font-semibold text-gray-700">Brutto/Mt. (Median)</th>
                    <th className="text-right p-3 border border-gray-200 font-semibold text-gray-700">Netto/Mt. (ZH, ~)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['IT – Software-Entwicklung', 'Junior (0–3 J.)', 'CHF 7\'500–9\'000', 'CHF 5\'300–6\'200'],
                    ['IT – Software-Entwicklung', 'Senior (7+ J.)', 'CHF 10\'500–13\'500', 'CHF 7\'100–8\'700'],
                    ['Finanzen / Controlling', 'Analyst', 'CHF 8\'500–11\'000', 'CHF 5\'900–7\'400'],
                    ['Finanzen / Controlling', 'CFO (KMU)', 'CHF 14\'000–20\'000', 'CHF 9\'000–12\'000'],
                    ['Rechnungswesen', 'Buchhalter', 'CHF 6\'500–8\'500', 'CHF 4\'700–5\'900'],
                    ['Gesundheit – Pflege', 'HF-Pflege', 'CHF 5\'200–6\'500', 'CHF 3\'900–4\'700'],
                    ['Gesundheit – Arzt', 'Assistenzarzt', 'CHF 6\'500–8\'500', 'CHF 4\'700–5\'900'],
                    ['Projektmanagement', 'PM (PMP/IPMA)', 'CHF 9\'000–12\'500', 'CHF 6\'200–8\'300'],
                    ['Marketing / Kommunikation', 'Manager', 'CHF 8\'000–11\'000', 'CHF 5\'600–7\'400'],
                    ['Handwerk / Bau', 'Polier', 'CHF 6\'000–7\'500', 'CHF 4\'400–5\'400'],
                  ].map(([bereich, stufe, brutto, netto], i) => (
                    <tr key={`${bereich}-${stufe}`} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 border-b border-gray-100 font-medium text-gray-800">{bereich}</td>
                      <td className="p-3 border-b border-gray-100 text-gray-600">{stufe}</td>
                      <td className="p-3 border-b border-gray-100 text-right text-gray-700">{brutto}</td>
                      <td className="p-3 border-b border-gray-100 text-right font-semibold text-gray-900">{netto}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Quellen: BFS Lohnstrukturerhebung LSE 2022 (Fortschreibung), Lohnrechner.ch, Salarium.ch (2025/2026).
              Netto-Schätzung: Kanton Zürich, ledig, 35 Jahre, ohne 13. Monatslohn. Tatsächliche Werte im Rechner berechnen.
            </p>
          </div>

          {/* ── Section 7: Mindestlohn ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Mindestlohn Schweiz 2026 nach Kanton und GAV</h2>
            <p className="text-sm text-gray-600 mb-4">
              Die Schweiz kennt keinen nationalen Mindestlohn. Stattdessen regeln kantonale Gesetze
              und Gesamtarbeitsverträge (GAV) branchenspezifische Untergrenzen.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Kanton / Branche</th>
                    <th className="text-right p-3 border border-gray-200 font-semibold text-gray-700">Mindestlohn/h</th>
                    <th className="text-right p-3 border border-gray-200 font-semibold text-gray-700">ca. Brutto/Mt. (100%)</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Grundlage</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Genf (kantonal)', 'CHF 24.32', 'CHF 4\'100', 'Loi sur le salaire minimum GE (2026)'],
                    ['Basel-Stadt (kantonal)', 'CHF 21.50', 'CHF 3\'620', 'Mindestlohngesetz BS (2026)'],
                    ['Neuenburg (kantonal)', 'CHF 21.09', 'CHF 3\'550', 'Loi sur l\'emploi NE (2024)'],
                    ['Jura (kantonal)', 'CHF 20.40', 'CHF 3\'440', 'Loi sur les conditions de travail JU'],
                    ['Tessin (kantonal)', 'CHF 19.00', 'CHF 3\'200', 'Legge sul salario minimo TI'],
                    ['Bau (GAV, LV)', 'CHF 26.50–33.50', 'CHF 4\'470–5\'650', 'LV Bauhauptgewerbe 2025'],
                    ['Gastgewerbe (L-GAV)', 'CHF 18.60–21.00', 'CHF 3\'135–3\'540', 'L-GAV Gastro 2025'],
                    ['Reinigung (BIGA-GAV)', 'CHF 19.65', 'CHF 3\'310', 'GAV Reinigung 2025'],
                  ].map(([kanton, lohn, monat, grundlage], i) => (
                    <tr key={kanton} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 border-b border-gray-100 font-medium text-gray-800">{kanton}</td>
                      <td className="p-3 border-b border-gray-100 text-right text-gray-700">{lohn}</td>
                      <td className="p-3 border-b border-gray-100 text-right font-semibold text-gray-900">{monat}</td>
                      <td className="p-3 border-b border-gray-100 text-gray-500 text-xs">{grundlage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Quellen: Kantonale Erlasse (Stand 2026), SECO GAV-Übersicht, Seco.admin.ch.
              Monatswert basiert auf 42 h/Woche × 4.333 Wochen. Ohne Kantonalsteuer-Abzüge.
            </p>
          </div>

          {/* ── Section 8: FAQ ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Häufige Fragen zum Brutto-Netto-Rechner Schweiz 2026</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Was wird vom Bruttolohn in der Schweiz abgezogen?',
                  a: 'Vom Bruttolohn werden abgezogen: AHV/IV/EO 5.3%, ALV 1.1% (bis CHF 148\'200/Jahr), NBUV ~0.8%, BVG 3.5–9% (altersabhängig) und Einkommenssteuer je nach Kanton. Nicht abgezogen: Krankenkasse (wird separat bezahlt, Ø CHF 430/Mt. 2026).',
                },
                {
                  q: 'Wie berechne ich brutto zu netto in der Schweiz?',
                  a: 'Nettolohn = Bruttolohn minus alle Sozialabgaben (AHV + ALV + NBUV + BVG, zusammen ca. 13–17%) minus Einkommenssteuer (je nach Kanton 3–28% effektiv). Beispiel: CHF 8\'000 Brutto in Zürich → ca. CHF 5\'950 Netto pro Monat (ledig, 35 J.).',
                },
                {
                  q: 'Welcher Kanton hat die tiefsten Steuern? (netto zu brutto Vergleich)',
                  a: 'Zug hat die tiefsten Steuern (~9% effektiv bei CHF 96\'000/Jahr), gefolgt von Schwyz, Uri, Nidwalden. Die teuersten Kantone sind Waadt und Genf (~21–24%). Der Netto-Unterschied bei CHF 8\'000/Mt. Brutto beträgt bis zu CHF 11\'500/Jahr zwischen Zug und Genf.',
                },
                {
                  q: 'Wie funktioniert die Quellensteuer bei Ausweis B (Teilzeit)?',
                  a: 'Bei Teilzeit wird die Quellensteuer auf Basis des hochgerechneten 100%-Lohns ermittelt (kantonale Pflicht). Bei 50% Pensum und CHF 4\'000 Ist-Lohn wird der Steuersatz auf CHF 8\'000 (100%) berechnet – dieser höhere Satz wird dann auf den Ist-Lohn CHF 4\'000 angewendet. Im Rechner oben: Quellensteuer-Toggle aktivieren, Pensum einstellen.',
                },
                {
                  q: 'Was bedeutet 13. Monatslohn netto in der Schweiz?',
                  a: 'Der 13. Monatslohn wird wie regulärer Lohn besteuert und erhöht das steuerbare Jahreseinkommen. Wegen der progressiven Besteuerung ist der Netto-Wert des 13. Monatslohns typisch 10–15% tiefer als ein normaler Monatsnettogehalt. Bei CHF 8\'000 Brutto in Zürich: 13. Mt. bringt ca. CHF 4\'700 netto statt CHF 5\'950 normaler Monatsnetto.',
                },
                {
                  q: 'Was sind die Abzüge für Selbständige (Einzelfirma)?',
                  a: 'Selbständige zahlen AHV/IV/EO 10.1% (kein Arbeitgeberanteil), keine ALV-Pflicht, keine NBUV, kein obligatorisches BVG. Als Vorsorge: Säule 3a max. CHF 40\'320/Jahr 2026 (voll steuerlich abzugsfähig). Einkommenssteuer auf Reingewinn wie Angestellte.',
                },
                {
                  q: 'Was ist der Mindestlohn in der Schweiz 2026?',
                  a: 'Kein nationaler Mindestlohn. Kantonale Mindestlöhne: Genf CHF 24.32/h, Basel-Stadt CHF 21.50/h, Neuenburg CHF 21.09/h. Viele Branchen regeln Mindestlöhne über GAV (z.B. Bau CHF 26.50–33.50/h, Gastgewerbe CHF 18.60–21.00/h).',
                },
                {
                  q: 'Wie viel verdient ein Grenzgänger (Ausweis G) netto?',
                  a: 'Grenzgänger zahlen Schweizer Sozialabgaben (AHV 5.3%, ALV 1.1%, BVG, NBUV) wie alle Arbeitnehmer. Steuerlich: CH-DE und CH-FR 4.5% Quellensteuer in der Schweiz, volle Besteuerung im Wohnsitzland (Anrechnung). Netto-Ergebnis ist ähnlich wie bei Schweizer Arbeitnehmern, aber komplexer wegen Doppelbesteuerungsabkommen.',
                },
                {
                  q: 'Was sind typische Löhne in der Schweiz nach Branche?',
                  a: 'Mediane Brutto-Monatslöhne 2026: IT-Entwickler Senior CHF 10\'500–13\'500, Finanzen Analyst CHF 8\'500–11\'000, Buchhalter CHF 6\'500–8\'500, Pflege HF CHF 5\'200–6\'500, Projektleitung CHF 9\'000–12\'500. Quellen: BFS Lohnstrukturerhebung, Lohnrechner.ch, Salarium.ch.',
                },
              ].map(({ q, a }, i) => (
                <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition-colors list-none">
                    <span>{q}</span>
                    <span className="shrink-0 text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 pb-4 pt-1 text-sm text-gray-600 border-t border-gray-100">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-center shadow-lg">
            <p className="text-2xl font-bold text-white mb-3">Selbständig in der Schweiz?</p>
            <p className="text-blue-100 mb-6">
              Erfahre alles über Einzelfirma gründen, Steuern und Vorsorge als Selbständigerwerbender.
            </p>
            <Link
              href="/artikel"
              className="inline-block bg-white text-blue-700 px-7 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-md hover:shadow-lg"
            >
              Alle Artikel anzeigen →
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
