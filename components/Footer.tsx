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
    <footer className="bg-ink text-warm-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <p className="font-serif text-lg font-bold text-warm-white mb-4 tracking-tight">
              Selbständig<span className="text-accent-mid font-normal italic">Schweiz</span>
            </p>
            <p className="text-warm-500 text-sm leading-relaxed mb-4">
              Das umfassende Portal für Selbstständige und Gründer in der Schweiz.
              Praxisnahe Guides, aktuelle Informationen und Expertenwissen.
            </p>
            <p className="text-warm-600 text-xs leading-relaxed">
              Alle Informationen ohne Gewähr. Konsultiere bei wichtigen Entscheidungen einen Fachexperten.
            </p>
          </div>

          {/* Gründung */}
          <div>
            <p className="category-label text-accent-mid mb-5">Gründung</p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.gruendung.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-warm-500 hover:text-warm-200 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Finanzen */}
          <div>
            <p className="category-label text-accent-mid mb-5">Finanzen & Steuern</p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.finanzen.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-warm-500 hover:text-warm-200 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Wachstum */}
          <div>
            <p className="category-label text-accent-mid mb-5">Wachstum</p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.wachstum.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-warm-500 hover:text-warm-200 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/artikel" className="text-warm-400 hover:text-warm-200 transition-colors text-sm font-medium">
                  Alle Artikel →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-warm-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-warm-600 text-sm">
              &copy; {new Date().getFullYear()} Selbständig Schweiz. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/impressum" className="text-warm-600 hover:text-warm-300 transition-colors">Impressum</Link>
              <Link href="/datenschutz" className="text-warm-600 hover:text-warm-300 transition-colors">Datenschutz</Link>
              <Link href="/kontakt" className="text-warm-600 hover:text-warm-300 transition-colors">Kontakt</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
