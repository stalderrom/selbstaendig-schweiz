#!/bin/bash

# IndexNow Phase 1: Sequential Topic Clustering
# Sendet NUR Gründung + Buchhaltung Cluster
# Basierend auf: GO-TO-MARKET-STRATEGIE.md

echo "🚀 IndexNow Phase 1: Kernbereich"
echo "================================="
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "${BLUE}📊 Phase 1 Strategie (Sequential Topic Clustering):${NC}"
echo "  - Fokus: Gründung + Buchhaltung Cluster"
echo "  - Warum? Crawl Budget effizient nutzen"
echo "  - Ergebnis: Schnellere Topical Authority"
echo ""

# Phase 1 Artikel definieren
echo "${YELLOW}Phase 1 Artikel (15 URLs):${NC}"
echo ""

echo "📍 GRÜNDUNGS-CLUSTER (7 Artikel):"
echo "  1. selbstaendig-machen-schweiz (PILLAR)"
echo "  2. einzelfirma-gruenden"
echo "  3. gmbh-gruenden"
echo "  4. einfache-gesellschaft-schweiz"
echo "  5. kollektivgesellschaft-gruenden-schweiz"
echo "  6. unternehmen-gruenden-schweiz"
echo "  7. selbstaendig-werden-schweiz"
echo ""

echo "📍 BUCHHALTUNGS-CLUSTER (8 Artikel):"
echo "  1. buchhaltung-selbststaendige (PILLAR)"
echo "  2. einfache-buchhaltung-schweiz"
echo "  3. erfolgsrechnung-erstellen-schweiz"
echo "  4. lohnabrechnung-schweiz-unternehmen"
echo "  5. offerte-erstellen-schweiz"
echo "  6. qr-rechnung-erstellen-schweiz"
echo "  7. rechnungsvorlage-schweiz"
echo "  8. freizuegigkeitskonto-schweiz"
echo ""

read -p "Möchtest du diese 15 Artikel an IndexNow senden? (j/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Jj]$ ]]; then
    echo "Abgebrochen."
    exit 0
fi

echo ""
echo "${YELLOW}Sende Phase 1 Artikel...${NC}"
echo ""

# Array mit allen Phase 1 URLs
urls='[
  "https://www.selbstaendig-schweiz.ch/artikel/selbstaendig-machen-schweiz",
  "https://www.selbstaendig-schweiz.ch/artikel/einzelfirma-gruenden",
  "https://www.selbstaendig-schweiz.ch/artikel/gmbh-gruenden",
  "https://www.selbstaendig-schweiz.ch/artikel/einfache-gesellschaft-schweiz",
  "https://www.selbstaendig-schweiz.ch/artikel/kollektivgesellschaft-gruenden-schweiz",
  "https://www.selbstaendig-schweiz.ch/artikel/unternehmen-gruenden-schweiz",
  "https://www.selbstaendig-schweiz.ch/artikel/selbstaendig-werden-schweiz",
  "https://www.selbstaendig-schweiz.ch/artikel/buchhaltung-selbststaendige",
  "https://www.selbstaendig-schweiz.ch/artikel/einfache-buchhaltung-schweiz",
  "https://www.selbstaendig-schweiz.ch/artikel/erfolgsrechnung-erstellen-schweiz",
  "https://www.selbstaendig-schweiz.ch/artikel/lohnabrechnung-schweiz-unternehmen",
  "https://www.selbstaendig-schweiz.ch/artikel/offerte-erstellen-schweiz",
  "https://www.selbstaendig-schweiz.ch/artikel/qr-rechnung-erstellen-schweiz",
  "https://www.selbstaendig-schweiz.ch/artikel/rechnungsvorlage-schweiz",
  "https://www.selbstaendig-schweiz.ch/artikel/freizuegigkeitskonto-schweiz"
]'

# POST Request
response=$(curl -s -X POST http://localhost:3000/api/indexnow \
  -H "Content-Type: application/json" \
  -d "{\"urls\": $urls}")

echo "$response" | jq '.'

if echo "$response" | grep -q '"success":true'; then
    echo ""
    echo "${GREEN}✅ ERFOLG! Phase 1 Artikel wurden an IndexNow gesendet!${NC}"
    echo ""
    echo "📊 Was passiert jetzt?"
    echo "  - Bing, Yandex, Seznam.cz, Naver crawlen diese 15 Seiten innerhalb von Stunden"
    echo "  - Google wird diese Seiten als Kern-Content erkennen"
    echo "  - Topical Authority für Gründung + Buchhaltung wird aufgebaut"
    echo ""
    echo "📅 Nächste Schritte (GO-TO-MARKET-STRATEGIE.md):"
    echo "  - Woche 1-2: Phase 1 Monitoring"
    echo "  - Woche 3-4: Phase 2 (Steuern + Versicherungen)"
    echo "  - Woche 5-8: Phase 3 (Berufe + Tools + Marketing)"
    echo ""
    echo "📈 Monitoring:"
    echo "  1. Bing Webmaster Tools: https://www.bing.com/webmasters"
    echo "  2. Google Search Console: Crawl Stats beobachten"
    echo "  3. Nach 24-48h: Indexierung prüfen"
    echo ""
else
    echo ""
    echo "${RED}❌ Fehler beim Senden der Artikel${NC}"
    echo ""
    exit 1
fi
