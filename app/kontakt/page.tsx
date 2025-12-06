import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

      <main className="bg-white min-h-screen">
        <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Kontakt
            </h1>
            <p className="text-xl text-blue-100">
              Haben Sie Fragen? Wir sind für Sie da!
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Kontakt Informationen */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Kontaktinformationen
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">E-Mail</h3>
                  <a
                    href="mailto:kontakt@selbstaendig-schweiz.ch"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    kontakt@selbstaendig-schweiz.ch
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Adresse</h3>
                  <p className="text-gray-700">
                    Selbständig Schweiz<br />
                    [Strasse und Hausnummer]<br />
                    [PLZ und Ort]<br />
                    Schweiz
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Antwortzeit</h3>
                  <p className="text-gray-700">
                    Wir bemühen uns, Ihre Anfrage innerhalb von 24-48 Stunden zu beantworten.
                  </p>
                </div>
              </div>
            </div>

            {/* Häufig gestellte Fragen */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Häufig gestellte Fragen
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Bieten Sie individuelle Beratung an?
                  </h3>
                  <p className="text-gray-700">
                    Aktuell bieten wir umfassende Informationen und Guides auf unserer Website.
                    Für individuelle Beratung empfehlen wir die Kontaktaufnahme mit einem
                    Treuhänder oder Unternehmensberater in Ihrer Region.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Kann ich Artikel vorschlagen?
                  </h3>
                  <p className="text-gray-700">
                    Ja, gerne! Senden Sie uns Ihre Themenvorschläge per E-Mail. Wir prüfen
                    alle Vorschläge und nehmen die relevantesten in unsere Redaktionsplanung auf.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Sind die Informationen aktuell?
                  </h3>
                  <p className="text-gray-700">
                    Wir aktualisieren unsere Artikel regelmässig. Dennoch können sich Gesetze
                    und Regelungen ändern. Bitte prüfen Sie wichtige Informationen zusätzlich
                    bei offiziellen Stellen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="mt-16 bg-blue-50 rounded-2xl p-10 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Noch nicht gefunden, was Sie suchen?
            </h3>
            <p className="text-gray-700 mb-6">
              Stöbern Sie durch unsere umfangreichen Artikel zur Selbstständigkeit in der Schweiz
            </p>
            <a
              href="/artikel"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Alle Artikel durchstöbern
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
