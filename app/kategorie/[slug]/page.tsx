import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticlesByCategory } from '@/lib/articles';
import { CATEGORIES } from '@/types/article';
import Header from '@/components/Header';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find(cat => cat.slug === slug);

  if (!category) {
    return {
      title: 'Kategorie nicht gefunden',
    };
  }

  return {
    title: `${category.name} - Selbständig Schweiz`,
    description: category.description,
    keywords: category.keywords,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find(cat => cat.slug === slug);

  if (!category) {
    notFound();
  }

  const articles = await getArticlesByCategory(slug);

  return (
    <>
      <Header />

      <main className="bg-gray-50 min-h-screen">
        {/* Category Header */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <nav className="mb-6 text-sm text-blue-100">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>{category.name}</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              {category.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {category.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {articles.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  {articles.length} {articles.length === 1 ? 'Artikel' : 'Artikel'} in dieser Kategorie
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600 mb-6">
                Noch keine Artikel in dieser Kategorie. Kommt bald!
              </p>
              <Link
                href="/"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Zurück zur Startseite
              </Link>
            </div>
          )}
        </section>

        {/* Other Categories */}
        <section className="bg-white border-t border-gray-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Weitere Kategorien
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.filter(cat => cat.slug !== slug).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/kategorie/${cat.slug}`}
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {cat.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
