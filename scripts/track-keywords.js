const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { google } = require('googleapis');

// Konfiguration
const CONFIG = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.xn--selbstndig-schweiz-qtb.ch',
  trackingDir: path.join(__dirname, '../data/keyword-tracking'),
  articlesDir: path.join(__dirname, '../content/articles'),
  lookbackDays: 28, // Letzte 28 Tage tracken
};

// Erstelle Tracking-Verzeichnis falls nicht vorhanden
if (!fs.existsSync(CONFIG.trackingDir)) {
  fs.mkdirSync(CONFIG.trackingDir, { recursive: true });
}

/**
 * Sammle alle Keywords aus allen Artikeln
 */
function collectAllKeywords() {
  const keywordMap = new Map(); // keyword -> [articles]
  const files = fs.readdirSync(CONFIG.articlesDir);

  files.forEach(filename => {
    if (!filename.endsWith('.md')) return;

    const filepath = path.join(CONFIG.articlesDir, filename);
    const slug = filename.replace('.md', '');

    try {
      const fileContent = fs.readFileSync(filepath, 'utf8');
      const { data } = matter(fileContent);

      if (data.keywords && Array.isArray(data.keywords)) {
        data.keywords.forEach(keyword => {
          if (keyword && keyword.trim()) {
            if (!keywordMap.has(keyword)) {
              keywordMap.set(keyword, []);
            }
            keywordMap.get(keyword).push({
              slug,
              title: data.title,
              category: data.category,
            });
          }
        });
      }
    } catch (error) {
      console.error(`Fehler beim Lesen von ${filename}:`, error.message);
    }
  });

  return keywordMap;
}

/**
 * Authentifizierung mit Google Search Console
 */
async function authenticateGSC() {
  // Prüfe auf Service Account Credentials
  const serviceAccountPath = path.join(__dirname, '../gsc-service-account.json');

  if (fs.existsSync(serviceAccountPath)) {
    console.log('📝 Authentifiziere mit Service Account...');
    const auth = new google.auth.GoogleAuth({
      keyFile: serviceAccountPath,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
    return auth;
  }

  // Fallback: OAuth2 (manuell)
  console.log('⚠️  Keine Service Account Credentials gefunden.');
  console.log('📋 Bitte folge diesen Schritten:');
  console.log('   1. Gehe zu https://console.cloud.google.com');
  console.log('   2. Erstelle ein neues Projekt oder wähle ein bestehendes');
  console.log('   3. Aktiviere die "Google Search Console API"');
  console.log('   4. Erstelle einen Service Account unter "IAM & Admin"');
  console.log('   5. Lade die JSON-Datei herunter und speichere sie als "gsc-service-account.json"');
  console.log('   6. Füge die Service Account Email in der Search Console als Nutzer hinzu');
  console.log('');
  throw new Error('Service Account Credentials fehlen');
}

/**
 * Rufe Search Performance Daten von GSC ab
 */
async function fetchGSCData(auth, query, startDate, endDate) {
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  try {
    const response = await searchconsole.searchanalytics.query({
      siteUrl: CONFIG.siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query', 'page'],
        dimensionFilterGroups: query ? [{
          filters: [{
            dimension: 'query',
            operator: 'equals',
            expression: query
          }]
        }] : undefined,
        rowLimit: 25000,
      },
    });

    return response.data.rows || [];
  } catch (error) {
    if (error.message.includes('User does not have sufficient permissions')) {
      throw new Error(
        'Keine Berechtigung für die Search Console. ' +
        'Stelle sicher, dass der Service Account in der Search Console als Nutzer hinzugefügt wurde.'
      );
    }
    throw error;
  }
}

/**
 * Berechne Datumsbereich
 */
function getDateRange() {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 3); // GSC Daten haben 2-3 Tage Verzögerung

  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - CONFIG.lookbackDays);

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  };
}

/**
 * Tracke Keywords
 */
