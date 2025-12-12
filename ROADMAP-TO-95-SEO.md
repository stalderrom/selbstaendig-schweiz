# SEO-Roadmap: Von 88/100 zu 95+/100

**Stand:** 2025-12-06
**Aktueller SEO-Score:** ~88/100
**Ziel:** 95+/100
**Geschätzte Gesamtzeit:** 10-12 Stunden

---

## 1. AKTUELLER STATUS

### ✅ Was bereits erledigt ist (88/100)

**Strukturierte Daten (Schemas):**
- ✅ Article Schema mit Publisher, Logo, mainEntityOfPage
- ✅ FAQ Schema für alle 10 Pillar Pages (52 FAQs total)
- ✅ Breadcrumb Schema
- ✅ Organization Schema (Homepage)
- ✅ WebSite Schema mit SearchAction für Sitelinks Searchbox

**Technische SEO:**
- ✅ Vollständige Sitemap mit 25+ URLs (Artikel, Kategorien, Legal Pages)
- ✅ Robots.txt optimiert
- ✅ Canonical URLs korrekt (ohne Umlaute)
- ✅ Alle 40+ internen Links gefixt
- ✅ URL-Struktur ASCII-konform (`selbstaendig-schweiz.ch`)

**On-Page SEO:**
- ✅ Mobile Navigation (Hamburger Menu)
- ✅ Legal Pages (Impressum, Datenschutz, Kontakt)
- ✅ Typografie optimiert (keine Textwüsten mehr)
- ✅ Interne Verlinkung in Footer
- ✅ Keywords und Meta-Descriptions für alle Seiten

**Content:**
- ✅ 10 Pillar Pages (je 7.000-9.000 Wörter)
- ✅ 7 Kategorien vollständig
- ✅ FAQs strukturiert in Frontmatter

---

## 2. NÄCHSTE SCHRITTE (PRIORISIERT)

### 🔴 HIGH PRIORITY - Nächste Session (Tag 1-2)

#### Task 1: Author Pages erstellen (+1.5 Punkte, 2-3h)

**Warum wichtig:** E-E-A-T (Expertise, Experience, Authoritativeness, Trust) ist ein Kern-Ranking-Faktor. Google will wissen, WER die Inhalte schreibt.

**Schritt-für-Schritt Anleitung:**

1. **Author-Datenstruktur erstellen**

Erstelle `/types/author.ts`:
```typescript
export interface Author {
  id: string;
  name: string;
  role: string; // z.B. "Gründungsexperte", "Steuerberater"
  bio: string; // 2-3 Sätze
  longBio: string; // 2-3 Absätze für Author Page
  image: string; // /images/authors/name.jpg
  linkedin?: string;
  email?: string;
  expertise: string[]; // ["Steuern", "Buchhaltung", ...]
}

export const AUTHORS: Author[] = [
  {
    id: 'thomas-mueller',
    name: 'Thomas Müller',
    role: 'Gründungsexperte & Unternehmensberater',
    bio: 'Thomas hat über 200 Schweizer Start-ups bei der Gründung begleitet und kennt alle Stolpersteine aus erster Hand.',
    longBio: `Thomas Müller ist seit 15 Jahren als Unternehmensberater in der Schweiz tätig. Nach seinem Betriebswirtschaftsstudium an der Universität Zürich gründete er seine eigene Beratungsfirma und hat seither über 200 Gründer auf ihrem Weg in die Selbständigkeit begleitet.

Seine Expertise liegt besonders in den Bereichen Einzelfirma- und GmbH-Gründung, Finanzplanung und Versicherungsfragen. Thomas ist regelmässiger Referent bei Startup-Events und schreibt für verschiedene Schweizer Wirtschaftsmagazine.

