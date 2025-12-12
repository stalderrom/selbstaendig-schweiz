import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { CATEGORIES } from '@/types/article';

// Sequential Topic Clustering: Prioritize by Phase
// Phase 1: Gründung + Buchhaltung (Highest Priority)
// Phase 2: Steuern + Versicherungen (Medium Priority)
// Phase 3: Berufe + Tools + Marketing (Lower Priority)

const PHASE_1_PILLAR = [
  'selbstaendig-machen-schweiz',
  'buchhaltung-selbststaendige'
];

const PHASE_1_SUPPORTING = [
  'einzelfirma-gruenden',
  'gmbh-gruenden',
  'einfache-gesellschaft-schweiz',
  'kollektivgesellschaft-gruenden-schweiz',
  'unternehmen-gruenden-schweiz',
  'selbstaendig-werden-schweiz',
  'einfache-buchhaltung-schweiz',
  'erfolgsrechnung-erstellen-schweiz',
  'lohnabrechnung-schweiz-unternehmen',
  'offerte-erstellen-schweiz',
  'qr-rechnung-erstellen-schweiz',
  'rechnungsvorlage-schweiz',
  'freizuegigkeitskonto-schweiz'
];

const PHASE_2_PILLAR = [
  'steuern-selbststaendige',
  'versicherungen-selbststaendige'
];

const PHASE_2_SUPPORTING = [
  'ahv-rente-berechnen-schweiz',
  'berufshaftpflicht-schweiz',
  'rechtsschutzversicherung-schweiz',
  'lebensversicherung-schweiz-vergleich',
  'todesfallversicherung-schweiz'
];

function getArticlePriority(slug: string): number {
  // Phase 1: Highest Priority (Core Authority)
  if (PHASE_1_PILLAR.includes(slug)) return 1.0;
  if (PHASE_1_SUPPORTING.includes(slug)) return 0.9;

  // Phase 2: Medium-High Priority (Authority Broadening)
  if (PHASE_2_PILLAR.includes(slug)) return 0.85;
  if (PHASE_2_SUPPORTING.includes(slug)) return 0.8;

  // Phase 3: Medium Priority (Long-Tail Domination)
  return 0.7;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  // Use the actual domain that matches the GSC property
  const DOMAIN = 'https://www.selbständig-schweiz.ch';

  const articleUrls = articles.map((article) => ({
    url: `${DOMAIN}/artikel/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: getArticlePriority(article.slug),
  }));

  const categoryUrls = CATEGORIES.map((category) => {
    // Phase 1 Kategorien: Higher Priority
    const phase1Categories = ['selbstaendig-machen-/-gruendung', 'buchhaltung-&-finanzen'];
    const phase2Categories = ['steuern', 'versicherungen'];

    let priority = 0.6; // Default für Phase 3
    if (phase1Categories.includes(category.slug)) {
      priority = 0.9; // Phase 1 Categories
    } else if (phase2Categories.includes(category.slug)) {
      priority = 0.8; // Phase 2 Categories
    }

    return {
      url: `${DOMAIN}/kategorie/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority,
    };
  });

  return [
    {
      url: DOMAIN,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${DOMAIN}/artikel`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/impressum`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${DOMAIN}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${DOMAIN}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...categoryUrls,
    ...articleUrls,
  ];
}
