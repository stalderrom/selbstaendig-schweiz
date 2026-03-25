import { Metadata } from 'next';
import { getAllArticles } from '@/lib/articles';
import { CATEGORIES } from '@/types/article';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Alle Artikel - Selbständig Schweiz',
  description: 'Alle Ratgeber zu Selbstständigkeit, Gründung und Freelancing in der Schweiz.',
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <>
      <Header />

      <main className="bg-warm-white min-h-screen">
        {/* Header */}
        <section className="border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <nav className="flex items-center gap-2 text-sm text-warm-500 mb-8">
              <Link href="/" className="hover:text-warm-900 transition-colors">Home</Link>
              <span className="text-warm-300">/</span>
              <span className="text-warm-700">Alle Artikel</span>
            </nav>
            <p className="category-label text-accent mb-4">Übersicht</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-warm-900 leading-tight">
              Alle Artikel
            </h1>
            <p className="text-warm-500 mt-3 text-lg">
              {articles.length} Artikel zu Selbstständigkeit in der Schweiz
            </p>
          </div>
        </section>

        {/* Category filter */}
        <section className="bg-warm-50 border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-wrap gap-2">
              <Link href="/artikel"
                className="px-4 py-1.5 bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors rounded-md">
                Alle
              </Link>
              {CATEGORIES.map((category) => (
                <Link key={category.slug} href={`/kategorie/${category.slug}`}
                  className="px-4 py-1.5 bg-warm-100 text-warm-700 text-sm font-medium hover:bg-warm-200 transition-colors rounded-md">
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-warm-500">Noch keine Artikel vorhanden.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
