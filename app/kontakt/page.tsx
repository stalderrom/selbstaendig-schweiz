import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktieren Sie Selbständig Schweiz - Wir helfen Ihnen gerne weiter',
  robots: {
    index: true,
    follow: true,
  },
};

export default function KontaktPage() {
  return (
    <>
      <Header />

      <main className="bg-warm-white min-h-screen">
        {/* Hero */}
        <section className="border-b border-warm-200 bg-warm-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <p className="category-label text-accent mb-4">Kontakt</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-warm-900 leading-tight mb-4">
              Wie können wir helfen?
            </h1>
            <p className="text-warm-600 text-lg leading-relaxed max-w-xl">
              Fragen, Feedback oder Themenvorschläge — wir freuen uns von Ihnen zu hören.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-14">
            {/* Kontakt Informationen */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-warm-900 mb-8">
                Kontaktinformationen
              </h2>

              <div className="space-y-8">
                <div className="border-t border-warm-200 pt-6">
                  <h3 className="font-semibold text-warm-900 mb-2">E-Mail</h3>
                  <a
                    href="mailto:kontakt@selbstaendig-schweiz.ch"
                    className="text-accent hover:text-accent-dark font-medium transition-colors"
                  >
                    kontakt@selbstaendig-schweiz.ch
                  </a>
                </div>

                <div className="border-t border-warm-200 pt-6">
                  <h3 className="font-semibold text-warm-900 mb-2">Adresse</h3>
                  <p className="text-warm-700 leading-relaxed">
                    Selbständig Schweiz<br />
                    [Strasse und Hausnummer]<br />
                    [PLZ und Ort]<br />
                    Schweiz
                  </p>
                </div>

                <div className="border-t border-warm-200 pt-6">
                  <h3 className="font-semibold text-warm-900 mb-2">Antwortzeit</h3>
                  <p className="text-warm-700">
                    Wir bemühen uns, Ihre Anfrage innerhalb von 24–48 Stunden zu beantworten.
                  </p>
                </div>
              </div>
            </div>

            {/* Häufig gestellte Fragen */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-warm-900 mb-8">
                Häufige Fragen
              </h2>

              <div className="space-y-0">
                <div className="border-t border-warm-200 pt-6 pb-6">
                  <h3 className="font-semibold text-warm-900 mb-2">
                    Bieten Sie individuelle Beratung an?
                  </h3>
                  <p className="text-warm-700 leading-relaxed text-sm">
                    Aktuell bieten wir umfassende Informationen und Guides auf unserer Website.
                    Für individuelle Beratung empfehlen wir die Kontaktaufnahme mit einem
                    Treuhänder oder Unternehmensberater in Ihrer Region.
                  </p>
                </div>

                <div className="border-t border-warm-200 pt-6 pb-6">
                  <h3 className="font-semibold text-warm-900 mb-2">
                    Kann ich Artikel vorschlagen?
                  </h3>
                  <p className="text-warm-700 leading-relaxed text-sm">
                    Ja, gerne! Senden Sie uns Ihre Themenvorschläge per E-Mail. Wir prüfen
                    alle Vorschläge und nehmen die relevantesten in unsere Redaktionsplanung auf.
                  </p>
                </div>

                <div className="border-t border-warm-200 pt-6 pb-6">
                  <h3 className="font-semibold text-warm-900 mb-2">
                    Sind die Informationen aktuell?
                  </h3>
                  <p className="text-warm-700 leading-relaxed text-sm">
                    Wir aktualisieren unsere Artikel regelmässig. Dennoch können sich Gesetze
                    und Regelungen ändern. Bitte prüfen Sie wichtige Informationen zusätzlich
                    bei offiziellen Stellen.
                  </p>
                </div>

                <div className="border-t border-warm-200" />
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="mt-16 bg-ink p-10 text-center">
            <p className="category-label text-accent-mid mb-4">Weiterlesen</p>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-warm-white mb-4 leading-tight">
              Noch nicht gefunden, was Sie suchen?
            </h3>
            <p className="text-warm-500 mb-8 leading-relaxed">
              Stöbern Sie durch unsere Guides zur Selbstständigkeit in der Schweiz.
            </p>
            <Link
              href="/artikel"
              className="inline-block bg-accent text-white px-8 py-3 text-sm font-semibold hover:bg-accent-dark transition-colors rounded-md"
            >
              Alle Artikel durchstöbern
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
