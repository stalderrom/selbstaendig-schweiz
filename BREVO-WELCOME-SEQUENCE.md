# Brevo Welcome Sequence (3 Emails)

## Setup checklist in Brevo

1. Create/confirm subscriber list (`BREVO_LIST_ID`, default `2` in code).
2. Create double opt-in template and set:
   - `BREVO_DOI_TEMPLATE_ID`
   - `BREVO_DOI_REDIRECT_URL` (e.g. `https://www.selbstaendig-schweiz.ch/kostenlos-registrieren?confirmed=1`)
3. Build automation:
   - Trigger: contact added to list
   - Send Email 1 immediately
   - Wait 3 days, send Email 2
   - Wait 4 more days, send Email 3

## Email 1 (Immediate)

- Subject: Willkommen bei Selbständig Schweiz, {{ contact.FIRSTNAME | default:"du" }}!
- Preview: Deine wichtigsten Ressourcen für einen starken Start.

Body core:
- Kurze Begruessung + danke fuer die Anmeldung.
- Link zu den 5 meistgelesenen Artikeln:
  - `https://www.selbstaendig-schweiz.ch/artikel`
- CTA: "Starte mit dem ersten Schritt heute."

Footer (required):
- "Du erhaeltst diese E-Mail, weil du dich auf selbständig-schweiz.ch angemeldet hast."
- "Abmelden: {{ unsubscribe }}"
- Impressum: `https://www.selbstaendig-schweiz.ch/impressum`

## Email 2 (Day 3) - Checkliste

- Subject: Deine Checkliste fuer die Selbstaendigkeit in der Schweiz
- Preview: Die wichtigsten Punkte, damit du nichts vergisst.

Body core:
- Kurze Einleitung: Schritt-fuer-Schritt, pragmatisch.
- Lead magnet CTA:
  - "Checkliste Selbstaendigkeit Schweiz"
  - Link auf passende Landingpage oder Artikel (to be selected by content team).
- CTA: "Checkliste speichern und Punkt fuer Punkt abhaken."

Footer (required):
- "Abmelden: {{ unsubscribe }}"
- Impressum: `https://www.selbstaendig-schweiz.ch/impressum`

## Email 3 (Day 7) - Tool Empfehlungen

- Subject: 4 Tools, die dir als Selbstaendige/r sofort Zeit sparen
- Preview: Buchhaltung, Organisation und E-Mail-Marketing ohne Chaos.

Body core:
- Kurz erklaeren, dass nur konkret hilfreiche Tools empfohlen werden.
- Tool-Links (affiliate route):
  - Bexio: `https://www.selbstaendig-schweiz.ch/go/bexio`
  - Banana: `https://www.selbstaendig-schweiz.ch/go/banana`
  - Brevo: `https://www.selbstaendig-schweiz.ch/go/brevo`
- CTA: "Waehle ein Tool und setze es diese Woche um."

Footer (required):
- "Transparenz: Einige Links sind Affiliate-Links."
- "Abmelden: {{ unsubscribe }}"
- Impressum: `https://www.selbstaendig-schweiz.ch/impressum`
