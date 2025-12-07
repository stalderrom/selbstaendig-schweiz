'use client';

import { useState } from 'react';

export default function BatchGeneratorPage() {
  const [keywords, setKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError('');
    setResults([]);

    const keywordList = keywords
      .split('\n')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    if (keywordList.length === 0) {
      setError('Bitte mindestens ein Keyword eingeben');
      setIsGenerating(false);
      return;
    }

    if (keywordList.length > 10) {
      setError('Maximal 10 Keywords pro Batch (für bessere Performance)');
      setIsGenerating(false);
      return;
    }

    try {
      const generatedResults = [];

      for (let i = 0; i < keywordList.length; i++) {
        const keyword = keywordList[i];
        setResults(prev => [
          ...prev,
          { keyword, status: 'generating', message: `Generiere ${i + 1}/${keywordList.length}...` }
        ]);

        try {
          const response = await fetch('/api/generate-article', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              keyword,
              category: 'grundung', // Default Kategorie
            }),
          });

          const data = await response.json();

          if (response.ok) {
            generatedResults.push({
              keyword,
              status: 'success',
              title: data.title,
              slug: data.slug,
            });
          } else {
            generatedResults.push({
              keyword,
              status: 'error',
              message: data.error || 'Unbekannter Fehler',
            });
          }
        } catch (err) {
          generatedResults.push({
            keyword,
            status: 'error',
            message: err instanceof Error ? err.message : 'Fehler',
          });
        }

        setResults([...generatedResults]);
      }
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
            Batch Artikel Generator
          </h1>
          <p className="text-gray-600 mb-8">
            Generiere mehrere Artikel gleichzeitig (max. 10 pro Batch)
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (ein pro Zeile)
              </label>
              <textarea
                required
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                rows={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder={'selbständig als fotograf\nselbständig als coach\nselbständig als programmierer\n...'}
                disabled={isGenerating}
              />
              <p className="text-sm text-gray-500 mt-2">
                {keywords.split('\n').filter(k => k.trim().length > 0).length} Keywords
              </p>
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
                  Batch wird generiert...
                </span>
              ) : (
                'Batch generieren'
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

          {results.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Ergebnisse:</h3>
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded border-l-4 ${
                    result.status === 'success'
                      ? 'bg-green-50 border-green-400'
                      : result.status === 'error'
                      ? 'bg-red-50 border-red-400'
                      : 'bg-blue-50 border-blue-400'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{result.keyword}</p>
                      {result.status === 'success' && (
                        <>
                          <p className="text-sm text-gray-600 mt-1">{result.title}</p>
                          <a
                            href={`/artikel/${result.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                          >
                            Artikel anzeigen →
                          </a>
                        </>
                      )}
                      {result.status === 'error' && (
                        <p className="text-sm text-red-600 mt-1">{result.message}</p>
                      )}
                      {result.status === 'generating' && (
                        <p className="text-sm text-blue-600 mt-1">{result.message}</p>
                      )}
                    </div>
                    <div className="ml-4">
                      {result.status === 'success' && (
                        <span className="text-green-500">✓</span>
                      )}
                      {result.status === 'error' && (
                        <span className="text-red-500">✗</span>
                      )}
                      {result.status === 'generating' && (
                        <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 space-y-4">
            <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">⚡ Batch-Tipps:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Max. 10 Keywords pro Batch (je ~3-4 Min.)</li>
                <li>• Verwandte Keywords zusammen generieren</li>
                <li>• Prozess läuft sequenziell (nicht parallel)</li>
                <li>• Gesamtzeit: ~30-40 Minuten für 10 Artikel</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">ℹ️ Beispiel-Keywords:</h3>
              <pre className="text-xs text-gray-700 bg-white p-2 rounded overflow-auto">
{`selbständig als fotograf
selbständig als coach
selbständig als programmierer
selbständig als designer
einzelfirma gründen
krankentaggeld selbständige
buchhaltungssoftware vergleich
mwst pflicht ab wann
steuern selbständige
versicherungen selbständige`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
