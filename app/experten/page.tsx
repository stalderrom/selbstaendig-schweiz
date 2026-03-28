import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExpertenSection from '@/components/ExpertenSection';
import RoiRechner from '@/components/RoiRechner';
import CockpitShowcase from '@/components/CockpitShowcase';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Experten für Selbständige Schweiz – Dein kuratiertes Experten-Team als Abo',
  description: 'Treuhänder, Anwalt, Designer, Sales — ein Abo, alle Experten. Kein Marktplatz. Kuratierte Profis die selbst selbständig sind. Ab CHF 29/Monat.',
  keywords: [
    'experten selbständige schweiz',
    'treuhänder selbständige schweiz',
    'rechtsberatung selbständige schweiz',
    'business coach schweiz selbständig',
    'experten-team selbständige',
    'berater selbständige schweiz',
  ],
  alternates: {
    canonical: 'https://www.selbständig-schweiz.ch/experten',
  },
  openGraph: {
    title: 'Experten für Selbständige Schweiz – Dein kuratiertes Experten-Team als Abo',
    description: 'Treuhänder, Anwalt, Designer, Sales — ein Abo, alle Experten. Ab CHF 29/Monat.',
    type: 'website',
  },
};

const TIERS = [
  {
    name: 'Free',
    price: 'CHF 0',
    period: 'für immer',
    tagline: 'Das Cockpit kennt dich',
    color: 'border-blue-200',
    headerBg: 'bg-blue-600',
    headerText: 'text-white',
    subText: 'text-blue-200',
    features: [
      '🧭 Persönliches Cockpit — die Seite kennt dich',
      '⏰ Deadline-Wächter — Fristen-Erinnerungen per E-Mail',
      '📁 Dokument-Archiv — alle PDFs gespeichert',
      '📊 Selbständigkeits-Score — sieh deine Lücken',
      '💬 1 Experten-Frage pro Monat kostenlos',
    ],
    cta: 'Kostenlos registrieren',
    ctaHref: '#warteliste',
    ctaClass: 'bg-white text-blue-700 hover:bg-blue-50',
    highlight: false,
    sales: {
      name: 'Sales Starter',
      price: 'CHF 19/Mo',
      commission: null,
      items: ['Muster-Emails zum Kunden ansprechen', 'Vorlage für dein erstes Angebot'],
    },
  },
  {
    name: 'Fragen',
    price: 'CHF 29',
    period: 'pro Monat',
    tagline: 'Wenn du nicht weiterkommst',
    color: 'border-gray-300',
    headerBg: 'bg-gray-900',
    headerText: 'text-white',
    subText: 'text-gray-400',
    features: [
      'Alle Artikel & Tools (wie Free)',
      'Jederzeit Fragen stellen — per Text, Sprache oder Foto',
      'Alle 11 Experten erreichbar',
      'Echte Antwort innerhalb von 4 Stunden',
    ],
    cta: 'Auf Warteliste',
    ctaHref: '#warteliste',
    ctaClass: 'bg-white text-gray-900 hover:bg-gray-100',
    highlight: false,
    sales: {
      name: 'Sales Coaching',
      price: '+CHF 29/Mo',
      commission: null,
      items: ['Sales-Fragen direkt an Experten stellen', 'Dein Angebot wird einmal pro Monat geprüft'],
    },
  },
  {
    name: 'Beratung',
    price: 'CHF 99',
    period: 'pro Monat',
    tagline: 'Wenn du Klarheit brauchst',
    color: 'border-blue-300',
    headerBg: 'bg-blue-600',
    headerText: 'text-white',
    subText: 'text-blue-200',
    features: [
      'Alle Artikel & Tools (wie Free)',
      'Jederzeit Fragen stellen — per Text, Sprache oder Foto',
      'Alle 11 Experten erreichbar',
      '2× im Monat 30 Min. Telefon mit einem Experten',
      'Dokumente einschicken — Experte schaut drüber',
      'Echte Antwort innerhalb von 2 Stunden',
    ],
    cta: 'Auf Warteliste',
    ctaHref: '#warteliste',
    ctaClass: 'bg-white text-blue-700 hover:bg-blue-50',
    highlight: false,
    sales: {
      name: 'Sales Strategy',
      price: '+CHF 49/Mo',
      commission: null,
      items: ['1× im Monat 30 Min. Telefon mit Sales-Experten', 'Email-Text für Kundenansprache wird geschrieben'],
    },
  },
  {
    name: 'Flatrate',
    price: 'CHF 349',
    period: 'pro Monat',
    tagline: 'Wenn du Ausführung brauchst',
    badge: 'Beliebteste Wahl',
    color: 'border-blue-500',
    headerBg: 'bg-blue-700',
    headerText: 'text-white',
    subText: 'text-blue-200',
    features: [
      'Alle Artikel & Tools (wie Free)',
      'Jederzeit Fragen stellen — per Text, Sprache oder Foto',
      '2× im Monat 30 Min. Telefon mit einem Experten',
      'Aufgaben erledigen lassen: Vertrag schreiben, Buchhaltung führen, Steuern optimieren',
      'Eine Aufgabe nach der anderen — fertig in 2 Werktagen',
      'Echte Antwort innerhalb von 2 Stunden',
    ],
    cta: 'Auf Warteliste',
    ctaHref: '#warteliste',
    ctaClass: 'bg-white text-blue-700 hover:bg-blue-50',
    highlight: true,
    sales: {
      name: 'Sales Execution',
      price: '+CHF 149/Mo',
      commission: '5% wenn ein Auftrag zustande kommt',
      items: ['20 Kunden-Emails pro Monat: geschrieben & verschickt', 'Monatlicher Bericht: was wurde verschickt, was kam zurück'],
    },
  },
  {
    name: 'Vollservice',
    price: 'CHF 749',
    period: 'pro Monat',
    tagline: 'Dein komplettes Experten-Team als Abo',
    color: 'border-gray-600',
    headerBg: 'bg-gray-900',
    headerText: 'text-white',
    subText: 'text-gray-400',
    features: [
      'Alle Artikel & Tools (wie Free)',
      'Jederzeit Fragen stellen — per Text, Sprache oder Foto',
      'Fester Treuhänder, Anwalt und Coach — die kennen dich',
      'Steuererklärung wird für dich gemacht',
      '1× pro Quartal 60 Min. Strategie-Gespräch',
      'Echte Antwort innerhalb von 1 Stunde',
    ],
    cta: 'Auf Warteliste',
    ctaHref: '#warteliste',
    ctaClass: 'bg-white text-gray-900 hover:bg-gray-100',
    highlight: false,
    sales: {
      name: 'Sales Full',
      price: '+CHF 249/Mo',
      commission: '8% wenn ein Auftrag zustande kommt',
      items: ['50 Kunden-Emails pro Monat: geschrieben & verschickt', 'Nachfassen & Termine direkt in deinen Kalender buchen'],
    },
  },
  {
    name: 'Wachstum',
    price: "CHF 1'490",
    period: 'pro Monat',
    tagline: 'Nicht du verkaufst. Wir.',
    color: 'border-amber-400',
    headerBg: 'bg-gradient-to-br from-amber-500 to-orange-500',
    headerText: 'text-white',
    subText: 'text-amber-100',
    features: [
      'Alle Artikel & Tools (wie Free)',
      'Jederzeit Fragen stellen — per Text, Sprache oder Foto',
      'Fester Treuhänder, Anwalt und Coach — die kennen dich',
      'Steuererklärung wird für dich gemacht',
      '1× pro Quartal 60 Min. Strategie-Gespräch',
      'Jemand sucht aktiv Kunden für dich — schreibt Emails, schickt sie ab, bucht Termine',
      '10 Stunden pro Monat reine Verkaufsarbeit für dich',
      'Echte Antwort innerhalb von 1 Stunde',
    ],
    cta: 'Auf Warteliste',
    ctaHref: '#warteliste',
    ctaClass: 'bg-white text-orange-700 hover:bg-orange-50',
    highlight: false,
    roi: "Ein neuer Auftrag à CHF 5'000 → CHF 3'110 Gewinn nach allen Kosten",
    sales: null,
  },
];

