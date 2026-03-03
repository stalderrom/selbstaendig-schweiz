const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.xn--selbstndig-schweiz-qtb.ch';

async function testConnection() {
  console.log('🔍 Teste Google Search Console Verbindung...\n');

  // Prüfe auf Service Account
  const serviceAccountPath = path.join(__dirname, '../gsc-service-account.json');

  if (!fs.existsSync(serviceAccountPath)) {
    console.error('❌ Datei nicht gefunden: gsc-service-account.json');
    console.log('\n📖 Bitte folge dem Setup-Guide: scripts/GSC-SETUP.md\n');
    process.exit(1);
  }

  console.log('✅ Service Account Datei gefunden');

  // Lade und validiere JSON
  try {
    const credentials = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    console.log('✅ JSON ist valide');
    console.log(`📧 Service Account: ${credentials.client_email}\n`);

    // Authentifiziere
    console.log('🔐 Authentifiziere...');
    const auth = new google.auth.GoogleAuth({
      keyFile: serviceAccountPath,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const authClient = await auth.getClient();
    console.log('✅ Authentifizierung erfolgreich\n');

    // Test API Call
    console.log('📡 Teste API-Zugriff...');
    const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });

    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 3);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 7);

    const response = await searchconsole.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dimensions: ['query'],
        rowLimit: 10,
      },
    });

    console.log('✅ API-Zugriff erfolgreich!\n');

    if (response.data.rows && response.data.rows.length > 0) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📊 Top 10 Queries (letzte 7 Tage):');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      response.data.rows.forEach((row, i) => {
        console.log(`${i + 1}. ${row.keys[0]}`);
        console.log(`   Impressions: ${row.impressions}, Clicks: ${row.clicks}, Position: ${Math.round(row.position * 10) / 10}`);
      });
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    } else {
      console.log('ℹ️  Noch keine Daten verfügbar (das ist normal bei neuen Sites)\n');
    }

    console.log('✅ Setup komplett! Du kannst jetzt das Tracking starten:');
    console.log('   node scripts/track-keywords.js\n');

  } catch (error) {
    console.error('\n❌ Fehler:', error.message);

    if (error.message.includes('User does not have sufficient permissions')) {
      console.log('\n⚠️  Der Service Account hat keine Berechtigung!');
      console.log('   Stelle sicher, dass du den Service Account in der Search Console');
      console.log('   als Nutzer hinzugefügt hast:');
      console.log(`   → https://search.google.com/search-console?resource_id=${encodeURIComponent(siteUrl)}`);
      console.log('\n   Siehe Schritt 6 in scripts/GSC-SETUP.md\n');
    } else if (error.message.includes('API has not been used')) {
      console.log('\n⚠️  Die API ist noch nicht aktiviert!');
      console.log('   Aktiviere die "Google Search Console API" in der Cloud Console:');
      console.log('   → https://console.cloud.google.com/apis/library/searchconsole.googleapis.com');
      console.log('\n   Siehe Schritt 2 in scripts/GSC-SETUP.md\n');
    }

    process.exit(1);
  }
}

testConnection();
