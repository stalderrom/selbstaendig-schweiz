import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung von Selbständig Schweiz - Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten',
  robots: {
    index: true,
    follow: true,
  },
};

export default function DatenschutzPage() {
  return (
    <>
      <Header />

      <main className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>

          <div className="prose prose-lg max-w-none">
            <p className="lead">
              Der Schutz Ihrer persönlichen Daten ist uns wichtig. In dieser Datenschutzerklärung
              informieren wir Sie über die Verarbeitung personenbezogener Daten bei der Nutzung
              dieser Website.
            </p>

            <h2>1. Verantwortlicher</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
              <br />
              <strong>Selbständig Schweiz</strong><br />
              [Ihre Firma oder Name]<br />
              [Strasse und Hausnummer]<br />
              [PLZ und Ort]<br />
              Schweiz<br />
              <br />
              E-Mail: <a href="mailto:kontakt@selbständig-schweiz.ch">kontakt@selbständig-schweiz.ch</a>
            </p>

            <h2>2. Erfassung allgemeiner Informationen</h2>
            <p>
              Wenn Sie auf unsere Website zugreifen, werden automatisch Informationen allgemeiner
              Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des
              Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres
              Internet-Service-Providers und Ähnliches.
            </p>
            <p>
              Hierbei handelt es sich ausschliesslich um Informationen, welche keine Rückschlüsse
              auf Ihre Person zulassen. Diese Informationen sind technisch notwendig, um von Ihnen
              angeforderte Inhalte von Webseiten korrekt auszuliefern.
            </p>

            <h2>3. Cookies</h2>
            <p>
              Diese Website verwendet Cookies. Das sind kleine Textdateien, die es möglich machen,
              auf dem Endgerät des Nutzers spezifische, auf den Nutzer bezogene Informationen zu
              speichern, während er die Website nutzt.
            </p>
            <p>
              Cookies ermöglichen es, insbesondere Nutzungshäufigkeit und Nutzeranzahl der Seiten zu
              ermitteln, Verhaltensweisen der Seitennutzung zu analysieren, aber auch unser Angebot
              kundenfreundlicher zu gestalten.
            </p>
            <p>
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert
              werden und einzeln über deren Annahme entscheiden oder die Annahme von Cookies für
              bestimmte Fälle oder generell ausschliessen können.
            </p>

            <h2>4. Kontaktformular</h2>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
              der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
            </p>

            <h2>5. SSL-Verschlüsselung</h2>
            <p>
              Diese Seite nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung vertraulicher
              Inhalte eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass
              die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem
              Schloss-Symbol in Ihrer Browserzeile.
            </p>

            <h2>6. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten
              personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung
              sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
            </p>
            <p>
              Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit
              unter der im <Link href="/impressum">Impressum</Link> angegebenen Adresse an uns wenden.
            </p>

            <h2>7. Änderungen dieser Datenschutzerklärung</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung gelegentlich anzupassen, damit sie stets
              den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen
              in der Datenschutzerklärung umzusetzen.
            </p>

            <h2>8. Hosting</h2>
            <p>
              Diese Website wird gehostet bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
              Vercel erfasst in sogenannten Logfiles folgende Daten, die Ihr Browser übermittelt:
              IP-Adresse, die Adresse der vorher besuchten Website (Referer Anfrage-Header), Datum und
              Uhrzeit der Anfrage, Zeitzonendifferenz zur Greenwich Mean Time, Inhalt der Anforderung,
              HTTP-Statuscode, übertragene Datenmenge, Website, von der die Anforderung kommt und
              Informationen zu Browser und Betriebssystem.
            </p>

            <p className="text-sm text-gray-600 mt-12">
              Stand: Dezember 2025
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
