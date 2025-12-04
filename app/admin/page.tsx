'use client';

import { useState } from 'react';
import { CATEGORIES } from '@/types/article';

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    keywords: '',
    category: 'grundung',
    publishedAt: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const slug = formData.title
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const markdownContent = `---
title: "${formData.title}"
description: "${formData.description}"
keywords: [${formData.keywords.split(',').map(k => `"${k.trim()}"`).join(', ')}]
category: "${formData.category}"
author: "Redaktion"
publishedAt: "${formData.publishedAt}"
---

${formData.content}
`;

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          content: markdownContent,
        }),
      });

      if (response.ok) {
        alert('Artikel erfolgreich erstellt!');
        setFormData({
          title: '',
          description: '',
          content: '',
          keywords: '',
          category: 'grundung',
          publishedAt: new Date().toISOString().split('T')[0],
        });
      } else {
        alert('Fehler beim Erstellen des Artikels');
      }
    } catch (error) {
      alert('Fehler: ' + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Neuen Artikel erstellen
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titel
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="z.B. Startup in der Schweiz gründen: Der komplette Leitfaden 2026"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beschreibung (Meta Description)
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Kurze Zusammenfassung für SEO (150-160 Zeichen)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (kommagetrennt)
              </label>
              <input
                type="text"
                required
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="startup schweiz, gründung, selbstständig machen"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategorie
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Veröffentlichungsdatum
                </label>
                <input
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Artikel-Inhalt (Markdown)
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={20}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="# Hauptüberschrift

## Unterüberschrift

Dein Artikel-Inhalt in Markdown..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Artikel erstellen
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    title: '',
                    description: '',
                    content: '',
                    keywords: '',
                    category: 'grundung',
                    publishedAt: new Date().toISOString().split('T')[0],
                  });
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Zurücksetzen
              </button>
            </div>
          </form>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Markdown Hilfe:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li><code className="bg-white px-2 py-0.5 rounded"># Überschrift H1</code></li>
              <li><code className="bg-white px-2 py-0.5 rounded">## Überschrift H2</code></li>
              <li><code className="bg-white px-2 py-0.5 rounded">**Fettgedruckt**</code></li>
              <li><code className="bg-white px-2 py-0.5 rounded">- Listenpunkt</code></li>
              <li><code className="bg-white px-2 py-0.5 rounded">[Link Text](https://url)</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