async function trackKeywords() {
  console.log('🚀 Starte Keyword-Tracking...\n');

  // Sammle Keywords
  const keywordMap = collectAllKeywords();
  console.log(`📊 Gefunden: ${keywordMap.size} unique Keywords aus ${fs.readdirSync(CONFIG.articlesDir).filter(f => f.endsWith('.md')).length} Artikeln\n`);

  // Authentifiziere
  let auth;
  try {
    auth = await authenticateGSC();
  } catch (error) {
    console.error('❌ Authentifizierung fehlgeschlagen:', error.message);
    return;
  }

  // Datumsbereich
  const { startDate, endDate } = getDateRange();
  console.log(`📅 Zeitraum: ${startDate} bis ${endDate}\n`);

  // Tracking-Daten
  const trackingData = {
    timestamp: new Date().toISOString(),
    period: { startDate, endDate },
    keywords: [],
    summary: {
      totalKeywords: keywordMap.size,
      keywordsWithData: 0,
      totalClicks: 0,
      totalImpressions: 0,
      avgPosition: 0,
    },
  };

  let processedCount = 0;
  let positionSum = 0;
  let keywordsWithPosition = 0;

  // Verarbeite jedes Keyword
  for (const [keyword, articles] of keywordMap.entries()) {
    processedCount++;
    process.stdout.write(`\r⏳ Verarbeite Keywords: ${processedCount}/${keywordMap.size}`);

    try {
      const gscData = await fetchGSCData(auth, keyword, startDate, endDate);

      if (gscData.length > 0) {
        const aggregated = {
          clicks: 0,
          impressions: 0,
          ctr: 0,
          position: 0,
          urls: [],
        };

        gscData.forEach(row => {
          aggregated.clicks += row.clicks || 0;
          aggregated.impressions += row.impressions || 0;
          aggregated.position += row.position || 0;
          aggregated.urls.push({
            url: row.keys[1],
            clicks: row.clicks,
            impressions: row.impressions,
            position: row.position,
          });
        });

        // Durchschnittliche Position berechnen
        aggregated.position = gscData.length > 0
          ? Math.round(aggregated.position / gscData.length * 10) / 10
          : 0;

        aggregated.ctr = aggregated.impressions > 0
          ? Math.round((aggregated.clicks / aggregated.impressions) * 10000) / 100
          : 0;

        trackingData.keywords.push({
          keyword,
          articles: articles.map(a => a.slug),
          ...aggregated,
        });

        trackingData.summary.keywordsWithData++;
        trackingData.summary.totalClicks += aggregated.clicks;
        trackingData.summary.totalImpressions += aggregated.impressions;

        if (aggregated.position > 0) {
          positionSum += aggregated.position;
          keywordsWithPosition++;
        }
      } else {
        // Keyword ohne Daten
        trackingData.keywords.push({
          keyword,
          articles: articles.map(a => a.slug),
          clicks: 0,
          impressions: 0,
          ctr: 0,
          position: null,
          urls: [],
        });
      }

      // Rate limiting: Warte 100ms zwischen Requests
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.error(`\n❌ Fehler bei Keyword "${keyword}":`, error.message);
    }
  }

  // Berechne durchschnittliche Position
  trackingData.summary.avgPosition = keywordsWithPosition > 0
    ? Math.round(positionSum / keywordsWithPosition * 10) / 10
    : 0;

  // Sortiere Keywords nach Impressions
  trackingData.keywords.sort((a, b) => b.impressions - a.impressions);

  console.log('\n\n✅ Tracking abgeschlossen!\n');

  // Speichere Tracking-Daten
  const timestamp = new Date().toISOString().split('T')[0];
  const outputPath = path.join(CONFIG.trackingDir, `tracking-${timestamp}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(trackingData, null, 2), 'utf8');
  console.log(`💾 Daten gespeichert: ${outputPath}\n`);

  // Erstelle Report
  generateReport(trackingData);

  return trackingData;
}

/**
 * Generiere Markdown Report
 */
function generateReport(data) {
  const report = `# Keyword Tracking Report

**Datum:** ${new Date(data.timestamp).toLocaleDateString('de-CH')}
**Zeitraum:** ${data.period.startDate} bis ${data.period.endDate}

## 📊 Zusammenfassung

- **Total Keywords:** ${data.summary.totalKeywords}
- **Keywords mit Daten:** ${data.summary.keywordsWithData} (${Math.round(data.summary.keywordsWithData / data.summary.totalKeywords * 100)}%)
- **Total Clicks:** ${data.summary.totalClicks.toLocaleString('de-CH')}
- **Total Impressions:** ${data.summary.totalImpressions.toLocaleString('de-CH')}
- **Ø CTR:** ${data.summary.totalImpressions > 0 ? Math.round((data.summary.totalClicks / data.summary.totalImpressions) * 10000) / 100 : 0}%
- **Ø Position:** ${data.summary.avgPosition || 'N/A'}

## 🏆 Top 20 Keywords (nach Impressions)

| Keyword | Position | Impressions | Clicks | CTR | Artikel |
|---------|----------|-------------|--------|-----|---------|
${data.keywords.slice(0, 20).map(k =>
  `| ${k.keyword} | ${k.position || 'N/A'} | ${k.impressions.toLocaleString('de-CH')} | ${k.clicks} | ${k.ctr}% | ${k.articles.length} |`
).join('\n')}

## ⚡ Top 10 Keywords nach Clicks

| Keyword | Position | Clicks | Impressions | CTR |
|---------|----------|--------|-------------|-----|
${[...data.keywords].sort((a, b) => b.clicks - a.clicks).slice(0, 10).map(k =>
  `| ${k.keyword} | ${k.position || 'N/A'} | ${k.clicks} | ${k.impressions.toLocaleString('de-CH')} | ${k.ctr}% |`
).join('\n')}

## 📈 Keywords mit Position < 10 (Page 1)

${data.keywords.filter(k => k.position && k.position < 10).length > 0 ? `
| Keyword | Position | Clicks | Impressions |
|---------|----------|--------|-------------|
${data.keywords.filter(k => k.position && k.position < 10).map(k =>
  `| ${k.keyword} | ${k.position} | ${k.clicks} | ${k.impressions.toLocaleString('de-CH')} |`
).join('\n')}
` : '*Noch keine Keywords auf Seite 1*'}

## 🎯 Keywords ohne Rankings (Potenzial)

${data.keywords.filter(k => !k.position || k.position === null).length} Keywords haben noch keine Rankings:

${data.keywords.filter(k => !k.position || k.position === null).slice(0, 20).map(k =>
  `- **${k.keyword}** (${k.articles.length} Artikel)`
).join('\n')}

${data.keywords.filter(k => !k.position || k.position === null).length > 20 ?
  `\n*... und ${data.keywords.filter(k => !k.position || k.position === null).length - 20} weitere*` : ''}

---

*Generiert am ${new Date(data.timestamp).toLocaleString('de-CH')}*
`;

  const reportPath = path.join(CONFIG.trackingDir, 'latest-report.md');
  fs.writeFileSync(reportPath, report, 'utf8');
  console.log(`📄 Report erstellt: ${reportPath}\n`);

  // Zeige Zusammenfassung in Console
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 ZUSAMMENFASSUNG');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Total Keywords: ${data.summary.totalKeywords}`);
  console.log(`Mit Daten: ${data.summary.keywordsWithData} (${Math.round(data.summary.keywordsWithData / data.summary.totalKeywords * 100)}%)`);
  console.log(`Total Clicks: ${data.summary.totalClicks.toLocaleString('de-CH')}`);
  console.log(`Total Impressions: ${data.summary.totalImpressions.toLocaleString('de-CH')}`);
  console.log(`Ø Position: ${data.summary.avgPosition || 'N/A'}`);
  console.log(`Keywords auf Seite 1: ${data.keywords.filter(k => k.position && k.position < 10).length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Script ausführen
trackKeywords().catch(error => {
  console.error('\n❌ Fehler:', error.message);
  process.exit(1);
});
