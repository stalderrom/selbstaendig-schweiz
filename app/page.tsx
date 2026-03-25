import { getAllArticles } from '@/lib/articles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Article, CATEGORIES } from '@/types/article';

function getCategoryName(slug: string) {
  return CATEGORIES.find(c => c.slug === slug)?.name ?? slug;
}

const PILLAR_SECTIONS = [
  {
    category: 'Gründung',
    pages: [
      { title: 'Selbständig machen', description: 'Von der Idee bis zum erfolgreichen Start. Der vollständige Guide.', href: '/artikel/selbstaendig-machen-schweiz', featured: true },
      { title: 'Einzelfirma gründen', description: 'In 1–3 Tagen zur eigenen Firma. Ohne Mindestkapital.', href: '/artikel/einzelfirma-gruenden' },
      { title: 'GmbH gründen', description: 'Haftungsschutz & Steuervorteile mit CHF 20k Stammkapital.', href: '/artikel/gmbh-gruenden' },
      { title: 'Alle Berufe', description: '50+ Berufe im Detail: Voraussetzungen, Verdienst, Chancen.', href: '/artikel/selbstaendig-schweiz-berufe' },
    ]
  },
  {
    category: 'Finanzen',
    pages: [
      { title: 'Steuern für Selbständige', description: 'Einkommens-, MWST- und AHV-Beiträge verstehen. Mit Spartipps.', href: '/artikel/steuern-selbststaendige', featured: true },
      { title: 'Versicherungen', description: 'Pflicht oder freiwillig? Alle Versicherungen im Überblick.', href: '/artikel/versicherungen-selbststaendige' },
      { title: 'Buchhaltung', description: 'Von der einfachen Buchführung bis zum Treuhänder.', href: '/artikel/buchhaltung-selbststaendige' },
      { title: 'Geld verdienen', description: '8 Geschäftsmodelle — von Stundensatz bis passivem Einkommen.', href: '/artikel/geld-verdienen-schweiz' },
    ]
  },
  {
    category: 'Wachstum',
    pages: [
      { title: 'Kunden gewinnen', description: 'Marketing, Networking, Empfehlungen: Alle Akquise-Strategien.', href: '/artikel/kunden-gewinnen-schweiz', featured: true },
      { title: 'Tools & Software', description: 'Die besten Tools für Buchhaltung, CRM und Projektmanagement.', href: '/artikel/tools-selbststaendige' },
    ]
  },
];

function FeaturedArticle({ article }: { article: Article }) {
  return (
    <Link href={`/artikel/${article.slug}`} className="group block">
      <span className="category-label text-accent mb-3 block">
        {getCategoryName(article.category)}
      </span>
      <h3 className="font-serif text-2xl md:text-3xl font-bold text-warm-900 leading-snug mb-4 group-hover:text-accent transition-colors duration-200">
        {article.title}
      </h3>
      <p className="text-warm-600 leading-relaxed mb-4 text-base">
        {article.description}
      </p>
      <span className="text-sm text-warm-400">
        {new Date(article.publishedAt).toLocaleDateString('de-CH', { year: 'numeric', month: 'long', day: 'numeric' })}
        &nbsp;·&nbsp;{article.readingTime} Min.
      </span>
    </Link>
  );
}

function SmallArticle({ article }: { article: Article }) {
  return (
    <Link href={`/artikel/${article.slug}`} className="group block py-5 border-t border-warm-200 first:border-t-0">
      <span className="category-label text-warm-400 group-hover:text-accent mb-2 block transition-colors">
        {getCategoryName(article.category)}
      </span>
      <h3 className="font-serif text-base font-bold text-warm-900 leading-snug group-hover:text-accent transition-colors duration-200 mb-2">
        {article.title}
      </h3>
      <span className="text-sm text-warm-400">{article.readingTime} Min.</span>
    </Link>
  );
}

