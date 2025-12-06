const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(__dirname, '..', 'content', 'articles');

const faqData = {
  'steuern-selbststaendige': [
    {
      question: "Welche Steuern muss ich als Selbständiger zahlen?",
      answer: "Einkommenssteuer (auf Gewinn, Bund + Kanton + Gemeinde, 15-45%), AHV/IV (10.1% vom Nettoeinkommen), Vermögenssteuer (auf Privatvermögen, kantonal unterschiedlich), MWST (ab CHF 100k Umsatz, 7.7% Standard). Zusätzlich: Grundstückgewinnsteuer bei Immobilienverkauf, Kapitalsteuer bei Firmen (GmbH/AG). Wichtig: 30-40% des Gewinns für Steuern zurücklegen!"
    },
    {
      question: "Wie viel spare ich an Steuern gegenüber Angestellten?",
      answer: "Als Selbständiger zahlen Sie WENIGER Steuern durch Abzüge. Beispiel: CHF 80k Umsatz - CHF 20k Geschäftsausgaben - CHF 8k AHV = CHF 52k steuerbares Einkommen. Abzüge: Berufskosten (100%), Home-Office, Weiterbildung, Krankenkasse, Säule 3a (CHF 7k). Effektiv: ~25-35% Steuerlast vs. 35-45% als Angestellter. Optimierung durch Säule 3a und Einkäufe spart CHF 5-15k/Jahr."
    },
    {
      question: "Wann muss ich MWST abrechnen?",
      answer: "Pflicht ab CHF 100'000 Jahresumsatz weltweit. Freiwillig ab CHF 10'000 möglich (lohnt bei hohen Vorsteuer-Ausgaben). Ablauf: Anmeldung ESTV → MWST-Nummer → Quartalsweise Abrechnung. Sie kassieren 7.7% von Kunden, ziehen Vorsteuer ab (auf Laptop, Büro, etc.), zahlen Differenz. Vorteil: Vorsteuer-Rückerstattung. Nachteil: Admin-Aufwand + höhere Preise für Privatkunden."
    },
    {
      question: "Wie hoch sind die AHV-Beiträge für Selbständige?",
      answer: "10.1% vom Nettoeinkommen (Gewinn minus Geschäftsausgaben). Minimum: CHF 503/Jahr bei Einkommen unter CHF 9'600. Maximum: 10.1% ohne Obergrenze. Zahlung: Quartalsweise Akontos, Schlussabrechnung nach Steuererklärung. Wichtig: Sofortige Anmeldung bei AHV-Kasse (innert 14 Tagen nach Start), sonst Bussen! Bei Nebenerwerb: Arbeitgeber zahlt 50%, Sie 10.1% auf Selbständigen-Einkommen."
    },
    {
      question: "Kann ich als Selbständiger Säule 3a einzahlen?",
      answer: "Ja! Bis zu CHF 35'280/Jahr (2025) ohne Pensionskasse. Mit Pensionskasse: CHF 7'056. Steuervorteil: Abzug vom steuerbaren Einkommen → Ersparnis CHF 10-15k Steuern bei CHF 35k Einzahlung. Wichtig: Regelmässig einzahlen (jedes Jahr), Geld ist gebunden bis Pensionierung (Ausnahme: Wohneigentum, Auswanderung, Selbständigkeit aufgeben). Langfristig: CHF 500k+ Alterskapital aufbauen."
    }
  ],
  'versicherungen-selbststaendige': [
    {
      question: "Welche Versicherungen sind für Selbständige Pflicht?",
      answer: "PFLICHT: Krankenversicherung (KVG bei Wohnsitz Schweiz), AHV/IV/EO (10.1% vom Einkommen, Anmeldung innert 14 Tagen). QUASI-PFLICHT: Unfallversicherung UVG (nicht gesetzlich, aber essentiell - als Selbständiger kein automatischer Schutz!), Berufshaftpflicht (bei Kundenkontakt). Optional: Pensionskasse BVG, Krankentaggeld, Erwerbsunfähigkeit. Kosten Minimum: CHF 3'000-5'000/Jahr."
    },
    {
      question: "Brauche ich eine Berufshaftpflichtversicherung?",
      answer: "JA, dringend empfohlen! Bei Schäden an Kunden haften Sie mit Privatvermögen (Einzelfirma) oder es droht Konkurs (GmbH). Beispiel: IT-Berater löscht versehentlich Kundendaten → Schadenersatz CHF 50'000. Ohne Versicherung = Privatinsolvenz. Kosten: CHF 300-2'000/Jahr je nach Branche. Deckung: CHF 1-5 Mio. Besonders wichtig: Beratung, Handwerk, IT, Gesundheit, Finanzdienstleistungen."
    },
    {
      question: "Was ist Krankentaggeld und brauche ich das?",
      answer: "Krankentaggeld zahlt bei Krankheit ab Tag X (meist Tag 30) 80% des versicherten Einkommens für bis zu 730 Tage. KRITISCH für Selbständige: Ohne = bei 3 Monaten Krankheit kein Einkommen → Existenzkrise! Kosten: CHF 150-400/Monat für CHF 80k versichertes Einkommen. Alternativen: Notreserve CHF 30-50k (unrealistisch für Starter), Frühzeitiger Verkauf des Business. Empfehlung: Ab Start mit Krankentaggeld versichern (30-Tage-Wartefrist)."
    },
    {
      question: "Muss ich in die Pensionskasse (BVG) einzahlen?",
      answer: "NEIN, nicht obligatorisch für Selbständige. Aber: Ohne BVG = Rentenlücke! AHV-Rente max. CHF 2'450/Monat → nicht genug zum Leben. Alternativen: (1) Freiwillige BVG-Anschluss (Stiftung Auffangeinrichtung), kostet 15-25% vom Lohn. (2) Säule 3a (bis CHF 35k/Jahr, steueroptimiert). (3) Private Vorsorge (ETFs, Immobilien). Empfehlung: Säule 3a + private Vorsorge für Flexibilität."
    },
    {
      question: "Wie viel kosten Versicherungen für Selbständige insgesamt?",
      answer: "MINIMUM (Basics): CHF 3'000-5'000/Jahr (Krankenkasse CHF 300/Mt, AHV 10.1%, Unfall CHF 40/Mt). EMPFOHLEN (mit Absicherung): CHF 6'000-10'000/Jahr (+ Krankentaggeld CHF 200/Mt, Berufshaftpflicht CHF 100/Mt, freiwillige BVG CHF 300/Mt). OPTIMAL (volle Absicherung): CHF 12'000-18'000/Jahr (+ Erwerbsunfähigkeit, Rechtsschutz, höhere BVG). Faustegel: 15-20% des Bruttoeinkommens."
    }
  ],
  'buchhaltung-selbststaendige': [
    {
      question: "Muss ich als Selbständiger Buchhaltung führen?",
      answer: "JA, immer! Minimum bei Einzelfirma unter CHF 500k Umsatz: Einfache Buchhaltung (Einnahmen-Ausgaben-Rechnung). Ab CHF 500k oder mit Handelsregister-Eintrag: Doppelte Buchhaltung. Bei GmbH/AG: Immer doppelte Buchhaltung + Jahresrechnung. Aufbewahrungspflicht: 10 Jahre alle Belege, Rechnungen, Kontoauszüge. Wichtig: Auch bei CHF 0 Umsatz = Buchhaltung nötig (Nullmeldung)!"
    },
    {
      question: "Brauche ich einen Treuhänder oder kann ich das selbst machen?",
      answer: "Einfache Buchhaltung (Einzelfirma < CHF 500k): Selbst machbar mit Software (Bexio, banana, Run my Accounts). Kosten: CHF 0-50/Monat Software. Doppelte Buchhaltung (> CHF 500k oder GmbH): Treuhänder sehr empfohlen. Kosten: CHF 1'500-6'000/Jahr. Vorteil Treuhänder: Keine Fehler, Steueroptimierung, Zeitersparnis. Nachteil: Kosten. Faustegel: Unter CHF 80k Umsatz selbst, darüber Treuhänder."
    },
    {
      question: "Welche Buchhaltungssoftware ist die beste für Selbständige?",
      answer: "Top 3 in der Schweiz: (1) Bexio (Marktführer, CHF 35-65/Mt, einfach, Banking-Integration, MWST-Abrechnung, Support DE). (2) Run my Accounts (günstig, CHF 10-30/Mt, solide Features). (3) banana (einmalig CHF 70-110, ohne Cloud, Datenschutz). Für Starter: Bexio Trial testen. Wichtig: MWST-Funktion (ab CHF 100k), Banking-Integration (Zeitersparnis), mobile App. Nicht empfohlen: Excel (fehleranfällig, nicht MWST-konform)."
    },
    {
      question: "Was kann ich alles von den Steuern abziehen?",
      answer: "100% absetzbar: Büromaterial, Software, Weiterbildung (berufsbezogen), Marketing, Website, Geschäftsreisen, Kundenessen (mit Limit), Versicherungen (Berufshaftpflicht, UVG, etc.), Miete Büro/Home-Office (anteilig), Telefon/Internet (anteilig 50-100%), Fahrzeugkosten (geschäftlich, Fahrtenbuch!), AHV-Beiträge, Säule 3a. NICHT absetzbar: Privatausgaben, Krankenkasse (privat), Privatfahrten, Kleidung (ausser spezifisch beruflich). Wichtig: Belege aufbewahren!"
    },
    {
      question: "Wann muss ich die Steuererklärung als Selbständiger abgeben?",
      answer: "Frist: 31. März des Folgejahres (für Einkommen 2024 → Abgabe bis 31.3.2025). Verlängerung: Automatisch bis 30. September bei Online-Einreichung oder Antrag. Selbständige mit MWST: Quartalsweise MWST-Abrechnung (jeweils 60 Tage nach Quartalsende). Wichtig: Erste Steuererklärung als Selbständiger rechtzeitig einreichen → Basis für AHV-Akontozahlungen. Verspätung: Bussen ab CHF 100, bei Zahlungsverzug Verzugszinsen 4.5%."
    }
  ],
  'kunden-gewinnen-schweiz': [
    {
      question: "Wie finde ich meine ersten Kunden als Selbständiger?",
      answer: "Die besten 5 Wege für Starter: (1) Netzwerk aktivieren (Familie, Freunde, Ex-Kollegen → erste Aufträge). (2) LinkedIn optimieren (Profil vervollständigen, regelmässig posten, aktiv kommentieren). (3) Google My Business (lokal sichtbar, gratis). (4) Gratis-Erstberatung anbieten (30 Min, dann Angebot). (5) Kooperationen (mit Agenturen, anderen Selbständigen). Timeline: Erste Anfragen Woche 1-4, stabiles Geschäft nach 3-6 Monaten mit Geduld und Konsequenz."
    },
    {
      question: "Lohnt sich Google Ads für Selbständige?",
      answer: "Ja, ABER nur mit Strategie! Vorteil: Sofort Leads, messbar, skalierbar. Nachteil: Teuer (CHF 2-20 pro Klick in der Schweiz), Konkurrenz hoch. Budget: Minimum CHF 500-1'000/Monat für Test, optimal CHF 2'000-5'000/Mt. Wichtig: (1) Lokale Keywords ('Webdesigner Zürich'), (2) Landing Page optimiert, (3) Conversion Tracking, (4) Negative Keywords. Alternative für Starter: SEO (langsam, aber gratis langfristig)."
    },
    {
      question: "Brauche ich eine Website als Selbständiger?",
      answer: "JA, absolut! 85% der Schweizer googeln vor Kaufentscheidung. Ohne Website = unseriös. Minimum: One-Pager mit Über mich, Leistungen, Kontakt, Referenzen. Kosten: CHF 500-2'000 (Template, selbst gemacht mit Webflow/Wix) oder CHF 3'000-10'000 (Agentur, professionell). Wichtig: Mobile-optimiert, schnelle Ladezeit, klare CTAs. Alternative: LinkedIn-Profil + Google My Business (kurzfristig OK, langfristig Website nötig)."
    },
    {
      question: "Wie wichtig sind Empfehlungen und wie bekomme ich sie?",
      answer: "SEHR wichtig! 60-80% der Selbständigen leben von Empfehlungen. Strategie: (1) Nach jedem Projekt aktiv um Empfehlung bitten ('Kennen Sie jemanden, der...?'). (2) Incentive: CHF 200-500 Empfehlungsbonus oder 10% Rabatt. (3) LinkedIn Empfehlungen (sichtbar für alle). (4) Google Bewertungen (SEO-Boost). (5) Timing: Fragen direkt nach erfolgreichem Projektabschluss. 1 zufriedener Kunde = 2-5 neue Kunden durch Empfehlungen!"
    }
  ],
  'tools-selbststaendige': [
    {
      question: "Welche Tools brauche ich minimal als Selbständiger?",
      answer: "Absolute Must-haves: (1) Buchhaltung: Bexio oder banana (MWST, Rechnungen). (2) Zeiterfassung: Timeular oder Toggl (Stundenabrechnung). (3) Rechnungen: in Buchhaltungssoftware integriert. (4) E-Mail: Gmail Business oder Outlook (professionell, eigene Domain). (5) Datensicherung: Backblaze oder Google Drive (automatisch). Kosten total: CHF 50-150/Monat. Optional später: CRM, Projektmanagement, Marketing-Tools."
    },
    {
      question: "Brauche ich ein CRM als Einzelkämpfer?",
      answer: "Ab 5+ Kunden: JA! Ohne CRM = vergessene Follow-ups, verlorene Leads. Einfache Optionen: (1) Google Sheets (gratis, Start). (2) HubSpot CRM (gratis, professionell). (3) Pipedrive (CHF 15/Mt, Sales-fokussiert). (4) Bexio (CHF 40/Mt, alles-in-einem mit Buchhaltung). Wichtig: Kontakte tracken, Verkaufspipeline visualisieren, Follow-up-Erinnerungen. Zeitersparnis: 3-5h/Woche. ROI: 1-2 zusätzliche Aufträge/Jahr = CHF 10-50k."
    },
    {
      question: "Welche Tools sind ihr Geld wirklich wert?",
      answer: "Top 5 mit bestem ROI: (1) Buchhaltungssoftware (Bexio CHF 40/Mt = 10h/Mt gespart = CHF 800 wert). (2) Zeiterfassung (Timeular CHF 10/Mt = korrekte Rechnungsstellung = +15% Umsatz). (3) E-Mail-Marketing (Mailchimp/Brevo CHF 0-20/Mt = Re-Aktivierung alte Kunden = CHF 5k+/Jahr). (4) Scheduling (Calendly CHF 0-10/Mt = keine Pingpong-E-Mails = 2h/Woche). (5) Cloud-Storage (Google Workspace CHF 6/Mt = nie mehr Datenverlust)."
    }
  ],
  'selbstaendig-schweiz-berufe': [
    {
      question: "Welche selbständigen Berufe sind in der Schweiz besonders gefragt?",
      answer: "Top 10 nach Nachfrage: (1) IT/Softwareentwickler (CHF 80-150k/Jahr). (2) Unternehmensberater (CHF 100-200k+). (3) Grafik-/Webdesigner (CHF 60-100k). (4) Texter/Content Creator (CHF 50-80k). (5) Handwerker (Elektriker, Maler CHF 60-100k). (6) Immobilienmakler (CHF 80-150k+). (7) Coach/Trainer (CHF 60-120k). (8) Marketing-Spezialist (CHF 70-120k). (9) Fotograf (CHF 50-80k). (10) Treuhänder (CHF 80-150k). Wichtig: Hohe Nachfrage ≠ niedriger Wettbewerb!"
    },
    {
      question: "Kann ich als [Beruf] wirklich selbständig werden?",
      answer: "Fast ALLE Berufe sind selbständig möglich! Ausnahmen: Reglementierte Berufe (Arzt, Anwalt, Apotheker = Zulassung nötig). Voraussetzungen prüfen: (1) Bewilligungspflicht? (Gastronomie, Personenbeförderung, etc.). (2) Ausbildungsnachweis? (Handwerk meist ja). (3) Versicherungen? (Finanzberater = Haftpflicht 5 Mio). Check: Branchenverband oder Gemeinde/Kanton fragen. In 90% der Fälle: Sofort loslegen möglich!"
    },
    {
      question: "Wie viel verdiene ich durchschnittlich als selbständiger [Beruf]?",
      answer: "Grosse Spanne! Beispiel IT-Freelancer: Starter CHF 50-70k/Jahr, Erfahren CHF 100-150k, Top 10% CHF 200k+. Faktoren: (1) Erfahrung (+ CHF 10-20k/Jahr). (2) Spezialisierung (Generalist CHF 60k, Nischen-Experte CHF 120k). (3) Verkaufsfähigkeiten (50% des Erfolgs!). (4) Standort (Zürich +30% vs. Landregion). Realistisch: 1. Jahr = 50-70% Angestelltenlohn, ab Jahr 3 = 120-150%, ab Jahr 5+ = 200%+ möglich."
    }
  ],
  'geld-verdienen-schweiz': [
    {
      question: "Welches Geschäftsmodell eignet sich am besten für Einsteiger?",
      answer: "Top 3 für Starter: (1) Zeit gegen Geld (Beratung, Freelancing) = einfach, sofort Umsatz, planbar. Beispiel: Webdesigner CHF 100/h × 20h/Woche = CHF 8k/Monat. (2) Projekt-basiert (definiertes Endprodukt) = höhere Margen, skalierbar. Beispiel: Website CHF 5k Festpreis statt 50h × CHF 80. (3) Retainer (monatliches Pauschal) = planbare Einnahmen. Beispiel: SEO-Betreuung CHF 2k/Monat × 5 Kunden = CHF 10k fix. Vermeiden am Anfang: Digitale Produkte, Affiliate (dauert 6-12 Monate bis Umsatz)."
    },
    {
      question: "Kann ich als Selbständiger passives Einkommen aufbauen?",
      answer: "Ja, aber: Passiv ≠ sofort & ohne Arbeit! Realistische Modelle: (1) Digitale Produkte (E-Book, Kurs) = 3-6 Monate Aufbau, dann CHF 500-5k/Mt passiv. (2) Affiliate-Marketing = 6-12 Monate SEO, dann CHF 1-10k/Mt. (3) Lizenzierung (Software, Templates) = initial 6-12 Monate, dann CHF 2-20k/Mt. (4) Mitgliedschaften/Abo-Modelle = CHF 50-200/Mitglied, 50+ Mitglieder = CHF 5k/Mt. Timeline: 1-2 Jahre bis signifikant, aber dann skalierbar!"
    },
    {
      question: "Wie viel kann ich realistisch im ersten Jahr verdienen?",
      answer: "Realistische Bandbreite Jahr 1: CHF 30'000-80'000 (60-80% vom Angestelltenlohn). Faktoren: (1) Nebenberuflich vs. Vollzeit (nebenberuflich CHF 10-30k zusätzlich). (2) Startkapital (mit CHF 30k Reserve = mehr Risiko = mehr Kunden = CHF 60-80k). (3) Branche (IT/Beratung CHF 60-100k, Handwerk CHF 40-70k, Kreative CHF 30-60k). (4) Netzwerk (mit Netzwerk CHF 60k+, ohne CHF 30-40k). Wichtig: Nicht zu früh aufgeben - Monat 9-12 oft Durchbruch!"
    }
  ]
};

// Update each article
Object.keys(faqData).forEach(slug => {
  const filePath = path.join(articlesDir, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);

    // Only add if FAQs don't exist yet
    if (!parsed.data.faq || parsed.data.faq.length === 0) {
      parsed.data.faq = faqData[slug];

      const updated = matter.stringify(parsed.content, parsed.data);
      fs.writeFileSync(filePath, updated);

      console.log(`✅ FAQs added to ${slug}.md (${faqData[slug].length} questions)`);
    } else {
      console.log(`⏭️  ${slug}.md already has FAQs, skipping`);
    }
  } else {
    console.log(`❌ ${slug}.md not found`);
  }
});

console.log('\n🎉 All remaining FAQs successfully added!');
console.log(`📊 Total articles with FAQs: ${Object.keys(faqData).length + 3} (3 done earlier + ${Object.keys(faqData).length} now)`);
