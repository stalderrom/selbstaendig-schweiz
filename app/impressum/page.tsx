import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum und Kontaktinformationen von Selbständig Schweiz',
  robots: {
    index: true,
    follow: true,
  },
};

export default function ImpressumPage() {
  return (
    <>
      <Header />

      <main className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Impressum</h1>

          <div className="prose prose-lg max-w-none">
            <h2>Angaben gemäss Art. 3 Abs. 1 E-Commerce-Gesetz</h2>

            <h3>Betreiber dieser Website</h3>
            <p>
              <strong>Selbständig Schweiz</strong><br />
              [Ihre Firma oder Name]<br />
              [Strasse und Hausnummer]<br />
              [PLZ und Ort]<br />
              Schweiz
            </p>

            <h3>Kontakt</h3>
            <p>
              E-Mail: <a href="mailto:kontakt@selbständig-schweiz.ch">kontakt@selbständig-schweiz.ch</a><br />
              Telefon: [Ihre Telefonnummer]
            </p>

            <h3>Handelsregister</h3>
            <p>
              Handelsregister-Nummer: [Falls zutreffend]<br />
              UID-Nummer: CHE-[Ihre UID-Nummer]
            </p>

            <h3>Inhaltlich Verantwortlicher</h3>
            <p>
              [Name des Verantwortlichen]<br />
              Adresse wie oben
            </p>

            <h3>Haftungsausschluss</h3>
            <h4>Inhalt des Onlineangebotes</h4>
            <p>
              Der Autor übernimmt keinerlei Gewähr für die Aktualität, Korrektheit,
              Vollständigkeit oder Qualität der bereitgestellten Informationen.
              Haftungsansprüche gegen den Autor, welche sich auf Schäden materieller
              oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der
              dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und
              unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen.
            </p>

            <h4>Verweise und Links</h4>
            <p>
              Bei direkten oder indirekten Verweisen auf fremde Webseiten ("Hyperlinks"),
              die ausserhalb des Verantwortungsbereiches des Autors liegen, würde eine
              Haftungsverpflichtung ausschliesslich in dem Fall in Kraft treten, in dem
              der Autor von den Inhalten Kenntnis hat und es ihm technisch möglich und
              zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern.
            </p>

            <h4>Urheberrecht</h4>
            <p>
              Der Autor ist bestrebt, in allen Publikationen die Urheberrechte der
              verwendeten Bilder, Grafiken, Tondokumente, Videosequenzen und Texte zu
              beachten, von ihm selbst erstellte Bilder, Grafiken, Tondokumente,
              Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken,
              Tondokumente, Videosequenzen und Texte zurückzugreifen.
            </p>

            <p>
              Alle innerhalb des Internetangebotes genannten und ggf. durch Dritte
              geschützten Marken- und Warenzeichen unterliegen uneingeschränkt den
              Bestimmungen des jeweils gültigen Kennzeichenrechts und den
              Besitzrechten der jeweiligen eingetragenen Eigentümer.
            </p>

            <h3>Datenschutz</h3>
            <p>
              Informationen zum Datenschutz finden Sie in unserer{' '}
              <a href="/datenschutz">Datenschutzerklärung</a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
