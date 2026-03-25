import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticlesByCategory } from '@/lib/articles';
import { CATEGORIES } from '@/types/article';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find(cat => cat.slug === slug);
  if (!category) return { title: 'Kategorie nicht gefunden' };
  return {
    title: `${category.name} - Selbständig Schweiz`,
    description: category.description,
    keywords: category.keywords,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find(cat => cat.slug === slug);
  if (!category) notFound();

  const articles = await getArticlesByCategory(slug);

  return (
    <>
      <Header />

      <main className="bg-warm-white min-h-screen">
        {/* Category Header */}
        <section className="border-b border-warm-200 bg-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <nav className="flex items-center gap-2 text-sm text-warm-500 mb-8">
              <Link href="/" className="hover:text-warm-900 transition-colors">Home</Link>
              <span className="text-warm-300">/</span>
              <span className="text-warm-700">{category.name}</span>
            </nav>

            <p className="category-label text-accent mb-4">Kategorie</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-warm-900 mb-4 leading-tight">
              {category.name}
            </h1>
            <p className="text-warm-600 text-lg max-w-2xl leading-relaxed mb-6">
              {category.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {category.keywords.map((keyword) => (
                <span key={keyword} className="px-3 py-1 bg-warm-100 text-warm-600 text-sm rounded-md">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {articles.length > 0 ? (
            <>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm text-warm-500">{articles.length} Artikel</span>
                <div className="flex-1 h-px bg-warm-200" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-warm-500 mb-6">Noch keine Artikel in dieser Kategorie.</p>
              <Link href="/" className="inline-block bg-accent text-white px-6 py-3 text-sm font-semibold hover:bg-accent-dark transition-colors rounded-md">
                Zurück zur Startseite
              </Link>
            </div>
          )}
        </section>

        {/* Other Categories */}
        <section className="border-t border-warm-200 bg-warm-50 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-serif text-xl font-bold text-warm-900">Weitere Kategorien</h2>
              <div className="flex-1 h-px bg-warm-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {CATEGORIES.filter(cat => cat.slug !== slug).map((cat) => (
                <Link key={cat.slug} href={`/kategorie/${cat.slug}`}
                  className="group block p-6 border border-warm-200 -mt-px -ml-px hover:border-accent hover:bg-warm-white hover:z-10 relative transition-all duration-200">
                  <h3 className="font-serif text-base font-bold text-warm-900 group-hover:text-accent mb-2 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-warm-600 text-sm leading-relaxed">{cat.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