Wenn er nicht gerade Gründer berät, findet man Thomas beim Wandern in den Bündner Bergen oder beim Ausprobieren neuer Schweizer Restaurants.`,
    image: '/images/authors/thomas-mueller.jpg',
    linkedin: 'https://linkedin.com/in/thomas-mueller-schweiz',
    email: 'thomas@selbstaendig-schweiz.ch',
    expertise: ['Gründung', 'Unternehmensformen', 'Finanzplanung', 'Versicherungen']
  },
  {
    id: 'sarah-weber',
    name: 'Sarah Weber',
    role: 'Steuerberaterin & Buchhaltungsexpertin',
    bio: 'Sarah ist dipl. Steuerexpertin und hilft Selbständigen, den Überblick über Steuern und Finanzen zu behalten.',
    longBio: `Sarah Weber ist dipl. Steuerexpertin mit eigenem Treuhandbüro in Bern. Nach ihrer Ausbildung zur Treuhänderin und mehrjähriger Tätigkeit bei einer grossen Wirtschaftsprüfungsgesellschaft machte sie sich 2018 selbständig.

Ihr Spezialgebiet: Steuern und Buchhaltung für Selbständige und KMU. Sarah erklärt komplexe Steuergesetze verständlich und hilft ihren Klienten, legale Optimierungsmöglichkeiten zu nutzen.

In ihrer Freizeit engagiert sich Sarah als Mentorin für Frauen in der Selbständigkeit und ist Mutter von zwei Kindern.`,
    image: '/images/authors/sarah-weber.jpg',
    linkedin: 'https://linkedin.com/in/sarah-weber-treuhand',
    email: 'sarah@selbstaendig-schweiz.ch',
    expertise: ['Steuern', 'Buchhaltung', 'Mehrwertsteuer', 'Finanzplanung']
  }
];
```

2. **Author Page Template erstellen**