export default async function Home() {
  const articles = await getAllArticles();
  const featuredArticle = articles[0];
  const secondaryArticles = articles.slice(1, 3);
  const tertiaryArticles = articles.slice(3, 6);

  const organizationSchema = {
    '@context': 'https://schema.org', '@type': 'Organization',
    name: 'Selbständig Schweiz', url: 'https://www.selbständig-schweiz.ch',
    description: 'Ratgeber & Tools für Selbständige und Gründer in der Schweiz.',
    foundingDate: '2025', areaServed: { '@type': 'Country', name: 'Schweiz' }
  };

  const websiteSchema = {
    '@context': 'https://schema.org', '@type': 'WebSite',
    name: 'Selbständig Schweiz', url: 'https://www.selbständig-schweiz.ch',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://www.selbständig-schweiz.ch/artikel?q={search_term_string}' },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <Header />

      <main>
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="bg-warm-white border-b border-warm-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

              {/* LEFT: Copy */}
              <div className="py-20 md:py-24 lg:pr-12 xl:pr-20">
                <p className="category-label text-accent mb-6">
                  Ratgeber &amp; Tools für Selbständige in der Schweiz
                </p>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-warm-900 leading-tight mb-6">
                  Selbständig in der<br />
                  <em className="not-italic text-accent">Schweiz.</em>
                </h1>
                <p className="text-warm-600 text-lg leading-relaxed mb-10 max-w-lg">
                  Praxisnahe Guides zu Gründung, Steuern, Versicherungen und Kundengewinnung —
                  für Einzelfirma, GmbH und Freelancer.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/artikel/selbstaendig-machen-schweiz"
                    className="inline-block bg-accent text-white px-7 py-3 text-sm font-semibold hover:bg-accent-dark transition-colors text-center rounded-md">
                    Jetzt durchstarten
                  </Link>
                  <Link href="/artikel/einzelfirma-gruenden"
                    className="inline-block border border-warm-300 text-warm-700 px-7 py-3 text-sm font-semibold hover:border-warm-500 hover:text-warm-900 transition-colors text-center rounded-md">
                    Einzelfirma gründen
                  </Link>
                </div>
                {/* Social proof avatars */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {['avatar-1','avatar-2','avatar-3','avatar-4','avatar-5','avatar-6'].map((id) => (
                      <div key={id} className="w-14 h-14 rounded-full border-2 border-warm-white shadow-md shrink-0 overflow-hidden relative">
                        <Image
                          src={`/images/${id}.png`}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-warm-500 leading-snug">
                    Von Selbständigen<br/>für Selbständige.
                  </p>
                </div>
              </div>

              {/* RIGHT: Photo composition */}
              <div className="hidden lg:block relative h-[560px] hero-fade-up">

                {/* Decorative thin accent rectangle — background geometry */}
                <div className="absolute top-10 right-6 w-52 h-64 border border-accent-light" />

                {/* Main photo: woman — large, offset from right edge */}
                <div className="absolute top-8 right-10 w-72 h-[440px] overflow-hidden shadow-2xl border border-warm-100 rounded-md hero-fade-up hero-float-main">
                  <Image
                    src="/images/hero-f.png"
                    alt="Selbständige Unternehmerin"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>

                {/* Secondary photo: man — larger, bottom-left, floating rotate */}
                <div className="absolute bottom-8 left-4 w-56 h-64 overflow-hidden shadow-xl border-2 border-warm-white rounded-md z-10 hero-float-rotate">
                  <Image
                    src="/images/hero-m.png"
                    alt="Selbständiger Unternehmer"
                    fill
                    className="object-cover object-top"
                  />
                </div>

                {/* Floating card: Guide count — top-left, overlapping */}
                <div className="absolute top-16 left-0 z-20 bg-warm-white border border-warm-200 shadow-lg px-5 py-4 rounded-md hero-float hero-fade-up-1">
                  <p className="font-serif text-3xl font-bold text-warm-900 leading-none">{Math.floor(articles.length / 10) * 10}+</p>
                  <p className="text-xs text-warm-500 mt-1.5 leading-snug uppercase tracking-wide font-semibold">Kostenlose<br/>Guides</p>
                </div>

                {/* Floating badge: Einzelfirma — mid-right */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 z-20 bg-accent text-white px-4 py-3 shadow-lg rounded-md hero-float-2 hero-fade-up-1">
                  <p className="text-xs font-bold tracking-wide leading-none mb-1">✓ EINZELFIRMA</p>
                  <p className="text-xs opacity-75 leading-none">in 1–3 Tagen</p>
                </div>

                {/* Floating card: CHF 0 — bottom-right */}
                <div className="absolute bottom-16 right-6 z-20 bg-warm-white border border-warm-200 shadow-md px-4 py-3 text-center rounded-md hero-float-3 hero-fade-up-2">
                  <p className="font-serif text-xl font-bold text-accent leading-none">CHF 0</p>
                  <p className="text-xs text-warm-500 mt-1 tracking-wide uppercase font-semibold">Startkapital</p>
                </div>

              </div>
            </div>
          </div>

          {/* Trust bar */}
          <div className="border-t border-warm-200 bg-warm-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-warm-200">
                {[
                  { num: `${Math.floor(articles.length / 10) * 10}+`, label: 'kostenlose Guides' },
                  { num: '3', label: 'Rechtsformen erklärt' },
                  { num: 'AHV · MWST', label: 'Vorsorge & Steuern' },
                  { num: '100%', label: 'unabhängig & kostenlos' },
                ].map(({ num, label }) => (
                  <div key={label} className="py-5 px-4 sm:px-6 text-center">
                    <p className="font-serif font-bold text-warm-900 text-base leading-none mb-1.5">{num}</p>
                    <p className="text-sm text-warm-500 leading-snug">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Neueste Artikel — Editorial Layout ────────────────── */}
        {featuredArticle && (
          <section className="bg-warm-white py-16 md:py-20 border-b border-warm-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* Section header */}
              <div className="flex items-center gap-4 mb-10">
                <span className="category-label text-accent">Aktuell</span>
                <div className="flex-1 h-px bg-warm-200" />
                <Link href="/artikel" className="text-sm text-warm-400 hover:text-accent transition-colors font-medium">
                  Alle Artikel →
                </Link>
              </div>

              {/* Featured + secondary row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-warm-200 pb-10 mb-0">
                {/* Featured — 2 cols */}
                <div className="md:col-span-2 md:pr-10 md:border-r border-warm-200 pb-8 md:pb-0">
                  <FeaturedArticle article={featuredArticle} />
                </div>
                {/* Secondary — 1 col, stacked */}
                <div className="md:pl-10 pt-8 md:pt-0">
                  {secondaryArticles.map(article => (
                    <SmallArticle key={article.slug} article={article} />
                  ))}
                </div>
              </div>

              {/* Tertiary row — 3 equal cols */}
              {tertiaryArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-0">
                  {tertiaryArticles.map((article, i) => (
                    <Link key={article.slug} href={`/artikel/${article.slug}`}
                      className={`group block pt-8 pb-2
                        ${i === 0 ? 'md:pr-8' : ''}
                        ${i === 1 ? 'md:px-8 md:border-l border-warm-200' : ''}
                        ${i === 2 ? 'md:pl-8 md:border-l border-warm-200' : ''}`}>
                      <span className="category-label text-warm-400 group-hover:text-accent mb-2 block transition-colors">
                        {getCategoryName(article.category)}
                      </span>
                      <h3 className="font-serif text-base font-bold text-warm-900 group-hover:text-accent transition-colors leading-snug mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-warm-600 line-clamp-2 leading-relaxed mb-3">
                        {article.description}
                      </p>
                      <span className="text-sm text-warm-400">{article.readingTime} Min.</span>
                    </Link>
                  ))}
                </div>
              )}

            </div>
          </section>
        )}

        {/* ── Guides nach Kategorie ─────────────────────────────── */}
        <section className="bg-warm-50 py-16 md:py-20 border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex items-center gap-4 mb-12">
              <span className="category-label text-accent">Komplette Guides</span>
              <div className="flex-1 h-px bg-warm-200" />
            </div>

            <div className="space-y-14">
              {PILLAR_SECTIONS.map((section) => (
                <div key={section.category}>
                  {/* Category rule */}
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="font-serif text-sm font-bold text-warm-700 tracking-wide uppercase">
                      {section.category}
                    </h2>
                    <div className="flex-1 h-px bg-warm-200" />
                  </div>

                  {/* Featured + rest layout */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                    {section.pages.map((page, i) => (
                      <Link key={page.href} href={page.href}
                        className={`group block border border-warm-200 -mt-px -ml-px p-6 bg-warm-50 hover:bg-warm-white hover:border-accent hover:z-10 relative transition-all duration-200
                          ${page.featured ? 'md:col-span-2' : 'md:col-span-1'}`}>
                        <h3 className={`font-serif font-bold text-warm-900 group-hover:text-accent transition-colors mb-2
                          ${page.featured ? 'text-xl' : 'text-base'}`}>
                          {page.title}
                        </h3>
                        <p className="text-sm text-warm-600 leading-relaxed">
                          {page.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="bg-ink py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <p className="category-label text-accent-mid mb-4">Bereit?</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-white mb-5 leading-tight">
              Dein Weg in die Selbständigkeit
            </h2>
            <p className="text-warm-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Über {Math.floor(articles.length / 10) * 10} Artikel mit praxisnahen Tipps für deine Selbstständigkeit in der Schweiz.
            </p>
            <Link href="/artikel/selbstaendig-machen-schweiz"
              className="inline-block bg-accent text-white px-8 py-3 text-sm font-semibold hover:bg-accent-dark transition-colors rounded-md">
              Selbstständig machen — Guide lesen
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
