'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Fuse from 'fuse.js';

interface SearchItem {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  categoryName: string;
}

const POPULAR: { label: string; href: string; hint: string }[] = [
  { label: 'Brutto-Netto-Rechner', href: '/rechner/brutto-netto', hint: 'Rechner' },
  { label: 'Einzelfirma gründen', href: '/artikel/einzelfirma-gruenden', hint: 'Gründung' },
  { label: 'Stundensatz berechnen', href: '/artikel/stundensatz-berechnen', hint: 'Finanzen' },
  { label: 'AHV Selbständige', href: '/artikel/ahv-selbststaendige', hint: 'Steuern' },
  { label: 'MWST Selbständige', href: '/artikel/mwst-selbststaendige', hint: 'Steuern' },
  { label: 'Berufliche Vorsorge (BVG)', href: '/artikel/berufliche-vorsorge-schweiz', hint: 'Versicherungen' },
  { label: 'GmbH gründen', href: '/artikel/gmbh-gruenden', hint: 'Gründung' },
  { label: 'Buchhaltung Selbständige', href: '/artikel/buchhaltung-selbststaendige', hint: 'Buchhaltung' },
];

// Highlight matching chars in a string
function Highlight({ text, indices }: { text: string; indices?: readonly [number, number][] }) {
  if (!indices || indices.length === 0) return <>{text}</>;
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const [start, end] of indices) {
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      <mark key={start} className="bg-accent-light text-accent-dark rounded-sm not-italic">
        {text.slice(start, end + 1)}
      </mark>
    );
    last = end + 1;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  // Fetch search index once
  useEffect(() => {
    if (open && index.length === 0 && !loading) {
      setLoading(true);
      fetch('/api/search')
        .then(r => r.json())
        .then(data => { setIndex(data); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [open, index.length, loading]);

  // Reset + focus on open
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      const t = setTimeout(() => inputRef.current?.focus(), 10);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: [
          { name: 'title', weight: 4 },
          { name: 'keywords', weight: 2 },
          { name: 'description', weight: 1 },
        ],
        threshold: 0.4,
        includeMatches: true,
        minMatchCharLength: 2,
        ignoreLocation: true,
      }),
    [index]
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 8);
  }, [fuse, query]);

  const totalItems = query ? results.length : POPULAR.length;

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
    },
    [router, onClose]
  );

  // Keyboard handling
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => (i + 1) % Math.max(totalItems, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => (i - 1 + Math.max(totalItems, 1)) % Math.max(totalItems, 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (query && results[selectedIndex]) {
          navigate(`/artikel/${results[selectedIndex].item.slug}`);
        } else if (!query && POPULAR[selectedIndex]) {
          navigate(POPULAR[selectedIndex].href);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, query, results, selectedIndex, totalItems, navigate, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh] px-4"
      onMouseDown={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-xl bg-warm-white shadow-2xl overflow-hidden border border-warm-200"
        onMouseDown={e => e.stopPropagation()}
      >
        {/* Accent top line */}
        <div className="h-0.5 bg-accent w-full" />

        {/* Search input row */}
        <div className="flex items-center gap-3 px-4 h-14 border-b border-warm-200">
          <svg className="w-5 h-5 text-warm-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Artikel suchen…"
            className="flex-1 text-[1.0625rem] font-medium outline-none placeholder:text-warm-400 text-warm-900 bg-transparent"
            autoComplete="off"
            spellCheck={false}
          />
          {loading && (
            <span className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin shrink-0" />
          )}
          {query && (
            <button
              onMouseDown={e => { e.preventDefault(); setQuery(''); setSelectedIndex(0); inputRef.current?.focus(); }}
              className="shrink-0 w-5 h-5 flex items-center justify-center bg-warm-200 text-warm-600 hover:bg-warm-300 transition-colors text-xs font-bold"
              aria-label="Eingabe löschen"
            >
              ×
            </button>
          )}
          <kbd className="hidden sm:flex shrink-0 px-1.5 py-0.5 text-xs font-semibold text-warm-400 bg-warm-50 border border-warm-200">
            Esc
          </kbd>
        </div>

        {/* Results area */}
        <div className="max-h-[55vh] overflow-y-auto overscroll-contain">
          {query ? (
            results.length > 0 ? (
              <ul ref={listRef} className="py-1.5">
                {results.map(({ item, matches }, i) => {
                  const titleMatch = matches?.find(m => m.key === 'title')?.indices;
                  return (
                    <li key={item.slug}>
                      <Link
                        href={`/artikel/${item.slug}`}
                        onClick={onClose}
                        onMouseEnter={() => setSelectedIndex(i)}
                        className={`flex items-start gap-3 px-4 py-3 transition-colors border-l-2 ${
                          i === selectedIndex
                            ? 'bg-accent-light border-accent'
                            : 'border-transparent hover:bg-warm-50'
                        }`}
                      >
                        <span className="shrink-0 mt-0.5 w-7 h-7 bg-warm-100 border border-warm-200 flex items-center justify-center text-xs font-bold font-serif text-warm-600">
                          {item.title.charAt(0).toUpperCase()}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className={`font-semibold text-sm truncate ${i === selectedIndex ? 'text-accent-dark' : 'text-warm-900'}`}>
                            <Highlight text={item.title} indices={titleMatch as [number,number][] | undefined} />
                          </div>
                          <div className="text-xs text-warm-500 mt-0.5 line-clamp-1">{item.description}</div>
                        </div>
                        <span className="shrink-0 category-label text-warm-500 mt-0.5 whitespace-nowrap">
                          {item.categoryName}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="py-12 text-center">
                <p className="text-sm text-warm-600">Keine Artikel für <strong>«{query}»</strong> gefunden</p>
                <Link href="/artikel" onClick={onClose} className="mt-3 inline-block text-sm text-accent hover:text-accent-dark font-medium">
                  Alle Artikel anzeigen →
                </Link>
              </div>
            )
          ) : (
            <div className="py-1.5">
              <p className="px-4 pt-3 pb-1 category-label text-warm-400">
                Beliebt
              </p>
              <ul ref={listRef}>
                {POPULAR.map(({ label, href, hint }, i) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onClose}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors border-l-2 ${
                        i === selectedIndex
                          ? 'bg-accent-light border-accent text-accent-dark'
                          : 'border-transparent text-warm-700 hover:bg-warm-50'
                      }`}
                    >
                      <span className={`shrink-0 ${i === selectedIndex ? 'text-accent' : 'text-warm-300'}`}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span className="flex-1 font-medium">{label}</span>
                      <span className="category-label text-warm-400">{hint}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-warm-200 flex items-center gap-5 text-sm text-warm-400 bg-warm-50">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-warm-white border border-warm-200 font-semibold text-warm-500">↑↓</kbd>
            navigieren
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-warm-white border border-warm-200 font-semibold text-warm-500">↵</kbd>
            öffnen
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-warm-white border border-warm-200 font-semibold text-warm-500">Esc</kbd>
            schliessen
          </span>
          <span className="ml-auto">{index.length > 0 ? `${index.length} Artikel` : ''}</span>
        </div>
      </div>
    </div>
  );
}
