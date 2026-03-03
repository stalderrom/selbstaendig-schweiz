# Google Search Console API Setup Guide

Um das Keyword-Tracking zu nutzen, musst du die Google Search Console API einrichten.

## Schritt 1: Google Cloud Project erstellen

1. Gehe zu [Google Cloud Console](https://console.cloud.google.com)
2. Klicke oben auf "Projekt auswählen" → "Neues Projekt"
3. Name: "selbstaendig-schweiz-seo" (oder beliebig)
4. Klicke "Erstellen"

## Schritt 2: Search Console API aktivieren

1. Im linken Menü: "APIs & Dienste" → "Aktivierte APIs und Dienste"
2. Klicke "+ APIS UND DIENSTE AKTIVIEREN"
3. Suche nach "Google Search Console API"
4. Klicke auf die API und dann "AKTIVIEREN"

## Schritt 3: Service Account erstellen

1. Im linken Menü: "APIs & Dienste" → "Anmeldedaten"
2. Klicke "+ ANMELDEDATEN ERSTELLEN" → "Dienstkonto"
3. Details:
   - **Name:** "selbstaendig-schweiz-tracking"
   - **Dienst-Konto-ID:** wird automatisch generiert
   - **Beschreibung:** "Keyword Tracking für selbständig-schweiz.ch"
4. Klicke "ERSTELLEN UND FORTFAHREN"
5. Rolle: Wähle "Betrachter" (oder überspringe)
6. Klicke "FERTIG"

## Schritt 4: JSON-Key herunterladen

1. Klicke auf den erstellten Service Account in der Liste
2. Gehe zum Tab "SCHLÜSSEL"
3. Klicke "SCHLÜSSEL HINZUFÜGEN" → "Neuen Schlüssel erstellen"
4. Wähle "JSON"
5. Die Datei wird automatisch heruntergeladen

## Schritt 5: JSON-Key im Projekt speichern

1. Benenne die heruntergeladene Datei um zu: `gsc-service-account.json`
2. Verschiebe sie in dein Projekt-Root-Verzeichnis:
   ```
   selbstaendig-schweiz/
   ├── gsc-service-account.json  ← HIER
   ├── scripts/
   ├── content/
   └── ...
   ```
3. **WICHTIG:** Füge die Datei zu `.gitignore` hinzu!
   ```bash
   echo "gsc-service-account.json" >> .gitignore
   ```

## Schritt 6: Service Account in Search Console hinzufügen

1. Öffne die `gsc-service-account.json` Datei
2. Kopiere die **Email-Adresse** (Format: `xxx@xxx.iam.gserviceaccount.com`)
3. Gehe zu [Google Search Console](https://search.google.com/search-console)
4. Wähle deine Property: `www.xn--selbstndig-schweiz-qtb.ch`
5. Klicke links auf "Einstellungen"
6. Unter "Nutzer und Berechtigungen" klicke "NUTZER HINZUFÜGEN"
7. Email: Füge die Service Account Email ein
8. Berechtigung: **"Eingeschränkt"** (nur Lesezugriff nötig)
9. Klicke "HINZUFÜGEN"

## Schritt 7: Tracking testen

Führe das Tracking-Script aus:

```bash
node scripts/track-keywords.js
```

### Erwartete Ausgabe:

```
🚀 Starte Keyword-Tracking...
📊 Gefunden: 42 unique Keywords aus 46 Artikeln
📝 Authentifiziere mit Service Account...
📅 Zeitraum: 2026-01-05 bis 2026-02-02
⏳ Verarbeite Keywords: 42/42
✅ Tracking abgeschlossen!
💾 Daten gespeichert: data/keyword-tracking/tracking-2026-02-02.json
📄 Report erstellt: data/keyword-tracking/latest-report.md
```

## Schritt 8: Regelmäßiges Tracking (Optional)

Erstelle ein npm Script in `package.json`:

```json
{
  "scripts": {
    "track": "node scripts/track-keywords.js"
  }
}
```

Dann kannst du einfach ausführen:
```bash
npm run track
```

## Troubleshooting

### Fehler: "User does not have sufficient permissions"
→ Stelle sicher, dass der Service Account in der Search Console als Nutzer hinzugefügt wurde (Schritt 6)

### Fehler: "Service Account Credentials fehlen"
→ Die `gsc-service-account.json` Datei muss im Root-Verzeichnis liegen

### Fehler: "API has not been used"
→ Warte 1-2 Minuten nach Aktivierung der API, dann erneut versuchen

### Keine Daten für Keywords
→ Das ist normal! Neue Keywords brauchen Zeit um zu ranken. Erst nach einigen Wochen siehst du Daten.

## Kosten

Die Google Search Console API ist **100% kostenlos**! Es gibt keine Limits für diesen Use Case.

## Nächste Schritte

Nach dem erfolgreichen Setup kannst du:
1. Wöchentliches Tracking einrichten (z.B. mit cron)
2. Historical Data sammeln
3. Performance-Vergleiche über Zeit machen
4. Keywords optimieren basierend auf den Daten

Viel Erfolg! 🚀
