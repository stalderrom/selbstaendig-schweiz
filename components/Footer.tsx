import Link from 'next/link';

const FOOTER_LINKS = {
  gruendung: [
    { label: 'Selbständig machen', href: '/artikel/selbstaendig-machen-schweiz' },
    { label: 'Einzelfirma gründen', href: '/artikel/einzelfirma-gruenden' },
    { label: 'GmbH gründen', href: '/artikel/gmbh-gruenden' },
    { label: 'Alle Berufe', href: '/artikel/selbstaendig-schweiz-berufe' },
  ],
  finanzen: [
    { label: 'Steuern für Selbständige', href: '/artikel/steuern-selbststaendige' },
    { label: 'Versicherungen', href: '/artikel/versicherungen-selbststaendige' },
    { label: 'Buchhaltung', href: '/artikel/buchhaltung-selbststaendige' },
    { label: 'Geld verdienen', href: '/artikel/geld-verdienen-schweiz' },
  ],
  wachstum: [
    { label: 'Kunden gewinnen', href: '/artikel/kunden-gewinnen-schweiz' },
    { label: 'Tools & Software', href: '/artikel/tools-selbststaendige' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              Selbständig<span className="text-blue-400">Schweiz</span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Das umfassende Portal für Selbstständige und Gründer in der Schweiz.
              Praxisnahe Guides, aktuelle Informationen und Expertenwissen für deinen Erfolg.
            </p>
            <p className="text-gray-500 text-xs">
              Alle Informationen ohne Gewähr. Konsultiere bei wichtigen Entscheidungen einen Fachexperten.
            </p>
          </div>

          {/* Gründung */}
          <div>
            <h4 className="font-semibold mb-4 text-blue-400">Gründung</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.gruendung.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Finanzen */}
          <div>
            <h4 className="font-semibold mb-4 text-blue-400">Finanzen & Steuern</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.finanzen.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Wachstum & Ressourcen */}
          <div>
            <h4 className="font-semibold mb-4 text-blue-400">Wachstum</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.wachstum.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/artikel"
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                  Alle Artikel →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Selbständig Schweiz. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/impressum" className="text-gray-400 hover:text-white transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-gray-400 hover:text-white transition-colors">
                Datenschutz
              </Link>
              <Link href="/kontakt" className="text-gray-400 hover:text-white transition-colors">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
