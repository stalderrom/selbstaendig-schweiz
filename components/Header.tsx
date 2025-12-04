import Link from 'next/link';
import { CATEGORIES } from '@/types/article';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              Selbständig<span className="text-blue-600">Schweiz</span>
            </h1>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {CATEGORIES.slice(0, 5).map((category) => (
              <Link
                key={category.slug}
                href={`/kategorie/${category.slug}`}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
