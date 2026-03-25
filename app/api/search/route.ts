import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/articles';
import { CATEGORIES } from '@/types/article';

export const dynamic = 'force-static';

export async function GET() {
  const articles = await getAllArticles();
  const index = articles.map(a => ({
    slug: a.slug,
    title: a.title,
    description: a.description,
    keywords: a.keywords,
    category: a.category,
    categoryName: CATEGORIES.find(c => c.slug === a.category)?.name ?? a.category,
  }));
  return NextResponse.json(index);
}
