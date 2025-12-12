#!/bin/bash

# IndexNow Test Script für selbstaendig-schweiz.ch
# Dieses Script testet die IndexNow-Implementation

echo "🚀 IndexNow Test Script"
echo "======================="
echo ""

# Farben für Output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Prüfe ob Dev-Server läuft
echo "1️⃣  Prüfe ob Dev-Server läuft..."
if curl -s http://localhost:3000/api/indexnow > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Dev-Server läuft${NC}"
else
    echo -e "${RED}❌ Dev-Server läuft NICHT${NC}"
    echo ""
    echo "Bitte starte den Dev-Server zuerst:"
    echo "  npm run dev"
    echo ""
    exit 1
fi

echo ""
echo "2️⃣  Teste IndexNow API Info..."
RESPONSE=$(curl -s http://localhost:3000/api/indexnow)
if echo "$RESPONSE" | grep -q "IndexNow is configured"; then
    echo -e "${GREEN}✅ IndexNow API ist konfiguriert${NC}"
    echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
else
    echo -e "${RED}❌ IndexNow API antwortet nicht korrekt${NC}"
    echo "$RESPONSE"
    exit 1
fi

echo ""
echo "3️⃣  Teste Homepage-Submission..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"type": "homepage"}')

if echo "$RESPONSE" | grep -q "\"success\":true"; then
    echo -e "${GREEN}✅ Homepage erfolgreich an IndexNow gesendet${NC}"
    echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
else
    echo -e "${YELLOW}⚠️  Homepage-Submission fehlgeschlagen (möglicherweise bereits gesendet)${NC}"
    echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
fi

echo ""
echo "4️⃣  Teste Artikel-Submission..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"type": "article", "slug": "einzelfirma-gruenden"}')

if echo "$RESPONSE" | grep -q "\"success\":true"; then
    echo -e "${GREEN}✅ Artikel erfolgreich an IndexNow gesendet${NC}"
    echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
else
    echo -e "${YELLOW}⚠️  Artikel-Submission fehlgeschlagen (möglicherweise bereits gesendet)${NC}"
    echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
fi

echo ""
echo "======================="
echo -e "${GREEN}✅ IndexNow Tests abgeschlossen!${NC}"
echo ""
echo "📋 Nächste Schritte:"
echo "  1. Alle Artikel senden:"
echo "     curl -X POST http://localhost:3000/api/indexnow \\"
echo "       -H \"Content-Type: application/json\" \\"
echo "       -d '{\"type\": \"all-articles\"}'"
echo ""
echo "  2. Bing Webmaster Tools registrieren:"
echo "     https://www.bing.com/webmasters"
echo ""
echo "  3. Monitoring starten in Google Search Console"
echo ""
