import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { CATEGORIES } from '@/types/article';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  const articleUrls = articles.map((article) => ({
    url: `https://selbstaendig-schweiz.ch/artikel/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryUrls = CATEGORIES.map((category) => ({
    url: `https://selbstaendig-schweiz.ch/kategorie/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: 'https://selbstaendig-schweiz.ch',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://selbstaendig-schweiz.ch/artikel',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://selbstaendig-schweiz.ch/impressum',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://selbstaendig-schweiz.ch/datenschutz',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://selbstaendig-schweiz.ch/kontakt',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...categoryUrls,
    ...articleUrls,
  ];
}
