import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/lib/articles';
import { CATEGORIES } from '@/types/article';
import Header from '@/components/Header';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Artikel nicht gefunden',
    };
  }

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
    },
    alternates: {
      canonical: `https://selbständig-schweiz.ch/artikel/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const category = CATEGORIES.find(cat => cat.slug === article.category);
  const publishDate = new Date(article.publishedAt);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <article className="bg-white">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <span>/</span>
              {category && (
                <>
                  <Link
                    href={`/kategorie/${category.slug}`}
                    className="hover:text-blue-600"
                  >
                    {category.name}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="text-gray-900">{article.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          {category && (
            <Link
              href={`/kategorie/${category.slug}`}
              className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full mb-4 hover:bg-blue-100"
            >
              {category.name}
            </Link>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {article.description}
          </p>

          <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{article.author}</span>
              <span>•</span>
              <time dateTime={article.publishedAt}>
                {publishDate.toLocaleDateString('de-CH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span>•</span>
              <span>{article.readingTime} Min. Lesezeit</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-ul:my-6 prose-ul:space-y-2
            prose-ol:my-6 prose-ol:space-y-2
            prose-li:text-gray-700
            prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:text-gray-100
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
          ">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Keywords/Tags */}
          {article.keywords.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Verwandte Themen:
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Box */}
          <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Bereit für den nächsten Schritt?
            </h3>
            <p className="text-gray-700 mb-6">
              Entdecke weitere hilfreiche Artikel zur Selbstständigkeit in der Schweiz
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Alle Artikel anzeigen
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
