# Update Internal Links Command

Du bist ein Experte für interne Verlinkung und SEO-Optimierung.

## Aufgabe

Aktualisiere die internen Links in allen Artikeln im `content/articles/` Verzeichnis basierend auf den aktuell vorhandenen Artikeln.

## Vorgehen

1. **Alle Artikel analysieren:**
   - Liste alle .md Dateien in `content/articles/` auf
   - Extrahiere aus jedem Artikel: Keyword, Silo/Kategorie, Titel

2. **Silo-Struktur erstellen:**
   - Gruppiere Artikel nach ihren Silos/Kategorien
   - Identifiziere verwandte Artikel (Same-Silo)
   - Identifiziere ergänzende Artikel (Cross-Silo)

3. **Für jeden Artikel:**
   - Lese den HTML-Kommentar mit den Link-Anweisungen (falls vorhanden)
   - Aktualisiere die Links in der "Weiterführende Artikel" Sektion
   - Stelle sicher, dass Links zu tatsächlich existierenden Artikeln zeigen
   - Entferne Links zu nicht-existierenden Artikeln
   - Füge neue relevante Links hinzu

4. **Link-Auswahl Kriterien:**
   - **Same-Silo (3 Links):** Artikel aus derselben Kategorie, thematisch verwandt
   - **Cross-Silo (2 Links):** Ergänzende Themen aus anderen Kategorien
   - **Pillar (optional):** Link zur Übersichtsseite, falls vorhanden

5. **Format beibehalten:**
   - Die "Weiterführende Artikel" Sektion soll einfache Markdown-Links sein
   - HTML-Kommentare mit detaillierten Link-Strategien bleiben erhalten
   - Aktualisiere beide: sichtbare Links UND Kommentar-Notizen

## Output

- Zeige eine Zusammenfassung der Änderungen
- Speichere aktualisierte Artikel
- Erstelle KEINEN git commit (das macht der User manuell)

## Wichtig

- Ändere NUR die "Weiterführende Artikel" Sektion und HTML-Kommentare
- Ändere NICHT den Hauptinhalt der Artikel
- Stelle sicher, dass alle Links zu existierenden Dateien zeigen
- Verwende natürliche, beschreibende Ankertexte
