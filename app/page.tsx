import { getAllArticles } from '@/lib/articles';
import { CATEGORIES } from '@/types/article';
import ArticleCard from '@/components/ArticleCard';
import Header from '@/components/Header';
import Link from 'next/link';

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
                Dein Portal für Selbstständigkeit in der Schweiz
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Alles, was du brauchst, um erfolgreich selbstständig zu werden:
                Von der Gründung über Steuern bis zum Marketing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/artikel/startup-schweiz-gruenden"
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
                >
                  Jetzt starten
                </Link>
                <Link
                  href="#artikel"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
                >
                  Artikel durchstöbern
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Beliebte Themen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={`/kategorie/${category.slug}`}
                  className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.keywords.slice(0, 3).map((keyword) => (
                      <span
                        key={keyword}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
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
              <h4 className="font-semibold mb-4">Kategorien</h4>
              <ul className="space-y-2">
                {CATEGORIES.slice(0, 4).map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/kategorie/${cat.slug}`}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Wichtige Themen</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Startup gründen</li>
                <li>Steuern & Finanzen</li>
                <li>Marketing</li>
                <li>Versicherungen</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Impressum</li>
                <li>Datenschutz</li>
                <li>Kontakt</li>
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