const FAQ = [
  {
    q: 'Was ist der Unterschied zu Fiverr oder local.ch?',
    a: 'Fiverr und local.ch setzen auf die Qual der Wahl — hunderte Anbieter, du musst selbst entscheiden. Hier gibt es pro Kategorie 2–3 geprüfte Profis. Du weißt nicht immer wen du brauchst. Wir schon. Alle Experten sind selbst selbständig — sie kennen dein Problem aus eigener Erfahrung.',
  },
  {
    q: 'Was bedeutet "1 aktiver Request" bei der Flatrate?',
    a: 'Inspiriert vom Designjoy-Modell: du kannst unbegrenzt Requests stellen — aber einen nach dem anderen. Du sendest heute: "Ich brauche einen Mustervertrag." Übermorgen ist er fertig. Dann kommt der nächste. Sequential, nicht parallel. Das ist der Schlüssel warum unbegrenzte Ausführung zu einem fixen Preis funktioniert.',
  },
  {
    q: 'Wie funktioniert der Sales Partner im Wachstum-Abo?',
    a: 'Der Sales Partner übernimmt die Outreach-Arbeit die die meisten Selbständigen hassen oder nicht können: er schreibt deine Cold-Emails, sendet sie, folgt nach und bucht die Termine. Du kommst zum Gespräch. Zusätzlich: 8% auf jeden Auftrag der aus seiner Outreach entsteht — vollständig aligned.',
  },
  {
    q: 'Kann ich jederzeit wechseln oder kündigen?',
    a: 'Ja. Hochstufen sofort möglich. Runterstufung oder Kündigung gilt auf Ende des laufenden Monats. Kein Jahresvertrag, keine Bindung.',
  },
  {
    q: 'Wie werden Experten ausgewählt?',
    a: 'Alle Experten sind selbst selbständig — das ist Bedingung. Wir prüfen Qualifikationen, Referenzen und verlangen eine Probeberatung. Pro Kategorie maximal 2–3 Experten. Qualität über Quantität.',
  },
  {
    q: 'Wann kann ich starten?',
    a: 'Das Netzwerk wird gerade aufgebaut. Trag dich in die Warteliste ein — du bekommst als Erste/r Zugang und einen Launch-Rabatt.',
  },
];

