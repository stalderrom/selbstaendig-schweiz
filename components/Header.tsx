'use client';

import Link from 'next/link';
import { useState } from 'react';

const MAIN_NAV = [
  {
    label: 'Gründung',
    items: [
      { label: 'Selbständig machen', href: '/artikel/selbstaendig-machen-schweiz' },
      { label: 'Einzelfirma gründen', href: '/artikel/einzelfirma-gruenden' },
      { label: 'GmbH gründen', href: '/artikel/gmbh-gruenden' },
      { label: 'Alle Berufe', href: '/artikel/selbstaendig-schweiz-berufe' },
    ]
  },
  {
    label: 'Finanzen',
    items: [
      { label: 'Steuern', href: '/artikel/steuern-selbststaendige' },
      { label: 'Versicherungen', href: '/artikel/versicherungen-selbststaendige' },
      { label: 'Buchhaltung', href: '/artikel/buchhaltung-selbststaendige' },
      { label: 'Geld verdienen', href: '/artikel/geld-verdienen-schweiz' },
    ]
  },
  {
    label: 'Wachstum',
    items: [
      { label: 'Kunden gewinnen', href: '/artikel/kunden-gewinnen-schweiz' },
      { label: 'Tools & Software', href: '/artikel/tools-selbststaendige' },
    ]
  },
];

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              Selbständig<span className="text-blue-600">Schweiz</span>
            </h1>
          </Link>

          <nav className="hidden md:flex space-x-1">
            {MAIN_NAV.map((section) => (
              <div
                key={section.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(section.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  {section.label}
                </button>

                {activeDropdown === section.label && (
                  <div className="absolute left-0 mt-0 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/artikel"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Alle Artikel
            </Link>
          </nav>

          <Link
            href="/artikel/selbstaendig-machen-schweiz"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            Jetzt starten
          </Link>
        </div>
      </div>
    </header>
  );
}
