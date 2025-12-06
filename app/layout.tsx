import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://selbstaendig-schweiz.ch'),
  title: {
    default: "Selbständig Schweiz - Das Portal für Selbstständige und Gründer",
    template: "%s | Selbständig Schweiz"
  },
  description: "Alles rund um Selbstständigkeit, Freelancing und Startup-Gründung in der Schweiz. Praktische Tipps zu Steuern, Versicherungen, Marketing und Kundengewinnung.",
  keywords: ["selbstständig schweiz", "freelancer schweiz", "startup schweiz", "freiberufler", "einzelunternehmen", "gründung schweiz", "selbstständigkeit"],
  authors: [{ name: "Selbständig Schweiz" }],
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: "https://selbstaendig-schweiz.ch",
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
    canonical: "https://selbstaendig-schweiz.ch"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
