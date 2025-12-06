import { Metadata } from 'next';
import { getAllArticles } from '@/lib/articles';
import { CATEGORIES } from '@/types/article';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Alle Artikel - Selbständig Schweiz',
  description: 'Durchstöbere alle Artikel zu Selbstständigkeit, Freelancing und Startup-Gründung in der Schweiz.',
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <>
      <Header />

      <main className="bg-gray-50 min-h-screen">
        {/* Header */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <nav className="mb-6 text-sm text-blue-100">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Alle Artikel</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Alle Artikel
            </h1>
            <p className="text-xl text-blue-100">
              {articles.length} {articles.length === 1 ? 'Artikel' : 'Artikel'} zu Selbstständigkeit in der Schweiz
            </p>
          </div>
        </section>

        {/* Filter by Category */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/artikel"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Alle
              </Link>
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={`/kategorie/${category.slug}`}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600 mb-6">
                Noch keine Artikel vorhanden. Kommt bald!
              </p>
              <Link
                href="/admin"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Ersten Artikel erstellen
              </Link>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
