import { Metadata } from 'next';
import DashboardShell from '@/components/DashboardShell';

export const metadata: Metadata = {
  title: 'Mein Cockpit – selbständig-schweiz.ch',
  description: 'Dein persönliches Selbständigkeits-Cockpit: Fristen, Dokumente, Score und Experten-Fragen.',
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardShell />;
}
