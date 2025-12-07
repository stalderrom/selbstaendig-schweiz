'use client';

import { useState } from 'react';
import { CATEGORIES } from '@/types/article';

export default function AIGeneratorPage() {
  const [formData, setFormData] = useState({
    keyword: '',
    category: 'grundung',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/generate-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword: formData.keyword,
          category: formData.category,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fehler bei der Generierung');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Artikel Generator
          </h1>
          <p className="text-gray-600 mb-8">
            Generiere automatisch SEO-optimierte Artikel mit der Brand Voice von selbständig-schweiz.ch
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keyword / Thema
              </label>
              <input
                type="text"
                required
                value={formData.keyword}
                onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="z.B. selbständig als fotograf"
                disabled={isGenerating}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategorie
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isGenerating}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generiere Artikel... (2-4 Minuten)
                </span>
              ) : (
                'Artikel generieren'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-400 rounded">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                ✅ Artikel erfolgreich generiert!
              </h3>
              <div className="text-sm text-green-700 space-y-2">
                <p><strong>Titel:</strong> {result.title}</p>
                <p><strong>Slug:</strong> {result.slug}</p>
                <p><strong>Datei:</strong> <code className="bg-white px-2 py-1 rounded">{result.filePath}</code></p>
                <div className="mt-4">
                  <a
                    href={`/artikel/${result.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Artikel anzeigen →
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 space-y-4">
            <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">✅ Brand Voice Checkliste:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Klar & präzise schreiben (max. 20 Wörter pro Satz)</li>
                <li>✓ Schweizer Begriffe verwenden (AHV, MWST, Einzelfirma)</li>
                <li>✓ Konkrete Zahlen & Beispiele (CHF-Beträge)</li>
                <li>✓ Du-Anrede konsequent nutzen</li>
                <li>✓ Keine Marketing-Floskeln ("revolutionär", "einzigartig")</li>
                <li>✓ Keine Übertreibungen ("garantiert", "immer")</li>
                <li>✓ Sachlich & hilfreich bleiben</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">💡 Tonalität:</h3>
              <p className="text-sm text-gray-700">
                <strong>Schreibe wie ein erfahrener Schweizer Berater – nicht wie ein Verkäufer.</strong>
                <br />
                Unaufgeregt. Kompetent. Ruhig. Praxisnah.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">ℹ️ Wie es funktioniert:</h3>
              <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                <li>Research: CH-spezifische Informationen sammeln</li>
                <li>Outline: Artikel-Struktur erstellen</li>
                <li>Content: Vollständigen Artikel schreiben (1'200-1'800 Wörter)</li>
                <li>Meta: SEO-Metadaten generieren</li>
                <li>Save: Als Markdown-Datei speichern</li>
              </ol>
              <p className="text-xs text-gray-600 mt-2">
                Alle Prompts verwenden die Brand Voice automatisch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
