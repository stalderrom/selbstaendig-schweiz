import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '@/types/article';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

    return {
      slug,
      title: data.title,
      description: data.description,
      content,
      keywords: data.keywords || [],
      category: data.category,
      author: data.author || 'Redaktion',
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt || data.publishedAt,
      featuredImage: data.featuredImage,
      readingTime,
      related: data.related || [],
      faq: data.faq || []
    };
  } catch (error) {
    return null;
  }
}

export async function getAllArticles(): Promise<Article[]> {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  const articles = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async fileName => {
        const slug = fileName.replace(/\.md$/, '');
        return getArticleBySlug(slug);
      })
  );

  return articles
    .filter((article): article is Article => article !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const allArticles = await getAllArticles();
  return allArticles.filter(article => article.category === category);
}

export async function searchArticles(query: string): Promise<Article[]> {
  const allArticles = await getAllArticles();
  const lowerQuery = query.toLowerCase();

  return allArticles.filter(article =>
    article.title.toLowerCase().includes(lowerQuery) ||
    article.description.toLowerCase().includes(lowerQuery) ||
    article.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
  );
}
