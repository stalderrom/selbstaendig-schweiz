import { NextRequest, NextResponse } from 'next/server';
import {
  notifyIndexNow,
  notifyIndexNowBatch,
  submitAllArticles,
  notifyArticle,
  notifyCategory,
  notifyHomepage,
} from '@/lib/indexnow';
import { getAllArticles } from '@/lib/articles';

/**
 * POST /api/indexnow
 *
 * Sendet URLs an IndexNow zur sofortigen Indexierung
 *
 * Body-Optionen:
 * 1. Single URL: { "url": "https://..." }
 * 2. Multiple URLs: { "urls": ["https://...", "https://..."] }
 * 3. Article Slug: { "type": "article", "slug": "einzelfirma-gruenden" }
 * 4. Category Slug: { "type": "category", "slug": "selbstaendig-machen-gruendung" }
 * 5. All Articles: { "type": "all-articles" }
 * 6. Homepage: { "type": "homepage" }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Option 1: Single URL
    if (body.url) {
      const result = await notifyIndexNow(body.url);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });
    }

    // Option 2: Multiple URLs
    if (body.urls && Array.isArray(body.urls)) {
      const result = await notifyIndexNowBatch(body.urls);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });
    }

    // Option 3: Article Slug
    if (body.type === 'article' && body.slug) {
      const result = await notifyArticle(body.slug);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });
    }

    // Option 4: Category Slug
    if (body.type === 'category' && body.slug) {
      const result = await notifyCategory(body.slug);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });
    }

    // Option 5: All Articles (Batch)
    if (body.type === 'all-articles') {
      const articles = await getAllArticles();
      const slugs = articles.map((article) => article.slug);
      const result = await submitAllArticles(slugs);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });
    }

    // Option 6: Homepage
    if (body.type === 'homepage') {
      const result = await notifyHomepage();
      return NextResponse.json(result, { status: result.success ? 200 : 400 });
    }

    // Ungültige Anfrage
    return NextResponse.json(
      {
        success: false,
        message:
          'Invalid request. Provide either "url", "urls", or "type" with "slug"',
        examples: [
          { url: 'https://www.selbstaendig-schweiz.ch/artikel/...' },
          { urls: ['https://...', 'https://...'] },
          { type: 'article', slug: 'einzelfirma-gruenden' },
          { type: 'category', slug: 'selbstaendig-machen-gruendung' },
          { type: 'all-articles' },
          { type: 'homepage' },
        ],
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('IndexNow API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/indexnow
 *
 * Gibt Informationen über IndexNow-Setup zurück
 */
export async function GET() {
  return NextResponse.json({
    status: 'IndexNow is configured',
    host: 'www.selbstaendig-schweiz.ch',
    keyLocation:
      'https://www.selbstaendig-schweiz.ch/7d22c5dd-0c94-432e-b929-6355d1bc0152.txt',
    endpoints: {
      'POST /api/indexnow': 'Submit URLs to IndexNow',
    },
    examples: [
      {
        description: 'Submit single URL',
        method: 'POST',
        body: { url: 'https://www.selbstaendig-schweiz.ch/artikel/...' },
      },
      {
        description: 'Submit multiple URLs',
        method: 'POST',
        body: { urls: ['https://...', 'https://...'] },
      },
      {
        description: 'Submit article by slug',
        method: 'POST',
        body: { type: 'article', slug: 'einzelfirma-gruenden' },
      },
      {
        description: 'Submit all articles (batch)',
        method: 'POST',
        body: { type: 'all-articles' },
      },
      {
        description: 'Submit homepage',
        method: 'POST',
        body: { type: 'homepage' },
      },
    ],
    documentation: 'https://www.indexnow.org/',
  });
}
