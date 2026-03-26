import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KostenlosRegistrierenForm from '@/components/KostenlosRegistrierenForm';

export const metadata: Metadata = {
  title: 'Kostenlos registrieren – Selbständigkeits-Cockpit',
  description: 'Dein persönliches Cockpit für Selbständige in der Schweiz. Fristen-Wächter, Dokument-Archiv, Selbständigkeits-Score — kostenlos, für immer.',
  alternates: {
    canonical: 'https://www.selbstaendig-schweiz.ch/kostenlos-registrieren',
  },
  openGraph: {
    title: 'Kostenlos registrieren – Selbständigkeits-Cockpit',
    description: 'Fristen, Dokumente, Score — dein persönliches Cockpit. Kostenlos.',
    type: 'website',
  },
};

export default function KostenlosRegistrierenPage() {
  return (
    <>
      <Header />
      <main>
        <KostenlosRegistrierenForm />
      </main>
      <Footer />
    </>
  );
}
