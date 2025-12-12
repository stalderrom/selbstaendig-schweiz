export interface FAQ {
  question: string;
  answer: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  content: string;
  keywords: string[];
  category: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  featuredImage?: string;
  readingTime: number;
  related?: string[];
  faq?: FAQ[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
}

export const CATEGORIES: Category[] = [
  {
    slug: 'allgemein',
    name: 'Allgemein',
    description: 'Allgemeine Artikel zur Selbständigkeit in der Schweiz',
    keywords: ['selbständig schweiz', 'selbständigkeit', 'tipps', 'ratgeber', 'schweiz']
  },
  {
    slug: 'selbstaendig-machen-gruendung',
    name: 'Selbständig machen / Gründung',
    description: 'Alles rund um die Gründung deines Unternehmens in der Schweiz',
    keywords: ['startup schweiz', 'selbstständig machen', 'geschäft starten', 'einzelunternehmen', 'gründung']
  },
  {
    slug: 'steuern',
    name: 'Steuern',
    description: 'Steuern, MWST und steuerliche Aspekte der Selbständigkeit',
    keywords: ['steuern', 'mehrwertsteuer', 'mwst', 'steuererklärung', 'ahv']
  },
  {
    slug: 'versicherungen',
    name: 'Versicherungen',
    description: 'Wichtige Versicherungen für Selbständige in der Schweiz',
    keywords: ['krankenversicherung', 'krankentaggeld', 'altersversicherung', 'haftpflicht', 'bvg']
  },
  {
    slug: 'buchhaltung-und-finanzen',
    name: 'Buchhaltung & Finanzen',
    description: 'Buchhaltung, Rechnungen und finanzielle Organisation',
    keywords: ['buchhaltung', 'buchhaltungssoftware', 'rechnung', 'preisgestaltung', 'honorar']
  },
  {
    slug: 'marketing-und-kundenakquise',
    name: 'Marketing & Kundenakquise',
    description: 'Kunden gewinnen und Marketing-Strategien',
    keywords: ['marketing', 'kundenakquisition', 'seo', 'social media', 'kunden finden']
  },
  {
    slug: 'tools-und-software',
    name: 'Tools & Software',
    description: 'Nützliche Tools und Software für Selbständige',
    keywords: ['buchhaltungssoftware', 'projektmanagement', 'zeiterfassung', 'crm', 'tools']
  },
  {
    slug: 'berufsratgeber',
    name: 'Berufsratgeber',
    description: 'Spezifische Informationen zu verschiedenen selbständigen Berufen',
    keywords: ['selbständig als', 'freelancer schweiz', 'grafiker', 'programmierer', 'consultant']
  },
  {
    slug: 'einkommen-und-geschaeftsmodelle',
    name: 'Einkommen & Geschäftsmodelle',
    description: 'Verdienst, Geschäftsmodelle und Einkommensoptimierung',
    keywords: ['geld verdienen', 'einkommen', 'geschäftsmodell', 'nebeneinkommen', 'passives einkommen']
  }
];
