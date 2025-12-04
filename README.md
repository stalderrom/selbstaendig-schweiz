# Selbständig Schweiz - Informationsportal

Ein hochperformantes SEO-optimiertes Informationsportal für Selbstständige und Gründer in der Schweiz.

## 🚀 Tech Stack

- **Next.js 15** - React Framework mit App Router
- **TypeScript** - Type Safety
- **Tailwind CSS** - Utility-first CSS
- **Markdown** - Content Management
- **Vercel** - Hosting & Deployment

## 📁 Projektstruktur

```
selbstaendig-schweiz/
├── app/
│   ├── layout.tsx          # Root Layout mit SEO Meta-Tags
│   ├── page.tsx             # Homepage
│   ├── artikel/[slug]/      # Dynamische Artikel-Seiten
│   ├── admin/               # CMS Backend
│   ├── api/articles/        # API für Artikel-Erstellung
│   ├── sitemap.ts           # Automatische Sitemap
│   └── robots.ts            # Robots.txt
├── components/
│   ├── Header.tsx           # Navigation
│   └── ArticleCard.tsx      # Artikel-Karte
├── content/
│   └── articles/            # Markdown-Artikel (*.md)
├── lib/
│   └── articles.ts          # Artikel-Logik
└── types/
    └── article.ts           # TypeScript Types
```

## 🎯 Features

### SEO-Optimierungen
- ✅ Optimierte Meta-Tags (Title, Description, Keywords)
- ✅ OpenGraph & Twitter Cards
- ✅ Automatische Sitemap-Generierung
- ✅ Robots.txt
- ✅ Structured Data (JSON-LD)
- ✅ Semantisches HTML
- ✅ Breadcrumbs
- ✅ Canonical URLs
- ✅ Reading Time Berechnung

### Performance
- ✅ Static Site Generation (SSG)
- ✅ Image Optimization (AVIF/WebP)
- ✅ Font Optimization
- ✅ Code Splitting
- ✅ Lazy Loading
- ✅ Optimierte Bundle Size

### Content Management
- ✅ Markdown-basiert
- ✅ Frontend CMS unter `/admin`
- ✅ Kategorien-System
- ✅ Keyword-Management
- ✅ Artikel-Vorlagen

## 🏗️ Entwicklung

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

### Production Server

```bash
npm start
```

## 📝 Artikel erstellen

### Option 1: Über das Admin-Interface

1. Gehe zu `/admin`
2. Fülle das Formular aus
3. Klicke auf "Artikel erstellen"

### Option 2: Manuell

Erstelle eine neue `.md` Datei in `content/articles/`:

```markdown
---
title: "Dein Artikel-Titel"
description: "SEO-Beschreibung (150-160 Zeichen)"
keywords: ["keyword1", "keyword2", "keyword3"]
category: "grundung"
author: "Redaktion"
publishedAt: "2026-01-15"
---

# Hauptüberschrift

Dein Artikel-Inhalt in Markdown...

## Unterüberschrift

- Listenpunkt 1
- Listenpunkt 2

**Fettgedruckt** und *kursiv*
```

## 📂 Kategorien

- **Gründung & Start** (`grundung`) - Startup-Gründung, Rechtsformen
- **Finanzen & Steuern** (`finanzen`) - Steuern, Buchhaltung
- **Versicherungen** (`versicherungen`) - AHV, Krankenversicherung
- **Einkommen & Preise** (`einkommen`) - Honorare, Preisgestaltung
- **Marketing & Kunden** (`marketing`) - Kundengewinnung
- **Berufe & Branchen** (`berufe`) - Freelancer, Consultant
- **Lifestyle & Balance** (`lifestyle`) - Work-Life-Balance

## 🎨 Design System

### Farben
- Primary: Blue-600 (#2563eb)
- Background: White/Gray-50
- Text: Gray-900/Gray-700

### Typografie
- Font: Inter (Google Fonts)
- H1: 4xl/5xl (36-48px)
- H2: 3xl (30px)
- Body: lg (18px)

## 🚀 Deployment

### Vercel (Empfohlen)

1. Repository mit Vercel verbinden
2. Automatisches Deployment bei jedem Push
3. Kostenlos für kleine Projekte

```bash
# Vercel CLI
npm i -g vercel
vercel
```

### Andere Hosting-Optionen

- Netlify
- AWS Amplify
- Cloudflare Pages

## 📊 SEO Strategie

### Keyword-Research
86 Haupt-Keywords mit niedriger Konkurrenz:
- startup schweiz (17 results)
- selbstständig machen (10 results)
- freelancer schweiz (10 results)
- ...

### Content-Strategie
- Pillar + Cluster Struktur
- Interne Verlinkung
- 500+ Artikel geplant
- 20+ Artikel pro Keyword-Cluster

### Monetarisierung
- Google AdSense (primär)
- AdThrive (ab 100k pageviews)
- Mediavine (ab 50k sessions)

## 🔧 Konfiguration

### Environment Variables

Erstelle `.env.local`:

```env
# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-ga-id

# Optional: AdSense
NEXT_PUBLIC_ADSENSE_ID=ca-pub-xxxxx
```

## 📈 Nächste Schritte

1. ✅ Grundgerüst aufbauen
2. ✅ SEO optimieren
3. ✅ CMS erstellen
4. Weitere Artikel schreiben (Ziel: 500+)
5. Google Search Console einrichten
6. Analytics integrieren
7. AdSense beantragen (ab 30+ Artikel)
8. Backlinks aufbauen
9. Social Media Integration

## 📞 Support

Bei Fragen oder Problemen:
- Issues auf GitHub erstellen
- Dokumentation lesen

---

**Viel Erfolg mit deinem Informationsportal!** 🚀