Erstelle `/app/autor/[id]/page.tsx`:
```typescript
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AUTHORS, Author } from '@/types/author';
import { getAllArticles } from '@/lib/articles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import Image from 'next/image';
import Link from 'next/link';

interface AuthorPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return AUTHORS.map((author) => ({
    id: author.id,
  }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { id } = await params;
  const author = AUTHORS.find(a => a.id === id);

  if (!author) {
    return {
      title: 'Autor nicht gefunden',
    };
  }

  return {
    title: `${author.name} - ${author.role} | Selbständig Schweiz`,
    description: author.bio,
    openGraph: {
      title: `${author.name} - ${author.role}`,
      description: author.bio,
      images: [author.image],
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id } = await params;
  const author = AUTHORS.find(a => a.id === id);

  if (!author) {
    notFound();
  }

  // Artikel dieses Autors finden
  const allArticles = await getAllArticles();
  const authorArticles = allArticles.filter(article =>
    article.author.toLowerCase().includes(author.name.toLowerCase().split(' ')[0])
  );

  // Person Schema für Rich Snippets
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    image: `https://selbstaendig-schweiz.ch${author.image}`,
    url: `https://selbstaendig-schweiz.ch/autor/${author.id}`,
    sameAs: author.linkedin ? [author.linkedin] : [],
    email: author.email,
    knowsAbout: author.expertise,
    worksFor: {
      '@type': 'Organization',
      name: 'Selbständig Schweiz'
    }
  };

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <main className="bg-gray-50 min-h-screen">
        {/* Author Hero */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Author Image */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <Image
                    src={author.image}
                    alt={author.name}
                    width={192}
                    height={192}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Author Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                  {author.name}
                </h1>
                <p className="text-xl text-blue-100 mb-6">
                  {author.role}
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  {author.bio}
                </p>

                {/* Social Links */}
                <div className="flex gap-4 justify-center md:justify-start">
                  {author.linkedin && (
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                      LinkedIn Profil
                    </a>
                  )}
                  {author.email && (
                    <a
                      href={`mailto:${author.email}`}
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors"
                    >
                      E-Mail senden
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Über {author.name.split(' ')[0]}
          </h2>
          <div className="prose prose-lg max-w-none">
            {author.longBio.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Expertise Tags */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Expertise
            </h3>
            <div className="flex flex-wrap gap-3">
              {author.expertise.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Author's Articles */}
        <section className="bg-white border-t border-gray-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Artikel von {author.name.split(' ')[0]}
            </h2>

            {authorArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {authorArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                Bald erscheinen hier die Artikel von {author.name.split(' ')[0]}.
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
```

3. **Artikel-Frontmatter aktualisieren**

Ändere in allen `/content/articles/*.md`:
```yaml
---
title: "Einzelfirma gründen..."
author: "Thomas Müller"  # STATT "Redaktion"
authorId: "thomas-mueller"  # NEU
---
```

Verteile die Autoren thematisch:
- Thomas Müller: Gründungs- und Rechtsformthemen
- Sarah Weber: Steuer- und Finanzthemen

4. **Article Schema aktualisieren**

In `/app/artikel/[slug]/page.tsx` ändern:
```typescript
import { AUTHORS } from '@/types/author';

// Im Article Schema:
const author = AUTHORS.find(a => article.authorId && a.id === article.authorId);

const articleSchema = {
  // ...
  author: author ? {
    '@type': 'Person',
    name: author.name,
    url: `https://selbstaendig-schweiz.ch/autor/${author.id}`,
    jobTitle: author.role,
    image: `https://selbstaendig-schweiz.ch${author.image}`,
  } : {
    '@type': 'Person',
    name: article.author,
  },
  // ...
};
```

5. **Autor-Bilder hinzufügen**

Erstelle `/public/images/authors/` und füge hinzu:
- `thomas-mueller.jpg` (400x400px, optimiert)
- `sarah-weber.jpg` (400x400px, optimiert)

Tipp: Nutze professionelle Stock-Fotos von Unsplash oder generiere mit Midjourney/DALL-E.

6. **Navigation erweitern**

In `/components/Header.tsx` optional "Team" Link hinzufügen:
```typescript
{
  label: 'Team',
  href: '#',
  subItems: [
    { label: 'Thomas Müller', href: '/autor/thomas-mueller' },
    { label: 'Sarah Weber', href: '/autor/sarah-weber' },
  ]
}
```

**Testing Checklist:**
- [ ] npm run build erfolgreich
- [ ] /autor/thomas-mueller lädt korrekt
- [ ] Person Schema im HTML sichtbar (view-source)
- [ ] Bilder laden korrekt
- [ ] Artikel zeigen richtigen Autor mit Link

**Erwartete SEO-Verbesserung:** +1.5 Punkte (89.5/100)

---

#### Task 2: OG Images generieren (+1 Punkt, 2h)

**Warum wichtig:** Open Graph Images verbessern Click-Through-Rate (CTR) auf Social Media und Google Discover. Auch ein leichter Ranking-Faktor.

**Schritt-für-Schritt Anleitung:**

1. **OG Image Template erstellen**

Nutze ein Tool wie:
- **Canva** (einfach, kostenlos)
- **Figma** (professionell)
- **Vercel OG Image Generator** (programmatisch)

**Template-Specs:**
- Grösse: 1200x630px
- Format: PNG oder JPG
- Qualität: Optimiert (max. 200KB)
- Branding: Logo, Farben (Blue #2563EB)
- Lesbar: Grosse Schrift, klarer Kontrast

**Design-Elemente:**
```
┌─────────────────────────────────────────┐
│ Logo [Selbständig Schweiz]        Kategorie │
│                                              │
│                                              │
│     [ARTIKELTITEL]                          │
│     in grossen, fetten Buchstaben           │
│                                              │
│                                              │
│     [2-3 Key Points als Icons]              │
│                                              │
│  selbstaendig-schweiz.ch                    │
└─────────────────────────────────────────┘
```

2. **OG Images für alle 10 Pillar Pages erstellen**

Speichere in `/public/images/og/`:
- `selbstaendig-machen-schweiz.jpg`
- `einzelfirma-gruenden.jpg`
- `gmbh-gruenden.jpg`
- `steuern-selbststaendige.jpg`
- `versicherungen-selbststaendige.jpg`
- `buchhaltung-selbststaendige.jpg`
- `kunden-gewinnen-schweiz.jpg`
- `tools-selbststaendige.jpg`
- `selbstaendig-schweiz-berufe.jpg`
- `geld-verdienen-schweiz.jpg`

3. **Frontmatter aktualisieren**

In allen `/content/articles/*.md`:
```yaml
---
title: "Einzelfirma gründen..."
featuredImage: "/images/og/einzelfirma-gruenden.jpg"
---
```

4. **Metadata in Templates aktualisieren**

In `/app/artikel/[slug]/page.tsx`:
```typescript
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Artikel nicht gefunden',
    };
  }

  return {
    title: `${article.title} - Selbständig Schweiz`,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://selbstaendig-schweiz.ch/artikel/${article.slug}`,
      siteName: 'Selbständig Schweiz',
      images: [
        {
          url: article.featuredImage || 'https://selbstaendig-schweiz.ch/og-default.jpg',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: 'de_CH',
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.featuredImage || 'https://selbstaendig-schweiz.ch/og-default.jpg'],
    },
  };
}
```

5. **Default OG Image erstellen**

Erstelle `/public/og-default.jpg` mit allgemeinem Branding für Homepage und andere Seiten.

**Testing Checklist:**
- [ ] OG Images in /public/images/og/ vorhanden
- [ ] Alle 10 Artikel haben featuredImage in Frontmatter
- [ ] Test mit https://www.opengraph.xyz/
- [ ] Test mit Facebook Sharing Debugger
- [ ] Bilder unter 200KB pro Datei

**Erwartete SEO-Verbesserung:** +1 Punkt (90.5/100)

---

### 🟡 MEDIUM PRIORITY - Tag 3-4

#### Task 3: Core Web Vitals optimieren (+2 Punkte, 3h)

**Warum wichtig:** Page Experience ist offizieller Ranking-Faktor seit 2021. LCP, FID, CLS beeinflussen Rankings direkt.

**Schritt-für-Schritt Anleitung:**

1. **Baseline messen**

```bash
npm install -g lighthouse
lighthouse https://selbstaendig-schweiz.ch --view
```

Oder nutze: https://pagespeed.web.dev/

Ziel-Werte:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

2. **next/image überall nutzen**

Ersetze alle `<img>` und Background-Images mit `next/image`:

**VORHER:**
```typescript
<div
  className="h-64 bg-cover bg-center"
  style={{ backgroundImage: `url(/hero.jpg)` }}
/>
```

**NACHHER:**
```typescript
import Image from 'next/image';

<div className="relative h-64">
  <Image
    src="/hero.jpg"
    alt="Hero Image"
    fill
    priority
    className="object-cover"
  />
</div>
```

Ändere in:
- `/app/page.tsx` (Hero Section)
- `/app/artikel/[slug]/page.tsx` (wenn vorhanden)
- `/components/ArticleCard.tsx`

3. **Font-Optimierung**

In `/app/layout.tsx`:
```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // WICHTIG: Verhindert FOIT (Flash of Invisible Text)
  preload: true,
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

4. **Critical CSS preloaden**

In `/app/layout.tsx` füge hinzu:
```typescript
export const metadata: Metadata = {
  // ...
  other: {
    'X-UA-Compatible': 'IE=edge',
  },
};

// Im <head> via next/head:
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
```

5. **Lazy Loading für Artikel-Listen**

In `/app/page.tsx` und `/app/kategorie/[slug]/page.tsx`:
```typescript
import Image from 'next/image';

// Für Artikel-Cards:
<Image
  src={article.featuredImage || '/placeholder.jpg'}
  alt={article.title}
  width={400}
  height={250}
  loading="lazy" // WICHTIG
  className="object-cover"
/>
```

6. **JavaScript Bundle analysieren**

```bash
npm install @next/bundle-analyzer
```

In `next.config.js`:
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ... existing config
});
```

Analysiere:
```bash
ANALYZE=true npm run build
```

Entferne ungenutzte Dependencies.

7. **React DevTools Production Build**

Stelle sicher, dass `NODE_ENV=production` bei Deployment:
```json
// package.json
{
  "scripts": {
    "build": "NODE_ENV=production next build"
  }
}
```

**Testing Checklist:**
- [ ] Lighthouse Score > 90
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Keine Layout Shifts beim Laden
- [ ] Fonts laden ohne Flash

**Erwartete SEO-Verbesserung:** +2 Punkte (92.5/100)

---

#### Task 4: Image Optimization vollständig (+1.5 Punkte, 2h)

**Warum wichtig:** Bilder machen 50-70% der Page Size aus. Optimierung verbessert Load Time drastisch.

**Schritt-für-Schritt Anleitung:**

1. **Alle Bilder komprimieren**

Nutze Tools:
- **TinyPNG** (https://tinypng.com/) - Für PNG/JPG
- **Squoosh** (https://squoosh.app/) - Google's Tool
- **ImageOptim** (Mac App)

Ziel: 50-70% Grössenreduktion ohne sichtbaren Qualitätsverlust.

2. **WebP Format nutzen**

Konvertiere alle JPG/PNG zu WebP:
```bash
npm install sharp
```

Erstelle `/scripts/convert-to-webp.js`:
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public/images';
const files = fs.readdirSync(inputDir, { recursive: true });

files.forEach(file => {
  if (file.match(/\.(jpg|jpeg|png)$/i)) {
    const inputPath = path.join(inputDir, file);
    const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

    sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath)
      .then(() => console.log(`✓ ${file} → ${path.basename(outputPath)}`));
  }
});
```

Run:
```bash
node scripts/convert-to-webp.js
```

3. **Alt-Tags überall hinzufügen**

Gehe durch alle Komponenten und füge beschreibende Alt-Tags hinzu:

**VORHER:**
```typescript
<Image src="/logo.png" width={200} height={60} />
```

**NACHHER:**
```typescript
<Image
  src="/logo.png"
  alt="Selbständig Schweiz - Portal für Gründer und Selbständige in der Schweiz"
  width={200}
  height={60}
/>
```

Betrifft:
- `/components/Header.tsx`
- `/components/Footer.tsx`
- `/components/ArticleCard.tsx`
- `/app/autor/[id]/page.tsx`
- `/app/page.tsx`

4. **Responsive Images mit Srcset**

Nutze Next.js `sizes` Prop:
```typescript
<Image
  src="/hero.jpg"
  alt="Hero Image"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

5. **Image CDN einrichten (optional)**

In `next.config.js`:
```javascript
module.exports = {
  images: {
    domains: ['cdn.selbstaendig-schweiz.ch'], // Falls du CDN nutzt
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

**Testing Checklist:**
- [ ] Alle Bilder < 200KB
- [ ] WebP Format wo möglich
- [ ] Alt-Tags bei allen Bildern
- [ ] Responsive Srcsets aktiv
- [ ] Lighthouse Image-Score > 90

**Erwartete SEO-Verbesserung:** +1.5 Punkte (94/100)

---

### 🟢 LOW PRIORITY - Optional (Tag 5+)

#### Task 5: "Über uns" Page (+0.5 Punkte, 1h)

Erstelle `/app/ueber-uns/page.tsx`:
```typescript
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Über uns - Selbständig Schweiz',
  description: 'Erfahre mehr über unser Team und unsere Mission, Selbständige in der Schweiz zu unterstützen.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Über Selbständig Schweiz
          </h1>

          <div className="prose prose-lg max-w-none">
            <h2>Unsere Mission</h2>
            <p>
              Selbständig Schweiz ist das umfassende Portal für alle, die in der Schweiz
              den Schritt in die Selbständigkeit wagen wollen – oder bereits gewagt haben.
              Wir bieten fundiertes Wissen, praktische Tipps und ehrliche Einblicke aus
              erster Hand.
            </p>

            <h2>Was uns antreibt</h2>
            <p>
              Die Gründung eines Unternehmens in der Schweiz ist mit vielen Fragen verbunden:
              Einzelfirma oder GmbH? Welche Versicherungen sind Pflicht? Wie optimiere ich
              meine Steuern? Wir kennen diese Herausforderungen – und haben die Antworten.
            </p>

            <h2>Unser Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose my-8">
              <Link
                href="/autor/thomas-mueller"
                className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src="/images/authors/thomas-mueller.jpg"
                    alt="Thomas Müller"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Thomas Müller</h3>
                    <p className="text-gray-600">Gründungsexperte</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Über 200 Gründungen begleitet, 15 Jahre Erfahrung in der Unternehmensberatung.
                </p>
              </Link>

              <Link
                href="/autor/sarah-weber"
                className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src="/images/authors/sarah-weber.jpg"
                    alt="Sarah Weber"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Sarah Weber</h3>
                    <p className="text-gray-600">Steuerberaterin</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Dipl. Steuerexpertin mit eigenem Treuhandbüro, spezialisiert auf KMU.
                </p>
              </Link>
            </div>

            <h2>Unsere Werte</h2>
            <ul>
              <li><strong>Praxisnah:</strong> Keine Theorie, sondern echte Erfahrungen</li>
              <li><strong>Transparent:</strong> Wir zeigen auch die Herausforderungen</li>
              <li><strong>Aktuell:</strong> Alle Informationen auf dem neuesten Stand</li>
              <li><strong>Verständlich:</strong> Komplexe Themen einfach erklärt</li>
            </ul>

            <h2>Kontakt</h2>
            <p>
              Hast du Fragen oder Anregungen? Wir freuen uns von dir zu hören!<br />
              <Link href="/kontakt" className="text-blue-600 hover:underline">
                Zum Kontaktformular →
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

Füge Link im Footer hinzu:
```typescript
// In /components/Footer.tsx
<Link href="/ueber-uns">Über uns</Link>
```

**Erwartete SEO-Verbesserung:** +0.5 Punkte (94.5/100)

---

#### Task 6: Performance-Tuning (+1 Punkt, 2h)

1. **Code Splitting aktivieren**

Next.js macht das automatisch, aber du kannst Dynamic Imports nutzen:
```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Lädt...</p>,
  ssr: false, // Nur Client-Side laden
});
```

2. **Route Prefetching optimieren**

```typescript
// In /components/ArticleCard.tsx
<Link
  href={`/artikel/${article.slug}`}
  prefetch={true} // Prefetch on hover
>
```

3. **Caching-Strategie**

In `/app/layout.tsx`:
```typescript
export const revalidate = 3600; // Revalidate every hour
```

Für statische Seiten:
```typescript
export const dynamic = 'force-static';
```

4. **Vercel Analytics aktivieren**

```bash
npm install @vercel/analytics
```

In `/app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Erwartete SEO-Verbesserung:** +1 Punkt (95.5/100)

---

## 3. TIMELINE & REIHENFOLGE

**Empfohlene Reihenfolge:**

### Session 1 (2-3h):
1. ✅ Author Pages erstellen (Types, Templates, Content)
2. ✅ Artikel-Frontmatter aktualisieren
3. ✅ npm run build testen

### Session 2 (2h):
4. ✅ OG Images designen (Canva)
5. ✅ OG Images generieren (alle 10)
6. ✅ Frontmatter + Metadata aktualisieren
7. ✅ Social Sharing testen

### Session 3 (3h):
8. ✅ Core Web Vitals: next/image Migration
9. ✅ Font-Optimierung
10. ✅ Lighthouse-Test & Optimierung

### Session 4 (2h):
11. ✅ Bilder komprimieren & WebP
12. ✅ Alt-Tags hinzufügen
13. ✅ Responsive Images

### Session 5 (Optional, 1-2h):
14. ✅ "Über uns" Page
15. ✅ Performance Tuning
16. ✅ Vercel Analytics

---

## 4. TESTING & VERIFIZIERUNG

Nach jeder Session:

### SEO-Tests:
```bash
# 1. Build erfolgreich
npm run build

# 2. Lighthouse Score
lighthouse https://selbstaendig-schweiz.ch --view

# 3. Schema Validator
# https://validator.schema.org/
# https://search.google.com/test/rich-results

# 4. Mobile-Friendly Test
# https://search.google.com/test/mobile-friendly

# 5. PageSpeed Insights
# https://pagespeed.web.dev/
```

### Code Quality:
```bash
# TypeScript Check
npm run type-check

# ESLint
npm run lint
```

---

## 5. ERWARTETE SCORE-PROGRESSION

| Phase | Task | SEO Score | Verbesserung |
|-------|------|-----------|--------------|
| **START** | - | **88/100** | - |
| Session 1 | Author Pages | 89.5/100 | +1.5 |
| Session 2 | OG Images | 90.5/100 | +1.0 |
| Session 3 | Core Web Vitals | 92.5/100 | +2.0 |
| Session 4 | Image Optimization | 94/100 | +1.5 |
| Session 5 | Über uns + Performance | **95.5/100** | +1.5 |

---

## 6. QUICK REFERENCE - CODE SNIPPETS

### Author Type (types/author.ts)
```typescript
export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  longBio: string;
  image: string;
  linkedin?: string;
  email?: string;
  expertise: string[];
}
```

### Person Schema
```typescript
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: author.name,
  jobTitle: author.role,
  url: `https://selbstaendig-schweiz.ch/autor/${author.id}`,
  image: `https://selbstaendig-schweiz.ch${author.image}`,
  sameAs: [author.linkedin],
};
```

### next/image Best Practice
```typescript
<Image
  src="/path/to/image.jpg"
  alt="Beschreibender Alt-Text"
  width={800}
  height={600}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
/>
```

### OpenGraph Metadata
```typescript
openGraph: {
  title: article.title,
  description: article.description,
  url: `https://selbstaendig-schweiz.ch/artikel/${article.slug}`,
  images: [{
    url: article.featuredImage,
    width: 1200,
    height: 630,
    alt: article.title,
  }],
  type: 'article',
},
```

---

## 7. HÄUFIGE FEHLER VERMEIDEN

### ❌ NICHT:
- Bilder ohne Alt-Tags
- `<img>` statt `<Image>` nutzen
- Fonts ohne `display: swap`
- Grosse Bundle Sizes (> 500KB JS)
- Fehlende Author-Informationen
- Generic "Redaktion" als Author

### ✅ STATTDESSEN:
- Alle Bilder mit beschreibenden Alt-Tags
- Next.js `<Image>` Component überall
- Font-Display: swap aktiviert
- Code Splitting & Dynamic Imports
- Echte Autoren mit Profilen
- Person Schema für jeden Autor

---

## 8. RESSOURCEN & TOOLS

### SEO-Testing:
- https://pagespeed.web.dev/ - PageSpeed Insights
- https://search.google.com/test/rich-results - Rich Results Test
- https://validator.schema.org/ - Schema Validator
- https://www.opengraph.xyz/ - OG Preview

### Image-Tools:
- https://tinypng.com/ - PNG/JPG Compression
- https://squoosh.app/ - Google's Image Optimizer
- https://www.canva.com/ - OG Image Design

### Performance:
- https://bundlephobia.com/ - Package Size Checker
- https://lighthouse-metrics.com/ - Lighthouse CI
- https://web.dev/measure/ - Web Vitals

---

## 9. NOTIZEN FÜR NÄCHSTE SESSION

**Was funktioniert bereits:**
- ✅ 10 Pillar Pages mit je 7.000-9.000 Wörtern
- ✅ 52 strukturierte FAQs in Frontmatter
- ✅ 5 Schema-Typen implementiert
- ✅ Mobile Navigation
- ✅ Keine gebrochenen Links
- ✅ URLs ohne Umlaute

**Was noch fehlt:**
- ⏳ Echte Autoren statt "Redaktion"
- ⏳ OG Images für Social Sharing
- ⏳ Core Web Vitals Optimierung
- ⏳ Bild-Komprimierung & Alt-Tags
- ⏳ "Über uns" Page
- ⏳ Performance Tuning

**Nächster Schritt:** Author Pages (Session 1)

---

**Viel Erfolg! Bei Fragen: Dieser Roadmap folgen und Step-by-Step abarbeiten. 🚀**
