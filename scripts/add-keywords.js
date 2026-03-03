const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(__dirname, '../content/articles');

// Keyword-Mapping basierend auf Slugs und häufigen Begriffen
const keywordSuggestions = {
  'ahv': ['ahv schweiz', 'ahv beiträge', 'altersvorsorge', 'sozialversicherung'],
  'rente': ['ahv rente', 'pension schweiz', 'rentenberechnung'],
  'bankkredit': ['kredit selbständige', 'firmenkredit schweiz', 'geschäftskredit', 'finanzierung'],
  'berufshaftpflicht': ['berufshaftpflicht schweiz', 'haftpflichtversicherung', 'versicherung selbständige'],
  'brevo': ['email marketing', 'newsletter schweiz', 'marketing automation', 'brevo schweiz'],
  'calendly': ['terminbuchung schweiz', 'online terminvereinbarung', 'kalendersoftware', 'calendly schweiz'],
  'darlehen': ['darlehen schweiz', 'kredit arten', 'geschäftskredit', 'finanzierung selbständige'],
  'einfache-buchhaltung': ['einfache buchhaltung', 'buchhaltung schweiz', 'milchbüechlirechnung', 'buchhaltungspflicht'],
  'einfache-gesellschaft': ['einfache gesellschaft schweiz', 'rechtsform schweiz', 'gesellschaftsformen', 'partnership'],
  'erfolgsrechnung': ['erfolgsrechnung schweiz', 'jahresabschluss', 'gewinn und verlustrechnung', 'buchhaltung'],
  'ergaenzungsleistungen': ['ergänzungsleistungen schweiz', 'el schweiz', 'sozialleistungen', 'finanzielle hilfe'],
  'factoring': ['factoring schweiz', 'forderungsverkauf', 'liquidität', 'finanzierung'],
  'firmenverkauf': ['firmenverkauf schweiz', 'unternehmensverkauf', 'nachfolge', 'exit strategie'],
  'freizuegigkeitskonto': ['freizügigkeitskonto schweiz', 'säule 3a', 'vorsorge', 'pensionskasse'],
  'kollektivgesellschaft': ['kollektivgesellschaft schweiz', 'rechtsform', 'gesellschaftsformen', 'kg gründen'],
  'kunden-gewinnen': ['kundenakquise schweiz', 'neukundengewinnung', 'marketing selbständige', 'verkauf'],
  'lebensversicherung': ['lebensversicherung schweiz', 'risikoversicherung', 'versicherungsvergleich', 'absicherung'],
  'lohnabrechnung': ['lohnabrechnung schweiz', 'lohn berechnen', 'personaladministration', 'sozialversicherungen'],
  'offerte': ['offerte erstellen schweiz', 'angebot schreiben', 'offertvorlage', 'preiskalkulation'],
  'personaladministration': ['personaladministration schweiz', 'hr schweiz', 'mitarbeiterverwaltung', 'lohnbuchhaltung'],
  'pipedrive': ['crm schweiz', 'sales tool', 'kundenmanagement', 'pipedrive schweiz'],
  'private-equity': ['private equity schweiz', 'beteiligungskapital', 'investoren', 'venture capital'],
  'qr-rechnung': ['qr rechnung schweiz', 'rechnung erstellen', 'qr code rechnung', 'swiss qr'],
  'rechnungsvorlage': ['rechnungsvorlage schweiz', 'rechnung schreiben', 'faktura', 'invoicing'],
  'rechtsschutzversicherung': ['rechtsschutzversicherung schweiz', 'rechtsschutz', 'versicherung', 'rechtshilfe'],
  'revolut': ['revolut business schweiz', 'geschäftskonto', 'banking', 'fintech schweiz'],
  'berater': ['selbständig als berater', 'consulting schweiz', 'unternehmensberatung', 'berater werden'],
  'elektriker': ['selbständig als elektriker', 'elektroinstallateur schweiz', 'handwerk', 'gewerbe'],
  'fotograf': ['selbständig als fotograf', 'fotografie business', 'fotograf werden', 'kreativ selbständig'],
  'programmierer': ['selbständig als programmierer', 'freelance developer', 'it freelancer schweiz', 'software entwickler'],
  'schreiner': ['selbständig als schreiner', 'schreinergeschäft schweiz', 'handwerk', 'möbelbau'],
  'treuhaender': ['selbständig als treuhänder', 'treuhand schweiz', 'buchhaltung selbständig', 'treuhänder werden'],
  'webdesigner': ['selbständig als webdesigner', 'webdesign schweiz', 'freelance designer', 'web entwicklung'],
  'selbstaendig-werden': ['selbständig werden schweiz', 'selbständigkeit', 'firma gründen', 'existenzgründung'],
  'todesfallversicherung': ['todesfallversicherung schweiz', 'lebensversicherung', 'hinterbliebenenabsicherung', 'risikoversicherung'],
  'unternehmen-gruenden': ['unternehmen gründen schweiz', 'startup gründen', 'firma gründen', 'selbständig machen'],
  'wix': ['wix schweiz', 'website baukasten', 'homepage erstellen', 'website builder'],
  'wordpress-hosting': ['wordpress hosting schweiz', 'webhosting', 'website hosting', 'wordpress schweiz']
};

