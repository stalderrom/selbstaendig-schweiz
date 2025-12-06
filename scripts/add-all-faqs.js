const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(__dirname, '..', 'content', 'articles');

const faqData = {
  'gmbh-gruenden': [
    {
      question: "Wie viel kostet es, eine GmbH zu gründen?",
      answer: "Total: CHF 24'000-38'000 (inkl. Stammkapital). Aufgeteilt: CHF 20'000 Stammkapital (gehört GmbH, für Geschäft nutzbar) + CHF 4'000-18'000 Gründungskosten (Notar CHF 800-2'000, Handelsregister CHF 600-900, SHAB CHF 150-250, Anwalt CHF 500-2'000, Logo/Website CHF 1'500-8'000, Diverses CHF 500-1'000). Minimum: CHF 22'000. Laufend: CHF 15'000-70'000/Jahr (Buchhaltung, Steuern, Versicherungen, Lohnnebenkosten)."
    },
    {
      question: "Kann ich eine GmbH alleine gründen?",
      answer: "Ja! Sie können einziger Gesellschafter UND Geschäftsführer sein. Minimum: 1 Person. Sie bringen CHF 20'000 Stammkapital, erhalten 100% der Anteile. Wichtig: Trotzdem Generalversammlung abhalten (Sie alleine beschliessen), Protokoll führen. Vorteil: Volle Kontrolle. Nachteil: Alle Verantwortung bei Ihnen. Häufig: Start alleine, später Partner dazu (Kapitalerhöhung oder Verkauf von Stammeinlagen)."
    },
    {
      question: "Wie lange dauert es, eine GmbH zu gründen?",
      answer: "2-6 Wochen total. Aufgeteilt: Woche 1-2: Vorbereitung (Statuten, Businessplan, Kapital). Woche 2-3: Notar-Termin, Kapitalkonto, Einzahlung. Woche 3-6: Handelsregister-Eintrag (5-15 Tage je nach Kanton). Schnellster Weg: 2 Wochen (wenn alles perfekt vorbereitet, Zürich/Zug schnell). Langsamster: 8 Wochen (wenn Unterlagen fehlen, Kantone langsam). Zum Vergleich: Einzelfirma dauert 1-3 Tage."
    },
    {
      question: "Was passiert mit den CHF 20'000 Stammkapital?",
      answer: "Das Geld gehört der GmbH (nicht Ihnen persönlich). Vor HR-Eintrag: Gesperrt auf Kapitalkonto. Nach HR-Eintrag: Freigegeben für Geschäftsbetrieb. Sie können es nutzen für: Büro-Miete, Equipment, Marketing, Löhne, Lieferanten. NICHT: Einfach wieder an sich privat auszahlen (= Veruntreuung!). Bei Liquidation: Was übrig bleibt, zurück an Gesellschafter (proportional zu Stammeinlagen). Wichtig: CHF 20k sind MINIMUM, besser CHF 30-50k Startkapital."
    },
    {
      question: "Hafte ich bei einer GmbH persönlich?",
      answer: "Grundsätzlich NEIN. Sie haften nur bis CHF 20'000 (Stammkapital). Ihr Privatvermögen (Haus, Auto, Ersparnis) ist geschützt. ABER Ausnahmen: (1) Konkursverschleppung (weitergemacht trotz Insolvenz), (2) Sozialversicherungen nicht bezahlt (AHV, BVG), (3) Vermischung GmbH/Privat (kein getrenntes Vermögen), (4) Betrug/Vorsatz. Schutz: Saubere Buchhaltung, Sozialversicherungen zahlen, bei Krise rechtzeitig Konkurs, Geschäftsführer-Haftpflicht (D&O)."
    },
    {
      question: "Muss ich als Geschäftsführer einer GmbH Lohn beziehen?",
      answer: "Nicht zwingend, aber dringend empfohlen! Rechtlich: Sie können CHF 0 Lohn nehmen, nur Dividenden. ABER: (1) Steuern: Bei CHF 0 Lohn korrigiert Steuerbehörde oft (='verdeckte Gewinnausschüttung'), verlangt Nachzahlung. (2) AHV: Bei CHF 0 Lohn keine AHV-Beiträge = Rentenlücke. (3) BVG: Nur auf Lohn (ab CHF 22k), nicht auf Dividende. (4) Hypothek: Bank will Lohn sehen. Empfehlung: Mind. CHF 60-80k Lohn bei Vollzeit, Rest Dividende (steueroptimiert)."
    },
    {
      question: "Wann lohnt sich eine GmbH gegenüber Einzelfirma?",
      answer: "GmbH lohnt sich bei: (1) Haftungsrisiko: Produktion, Handel, Gastronomie, Immobilien (Privatvermögen schützen!). (2) Hoher Gewinn: Ab ca. CHF 150'000 (Steueroptimierung durch Lohn/Dividende-Split). (3) Partner/Investoren: GmbH = klare Struktur. (4) Image: B2B-Kunden bevorzugen oft GmbH. (5) Familie absichern: GmbH läuft weiter bei Tod. Einzelfirma besser bei: Niedriges Risiko (Beratung, IT), Umsatz < CHF 80k (GmbH zu teuer), Solo (keine Partner), schneller Start."
    }
  ],
  'selbstaendig-machen-schweiz': [
    {
      question: "Wie viel Geld brauche ich, um mich selbständig zu machen?",
      answer: "Minimum: CHF 15'000-30'000 für 3-6 Monate Überbrückung. Realistisch: CHF 30'000-80'000 (6-12 Monate Lebenshaltung + Gründungskosten + erste Investitionen). Einzelfirma-Gründung: CHF 500-5'000. GmbH: CHF 24'000-38'000. Dazu: Equipment, Website, Marketing. Tipp: Nebenberuflich starten reduziert finanzielles Risiko massiv."
    },
    {
      question: "Einzelfirma oder GmbH - was ist besser?",
      answer: "Einzelfirma: Schnell (1-3 Tage), günstig (ab CHF 500), einfach. ABER: Unbeschränkte Haftung (Privatvermögen!). Ideal für: Dienstleister, Berater, IT, niedriges Risiko. GmbH: Haftungsschutz, professioneller, steueroptimiert. ABER: Teuer (CHF 24k+), komplex (Notar, Buchhaltung). Ideal für: Handel, Produktion, Partner, hohes Risiko. Empfehlung: Start Einzelfirma, bei Erfolg später GmbH."
    },
    {
      question: "Brauche ich einen Businessplan?",
      answer: "Nicht zwingend, aber sehr empfohlen! Minimum (für Sie selbst): 2-3 Seiten mit Geschäftsidee, Zielkunden, Kosten/Einnahmen-Rechnung, 12-Monats-Plan. Ausführlich (für Bank/Investoren): 20-40 Seiten mit Marktanalyse, Wettbewerb, Marketing, Finanzplan. Nutzen: Zwingt Sie zum Durchdenken, zeigt Lücken auf, erleichtert Entscheidungen. Tools: BMC (Business Model Canvas), Lean Canvas."
    },
    {
      question: "Welche Versicherungen brauche ich als Selbständiger?",
      answer: "PFLICHT: Krankenversicherung (KVG), AHV (10.1% vom Einkommen). DRINGEND empfohlen: Krankentaggeld (bei Krankheit), Unfallversicherung (UVG), Berufshaftpflicht (bei Schäden an Kunden). Optional: Pensionskasse (BVG/Säule 3a), Erwerbsunfähigkeit, Rechtsschutz. Kosten: CHF 3'000-8'000/Jahr. Häufigster Fehler: Krankentaggeld vergessen, dann 3 Monate krank = Existenzkrise."
    },
    {
      question: "Wie finde ich meine ersten Kunden?",
      answer: "Start: (1) Netzwerk aktivieren (Familie, Freunde, Ex-Kollegen). (2) LinkedIn-Profil optimieren, aktiv posten. (3) Google My Business (lokal). (4) Gratis-Erstberatung anbieten. (5) Kooperationen (andere Selbständige, Agenturen). Danach: Website mit SEO, Google Ads, Networking-Events, Empfehlungen (Rabatt für Weiterempfehlung). Geduld: Erste Kunden in Woche 1-4, stabile Pipeline nach 3-6 Monaten."
    }
  ]
};

// Update each article
Object.keys(faqData).forEach(slug => {
  const filePath = path.join(articlesDir, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);

    parsed.data.faq = faqData[slug];

    const updated = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, updated);

    console.log(`✅ FAQs added to ${slug}.md (${faqData[slug].length} questions)`);
  }
});

console.log('\n🎉 All FAQs successfully added!');
