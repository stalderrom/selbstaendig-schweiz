import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Explicitly allow major AI crawlers for GEO visibility
      { userAgent: 'GPTBot', allow: '/', disallow: ['/api/', '/admin/'] },
      { userAgent: 'Claude-Web', allow: '/', disallow: ['/api/', '/admin/'] },
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/api/', '/admin/'] },
      { userAgent: 'anthropic-ai', allow: '/', disallow: ['/api/', '/admin/'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/api/', '/admin/'] },
      { userAgent: 'Google-Extended', allow: '/', disallow: ['/api/', '/admin/'] },
      { userAgent: 'CCBot', allow: '/', disallow: ['/api/', '/admin/'] },
      { userAgent: 'cohere-ai', allow: '/', disallow: ['/api/', '/admin/'] },
    ],
    sitemap: 'https://www.selbständig-schweiz.ch/sitemap.xml',
  };
}