function generateKeywords(slug, title, description) {
  const keywords = new Set();

  // Hauptkeyword aus Slug
  const mainKeyword = slug.replace(/-/g, ' ');
  keywords.add(mainKeyword);

  // Zusätzliche Keywords basierend auf Slug-Teilen
  for (const [key, suggestions] of Object.entries(keywordSuggestions)) {
    if (slug.includes(key)) {
      // Füge 3-4 passende Keywords hinzu
      suggestions.slice(0, 4).forEach(kw => keywords.add(kw));
      break;
    }
  }

  // Fallback: Generische Keywords basierend auf Titel
  if (keywords.size < 3) {
    if (title.toLowerCase().includes('selbständig') || title.toLowerCase().includes('selbstständig')) {
      keywords.add('selbständig schweiz');
      keywords.add('selbständigkeit schweiz');
    }
    if (title.toLowerCase().includes('schweiz')) {
      keywords.add('schweiz business');
    }
    if (title.toLowerCase().includes('gründen')) {
      keywords.add('firma gründen schweiz');
      keywords.add('unternehmen gründen');
    }
  }

  // Limitiere auf 5 Keywords
  return Array.from(keywords).slice(0, 5);
}

function processArticles() {
  const files = fs.readdirSync(articlesDir);
  const results = {
    updated: [],
    skipped: [],
    errors: []
  };

  files.forEach(filename => {
    if (!filename.endsWith('.md')) return;

    const filepath = path.join(articlesDir, filename);
    const slug = filename.replace('.md', '');

    try {
      const fileContent = fs.readFileSync(filepath, 'utf8');
      const { data, content } = matter(fileContent);

      // Prüfe ob Keywords bereits existieren und nicht leer sind
      const hasKeywords = data.keywords &&
                         Array.isArray(data.keywords) &&
                         data.keywords.length > 0 &&
                         data.keywords.some(k => k && k.trim() !== '');

      if (hasKeywords) {
        results.skipped.push({ slug, reason: 'Hat bereits Keywords', existingKeywords: data.keywords });
        return;
      }

      // Generiere Keywords
      const keywords = generateKeywords(slug, data.title || '', data.description || '');

      if (keywords.length === 0) {
        results.errors.push({ slug, error: 'Konnte keine Keywords generieren' });
        return;
      }

      // Update Frontmatter
      data.keywords = keywords;

      // Erstelle neuen Content mit aktualisiertem Frontmatter
      const newContent = matter.stringify(content, data);

      // Schreibe zurück
      fs.writeFileSync(filepath, newContent, 'utf8');

      results.updated.push({ slug, keywords });

    } catch (error) {
      results.errors.push({ slug, error: error.message });
    }
  });

  return results;
}

// Führe das Script aus
console.log('🚀 Starte Keyword-Ergänzung...\n');

const results = processArticles();

console.log('✅ Verarbeitung abgeschlossen!\n');
console.log(`📊 Statistik:`);
console.log(`   - Aktualisiert: ${results.updated.length} Artikel`);
console.log(`   - Übersprungen: ${results.skipped.length} Artikel`);
console.log(`   - Fehler: ${results.errors.length} Artikel\n`);

if (results.updated.length > 0) {
  console.log('📝 Aktualisierte Artikel:\n');
  results.updated.forEach(({ slug, keywords }) => {
    console.log(`   ✓ ${slug}`);
    console.log(`     Keywords: ${keywords.join(', ')}`);
  });
  console.log('');
}

if (results.errors.length > 0) {
  console.log('❌ Fehler:\n');
  results.errors.forEach(({ slug, error }) => {
    console.log(`   ✗ ${slug}: ${error}`);
  });
}

// Speichere Review-Liste
const reviewContent = `# Keyword-Update Review

Datum: ${new Date().toISOString().split('T')[0]}

## ✅ Aktualisierte Artikel (${results.updated.length})

${results.updated.map(({ slug, keywords }) =>
  `### ${slug}\n- ${keywords.map(k => `\`${k}\``).join('\n- ')}\n`
).join('\n')}

## ⏭️ Übersprungen (${results.skipped.length})

${results.skipped.map(({ slug, reason }) => `- ${slug}: ${reason}`).join('\n')}

## ❌ Fehler (${results.errors.length})

${results.errors.map(({ slug, error }) => `- ${slug}: ${error}`).join('\n')}
`;

fs.writeFileSync(
  path.join(__dirname, '../keyword-review.md'),
  reviewContent,
  'utf8'
);

console.log('📄 Review-Datei erstellt: keyword-review.md\n');
