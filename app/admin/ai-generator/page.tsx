'use client';

import { useState } from 'react';

export default function AIGeneratorPage() {
  const [keyword, setKeyword] = useState('');
  const [silo, setSilo] = useState('Berufsratgeber');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<any>(null);

  const silos = [
    'Selbständig machen / Gründung',
    'Steuern',
    'Versicherungen',
    'Buchhaltung & Finanzen',
    'Marketing & Kundenakquise',
    'Tools & Software',
    'Berufsratgeber',
    'Einkommen & Geschäftsmodelle'
  ];

  const pollJobStatus = async (jobId: string) => {
    const response = await fetch(`/api/job-status?jobId=${jobId}`);
    const job = await response.json();
    setJobStatus(job);

    if (job.status === 'completed') {
      setResult(job.result);
      setLoading(false);
      setJobId(null);
    } else if (job.status === 'error') {
      setError(job.error || 'Generation fehlgeschlagen');
      setLoading(false);
      setJobId(null);
    } else {
      // Continue polling every 2 seconds
      setTimeout(() => pollJobStatus(jobId), 2000);
    }
  };

  const generateArticle = async () => {
    if (!keyword.trim()) {
      setError('Bitte Keyword eingeben');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setJobStatus(null);

    try {
      const response = await fetch('/api/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword, silo })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Generation fehlgeschlagen');
      }

      // Start polling
      setJobId(data.jobId);
      pollJobStatus(data.jobId);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">AI Content Generator</h1>
          <p className="text-gray-600 mb-8">
            Vollautomatische Artikel-Generierung mit Claude AI
          </p>

          {/* Input Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keyword
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="z.B. selbständig als fotograf"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Silo / Kategorie
              </label>
              <select
                value={silo}
                onChange={(e) => setSilo(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              >
                {silos.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={generateArticle}
              disabled={loading || !keyword.trim()}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Artikel wird generiert...</span>
                </div>
              ) : (
                'Artikel generieren'
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
          {loading && jobStatus && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-blue-900 mb-3">Generierung läuft...</h3>

              {/* Progress Bar */}
              <div className="w-full bg-blue-200 rounded-full h-3 mb-4">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${jobStatus.progress}%` }}
                ></div>
              </div>

              <div className="space-y-2 text-sm text-blue-700">
                <p className={jobStatus.status === 'pending' ? 'animate-pulse' : ''}>
                  {jobStatus.status === 'pending' ? '⏳' : '✓'} Vorbereitung
                </p>
                <p className={jobStatus.status === 'research' ? 'animate-pulse font-bold' : jobStatus.progress > 10 ? '' : 'opacity-50'}>
                  {jobStatus.progress > 10 ? '✓' : '⏳'} Research wird durchgeführt...
                </p>
                <p className={jobStatus.status === 'outline' ? 'animate-pulse font-bold' : jobStatus.progress > 30 ? '' : 'opacity-50'}>
                  {jobStatus.progress > 30 ? '✓' : '⏳'} Outline wird erstellt...
                </p>
                <p className={jobStatus.status === 'article' ? 'animate-pulse font-bold' : jobStatus.progress > 50 ? '' : 'opacity-50'}>
                  {jobStatus.progress > 50 ? '✓' : '⏳'} Artikel wird geschrieben...
                </p>
                <p className={jobStatus.status === 'meta' ? 'animate-pulse font-bold' : jobStatus.progress > 70 ? '' : 'opacity-50'}>
                  {jobStatus.progress > 70 ? '✓' : '⏳'} Meta-Daten werden generiert...
                </p>
                <p className={jobStatus.status === 'links' ? 'animate-pulse font-bold' : jobStatus.progress > 85 ? '' : 'opacity-50'}>
                  {jobStatus.progress > 85 ? '✓' : '⏳'} Interne Links werden erstellt...
                </p>
              </div>

              <p className="mt-4 text-xs text-blue-600">
                {jobStatus.progress}% abgeschlossen • Dies kann 3-5 Minuten dauern...
              </p>
            </div>
          )}

          {/* Success Result */}
          {result && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">
                ✓ Artikel erfolgreich generiert!
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Keyword:</p>
                  <p className="text-lg">{result.keyword}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Silo:</p>
                  <p className="text-lg">{result.silo}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Datei:</p>
                  <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                    {result.filePath}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">URL:</p>
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {result.url}
                  </a>
                </div>

                {/* Validation Warning */}
                {result.validation && !result.validation.isComplete && (
                  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                    <p className="text-yellow-900 font-bold mb-2">
                      ⚠️ Vollständigkeit prüfen erforderlich!
                    </p>
                    <div className="text-sm text-yellow-800 space-y-1">
                      <p>• FAQ vorhanden: {result.validation.hasFAQ ? '✅' : '❌'}</p>
                      <p>• Fazit vorhanden: {result.validation.hasFazit ? '✅' : '❌'}</p>
                      <p>• Wortanzahl: {result.validation.wordCount} (Ziel: 1200-1800)</p>
                      <p className="mt-2 font-medium">
                        👉 Bitte Artikel manuell überprüfen und ggf. vervollständigen!
                      </p>
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Metadaten:</p>
                  <div className="bg-gray-100 p-3 rounded text-sm">
                    <p><strong>Title:</strong> {result.metadata?.title}</p>
                    <p><strong>Description:</strong> {result.metadata?.description}</p>
                    <p><strong>Slug:</strong> {result.metadata?.urlSlug}</p>
                    <p><strong>Category:</strong> {result.metadata?.category}</p>
                    <p><strong>Wortanzahl:</strong> {result.validation?.wordCount || 'N/A'}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Generierungs-Schritte:</p>
                  <div className="space-y-2 text-xs">
                    {result.steps && Object.entries(result.steps).map(([key, value]: [string, any]) => (
                      <div key={key} className="bg-gray-50 p-2 rounded">
                        <p className="font-medium">{key}:</p>
                        <p className="text-gray-600 truncate">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 text-center"
                  >
                    Artikel anzeigen
                  </a>
                  <button
                    onClick={() => {
                      setResult(null);
                      setKeyword('');
                    }}
                    className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700"
                  >
                    Neuer Artikel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 mb-3">ℹ️ Wie es funktioniert</h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>✓ Vollautomatische Generierung mit Claude AI</li>
              <li>✓ 7-Schritte-Workflow (Research, Outline, Artikel, Meta, Links)</li>
              <li>✓ CH-spezifische Inhalte</li>
              <li>✓ SEO-optimiert (1'200-1'800 Wörter)</li>
              <li>✓ Artikel wird direkt als Markdown gespeichert</li>
              <li>✓ Sofort auf der Website verfügbar</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
