import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Navbar from '@/components/storefront/Navbar';
import Footer from '@/components/storefront/Footer';

const playfair = Playfair_Display({
  subsets:  ['latin'],
  variable: '--font-display',
  weight:   ['400', '600', '700'],
});

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default:  'WKND Coffee | Specialty Coffee & Brunch — DHA Raya, Lahore',
    template: '%s | WKND Coffee',
  },
  description:
    'Specialty coffee, all-day brunch and light bites at DHA Raya, Lahore. Good coffee, good food, good vibes — every single day.',
  keywords: [
    'WKND Coffee',
    'specialty coffee Lahore',
    'DHA Raya cafe',
    'brunch Lahore',
    'best coffee DHA Phase 6',
    'wknd coffee raya',
  ],
  authors:  [{ name: 'WKND Coffee' }],
  openGraph: {
    type:        'website',
    locale:      'en_PK',
    siteName:    'WKND Coffee',
    title:       'WKND Coffee | Specialty Coffee & Brunch — DHA Raya',
    description: 'Specialty coffee, all-day brunch and light bites at DHA Raya, Lahore.',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'WKND Coffee | DHA Raya, Lahore',
    description: 'Specialty coffee, all-day brunch and light bites at DHA Raya, Lahore.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-cream font-sans antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}