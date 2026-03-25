'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import SearchModal from './SearchModal';

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
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
    <header className="border-b border-warm-200 bg-warm-white sticky top-0 z-50">
      {/* Thin accent line at top */}
      <div className="h-0.5 bg-accent w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <span className="font-serif text-xl font-bold tracking-tight text-warm-900">
              Selbständig<span className="text-accent font-normal italic">Schweiz</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {MAIN_NAV.map((section) => (
              <div
                key={section.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(section.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-3 py-2 text-sm text-warm-600 hover:text-warm-900 font-normal transition-colors relative group">
                  {section.label}
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>

                {activeDropdown === section.label && (
                  <div className="absolute left-0 top-full mt-0 w-52 bg-warm-white border border-warm-200 shadow-md py-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-warm-600 hover:text-warm-900 hover:bg-warm-50 transition-colors border-l-2 border-transparent hover:border-accent"
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
              className="px-3 py-2 text-sm text-warm-600 hover:text-warm-900 font-normal transition-colors relative group"
            >
              Alle Artikel
              <span className="absolute bottom-0 left-3 right-3 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>

            <Link
              href="/experten"
              className="px-3 py-2 text-sm text-accent hover:text-accent-dark font-semibold transition-colors"
            >
              Experten
            </Link>
          </nav>

          {/* Desktop right side: Search + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-warm-500 hover:text-warm-700 bg-warm-50 hover:bg-warm-100 border border-warm-200 transition-colors rounded-md"
              aria-label="Suche öffnen"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-xs">Suchen</span>
              <kbd className="px-1 py-0.5 text-xs bg-warm-white border border-warm-200 text-warm-400 font-mono">⌘K</kbd>
            </button>

            <Link
              href="/kostenlos-registrieren"
              className="bg-accent text-white px-4 py-2 text-sm font-semibold hover:bg-accent-dark transition-colors rounded-md"
            >
              Jetzt starten
            </Link>
          </div>

          {/* Mobile icons */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-warm-600 hover:text-warm-900 transition-colors"
              aria-label="Suche"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-warm-600 hover:text-warm-900 transition-colors"
              aria-label="Menu öffnen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-warm-200">
            <nav className="py-3 space-y-0.5">
              {MAIN_NAV.map((section) => (
                <div key={section.label}>
                  <button
                    onClick={() => setMobileActiveSection(
                      mobileActiveSection === section.label ? null : section.label
                    )}
                    className="w-full flex items-center justify-between px-4 py-3 text-warm-800 font-medium text-sm hover:bg-warm-50 transition-colors"
                  >
                    <span>{section.label}</span>
                    <svg
                      className={`w-4 h-4 text-warm-400 transition-transform ${mobileActiveSection === section.label ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {mobileActiveSection === section.label && (
                    <div className="bg-warm-50 border-l-2 border-accent ml-4">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-6 py-2.5 text-sm text-warm-600 hover:text-warm-900 transition-colors"
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
                className="block px-4 py-3 text-warm-800 text-sm font-medium hover:bg-warm-50 transition-colors"
              >
                Alle Artikel
              </Link>

              <Link
                href="/experten"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-accent text-sm font-semibold hover:bg-accent-50 transition-colors"
              >
                Experten buchen
              </Link>

              <div className="px-4 pt-3 pb-4">
                <Link
                  href="/kostenlos-registrieren"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-accent text-white px-4 py-3 text-sm font-semibold hover:bg-accent-dark transition-colors rounded-md"
                >
                  Jetzt starten
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>

    <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
