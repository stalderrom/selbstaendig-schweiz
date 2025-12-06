'use client';

import { useState } from 'react';

export default function BatchGeneratorPage() {
  const [keywordsText, setKeywordsText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const exampleKeywords = `selbständig als coach
selbständig als programmierer
selbständig als designer
einzelfirma gründen
krankentaggeld selbständige
buchhaltungssoftware vergleich
mwst pflicht ab wann
steuern selbständige`;

  const generateBatch = async () => {
    const keywords = keywordsText
      .split('\n')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    if (keywords.length === 0) {
      setError('Bitte mindestens ein Keyword eingeben');
      return;
    }

    if (keywords.length > 50) {
      setError('Maximum 50 Keywords pro Batch');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/batch-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Batch-Generierung fehlgeschlagen');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Batch Generator</h1>
          <p className="text-gray-600 mb-8">
            Generiere Outlines und Meta-Daten für 10-50 Artikel gleichzeitig
          </p>

          {/* Input Form */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Keywords (ein Keyword pro Zeile)
                </label>
                <button
                  onClick={() => setKeywordsText(exampleKeywords)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Beispiele einfügen
                </button>
              </div>
              <textarea
                value={keywordsText}
                onChange={(e) => setKeywordsText(e.target.value)}
                placeholder="Ein Keyword pro Zeile...&#10;z.B.:&#10;selbständig als fotograf&#10;selbständig als coach&#10;einzelfirma gründen"
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                disabled={loading}
              />
              <p className="mt-2 text-sm text-gray-500">
                {keywordsText.split('\n').filter(k => k.trim()).length} Keywords
                (max. 50)
              </p>
            </div>

            <button
              onClick={generateBatch}
              disabled={loading || keywordsText.trim().length === 0}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Batch wird generiert...</span>
                </div>
              ) : (
                'Batch generieren'
              )}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-medium">Fehler:</p>
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Loading Progress */}
          {loading && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-blue-900 mb-3">Batch-Generierung läuft...</h3>
              <div className="space-y-2 text-sm text-blue-700">
                <p>✓ Master Context geladen</p>
                <p className="animate-pulse">⏳ Batch-Prompt wird verarbeitet...</p>
                <p className="opacity-50">⏳ Outlines werden erstellt...</p>
                <p className="opacity-50">⏳ Meta-Daten werden generiert...</p>
              </div>
              <p className="mt-4 text-xs text-blue-600">
                Dies kann 3-5 Minuten dauern...
              </p>
            </div>
          )}

          {/* Success Result */}
          {result && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">
                ✓ Batch erfolgreich generiert!
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Batch ID:</p>
                    <p className="text-lg font-mono">{result.batchId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Keywords:</p>
                    <p className="text-lg">{result.totalKeywords}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Datei:</p>
                  <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                    {result.batchFilePath}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Generierte Outlines ({result.results?.length || 0})
                  </p>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {result.results?.map((item: any, index: number) => (
                      <div key={index} className="bg-gray-50 p-3 rounded">
                        <p className="font-medium">{item.keyword}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Status: {item.status}
                        </p>
                        {item.outline && (
                          <details className="mt-2">
                            <summary className="text-xs text-blue-600 cursor-pointer hover:underline">
                              Outline anzeigen
                            </summary>
                            <pre className="text-xs bg-white p-2 rounded mt-2 overflow-x-auto">
                              {item.outline}
                            </pre>
                          </details>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setResult(null);
                      setKeywordsText('');
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700"
                  >
                    Neuer Batch
                  </button>
                  <button
                    onClick={() => {
                      // Download results as JSON
                      const blob = new Blob([JSON.stringify(result, null, 2)], {
                        type: 'application/json'
                      });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `batch-${result.batchId}.json`;
                      a.click();
                    }}
                    className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700"
                  >
                    JSON herunterladen
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 mb-3">ℹ️ Wie es funktioniert</h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>✓ Verarbeitet 10-50 Keywords gleichzeitig</li>
              <li>✓ Erstellt Outline + Meta-Daten für jeden Artikel</li>
              <li>✓ Speichert Ergebnisse als JSON</li>
              <li>✓ Du kannst danach jeden Artikel einzeln vollständig generieren</li>
              <li>✓ Ideal für Content-Planung und Batch-Publishing</li>
            </ul>

            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-sm font-medium text-blue-900 mb-2">
                💡 Tipp: Keywords aus CSV importieren
              </p>
              <p className="text-sm text-blue-700">
                Du kannst die Keywords aus der Datei{' '}
                <code className="bg-white px-1 rounded">keywords-for-ubersuggest.csv</code>{' '}
                kopieren und hier einfügen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
