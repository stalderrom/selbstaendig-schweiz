import Link from 'next/link';
import { Article } from '@/types/article';
import { CATEGORIES } from '@/types/article';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const category = CATEGORIES.find(cat => cat.slug === article.category);

  return (
    <Link href={`/artikel/${article.slug}`} className="group">
      <article className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {article.featuredImage && (
          <div className="aspect-video bg-gray-100 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600" />
          </div>
        )}

        <div className="p-6">
          {category && (
            <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-3">
              {category.name}
            </span>
          )}

          <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {article.title}
          </h2>

          <p className="text-gray-600 mb-4 line-clamp-3">
            {article.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('de-CH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>{article.readingTime} Min. Lesezeit</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