export default function ExpertenPage() {
  notFound();
  return (
    <>
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-700">Experten</span>
          </nav>
        </div>

        {/* Hero */}
        <div className="max-w-4xl mx-auto px-4 pt-10 pb-6 text-center">
          <p className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 rounded-full px-3 py-1 mb-5 uppercase tracking-widest">
            Kein Marktplatz. Dein kuratiertes Experten-Team als Abo.
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Du weißt nicht immer<br className="hidden sm:block" /> wen du brauchst.<br className="hidden sm:block" />
            <span className="text-blue-600">Wir schon.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
            Treuhänder, Anwalt, Brand Designer, Copywriter, Sales — ein Abo, alle Experten, die selbst selbständig sind.
          </p>
          <p className="text-base text-gray-400 mb-8 max-w-xl mx-auto">
            Kein Suchen. Kein Vergleichen. Kein Abzählen von Stunden.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="#experten"
              className="bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md"
            >
              Experten entdecken →
            </Link>
            <Link
              href="#modell"
              className="bg-white text-gray-700 border-2 border-gray-200 px-7 py-3 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Preise & Modell
            </Link>
          </div>
        </div>

        {/* Trust bar */}
        <div className="bg-gray-50 border-y border-gray-200 py-5">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm text-gray-600">
              {[
                ['✓', 'Alle Experten selbst selbständig'],
                ['✓', 'Max. 2–3 pro Kategorie'],
                ['✓', 'Antwort in 1–4h'],
                ['✓', 'Kündigung jederzeit'],
              ].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-1.5">
                  <span className="text-blue-500 font-bold">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cockpit Showcase */}
        <section className="py-16 px-4 bg-white border-t border-gray-100">
          <CockpitShowcase />
        </section>

        {/* Experts */}
        <div id="experten" className="border-t border-gray-100">
          <ExpertenSection />
        </div>

        {/* Tier Table */}
        <section id="modell" className="bg-gray-50 border-t border-gray-200 py-16 px-4">
          <div className="w-[90vw] mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
              Das Modell — transparent
            </h2>
            <p className="text-gray-600 text-center mb-2 max-w-xl mx-auto">
              Von kostenlos bis zum kompletten Sales-Team. Kündigung jederzeit.
            </p>
            <p className="text-center text-sm text-gray-400 mb-10">
              Jede Stufe enthält ein passendes Sales Add-on — direkt drin, proportional zum Budget.
            </p>

            {/* Horizontal scroll on mobile, 6 columns on desktop */}
            <div className="overflow-x-auto py-4">
              <div className="flex gap-4 min-w-max lg:min-w-0 lg:grid lg:grid-cols-6">
              {TIERS.map(tier => (
                <div
                  key={tier.name}
                  className={`w-64 lg:w-auto rounded-2xl border-2 overflow-hidden flex flex-col ${tier.color} ${
                    tier.highlight ? 'shadow-xl ring-4 ring-blue-300' : 'shadow-sm'
                  }`}
                >
                  {/* Header */}
                  <div className={`${tier.headerBg} px-4 py-4`}>
                    {tier.badge && (
                      <p className="text-xs font-bold text-white bg-white/20 rounded-full px-2 py-0.5 inline-block mb-2">
                        {tier.badge}
                      </p>
                    )}
                    <p className={`font-bold text-base ${tier.headerText}`}>{tier.name}</p>
                    <p className={`text-2xl font-bold ${tier.headerText} mt-0.5 leading-tight`}>
                      {tier.price}
                    </p>
                    <p className={`text-xs ${tier.subText}`}>/{tier.period}</p>
                    <p className={`text-xs mt-2 italic ${tier.subText}`}>{tier.tagline}</p>
                  </div>

                  {/* Content */}
                  <div className="bg-white px-4 py-4 flex flex-col flex-1">

                    {/* Base features */}
                    <ul className="space-y-2 mb-4">
                      {tier.features.map(f => (
                        <li key={f} className="flex items-start gap-1.5 text-sm text-gray-700">
                          <span className="text-blue-500 shrink-0 mt-0.5">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    {tier.roi && (
                      <p className="text-xs text-amber-700 font-semibold bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-2 mb-3">
                        {tier.roi}
                      </p>
                    )}

                    {/* Sales Add-on — integrated */}
                    {tier.sales ? (
                      <div className="border-t-2 border-dashed border-gray-200 pt-3 mb-4">
                        <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1.5">
                          + Sales
                        </p>
                        <div className="flex items-baseline justify-between mb-1.5">
                          <p className="font-semibold text-gray-900 text-xs">{tier.sales.name}</p>
                          <p className="font-bold text-amber-600 text-xs ml-1 shrink-0">{tier.sales.price}</p>
                        </div>
                        {tier.sales.commission && (
                          <p className="text-xs text-gray-400 mb-1.5">{tier.sales.commission}</p>
                        )}
                        <ul className="space-y-1">
                          {tier.sales.items.map(item => (
                            <li key={item} className="flex items-start gap-1.5 text-xs text-gray-600">
                              <span className="text-amber-500 shrink-0 mt-0.5">→</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="border-t-2 border-dashed border-amber-200 pt-3 mb-4">
                        <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
                          Sales
                        </p>
                        <p className="text-sm font-semibold text-amber-700">Inklusive</p>
                        <p className="text-xs text-gray-500 mt-1">Bereits enthalten — kein Add-on nötig.</p>
                      </div>
                    )}

                    <div className="mt-auto">
                      <Link
                        href={tier.ctaHref}
                        className={`block w-full text-center py-2.5 rounded-xl font-bold text-sm transition-colors ${tier.ctaClass}`}
                      >
                        {tier.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>

            <p className="text-center text-sm text-gray-400 mt-6">
              Experten erhalten 70–80% des Erlöses. Alle Preise in CHF exkl. MWST. Kündigung jederzeit auf Ende Monat.
            </p>
          </div>
        </section>

        {/* ROI Section */}
        <section className="py-16 px-4">
          <RoiRechner />
        </section>

        {/* Warteliste CTA */}
        <section id="warteliste" className="py-12 px-4 bg-gray-50 border-t border-gray-200">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-10 text-center shadow-xl">
            <p className="text-3xl font-bold text-white mb-3">
              Auf die Warteliste
            </p>
            <p className="text-blue-100 mb-2">
              Das Experten-Netzwerk wird gerade aufgebaut.
            </p>
            <p className="text-blue-200 text-sm mb-7">
              Trag dich ein — du bekommst als Erste/r Zugang und einen Launch-Rabatt.
            </p>
            <a
              href="mailto:hallo@selbständig-schweiz.ch?subject=Warteliste Experten-Netzwerk"
              className="inline-block bg-white text-blue-700 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-md"
            >
              Jetzt eintragen →
            </a>
            <p className="text-blue-300 text-xs mt-4">
              Kein Spam. Nur eine E-Mail wenn es losgeht.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Häufige Fragen
          </h2>
          <div className="space-y-3">
            {FAQ.map(({ q, a }, i) => (
              <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition-colors list-none text-sm">
                  <span>{q}</span>
                  <span className="shrink-0 text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-4 pb-4 pt-1 text-sm text-gray-600 border-t border-gray-100">{a}</div>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
