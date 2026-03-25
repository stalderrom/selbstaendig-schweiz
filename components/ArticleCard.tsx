import Link from 'next/link';
import { Article, CATEGORIES } from '@/types/article';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const category = CATEGORIES.find(cat => cat.slug === article.category);

  return (
    <Link href={`/artikel/${article.slug}`} className="group block" aria-label={article.title}>
      <article className="h-full flex flex-col py-6 border-t border-warm-200 group-hover:border-accent transition-colors duration-300">

        {category && (
          <span className="category-label text-accent mb-3 block">
          {category.name}
        </span>
        )}

        <h2 className="font-serif text-lg font-bold text-warm-900 mb-3 leading-snug group-hover:text-accent transition-colors duration-300 line-clamp-2">
          {article.title}
        </h2>

        <p className="text-warm-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {article.description}
        </p>

        <div className="flex items-center justify-between text-sm text-warm-400 mt-auto">
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('de-CH', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span>{article.readingTime} Min.</span>
        </div>
      </article>
    </Link>
  );
}
