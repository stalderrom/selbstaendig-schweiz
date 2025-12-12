# ⚙️ Vercel Environment Variables Setup für IndexNow

**Wichtig:** Damit IndexNow auch in Production funktioniert, müssen die Environment Variables in Vercel konfiguriert werden.

---

## 🔧 SCHRITT-FÜR-SCHRITT ANLEITUNG

### 1. Vercel Dashboard öffnen
Gehe zu: https://vercel.com/stalderroms-projects/selbstaendig-schweiz

### 2. Settings → Environment Variables
1. Klicke auf **"Settings"** (oben rechts)
2. Klicke auf **"Environment Variables"** (linke Sidebar)

### 3. Füge folgende Variables hinzu

#### Variable 1: INDEXNOW_API_KEY
- **Name:** `INDEXNOW_API_KEY`
- **Value:** `7d22c5dd-0c94-432e-b929-6355d1bc0152`
- **Environment:** Production, Preview, Development (alle auswählen)

#### Variable 2: NEXT_PUBLIC_SITE_URL
- **Name:** `NEXT_PUBLIC_SITE_URL`
- **Value:** `https://www.selbstaendig-schweiz.ch`
- **Environment:** Production, Preview, Development (alle auswählen)

### 4. Speichern & Re-Deploy
1. Klicke auf **"Save"** bei jeder Variable
2. Gehe zu **"Deployments"** Tab
3. Klicke bei letztem Deployment auf **"..."** (3 Punkte)
4. Klicke auf **"Redeploy"**
5. Warte bis Deployment abgeschlossen ist (~2-3 Minuten)

---

## ✅ VERIFIZIERUNG

Nach dem Re-Deploy kannst du testen, ob IndexNow in Production funktioniert:

### Test 1: API-Info abrufen
```bash
curl https://www.selbstaendig-schweiz.ch/api/indexnow
```

**Erwartete Antwort:**
```json
{
  "status": "IndexNow is configured",
  "host": "www.selbstaendig-schweiz.ch",
  "keyLocation": "https://www.selbstaendig-schweiz.ch/7d22c5dd-0c94-432e-b929-6355d1bc0152.txt",
  ...
}
```

### Test 2: Artikel senden (Production)
```bash
curl -X POST https://www.selbstaendig-schweiz.ch/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"type": "article", "slug": "einzelfirma-gruenden"}'
```

**Erwartete Antwort:**
```json
{
  "success": true,
  "message": "URL successfully submitted to IndexNow (200)",
  "statusCode": 200
}
```

---

## 🚨 WICHTIG: API-Key-Datei muss erreichbar sein

Die Datei `/public/7d22c5dd-0c94-432e-b929-6355d1bc0152.txt` muss öffentlich erreichbar sein:

**Test:**
```bash
curl https://www.selbstaendig-schweiz.ch/7d22c5dd-0c94-432e-b929-6355d1bc0152.txt
```

**Sollte zurückgeben:**
```
7d22c5dd-0c94-432e-b929-6355d1bc0152
```

Wenn **404 Not Found:**
1. Prüfe, ob Datei committed ist: `git status`
2. Committe & pushe: `git add public/ && git commit -m "Add IndexNow key" && git push`
3. Vercel deployt automatisch

---

## 📋 TROUBLESHOOTING

### Problem: "Environment Variable not found"
**Lösung:** Gehe zu Vercel Settings → Environment Variables und prüfe, ob beide Variables gesetzt sind.

### Problem: "404 Not Found" bei Key-Datei
**Lösung:**
```bash
# Prüfe ob Datei existiert
ls -la public/7d22c5dd-0c94-432e-b929-6355d1bc0152.txt

# Wenn nicht vorhanden, erstelle sie:
echo "7d22c5dd-0c94-432e-b929-6355d1bc0152" > public/7d22c5dd-0c94-432e-b929-6355d1bc0152.txt

# Committe & pushe
git add public/
git commit -m "Add IndexNow API key file"
git push
```

### Problem: "403 Forbidden" bei IndexNow-Request
**Ursache:** API-Key stimmt nicht mit Key-Datei überein
**Lösung:** Prüfe, ob beide den gleichen Wert haben:
- Environment Variable: `7d22c5dd-0c94-432e-b929-6355d1bc0152`
- Key-Datei Inhalt: `7d22c5dd-0c94-432e-b929-6355d1bc0152`

---

## 🎯 NÄCHSTE SCHRITTE

Nach erfolgreichem Vercel-Setup:

1. ✅ **Alle Artikel an IndexNow senden** (Production):
   ```bash
   curl -X POST https://www.selbstaendig-schweiz.ch/api/indexnow \
     -H "Content-Type: application/json" \
     -d '{"type": "all-articles"}'
   ```

2. ✅ **Bing Webmaster Tools** registrieren
   → https://www.bing.com/webmasters

3. ✅ **Monitoring** starten in Google Search Console

---

**Status:** Bereit für Production! 🚀
