const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(__dirname, '..', 'content', 'articles');

// FAQ-Extraktion für einzelfirma-gruenden.md
const einzelfirmaFaqs = [
  {
    question: "Wie viel kostet es, eine Einzelfirma zu gründen?",
    answer: "Minimum: CHF 500-1'500 (ohne HR-Eintrag, DIY-Website). Standard: CHF 2'500-5'000 (mit HR-Eintrag, einfache Website, Basics). Professionell: CHF 5'000-12'000 (Logo, Website, Beratung). Plus: 6-12 Monate Lebenshaltungskosten als Reserve (CHF 25'000-60'000). Laufende Kosten: CHF 15'000-40'000/Jahr (Versicherungen, AHV, Software, Marketing). Aber: Kein Mindestkapital wie bei GmbH (CHF 20'000)."
  },
  {
    question: "Brauche ich ein Handelsregister für eine Einzelfirma?",
    answer: "Pflicht: Ab CHF 100'000 Jahresumsatz. Freiwillig darunter: Vorteile: Firmenname geschützt, professioneller, Geschäftskonto einfacher. Nachteile: Kosten CHF 200-600 einmalig + jährliche Mutation bei Änderungen. Empfehlung: Wenn Sie seriös auftreten wollen → eintragen. Wenn Sie nebenbei testen → warten bis CHF 100k. Kosten: CHF 200-600 je nach Kanton + CHF 50-100 Notar."
  },
  {
    question: "Wie lange dauert es, eine Einzelfirma zu gründen?",
    answer: "Ohne Handelsregister: 1 Tag (AHV-Anmeldung, loslegen). Mit Handelsregister: 3-7 Tage (Unterschrift beglaubigen, HR-Eintrag wartet 3-5 Tage). Mit Bewilligungen: 2-8 Wochen (je nach Bewilligung). Schnellster Weg: Heute entscheiden, morgen AHV anmelden, übermorgen erste Rechnung schreiben. Zum Vergleich: GmbH dauert 2-6 Wochen."
  },
  {
    question: "Was ist der Unterschied zwischen Einzelfirma und Einzelunternehmen?",
    answer: "Keine! Gleiche Rechtsform, verschiedene Bezeichnungen. 'Einzelfirma' ist gebräuchlicher in der Deutschschweiz. 'Einzelunternehmen' eher offizieller Begriff. Rechtlich identisch: Eine Person, unbeschränkte Haftung, kein Mindestkapital. Auch genannt: 'Inhaber', 'Selbständigerwerbende', 'Einzelkämpfer'. Im Gesetz: OR Art. 934 ff."
  },
  {
    question: "Kann ich eine Einzelfirma nebenberuflich gründen?",
    answer: "Ja! Sehr verbreitet und empfohlen. Wichtig: (1) Arbeitgeber informieren (Arbeitsvertrag prüfen – meist Erlaubnis nötig bei Konkurrenz). (2) AHV: Bei Haupterwerb (Angestellter) zahlt AG, bei Nebenerwerb Sie (10.1%). (3) Arbeitszeit: Max. 45-50h/Woche total (Gesundheitsschutz). (4) Steuern: Beide Einkommen addiert. Vorteil: Risiko minimiert, Kunden aufbauen, testen. Nach 1-2 Jahren: Entscheidung Vollzeit ja/nein."
  },
  {
    question: "Hafte ich mit meinem Privatvermögen bei einer Einzelfirma?",
    answer: "Ja, vollumfänglich! Geschäftsschulden = Privatschulden. Ihr Haus, Auto, Ersparnis können gepfändet werden. Beispiel: Kunde verklagt Sie auf CHF 50'000 Schadenersatz, Sie verlieren → Privatvermögen haftet. Schutz: (1) Berufshaftpflicht-Versicherung (dringend!). (2) Niedriges Risiko-Geschäft wählen. (3) Bei hohem Risiko → GmbH gründen (Haftung beschränkt auf CHF 20'000 Kapital). Häufigste Fehler: Handwerker ohne Haftpflicht, dann Schaden."
  },
  {
    question: "Muss ich als Einzelfirma MWST abrechnen?",
    answer: "Pflicht ab: CHF 100'000 Jahresumsatz (weltweit). Freiwillig ab: CHF 10'000 (macht Sinn bei hohen Geschäftsausgaben mit MWST). Ablauf: Anmeldung ESTV → MWST-Nummer → Quartalsweise Abrechnung (7.7% kassieren, Vorsteuer abziehen). Vorteil: Vorsteuer zurück (auf Laptop, Büro, etc.). Nachteil: Admin-Aufwand, höhere Preise für B2C. Unter CHF 100k: Meist nicht lohnenswert (ausser hohe Investitionen)."
  }
];

// Update einzelfirma-gruenden.md
const einzelfirmaPath = path.join(articlesDir, 'einzelfirma-gruenden.md');
const einzelfirmaContent = fs.readFileSync(einzelfirmaPath, 'utf8');
const einzelfirmaParsed = matter(einzelfirmaContent);

einzelfirmaParsed.data.faq = einzelfirmaFaqs;

const updatedContent = matter.stringify(einzelfirmaParsed.content, einzelfirmaParsed.data);
fs.writeFileSync(einzelfirmaPath, updatedContent);

console.log('✅ FAQs added to einzelfirma-gruenden.md');
