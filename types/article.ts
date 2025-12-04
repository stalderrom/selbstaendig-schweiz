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
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
}

export const CATEGORIES: Category[] = [
  {
    slug: 'grundung',
    name: 'Gründung & Start',
    description: 'Alles rund um die Gründung deines Unternehmens in der Schweiz',
    keywords: ['startup schweiz', 'selbstständig machen', 'geschäft starten', 'einzelunternehmen', 'gründung']
  },
  {
    slug: 'finanzen',
    name: 'Finanzen & Steuern',
    description: 'Steuern, Buchhaltung und finanzielle Aspekte der Selbständigkeit',
    keywords: ['steuern', 'buchhaltung', 'mehrwertsteuer', 'steuererklärung', 'rechnungsvorlage']
  },
  {
    slug: 'versicherungen',
    name: 'Versicherungen',
    description: 'Wichtige Versicherungen für Selbständige in der Schweiz',
    keywords: ['krankenversicherung', 'altersversicherung', 'haftpflicht', 'berufsunfähigkeit']
  },
  {
    slug: 'einkommen',
    name: 'Einkommen & Preise',
    description: 'Verdienst, Preisgestaltung und Honorare optimieren',
    keywords: ['verdienen', 'tarif', 'honorar', 'preisgestaltung', 'einkommenssteigerung']
  },
  {
    slug: 'marketing',
    name: 'Marketing & Kunden',
    description: 'Kunden gewinnen und Marketing-Strategien',
    keywords: ['marketing', 'kundenakquisition', 'seo', 'social media', 'kunden finden']
  },
  {
    slug: 'berufe',
    name: 'Berufe & Branchen',
    description: 'Spezifische Informationen zu verschiedenen selbständigen Berufen',
    keywords: ['freelancer schweiz', 'texter', 'grafiker', 'programmierer', 'consultant']
  },
  {
    slug: 'lifestyle',
    name: 'Lifestyle & Balance',
    description: 'Work-Life-Balance und ortsunabhängiges Arbeiten',
    keywords: ['work-life balance', 'home office', 'ortsunabhängig', 'burnout']
  }
];
