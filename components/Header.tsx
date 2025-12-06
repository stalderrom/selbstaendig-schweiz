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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveSection, setMobileActiveSection] = useState<string | null>(null);

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              Selbständig<span className="text-blue-600">Schweiz</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Menu öffnen"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop CTA */}
          <Link
            href="/artikel/selbstaendig-machen-schweiz"
            className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            Jetzt starten
          </Link>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <nav className="py-4 space-y-1">
              {MAIN_NAV.map((section) => (
                <div key={section.label}>
                  <button
                    onClick={() => setMobileActiveSection(
                      mobileActiveSection === section.label ? null : section.label
                    )}
                    className="w-full flex items-center justify-between px-4 py-3 text-gray-900 font-medium hover:bg-gray-50 transition-colors"
                  >
                    <span>{section.label}</span>
                    <svg
                      className={`w-5 h-5 transition-transform ${
                        mobileActiveSection === section.label ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {mobileActiveSection === section.label && (
                    <div className="bg-gray-50 py-2">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-8 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
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
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-900 font-medium hover:bg-gray-50 transition-colors"
              >
                Alle Artikel
              </Link>

              {/* Mobile CTA */}
              <div className="px-4 pt-4 pb-2">
                <Link
                  href="/artikel/selbstaendig-machen-schweiz"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Jetzt starten
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
