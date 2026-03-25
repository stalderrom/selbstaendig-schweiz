import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StundensatzRechner from '@/components/StundensatzRechner';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Stundensatz Rechner Schweiz 2026 – kostenlos & sofort',
  description: 'Kostenloser Stundensatz Rechner Schweiz 2026: Berechne deinen Mindeststundensatz als Selbständiger – inkl. AHV, Steuern, Betriebskosten, alle 26 Kantone.',
  keywords: [
    'stundensatz rechner schweiz',
    'stundensatz berechnen schweiz',
    'stundensatz selbständige schweiz',
    'tagessatz rechner schweiz',
    'freelancer stundensatz schweiz',
    'wie viel stundensatz schweiz',
    'stundensatz freelancer schweiz 2026',
    'mindeststundensatz berechnen',
    'stundensatz mit ahv und steuern',
  ],
  alternates: {
    canonical: 'https://www.selbständig-schweiz.ch/rechner/stundensatz',
  },
  openGraph: {
    title: 'Stundensatz Rechner Schweiz 2026 – kostenlos & sofort',
    description: 'Berechne deinen Mindeststundensatz als Selbständiger – inkl. AHV, Steuern, Betriebskosten, alle 26 Kantone.',
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
      name: 'Wie berechne ich meinen Stundensatz als Selbständiger in der Schweiz?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stundensatz = (Benötigter Jahresgewinn + Betriebskosten) ÷ Fakturierbare Stunden. Der Jahresgewinn muss dein Zielnettoeinkommen nach AHV (10.1%) und Einkommenssteuer (je nach Kanton 3–33%) abdecken. Fakturierbare Stunden: typisch 900–1\'300 pro Jahr (253 Arbeitstage minus Ferien, Krankheit, Admin, Akquise). Nutze den Rechner oben für eine genaue Kalkulation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist ein typischer Stundensatz für Selbständige in der Schweiz 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Schweizer Stundensätze 2026: IT/Software CHF 120–200, Unternehmensberatung CHF 130–250, Marketing/Design CHF 90–150, Handwerk CHF 80–130, Treuhand/Recht CHF 120–220. Die Schweiz zahlt deutlich mehr als Deutschland oder Österreich. Als Faustregel: Wer als Angestellter CHF 100\'000/Jahr verdienen würde, braucht als Selbständiger mindestens CHF 120–140/Std.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie viele Stunden kann ich als Selbständiger im Jahr fakturieren?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Von 253 Arbeitstagen (365 Tage minus 104 Wochenenden minus 8 Feiertage) gehen typisch 25 Ferientage, 5 Krankheitstage und 30% Admin/Akquise/Weiterbildung ab. Das ergibt rund 155–170 fakturierbare Tage = 1\'240–1\'360 Stunden. Einsteiger rechnen eher mit 800–1\'000 Stunden, da Akquise am Anfang mehr Zeit kostet.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Kosten muss mein Stundensatz decken?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Der Stundensatz muss decken: 1) Dein Zielnettoeinkommen, 2) AHV/IV/EO 10.1% vom Reingewinn, 3) Einkommenssteuer (je nach Kanton und Einkommen 10–35% effektiv), 4) Betriebskosten (Büro, IT, Versicherungen, Buchhaltung: typisch CHF 10\'000–30\'000/Jahr), 5) Reserve für Ausfallzeiten (empfohlen 10–15%). Die Säule 3a (max. CHF 40\'320/Jahr) reduziert die Steuerlast und sollte in die Kalkulation einbezogen werden.',
      },
    },
    {
      '@type': 'Question',
      name: 'Muss ich als Selbständiger MWST auf meinen Stundensatz aufschlagen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ab CHF 100\'000 Jahresumsatz bist du in der Schweiz MWST-pflichtig und musst 8.1% MWST auf deine Leistungen aufschlagen (2026). Bei B2B-Kunden ist das neutral – sie ziehen die Vorsteuer ab. Bei Privatkunden erhöhst du effektiv deinen Preis. Unterhalb von CHF 100\'000 Umsatz ist die MWST optional. Der Stundensatz-Rechner berechnet den Netto-Stundensatz ohne MWST.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie unterscheidet sich der Stundensatz vom Tagessatz?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tagessatz = Stundensatz × 8 Stunden (oder 7.5 Std.). Bei CHF 150/Std. ergibt das CHF 1\'200/Tag. Tagessätze sind bei Consulting-Mandaten, Projekteinsätzen vor Ort und Interim-Management üblich. Bei laufenden Mandaten werden oft Monatspauschalen vereinbart. Intern immer auf Basis des Stundensatzes kalkulieren, um sicherzustellen, dass alle Kosten gedeckt sind.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welcher Kanton ist steuerlich am günstigsten für Selbständige?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zug hat die tiefsten Steuern für Selbständige (Reingewinn CHF 100\'000: ca. 9.5% effektiv), gefolgt von Schwyz, Nidwalden und Obwalden. Die teuersten Kantone sind Waadt und Genf (ca. 25–30% effektiv). Bei CHF 100\'000 Reingewinn beträgt der jährliche Steuerunterschied zwischen Zug und Genf rund CHF 15\'000–18\'000. Der Stundensatz-Rechner berechnet für alle 26 Kantone.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Stundensatz berechnen als Selbständiger Schweiz 2026',
  description: 'So berechnest du deinen Mindeststundensatz als Selbständiger in der Schweiz – Schritt für Schritt.',
  totalTime: 'PT3M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Zielnettoeinkommen festlegen',
      text: 'Schiebe den Regler auf dein gewünschtes monatliches Nettoeinkommen (nach Steuern und AHV). Starte mit deinem aktuellen Gehaltsniveau als Angestellter oder mit dem, was du zum Leben brauchst.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Kanton auswählen',
      text: 'Wähle deinen Wohnkanton für die Steuerberechnung. Der Kanton hat grossen Einfluss – zwischen Zug und Genf kann der Stundensatz bis zu CHF 20–30 variieren.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Zeitparameter einstellen',
      text: 'Gib deine geplanten Ferientage und den Anteil nicht-fakturierbarer Zeit ein (Admin, Akquise, Weiterbildung). Als Einsteiger: eher 40–50% nicht fakturierbar. Mit vollen Büchern: 20–25%.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Betriebskosten schätzen',
      text: 'Rechne alle jährlichen Kosten zusammen: Büro oder Coworking, IT/Software, Telefon/Internet, Versicherungen (KTG, Berufshaftpflicht), Buchhaltung/Treuhänder, Marketing, Weiterbildung. Typisch CHF 10\'000–30\'000/Jahr.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Ergebnis ablesen und mit Markt vergleichen',
      text: 'Der Mindeststundensatz wird sofort berechnet. Vergleiche ihn mit den Branchen-Benchmarks und prüfe, ob er am Markt durchsetzbar ist. Wenn unter dem Markt: prüfe, ob du Kosten senken oder das Zieleinkommen anpassen kannst.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.selbständig-schweiz.ch/' },
    { '@type': 'ListItem', position: 2, name: 'Rechner', item: 'https://www.selbständig-schweiz.ch/rechner' },
    { '@type': 'ListItem', position: 3, name: 'Stundensatz Rechner', item: 'https://www.selbständig-schweiz.ch/rechner/stundensatz' },
  ],
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function StundensatzPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="max-w-5xl mx-auto px-4 pt-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/rechner" className="hover:text-blue-600 transition-colors">Rechner</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-700">Stundensatz Rechner Schweiz 2026</span>
          </nav>
        </div>

        <StundensatzRechner />

        {/* SEO content below calculator */}
        <div className="max-w-5xl mx-auto px-4 pb-16 space-y-12">

          {/* ── Section 1: Formel & Grundlagen ── */}
          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-bold text-gray-900">Stundensatz berechnen Schweiz – die Formel</h2>
            <p className="text-gray-600">
              Der Stundensatz-Rechner löst das Kernproblem jedes Selbständigen: Wie viel muss ich pro Stunde
              verlangen, damit ich nach AHV, Steuern und Betriebskosten mein Wunscheinkommen erreiche?
              Die Grundformel ist einfach — die Herausforderung liegt in den korrekten Eingaben.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 my-4 font-mono text-sm">
              <p className="text-gray-700 font-semibold mb-2">Stundensatz-Formel:</p>
              <p className="text-gray-800">Stundensatz = (Jahresgewinn + Betriebskosten) ÷ Fakturierbare Stunden</p>
              <p className="text-gray-500 mt-2 text-xs">
                Jahresgewinn = Betrag, der nach AHV und Steuern dein Zielnettoeinkommen ergibt
              </p>
            </div>
            <p className="text-gray-600">
              Der Rechner berechnet den erforderlichen Jahresgewinn iterativ: Er startet mit einer Schätzung
              und passt sie an, bis das verbleibende Nettoeinkommen exakt deinem Ziel entspricht —
              unter Berücksichtigung der AHV (10.1% für Selbständige), der kantonal unterschiedlichen
              Einkommenssteuer und der optionalen Säule-3a-Deduktion (max. CHF 40'320/Jahr, 2026).
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6">Was viele Selbständige vergessen</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Kostenblock</th>
                    <th className="text-right p-3 border border-gray-200 font-semibold text-gray-700">Typischer Betrag/Jahr</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Häufig vergessen?</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['AHV/IV/EO (Selbständige)', 'ca. 10.1% vom Reingewinn', 'Oft unterschätzt'],
                    ['Einkommenssteuer', '10–35% effektiv (je nach Kanton)', 'Ja – oft zu tief angesetzt'],
                    ['Betriebskosten', 'CHF 10\'000–30\'000', 'Teilweise'],
                    ['Nicht fakturierbare Zeit', '20–40% der Arbeitszeit', 'Häufig'],
                    ['Krankheitstage / Leerläufe', '5–15 Tage/Jahr', 'Sehr häufig'],
                    ['Krankentaggeldversicherung', 'CHF 800–2\'000/Jahr', 'Ja'],
                    ['Berufliche Weiterbildung', 'CHF 1\'000–4\'000/Jahr', 'Ja'],
                    ['Reserve / Notgroschen', '10–15% des Umsatzes', 'Meistens'],
                  ].map(([pos, betrag, vergessen]) => (
                    <tr key={pos} className="border-t border-gray-100">
                      <td className="p-3 border border-gray-200 font-medium text-gray-800">{pos}</td>
                      <td className="p-3 border border-gray-200 text-right text-gray-700">{betrag}</td>
                      <td className="p-3 border border-gray-200 text-gray-500 text-xs">{vergessen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Quellen: AHV-Gesetz (AHVG Art. 8), ESTV Steuerrechner 2026, Branchenbeobachtungen.
            </p>
          </div>

          {/* ── Section 2: Fakturierbare Stunden ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Fakturierbare Stunden realistisch planen</h2>
            <p className="text-sm text-gray-600 mb-4">
              Der grösste Irrtum: zu denken, man könne 8 Stunden pro Tag × 250 Arbeitstage = 2'000 Stunden
              fakturieren. In der Praxis sind 900–1'300 Stunden realistisch.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="text-left p-3 font-semibold">Profil</th>
                    <th className="text-right p-3 font-semibold">Fakturierb. Tage</th>
                    <th className="text-right p-3 font-semibold">Fakturierb. Std.</th>
                    <th className="text-left p-3 font-semibold">Annahmen</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Einsteiger (1. Jahr)',        '~110',  '~880',  '40% Admin/Akquise, 20 Ferientage'],
                    ['Etabliert (3–5 Jahre)',       '~155',  '~1\'240', '30% Admin/Akquise, 25 Ferientage'],
                    ['Voll ausgelastet (>5 Jahre)', '~175',  '~1\'400', '20% Admin/Akquise, 25 Ferientage'],
                    ['Teilzeit (60%)',              '~95',   '~760',  '30% Admin, 25 Ferientage, 60% Pensum'],
                  ].map(([profil, tage, std, annahmen], i) => (
                    <tr key={profil} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 border-b border-gray-100 font-medium text-gray-800">{profil}</td>
                      <td className="p-3 border-b border-gray-100 text-right text-gray-700">{tage}</td>
                      <td className="p-3 border-b border-gray-100 text-right font-semibold text-gray-900">{std}</td>
                      <td className="p-3 border-b border-gray-100 text-gray-500 text-xs">{annahmen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Basis: 253 Arbeitstage/Jahr, 5 Krankheitstage, 8 Std./Tag. Tatsächliche Werte variieren stark.
            </p>
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <strong>Tipp:</strong> Tracke deine tatsächlichen fakturierbaren Stunden mindestens
              im ersten Jahr konsequent — die meisten Selbständigen überschätzen ihre Auslastung um 20–30%.
              Ein gutes Zeiterfassungs-Tool hilft, die Realität sauber zu dokumentieren.
            </div>
          </div>

          {/* ── Section 3: Branchenübliche Stundensätze ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Branchenübliche Stundensätze Schweiz 2026</h2>
            <p className="text-sm text-gray-600 mb-4">
              Orientierungswerte für häufige Tätigkeitsbereiche. Die Spanne erklärt sich durch
              Erfahrung, Spezialisierungsgrad, Kundengrösse und Region.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Tätigkeitsbereich</th>
                    <th className="text-right p-3 border border-gray-200 font-semibold text-gray-700">Stundensatz (CHF)</th>
                    <th className="text-right p-3 border border-gray-200 font-semibold text-gray-700">Tagessatz (CHF)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['IT / Softwareentwicklung (Senior)', '140–220', '1\'120–1\'760'],
                    ['IT / Softwareentwicklung (Junior)', '100–140', '800–1\'120'],
                    ['Cloud / DevOps / Security', '140–220', '1\'120–1\'760'],
                    ['Data Science / KI', '150–260', '1\'200–2\'080'],
                    ['Unternehmensberatung (Senior)', '180–350', '1\'440–2\'800'],
                    ['Unternehmensberatung (Junior)', '130–180', '1\'040–1\'440'],
                    ['Finanzberatung / Controlling', '130–220', '1\'040–1\'760'],
                    ['Treuhand / Buchführung', '110–180', '880–1\'440'],
                    ['Rechtsberatung', '200–500', '1\'600–4\'000'],
                    ['HR-Beratung', '120–180', '960–1\'440'],
                    ['Marketing / Digital', '100–180', '800–1\'440'],
                    ['Grafik- / Webdesign', '90–160', '720–1\'280'],
                    ['SEO / Content / Texter', '90–160', '720–1\'280'],
                    ['Business Coaching', '150–350', '1\'200–2\'800'],
                    ['Life Coaching', '100–200', '800–1\'600'],
                    ['Elektriker / Sanitär', '90–130', '720–1\'040'],
                    ['Architekt', '120–200', '960–1\'600'],
                    ['Schreiner / Maler', '75–120', '600–960'],
                  ].map(([bereich, std, tag], i) => (
                    <tr key={bereich} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 border-b border-gray-100 font-medium text-gray-800">{bereich}</td>
                      <td className="p-3 border-b border-gray-100 text-right text-gray-700">CHF {std}</td>
                      <td className="p-3 border-b border-gray-100 text-right text-gray-600">CHF {tag}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Richtwerte basierend auf Freelancer.ch, experteer.ch, Marktbeobachtungen 2025/2026.
              Tatsächliche Sätze hängen stark von Erfahrung, Referenzen, Positionierung und Kundensegment ab.
            </p>
          </div>

          {/* ── Section 4: AHV und Steuern ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">AHV und Steuern für Selbständige 2026</h2>
            <p className="text-sm text-gray-600 mb-4">
              Selbständige zahlen andere Sozialabgaben als Angestellte. Diese Unterschiede sind
              entscheidend für die korrekte Stundensatz-Kalkulation.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="border border-gray-200 rounded-xl p-4">
                <p className="font-semibold text-gray-900 mb-3">Selbständige (Einzelfirma)</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex justify-between">
                    <span>AHV/IV/EO</span>
                    <span className="font-semibold text-orange-600">10.1%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>ALV</span>
                    <span className="text-gray-500">nicht obligatorisch</span>
                  </li>
                  <li className="flex justify-between">
                    <span>BVG (Pensionskasse)</span>
                    <span className="text-gray-500">freiwillig</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Unfallversicherung</span>
                    <span className="text-gray-500">freiwillig</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Säule 3a</span>
                    <span className="font-semibold text-green-600">max. CHF 40'320</span>
                  </li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <p className="font-semibold text-gray-900 mb-3">Angestellte (zum Vergleich)</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex justify-between">
                    <span>AHV/IV/EO</span>
                    <span className="font-semibold">5.3% (AN-Anteil)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>ALV</span>
                    <span>1.1%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>BVG (Pensionskasse)</span>
                    <span>3.5–9% (altersabh.)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>NBUV</span>
                    <span>~0.8%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Säule 3a</span>
                    <span>max. CHF 7'258</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
              <strong>Wichtig:</strong> Als Selbständiger zahlst du den gesamten AHV-Satz von 10.1%
              selbst — das ist der doppelte Arbeitnehmer-Anteil, weil du auch den Arbeitgeber-Anteil übernimmst.
              Dafür kannst du bis zu CHF 40'320/Jahr in die Säule 3a einzahlen (Angestellte max. CHF 7'258),
              was die Steuerlast erheblich senkt.
            </div>
          </div>

          {/* ── Section 5: Kantonsvergleich ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Stundensatz-Unterschied nach Kanton – Beispielrechnung 2026
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Basis: CHF 6'000/Mt. Netto-Ziel, 25 Ferientage, 30% Admin/Akquise, CHF 15'000 Betriebskosten,
              Säule 3a aktiviert.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="text-left p-3 font-semibold">Kanton</th>
                    <th className="text-right p-3 font-semibold">Eff. Steuersatz</th>
                    <th className="text-right p-3 font-semibold">Jahresumsatz nötig</th>
                    <th className="text-right p-3 font-semibold">Stundensatz ca.</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Zug',           '~9.5%',  'CHF 129\'000', 'CHF 94'],
                    ['Schwyz',        '~12.5%', 'CHF 133\'000', 'CHF 97'],
                    ['Nidwalden',     '~13%',   'CHF 134\'000', 'CHF 97'],
                    ['Zürich',        '~18.5%', 'CHF 141\'000', 'CHF 103'],
                    ['Aargau',        '~19.5%', 'CHF 143\'000', 'CHF 104'],
                    ['Bern',          '~23.8%', 'CHF 149\'000', 'CHF 108'],
                    ['Waadt',         '~25%',   'CHF 151\'000', 'CHF 110'],
                    ['Genf',          '~24.7%', 'CHF 152\'000', 'CHF 111'],
                  ].map(([kanton, rate, umsatz, std], i) => (
                    <tr key={kanton} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 border-b border-gray-100 font-medium text-gray-800">{kanton}</td>
                      <td className="p-3 border-b border-gray-100 text-right text-gray-700">{rate}</td>
                      <td className="p-3 border-b border-gray-100 text-right text-gray-700">{umsatz}</td>
                      <td className="p-3 border-b border-gray-100 text-right font-semibold text-gray-900">{std}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Näherungswerte. Exakte Berechnung im Rechner oben — alle 26 Kantone verfügbar.
            </p>
            <p className="text-sm text-gray-600 mt-3">
              <strong>Fazit:</strong> Bei gleichem Nettoeinkommen ist in Zug ein um ca. CHF 15–17/Std.
              tieferer Stundensatz ausreichend als in Genf oder Waadt — ein erheblicher Wettbewerbsvorteil.
            </p>
          </div>

          {/* ── Section 6: Säule 3a ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Säule 3a für Selbständige: Steuern sparen und Vorsorge aufbauen
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Selbständige können 2026 bis zu CHF 40'320 in die Säule 3a einzahlen (oder 20% des
              Reingewinns, je nachdem was tiefer ist). Dieser Betrag wird vollständig vom steuerbaren
              Einkommen abgezogen — ein erheblicher Steuervorteil.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Reingewinn/Jahr</th>
                    <th className="text-right p-3 border border-gray-200 font-semibold text-gray-700">Steuerersparnis ZH</th>
                    <th className="text-right p-3 border border-gray-200 font-semibold text-gray-700">Steuerersparnis BE</th>
                    <th className="text-right p-3 border border-gray-200 font-semibold text-gray-700">Steuerersparnis ZG</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['CHF 80\'000',  '~CHF 4\'800',  '~CHF 6\'000',  '~CHF 2\'400'],
                    ['CHF 120\'000', '~CHF 6\'900',  '~CHF 8\'800',  '~CHF 3\'300'],
                    ['CHF 160\'000', '~CHF 8\'200',  '~CHF 10\'500', '~CHF 4\'000'],
                    ['CHF 200\'000', '~CHF 9\'000',  '~CHF 11\'500', '~CHF 4\'800'],
                  ].map(([gewinn, zh, be, zg]) => (
                    <tr key={gewinn} className="border-t border-gray-100">
                      <td className="p-3 border border-gray-200 font-medium text-gray-800">{gewinn}</td>
                      <td className="p-3 border border-gray-200 text-right text-green-600 font-semibold">{zh}</td>
                      <td className="p-3 border border-gray-200 text-right text-green-600 font-semibold">{be}</td>
                      <td className="p-3 border border-gray-200 text-right text-green-600 font-semibold">{zg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Richtwerte auf Basis interpolierter Steuertabellen (Hauptort, ledig, 2026). Säule 3a = CHF 40'320.
              Tatsächliche Steuerersparnis im Rechner berechnen.
            </p>
          </div>

          {/* ── Section 7: FAQ ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Häufige Fragen zum Stundensatz Rechner Schweiz
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Wie berechne ich meinen Stundensatz korrekt?',
                  a: 'Stundensatz = (Benötigter Jahresgewinn + Betriebskosten) ÷ Fakturierbare Stunden. Der Jahresgewinn muss dein Nettoeinkommen + AHV (10.1%) + Einkommenssteuer abdecken. Fakturierbare Stunden: 253 Arbeitstage minus Ferien, Krankheit, Admin/Akquise × 8 Stunden. Nutze den Rechner oben für eine präzise Kalkulation inklusive Kanton und Säule 3a.',
                },
                {
                  q: 'Was ist ein realistischer Stundensatz für Einsteiger in der Schweiz?',
                  a: 'Einsteiger-Stundensätze in der Schweiz: IT/Software CHF 100–130, Marketing/Design CHF 80–110, Beratung CHF 110–140, Handwerk CHF 75–100. Als Einsteiger musst du oft mehr Zeit für Akquise einrechnen (40–50% nicht fakturierbar) und arbeitest deshalb mit weniger fakturierbaren Stunden. Das erhöht den nötigen Stundensatz. Prüfe den Rechner mit 40% Admin-Anteil.',
                },
                {
                  q: 'Muss ich MWST auf meinen Stundensatz aufschlagen?',
                  a: 'Ab CHF 100\'000 Jahresumsatz: ja, 8.1% MWST. Bei B2B-Kunden ist das neutral (Vorsteuerabzug). Bei Privatkunden erhöhst du den Preis effektiv. Unterhalb CHF 100\'000 ist die MWST optional. Der Rechner zeigt den Netto-Stundensatz (ohne MWST). Bei MWST-Pflicht: Stundensatz × 1.081 = Brutto-Stundensatz für Kunden.',
                },
                {
                  q: 'Wie unterscheidet sich der Tagessatz vom Stundensatz?',
                  a: 'Tagessatz = Stundensatz × 8 (oder × 7.5 je nach Vereinbarung). Bei CHF 150/Std. = CHF 1\'200/Tag. Tagessätze werden bei Consulting, Projektarbeit vor Ort und Interim-Management bevorzugt. Intern immer auf Stundenbasis kalkulieren — der Tagessatz sollte alle Kosten decken, auch wenn der Tag mal kürzer ausfällt.',
                },
                {
                  q: 'Wie viel soll ich als Reserve einkalkulieren?',
                  a: 'Empfehlung: 10–15% Puffer auf deinen Stundensatz für: Krankheitstage (5–10 Tage/Jahr), Leerläufe zwischen Aufträgen, unvorhergesehene Ausgaben, Investitionen. Im Rechner kannst du die Betriebskosten entsprechend erhöhen oder den nicht-fakturierbaren Anteil anpassen.',
                },
                {
                  q: 'Soll ich einen Stunden- oder Projektpreis anbieten?',
                  a: 'Beide haben Vor- und Nachteile. Stundensatz: transparent, kein Risiko bei Mehraufwand, einfach — geeignet für laufende Mandate mit unklarem Scope. Projektpreis: Effizienzgewinn gehört dir, Kunden schätzen Planbarkeit — geeignet bei klar definierten Aufgaben. Intern immer zuerst auf Stundenbasis kalkulieren, dann entscheiden, ob ein Pauschalpreis möglich ist.',
                },
                {
                  q: 'Wie oft soll ich meinen Stundensatz erhöhen?',
                  a: 'Empfehlung: jährlich 5–10% Erhöhung bei bestehenden Kunden (3 Monate Voranmeldung), neue Kunden gleich zum aktuellen Satz. Gründe: gestiegene Lebenskosten, Inflation, neue Qualifikationen, gewachsene Erfahrung. Wenn alle Kunden sofort zustimmen, bist du zu günstig — ein guter Satz führt bei 10–20% der Anfragen zu Preisverhandlungen.',
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

          {/* ── Internal links ── */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                href: '/artikel/stundensatz-berechnen',
                title: 'Ratgeber: Stundensatz berechnen',
                desc: 'Formel, Branchenwerte, Tipps zur Preiskommunikation',
                color: 'border-blue-200 hover:border-blue-400',
              },
              {
                href: '/artikel/offerte-erstellen-schweiz',
                title: 'Offerte erstellen Schweiz',
                desc: 'Professionelle Angebote mit Stundensatz und Projektpreis',
                color: 'border-gray-200 hover:border-blue-300',
              },
              {
                href: '/artikel/einzelfirma-gruenden',
                title: 'Einzelfirma gründen',
                desc: 'Alles zur Anmeldung und zum Start als Selbständiger',
                color: 'border-gray-200 hover:border-blue-300',
              },
            ].map(({ href, title, desc, color }) => (
              <Link
                key={href}
                href={href}
                className={`block border-2 ${color} rounded-xl p-4 transition-all hover:shadow-md`}
              >
                <p className="font-semibold text-gray-900 mb-1">{title}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </Link>
            ))}
          </div>

          {/* ── Experten CTA ── */}
          <div className="border-2 border-blue-200 bg-blue-50 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl shrink-0">
              🧾
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 mb-1">Steuern optimieren? Treuhänder fragen.</p>
              <p className="text-sm text-gray-600">
                Unsere kuratierten Treuhänder sind selbst selbständig — sie kennen AHV, Steuern und Säule 3a aus eigener Erfahrung.
              </p>
            </div>
            <Link
              href="/artikel/stundensatz-berechnen"
              className="shrink-0 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Mehr erfahren →
            </Link>
          </div>

          {/* ── CTA ── */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-center shadow-lg">
            <p className="text-2xl font-bold text-white mb-3">Selbständig in der Schweiz?</p>
            <p className="text-blue-100 mb-6">
              Alle Ratgeber zu Steuern, Vorsorge, Buchhaltung und Kunden gewinnen — für Einsteiger und Profis.
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
