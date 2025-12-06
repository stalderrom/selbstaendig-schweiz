import { getAllArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import Header from '@/components/Header';
import Link from 'next/link';

const PILLAR_PAGES = [
  {
    title: 'Selbständig machen',
    description: 'Kompletter Guide zur Selbständigkeit: Von der Idee bis zum erfolgreichen Start.',
    href: '/artikel/selbstaendig-machen-schweiz',
    icon: '🚀',
    category: 'Gründung'
  },
  {
    title: 'Einzelfirma gründen',
    description: 'Schritt-für-Schritt: Einzelfirma in 1-3 Tagen gründen. Ohne Mindestkapital.',
    href: '/artikel/einzelfirma-gruenden',
    icon: '⚡',
    category: 'Gründung'
  },
  {
    title: 'GmbH gründen',
    description: 'Professionell mit CHF 20k Stammkapital. Haftungsschutz & Steuervorteile.',
    href: '/artikel/gmbh-gruenden',
    icon: '🏢',
    category: 'Gründung'
  },
  {
    title: 'Steuern für Selbständige',
    description: 'Alle Steuern verstehen: Einkommens-, MWST-, AHV-Beiträge. Plus Spartipps.',
    href: '/artikel/steuern-selbststaendige',
    icon: '💰',
    category: 'Finanzen'
  },
  {
    title: 'Versicherungen',
    description: 'Welche Versicherungen sind Pflicht? Welche sinnvoll? Kosten & Vergleich.',
    href: '/artikel/versicherungen-selbststaendige',
    icon: '🛡️',
    category: 'Finanzen'
  },
  {
    title: 'Buchhaltung',
    description: 'Von einfacher Buchhaltung bis Treuhänder. Software, Kosten, MWST.',
    href: '/artikel/buchhaltung-selbststaendige',
    icon: '📊',
    category: 'Finanzen'
  },
  {
    title: 'Kunden gewinnen',
    description: 'Online-Marketing, Networking, Empfehlungen: Alle Akquise-Strategien.',
    href: '/artikel/kunden-gewinnen-schweiz',
    icon: '🎯',
    category: 'Wachstum'
  },
  {
    title: 'Tools & Software',
    description: 'Die besten Tools für Selbständige: Buchhaltung, CRM, Projektmanagement.',
    href: '/artikel/tools-selbststaendige',
    icon: '🛠️',
    category: 'Wachstum'
  },
  {
    title: 'Alle Berufe',
    description: '50+ Berufe im Detail: Voraussetzungen, Verdienst, Erfolgschancen.',
    href: '/artikel/selbstaendig-schweiz-berufe',
    icon: '💼',
    category: 'Gründung'
  },
  {
    title: 'Geld verdienen',
    description: '8 Geschäftsmodelle: Von Stundensatz bis passivem Einkommen.',
    href: '/artikel/geld-verdienen-schweiz',
    icon: '💸',
    category: 'Finanzen'
  },
];

export default async function Home() {
  const articles = await getAllArticles();
  const latestArticles = articles.slice(0, 6);

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Selbständig in der Schweiz 2026
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Komplette Guides zu Gründung, Steuern, Versicherungen, Buchhaltung und Kundengewinnung.
                Von Einzelfirma bis GmbH – alles was du brauchst.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/artikel/selbstaendig-machen-schweiz"
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
                >
                  Jetzt durchstarten
                </Link>
                <Link
                  href="/artikel/einzelfirma-gruenden"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
                >
                  Einzelfirma gründen
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pillar Pages Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Komplette Guides für Selbständige
              </h2>
              <p className="text-xl text-gray-600">
                Alles was du wissen musst – von A bis Z
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PILLAR_PAGES.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{page.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                          {page.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {page.description}
                      </p>
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded font-medium">
                        {page.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section id="artikel" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Neueste Artikel
              </h2>
              <Link
                href="/artikel"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Alle Artikel →
              </Link>
            </div>

            {latestArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600">
                  Noch keine Artikel vorhanden. Kommt bald!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4">
              Bereit durchzustarten?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Über 500 Artikel mit praxisnahen Tipps für deine Selbstständigkeit
            </p>
            <Link
              href="/artikel/selbststaendig-machen-schweiz"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Selbstständig machen Guide
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Selbständig Schweiz</h3>
              <p className="text-gray-400">
                Das Portal für Selbstständige und Gründer in der Schweiz
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Gründung</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/artikel/selbstaendig-machen-schweiz" className="text-gray-400 hover:text-white transition-colors">
                    Selbständig machen
                  </Link>
                </li>
                <li>
                  <Link href="/artikel/einzelfirma-gruenden" className="text-gray-400 hover:text-white transition-colors">
                    Einzelfirma gründen
                  </Link>
                </li>
                <li>
                  <Link href="/artikel/gmbh-gruenden" className="text-gray-400 hover:text-white transition-colors">
                    GmbH gründen
                  </Link>
                </li>
                <li>
                  <Link href="/artikel/selbstaendig-schweiz-berufe" className="text-gray-400 hover:text-white transition-colors">
                    Alle Berufe
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Finanzen</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/artikel/steuern-selbststaendige" className="text-gray-400 hover:text-white transition-colors">
                    Steuern
                  </Link>
                </li>
                <li>
                  <Link href="/artikel/versicherungen-selbststaendige" className="text-gray-400 hover:text-white transition-colors">
                    Versicherungen
                  </Link>
                </li>
                <li>
                  <Link href="/artikel/buchhaltung-selbststaendige" className="text-gray-400 hover:text-white transition-colors">
                    Buchhaltung
                  </Link>
                </li>
                <li>
                  <Link href="/artikel/geld-verdienen-schweiz" className="text-gray-400 hover:text-white transition-colors">
                    Geld verdienen
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Wachstum</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/artikel/kunden-gewinnen-schweiz" className="text-gray-400 hover:text-white transition-colors">
                    Kunden gewinnen
                  </Link>
                </li>
                <li>
                  <Link href="/artikel/tools-selbststaendige" className="text-gray-400 hover:text-white transition-colors">
                    Tools & Software
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Selbständig Schweiz. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
