import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import Script from "next/script";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.selbständig-schweiz.ch'),
  title: {
    default: "Selbständig Schweiz – Portal für Gründer & Freelancer",
    template: "%s"
  },
  description: "Selbstständig in der Schweiz: Guides zu Gründung, Steuern, Versicherungen & Kundengewinnung – für Einzelfirma, GmbH und Freelancer.",
  keywords: ["selbstständig schweiz", "freelancer schweiz", "startup schweiz", "freiberufler", "einzelunternehmen", "gründung schweiz", "selbstständigkeit"],
  authors: [{ name: "Selbständig Schweiz" }],
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: "https://www.selbständig-schweiz.ch",
    siteName: "Selbständig Schweiz",
    title: "Selbständig Schweiz - Das Portal für Selbstständige und Gründer",
    description: "Alles rund um Selbstständigkeit, Freelancing und Startup-Gründung in der Schweiz.",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Selbständig Schweiz"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Selbständig Schweiz - Das Portal für Selbstständige und Gründer",
    description: "Alles rund um Selbstständigkeit, Freelancing und Startup-Gründung in der Schweiz.",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  alternates: {
    canonical: "https://www.selbständig-schweiz.ch"
  }
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Selbständig Schweiz',
  url: 'https://www.selbständig-schweiz.ch',
  logo: 'https://www.selbständig-schweiz.ch/logo.png',
  description: 'Schweizer Ratgeberportal für Selbständige, Freelancer und Gründer – Guides zu Gründung, Steuern, Versicherungen und Kundengewinnung.',
  inLanguage: 'de-CH',
  areaServed: {
    '@type': 'Country',
    name: 'Switzerland',
  },
  sameAs: [
    'https://www.linkedin.com/company/selbstaendig-schweiz',
    'https://www.instagram.com/selbstaendig_schweiz',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH">
      <head>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="OhOg6BnWptgP4aNQHhumbw" async></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  analytics_storage: 'denied',
                  ad_storage: 'denied',
                  wait_for_update: 2000
                });
              `,
            }}
          />
        )}
      </head>
      <body className={`${playfair.variable} ${lato.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
            <CookieConsent />
          </>
        )}
      </body>
    </html>
  );
}
