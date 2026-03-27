import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/lib/articles';
import { CATEGORIES } from '@/types/article';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
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
    title: article.metaTitle || article.title,
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
      canonical: `https://www.selbstaendig-schweiz.ch/artikel/${article.slug}`,
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
  const publishDate = new Date(article.updatedAt || article.publishedAt);

  // Related articles: use explicit `related` slugs or fall back to same category
  const allArticles = await getAllArticles();
  const relatedArticles = article.related?.length
    ? (article.related.map(s => allArticles.find(a => a.slug === s)).filter(Boolean) as typeof allArticles).slice(0, 3)
    : allArticles.filter(a => a.slug !== article.slug && a.category === article.category).slice(0, 3);

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

  // Speakable Schema (für AI-Assistenten und Voice Search)
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: article.title,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.article-description', '.faq-section'],
      xpath: [
        "/html/head/title",
        "/html/head/meta[@name='description']/@content",
      ],
    },
    url: `https://www.selbstaendig-schweiz.ch/artikel/${article.slug}`,
  };

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

      {/* Speakable Schema (AI assistants + voice search) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      <Header />

      <article className="bg-warm-white">

        {/* Breadcrumbs */}
        <div className="border-b border-warm-200 bg-warm-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-warm-500">
              <Link href="/" className="hover:text-warm-900 transition-colors">Home</Link>
              <span className="text-warm-300">/</span>
              {category && (
                <>
                  <Link href={`/kategorie/${category.slug}`} className="hover:text-warm-900 transition-colors">
                    {category.name}
                  </Link>
                  <span className="text-warm-300">/</span>
                </>
              )}
              <span className="text-warm-700 truncate max-w-xs">{article.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Header — centred, editorial */}
        <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 text-center">
          {category && (
            <Link href={`/kategorie/${category.slug}`} className="category-label text-accent mb-4 block hover:text-accent-dark transition-colors">
              {category.name}
            </Link>
          )}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-warm-900 leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-warm-600 mb-5 leading-relaxed max-w-2xl mx-auto">
            {article.description}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-warm-400">
            <span>{article.author}</span>
            <span className="text-warm-200">·</span>
            <time dateTime={article.updatedAt || article.publishedAt}>
              Aktualisiert: {publishDate.toLocaleDateString('de-CH', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span className="text-warm-200">·</span>
            <span>{article.readingTime} Min. Lesezeit</span>
          </div>
        </header>

        {/* Featured Image — full editorial width, 16:9 */}
        {article.featuredImage && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="relative w-full aspect-video overflow-hidden rounded-lg">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Content + Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex gap-14 items-start">

            {/* Main article content */}
            <div className="flex-1 min-w-0">
              <div className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:font-bold prose-headings:text-warm-900 prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-warm-200 prose-h2:leading-tight prose-h2:scroll-mt-20 prose-h2:text-accent
                prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-5 prose-h3:leading-snug prose-h3:scroll-mt-20
                prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-4 prose-h4:text-warm-800 prose-h4:scroll-mt-20
                prose-p:text-warm-700 prose-p:leading-[1.85] prose-p:mb-6 prose-p:text-[1.1rem]
                prose-a:text-accent prose-a:font-medium prose-a:underline prose-a:decoration-accent-mid prose-a:underline-offset-2 prose-a:transition-colors
                hover:prose-a:text-accent-dark
                prose-strong:text-warm-900 prose-strong:font-bold
                prose-ul:my-8 prose-ul:pl-6 prose-ol:my-8 prose-ol:pl-6
                prose-li:text-warm-700 prose-li:leading-[1.8] prose-li:pl-2
                prose-code:text-accent-dark prose-code:bg-accent-50 prose-code:px-2 prose-code:py-0.5 prose-code:font-medium prose-code:text-sm prose-code:border prose-code:border-accent-light prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-warm-900 prose-pre:text-warm-100 prose-pre:p-8 prose-pre:my-10
                prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:py-1 prose-blockquote:italic prose-blockquote:bg-accent-50 prose-blockquote:my-8 prose-blockquote:text-warm-700 prose-blockquote:leading-relaxed
                prose-table:my-10 prose-table:border-collapse prose-table:w-full prose-table:border prose-table:border-warm-200
                prose-thead:bg-warm-900 prose-thead:text-warm-white
                prose-th:py-4 prose-th:px-5 prose-th:text-left prose-th:font-semibold prose-th:text-sm prose-th:uppercase prose-th:tracking-wide
                prose-td:py-4 prose-td:px-5 prose-td:border-b prose-td:border-warm-200 prose-td:text-warm-700
                prose-tbody:bg-warm-white prose-tr:hover:bg-warm-50 prose-tr:transition-colors
                prose-img:my-10 prose-img:shadow-lg
                prose-hr:my-12 prose-hr:border-warm-200
                [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{ h1: () => null }}
                >
                  {article.content}
                </ReactMarkdown>
              </div>

              {/* Keywords */}
              {article.keywords.length > 0 && (
                <div className="mt-14 pt-8 border-t border-warm-200">
                  <p className="category-label text-warm-400 mb-4">Verwandte Themen</p>
                  <div className="flex flex-wrap gap-2">
                    {article.keywords.map((keyword) => (
                      <span key={keyword} className="px-3 py-1 text-sm text-warm-600 border border-warm-200 hover:border-warm-400 transition-colors bg-warm-50">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}


              {/* CTA Box */}
              <div className="mt-12 bg-ink p-10 text-center">
                <p className="category-label text-accent-mid mb-4">Weiterlesen</p>
                <p className="font-serif text-2xl md:text-3xl font-bold text-warm-white mb-4 leading-tight">
                  Bereit für den nächsten Schritt?
                </p>
                <p className="text-warm-500 mb-8 text-base leading-relaxed">
                  Entdecke weitere praxisnahe Guides zur Selbstständigkeit in der Schweiz.
                </p>
                <Link href="/artikel" className="inline-block bg-accent text-white px-7 py-3 text-sm font-semibold hover:bg-accent-dark transition-colors">
                  Alle Artikel anzeigen →
                </Link>
              </div>
            </div>

            {/* Sticky sidebar — related articles */}
            {relatedArticles.length > 0 && (
              <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-8 self-start">
                <p className="category-label text-warm-400 mb-4">Weiterführende Artikel</p>
                <div className="flex flex-col">
                  {relatedArticles.map((rel) => {
                    const relCategory = CATEGORIES.find(c => c.slug === rel.category);
                    return (
                      <Link
                        key={rel.slug}
                        href={`/artikel/${rel.slug}`}
                        className="group block border-t border-warm-200 py-5 hover:border-accent transition-colors"
                      >
                        {relCategory && (
                          <span className="category-label text-accent block mb-2">{relCategory.name}</span>
                        )}
                        <h3 className="font-serif font-bold text-warm-900 leading-snug mb-2 line-clamp-3 group-hover:text-accent transition-colors text-base">
                          {rel.title}
                        </h3>
                        <p className="text-xs text-warm-500 line-clamp-2 leading-relaxed">{rel.description}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:gap-2 transition-all">
                          Lesen
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </Link>
                    );
                  })}
                </div>

                {/* Sidebar CTA */}
                <div className="mt-6 bg-accent-50 border border-accent-light p-5">
                  <p className="font-serif font-bold text-warm-900 text-sm leading-snug mb-2">Alle Ratgeber entdecken</p>
                  <p className="text-xs text-warm-600 mb-4 leading-relaxed">80+ kostenlose Guides rund um die Selbständigkeit in der Schweiz.</p>
                  <Link href="/artikel" className="inline-block text-xs font-semibold text-accent hover:text-accent-dark transition-colors">
                    Zur Übersicht →
                  </Link>
                </div>
              </aside>
            )}

          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
