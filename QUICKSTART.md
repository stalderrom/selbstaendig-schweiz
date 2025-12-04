# 🚀 Quick Start Guide

## Sofort loslegen

### 1. Development Server starten

```bash
npm run dev
```

Öffne **http://localhost:3000** (oder 3001 wenn Port 3000 belegt ist)

### 2. Artikel erstellen

**Option A: Via Admin-Interface (Empfohlen)**

1. Gehe zu **http://localhost:3000/admin**
2. Fülle das Formular aus
3. Klicke auf "Artikel erstellen"

**Option B: Manuell**

Erstelle eine `.md` Datei in `content/articles/`:

```markdown
---
title: "Freelancer werden in der Schweiz 2026"
description: "So startest du erfolgreich als Freelancer in der Schweiz"
keywords: ["freelancer schweiz", "selbstständig", "freelancing"]
category: "berufe"
author: "Redaktion"
publishedAt: "2026-01-20"
---

# Freelancer werden in der Schweiz

Dein Artikel-Inhalt...
```

### 3. Website testen

```bash
# Build erstellen
npm run build

# Production-Server testen
npm start
```

## 📝 Nächste Artikel-Ideen (aus Keyword-Research)

### Top-Priority Keywords:

1. **"freelancer schweiz"** (10 results) - Super einfach zu ranken!
   - "Freelancer werden Schweiz"
   - "Freelancer Stundensatz Schweiz"
   - "Freelancer Plattformen Schweiz"
   - "Freelancer Steuern Schweiz"

2. **"steuern selbstständige schweiz"** (9 results)
   - "Steuererklärung Selbstständige"
   - "Steueroptimierung für Freelancer"
   - "Mehrwertsteuer Selbstständige"

3. **"buchhaltung selbstständige"** (9 results)
   - "Buchhaltung für Anfänger"
   - "Buchhaltungssoftware Vergleich"
   - "Online Buchhaltung"

4. **"krankenversicherung selbstständige"** (9 results)
   - "Günstigste Krankenkasse für Selbstständige"
   - "Krankentaggeld für Freelancer"

5. **"marketing selbstständige"** (9 results)
   - "Kundenakquisition für Freelancer"
   - "LinkedIn Marketing für Selbstständige"
   - "Google Ads für lokale Unternehmen"

## 🎯 Content-Strategie

### Pillar + Cluster Methode:

**Beispiel: "Freelancer Schweiz" Cluster**

1. **Pillar Article**: "Freelancer werden in der Schweiz: Der komplette Guide 2026" (3000+ Wörter)

2. **Cluster Articles** (je 1500-2000 Wörter):
   - "Freelancer Stundensatz berechnen: So viel kannst du verlangen"
   - "Die 10 besten Freelancer-Plattformen in der Schweiz"
   - "Freelancer Steuern Schweiz: Alles was du wissen musst"
   - "Versicherungen für Freelancer: Der ultimative Guide"
   - "Freelancer werden ohne Startkapital: So geht's"
   - "Nebenberuflich als Freelancer starten"

Alle Cluster-Artikel verlinken zum Pillar → Pillar verlinkt zu allen Clustern

## 📊 SEO-Checkliste pro Artikel

- [ ] Keyword im Title (möglichst vorne)
- [ ] Keyword in H1
- [ ] Keyword in ersten 100 Wörtern
- [ ] 2-3x Keyword im Content (natürlich einbauen)
- [ ] Mindestens 3 interne Links zu verwandten Artikeln
- [ ] Meta Description 150-160 Zeichen
- [ ] 5-10 relevante Keywords im Frontmatter
- [ ] Mindestens 1500 Wörter (ideal: 2000-3000)
- [ ] Bullet Points und Listen für Lesbarkeit
- [ ] Klare H2/H3 Struktur

## 🚀 Deployment auf Vercel

### Erstmaliges Setup:

```bash
# Vercel CLI installieren
npm i -g vercel

# In Projektordner
vercel

# Folge den Prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? selbstaendig-schweiz
# - Directory? ./
# - Override settings? No
```

### Updates deployen:

```bash
# Änderungen committen
git add .
git commit -m "Neue Artikel hinzugefügt"

# Pushen (wenn GitHub verbunden)
git push

# Oder manuell deployen
vercel --prod
```

## 📈 Nach dem Launch

### Woche 1:
1. Google Search Console einrichten
2. Domain verifizieren
3. Sitemap submitten (`https://selbständig-schweiz.ch/sitemap.xml`)
4. Google Analytics einrichten

### Woche 2-4:
5. 30+ Artikel publizieren
6. Interne Verlinkung optimieren
7. Social Media Kanäle erstellen (LinkedIn, Facebook)

### Monat 2:
8. Google AdSense beantragen (benötigt ~30 Artikel + Traffic)
9. Email-Newsletter einrichten (optional)
10. Backlink-Building starten

### Monat 3+:
11. Content-Kalender erstellen (2-3 Artikel/Woche)
12. Top-Performer analysieren
13. Alte Artikel updaten
14. Bei 50k sessions/month → Mediavine beantragen

## 💰 Monetarisierung Timeline

| Meilenstein | Traffic | Aktion |
|------------|---------|--------|
| **Launch** | 0 visits | Content erstellen |
| **Monat 1** | ~1k visits | 30+ Artikel, SEO Setup |
| **Monat 2** | ~5k visits | AdSense beantragen |
| **Monat 3** | ~10k visits | AdSense approved, Ads schalten |
| **Monat 6** | ~50k visits | Mediavine beantragen |
| **Jahr 1** | ~200k visits | $1000-2000/Monat Revenue |

## 🎨 Design später optimieren

Aktuell: **Funktionales, sauberes Design**

Mit Opus 4.5 später:
- Einzigartiges Branding
- Custom Illustrationen
- Interaktive Elemente
- Premium-Look

**Tipp**: Erst Content, dann Design! 500 Artikel > hübsches Design

## 📞 Häufige Probleme

**Q: Build-Fehler bei `npm run build`?**
A: Lösche `.next` und `node_modules`, dann `npm install && npm run build`

**Q: Artikel wird nicht angezeigt?**
A: Prüfe das Frontmatter-Format (YAML Syntax)

**Q: 404 bei Artikel-Seite?**
A: Development-Server neu starten

**Q: Sitemap leer?**
A: Mindestens 1 Artikel muss in `content/articles/` sein

## 🔥 Pro-Tipps

1. **Batch-Artikel schreiben**: Schreibe 10 Artikel an einem Tag → Performance!
2. **Keyword-Kannibalisierung vermeiden**: Nur 1 Artikel pro exaktes Keyword
3. **Update alte Artikel**: Google liebt frischen Content
4. **Interne Links**: Jeder Artikel sollte 5+ interne Links haben
5. **Long-tail Keywords**: "freelancer stundensatz zürich" > "freelancer"

---

**Los geht's! 🚀 Viel Erfolg mit deinem Portal!**
