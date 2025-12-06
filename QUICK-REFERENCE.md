# ⚡ Quick Reference - Content Machine

## 🔗 Wichtige URLs

### Deine App
- **Homepage:** http://localhost:3000
- **AI Generator:** http://localhost:3000/admin/ai-generator
- **Batch Generator:** http://localhost:3000/admin/batch-generator
- **Artikel-Übersicht:** http://localhost:3000/artikel

### Admin
- **Einzelartikel erstellen:** `/admin/ai-generator`
- **Batch erstellen:** `/admin/batch-generator`

---

## 📝 Wie erstelle ich einen Artikel?

### Einzelner Artikel (3 Minuten)

```
1. http://localhost:3000/admin/ai-generator
2. Keyword eingeben (z.B. "selbständig als fotograf")
3. Silo wählen (z.B. "Berufsratgeber")
4. "Artikel generieren" klicken
5. Warten 2-4 Minuten
6. ✅ Fertig! Artikel in content/articles/
```

### Batch (10-50 Artikel gleichzeitig)

```
1. http://localhost:3000/admin/batch-generator
2. Keywords eingeben (ein pro Zeile)
3. "Batch generieren" klicken
4. Warten 3-5 Minuten
5. ✅ Outlines + Meta für alle Keywords!
```

---

## 🎯 Die 8 Pillar Pages

Erstelle diese ZUERST:

1. `steuern selbständige` (Silo: Steuern)
2. `versicherungen selbständige` (Silo: Versicherungen)
3. `buchhaltung selbständige` (Silo: Buchhaltung & Finanzen)
4. `selbständig machen schweiz` (Silo: Selbständig machen / Gründung)
5. `kunden gewinnen schweiz` (Silo: Marketing & Kundenakquise)
6. `tools selbständige` (Silo: Tools & Software)
7. `selbständig schweiz berufe` (Silo: Berufsratgeber)
8. `geld verdienen schweiz` (Silo: Einkommen & Geschäftsmodelle)

---

## 📊 Die 8 Silos

Wähle das passende Silo für deinen Artikel:

| Silo | Beispiel-Keywords | CPC |
|------|------------------|-----|
| **Selbständig machen / Gründung** | einzelfirma gründen, gmbh gründen, startup schweiz | Medium |
| **Steuern** | mwst pflicht, ahv selbständig, abzüge | **Sehr Hoch** |
| **Versicherungen** | krankentaggeld, bvg freiwillig, 3a | **Sehr Hoch** |
| **Buchhaltung & Finanzen** | buchhaltungssoftware, rechnung schreiben | Hoch |
| **Marketing & Kundenakquise** | kunden finden, seo schweiz, google business | Medium |
| **Tools & Software** | projektmanagement tools, crm, zeiterfassung | Medium |
| **Berufsratgeber** | selbständig als fotograf, coach, programmierer | Medium |
| **Einkommen & Geschäftsmodelle** | geld verdienen, nebeneinkommen, passives einkommen | Hoch |

---

## 🚀 Workflow: Schnellstart

### Option 1: Test (30 Min)
```
→ 3 Artikel generieren
→ Qualität prüfen
→ Entscheiden: skalieren?
```

### Option 2: Foundation (2-3 Stunden)
```
→ 8 Pillar Pages erstellen
→ 10 High-CPC Artikel
→ Total: 18 Artikel
```

### Option 3: Scale (pro Woche)
```
Montag: Batch mit 25 Keywords
Di-Fr: 5 Artikel/Tag generieren
→ Total: 20+ Artikel/Woche
```

---

## 💰 Kosten

- **Pro Artikel:** ~$0.04 (4 Rappen)
- **100 Artikel:** ~$4
- **500 Artikel:** ~$20

---

## 📁 Wichtige Dateien

### Dein Projekt
```
selbstaendig-schweiz/
├── .env.local                  ← API Key hier
├── content/articles/           ← Generierte Artikel
├── app/api/generate-article/   ← API Route
└── app/admin/ai-generator/     ← UI
```

### Content Machine
```
content-machine/
├── prompts/                    ← 8 Prompts
├── keywords/                   ← 750 Keywords
│   ├── silo-structure.yaml
│   └── keywords-for-ubersuggest.csv
└── README.md                   ← Dokumentation
```

### Anleitungen
```
CONTENT-STRATEGY-TODO.md        ← Todo-Liste
WIE-PILLAR-PAGES-ERSTELLEN.md   ← Pillar-Anleitung
AI-GENERATOR-READY.md           ← Setup-Guide
QUICK-REFERENCE.md              ← Diese Datei
```

---

## 🐛 Troubleshooting

### Server läuft nicht?
```bash
cd /Users/romanstalder/Dropbox/JETZT/01\ CODE/selbstaendig-schweiz
npm run dev
```

### API Error?
→ Checke `.env.local` - API Key vorhanden?

### Artikel wird nicht generiert?
→ Browser Console (F12) öffnen
→ Fehler-Message lesen
→ Terminal Output checken

### Prompts nicht gefunden?
→ Stelle sicher beide Ordner existieren:
```
01 CODE/
├── selbstaendig-schweiz/
└── nichen-websites-seo-content-writer/content-machine/
```

---

## 📈 Success Metrics

### Woche 1
- [ ] 20 Artikel publiziert
- [ ] 8 Pillar Pages live
- [ ] ~500 Besucher/Monat

### Monat 1
- [ ] 100 Artikel publiziert
- [ ] ~5'000 Besucher/Monat
- [ ] Analytics eingerichtet

### Monat 3
- [ ] 300 Artikel publiziert
- [ ] ~20'000 Besucher/Monat
- [ ] Adsense beantragt

### Monat 6
- [ ] 500 Artikel publiziert
- [ ] ~50'000 Besucher/Monat
- [ ] CHF 1'500+ Einnahmen/Monat

---

## 🎯 Top 20 Keywords für Schnellstart

### High-CPC (Adsense-Goldmine)
1. steuern selbständige
2. mwst pflicht ab wann
3. krankentaggeld selbständige
4. versicherungen selbständige
5. bvg freiwillig
6. ahv selbständig
7. 3a selbständige
8. unfallversicherung selbständige

### High-Traffic (Besucher-Magnete)
9. einzelfirma gründen
10. selbständig machen schweiz
11. buchhaltungssoftware vergleich
12. rechnung schreiben
13. kunden gewinnen
14. geschäftskonto vergleich

### Berufsratgeber (Longtail-Gold)
15. selbständig als fotograf
16. selbständig als coach
17. selbständig als programmierer
18. selbständig als designer
19. selbständig als texter
20. selbständig als berater

---

## ⚡ Keyboard Shortcuts

- **AI Generator:** http://localhost:3000/admin/ai-generator
- **Batch:** http://localhost:3000/admin/batch-generator
- **Articles:** http://localhost:3000/artikel

---

## 📞 Support

### Dokumentation
- Content Machine: `content-machine/README.md`
- Quick Start: `content-machine/QUICK-START.md`
- Example: `content-machine/EXAMPLE-WORKFLOW.md`

### Todo-Liste
- `CONTENT-STRATEGY-TODO.md`

### Pillar Pages Anleitung
- `WIE-PILLAR-PAGES-ERSTELLEN.md`

---

**🚀 Los geht's! Öffne jetzt:**

http://localhost:3000/admin/ai-generator

**und erstelle deinen ersten Artikel! 💪**
