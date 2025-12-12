#!/bin/bash

# Check if Sitemap and IndexNow are deployed

echo "🔍 Deployment Check"
echo "==================="
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Sitemap
echo "${YELLOW}1. Sitemap Check${NC}"
echo "   URL: https://www.selbstaendig-schweiz.ch/sitemap.xml"
response=$(curl -s -o /dev/null -w "%{http_code}" https://www.selbstaendig-schweiz.ch/sitemap.xml)
if [ "$response" = "200" ]; then
    echo "   ${GREEN}✅ Sitemap ist erreichbar (HTTP 200)${NC}"

    # Check for priority 1.0 entries
    pillar_count=$(curl -s https://www.selbstaendig-schweiz.ch/sitemap.xml | grep -c "<priority>1</priority>")
    if [ "$pillar_count" -ge "2" ]; then
        echo "   ${GREEN}✅ Phase 1 Pillar Pages gefunden: $pillar_count${NC}"
    else
        echo "   ${YELLOW}⚠️  Keine Phase 1 Pillar Pages gefunden (deployt gerade?)${NC}"
    fi
else
    echo "   ${RED}❌ Sitemap nicht erreichbar (HTTP $response)${NC}"
fi
echo ""

# Check IndexNow Key File
echo "${YELLOW}2. IndexNow Key File Check${NC}"
echo "   URL: https://www.selbstaendig-schweiz.ch/7d22c5dd-0c94-432e-b929-6355d1bc0152.txt"
response=$(curl -s -o /dev/null -w "%{http_code}" https://www.selbstaendig-schweiz.ch/7d22c5dd-0c94-432e-b929-6355d1bc0152.txt)
if [ "$response" = "200" ]; then
    key=$(curl -s https://www.selbstaendig-schweiz.ch/7d22c5dd-0c94-432e-b929-6355d1bc0152.txt)
    if [ "$key" = "7d22c5dd-0c94-432e-b929-6355d1bc0152" ]; then
        echo "   ${GREEN}✅ IndexNow Key File korrekt${NC}"
    else
        echo "   ${RED}❌ IndexNow Key stimmt nicht überein${NC}"
    fi
else
    echo "   ${RED}❌ IndexNow Key File nicht erreichbar (HTTP $response)${NC}"
fi
echo ""

# Check IndexNow API
echo "${YELLOW}3. IndexNow API Check${NC}"
echo "   URL: https://www.selbstaendig-schweiz.ch/api/indexnow"
response=$(curl -s -o /dev/null -w "%{http_code}" https://www.selbstaendig-schweiz.ch/api/indexnow)
if [ "$response" = "200" ]; then
    echo "   ${GREEN}✅ IndexNow API ist erreichbar${NC}"
else
    echo "   ${YELLOW}⚠️  IndexNow API nicht erreichbar (HTTP $response) - deployt gerade?${NC}"
fi
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "${YELLOW}📋 Nächste Schritte:${NC}"
echo ""
echo "Wenn alle Checks ✅ sind:"
echo ""
echo "1. ${GREEN}Google Search Console${NC}"
echo "   → https://search.google.com/search-console"
echo "   → Sitemap einreichen: https://www.selbstaendig-schweiz.ch/sitemap.xml"
echo ""
echo "2. ${GREEN}Bing Webmaster Tools${NC}"
echo "   → https://www.bing.com/webmasters"
echo "   → Site verifizieren & Sitemap einreichen"
echo ""
echo "3. ${GREEN}Monitoring${NC}"
echo "   → Google Search Console: Crawl Stats beobachten"
echo "   → Erwartung: 10-15 Seiten/Tag gecrawlt (vorher: 5/Tag)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
