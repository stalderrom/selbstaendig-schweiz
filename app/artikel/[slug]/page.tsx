import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/lib/articles';
import { CATEGORIES } from '@/types/article';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
      canonical: `https://www.selbständig-schweiz.ch/artikel/${article.slug}`,
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

  // Article Schema (vollständig nach Google-Standards)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.featuredImage || 'https://selbstaendig-schweiz.ch/og-image.jpg',
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Selbständig Schweiz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://selbstaendig-schweiz.ch/logo.png',
        width: 600,
        height: 60,
      }
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://selbstaendig-schweiz.ch/artikel/${article.slug}`
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://selbstaendig-schweiz.ch'
      },
      ...(category ? [{
        '@type': 'ListItem',
        position: 2,
        name: category.name,
        item: `https://selbstaendig-schweiz.ch/kategorie/${category.slug}`
      }] : []),
      {
        '@type': 'ListItem',
        position: category ? 3 : 2,
        name: article.title
      }
    ]
  };

  // HowTo Schema (wenn HowTo vorhanden)
  const howtoSchema = article.howto ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: article.howto.name,
    description: article.howto.description,
    ...(article.howto.totalTime && { totalTime: article.howto.totalTime }),
    step: article.howto.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url && { url: step.url }),
    })),
  } : null;

  // FAQ Schema (wenn FAQs vorhanden)
  const faqSchema = article.faq && article.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  } : null;

  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* HowTo Schema (if available) */}
      {howtoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoSchema) }}
        />
      )}

      {/* FAQ Schema (if available) */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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
          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b-4 prose-h2:border-blue-600 prose-h2:leading-tight prose-h2:scroll-mt-20 prose-h3:text-2xl prose-h3:mt-14 prose-h3:mb-6 prose-h3:leading-snug prose-h3:text-gray-800 prose-h3:font-bold prose-h3:scroll-mt-20 prose-h4:text-xl prose-h4:mt-10 prose-h4:mb-4 prose-h4:text-blue-900 prose-h4:font-bold prose-h4:scroll-mt-20 prose-p:text-gray-700 prose-p:leading-[1.85] prose-p:mb-7 prose-p:text-[1.1875rem] prose-p:max-w-[75ch] prose-a:text-blue-600 prose-a:font-semibold prose-a:underline prose-a:decoration-2 prose-a:underline-offset-2 prose-a:decoration-blue-300 hover:prose-a:decoration-blue-600 hover:prose-a:text-blue-700 prose-a:transition-all prose-strong:text-gray-900 prose-strong:font-bold prose-ul:my-10 prose-ul:space-y-4 prose-ul:pl-6 prose-ol:my-10 prose-ol:space-y-4 prose-ol:pl-6 prose-li:text-gray-700 prose-li:leading-[1.8] prose-li:text-[1.125rem] prose-li:pl-3 prose-li::marker:text-blue-600 prose-li::marker:font-bold prose-li::marker:text-lg prose-li>ul:mt-3 prose-li>ul:mb-1 prose-li>ol:mt-3 prose-li>ol:mb-1 prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-2.5 prose-code:py-1 prose-code:rounded-md prose-code:font-semibold prose-code:text-base prose-code:border prose-code:border-blue-200 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-8 prose-pre:rounded-2xl prose-pre:my-10 prose-pre:shadow-2xl prose-pre:border-2 prose-pre:border-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-8 prose-blockquote:pr-6 prose-blockquote:py-5 prose-blockquote:italic prose-blockquote:bg-blue-50 prose-blockquote:my-10 prose-blockquote:rounded-r-xl prose-blockquote:text-gray-700 prose-blockquote:text-[1.125rem] prose-blockquote:leading-relaxed prose-table:my-12 prose-table:border-collapse prose-table:w-full prose-table:shadow-xl prose-table:rounded-xl prose-table:overflow-hidden prose-table:border-2 prose-table:border-gray-200 prose-thead:bg-gradient-to-r prose-thead:from-blue-600 prose-thead:to-blue-700 prose-thead:text-white prose-th:py-5 prose-th:px-6 prose-th:text-left prose-th:font-bold prose-th:text-base prose-th:uppercase prose-th:tracking-wide prose-td:py-5 prose-td:px-6 prose-td:border-b prose-td:border-gray-200 prose-td:text-[1.0625rem] prose-td:leading-relaxed prose-tbody:bg-white prose-tbody:divide-y prose-tbody:divide-gray-200 prose-tr:hover:bg-blue-50 prose-tr:transition-colors prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-12 prose-img:border-4 prose-img:border-gray-100 prose-hr:my-16 prose-hr:border-t-2 prose-hr:border-gray-300 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: () => null,
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Keywords/Tags */}
          {article.keywords.length > 0 && (
            <div className="mt-16 pt-10 border-t-2 border-gray-200">
              <h3 className="text-base font-bold text-gray-900 mb-5 uppercase tracking-wide">
                Verwandte Themen
              </h3>
              <div className="flex flex-wrap gap-3">
                {article.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 rounded-full border border-blue-200 hover:border-blue-400 transition-all"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Box */}
          <div className="mt-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-10 text-center shadow-xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Bereit für den nächsten Schritt?
            </h3>
            <p className="text-blue-100 mb-8 text-lg">
              Entdecke weitere hilfreiche Artikel zur Selbstständigkeit in der Schweiz
            </p>
            <Link
              href="/artikel"
              className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Alle Artikel anzeigen →
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
