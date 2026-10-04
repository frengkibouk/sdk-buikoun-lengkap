import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { FloatingWhatsApp } from '@/components/site/FloatingWhatsApp';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SDK BUIKOUN - Sekolah Dasar Katolik Buikoun',
  description:
    'Sekolah Dasar Katolik Buikoun, Dusun Buikoun, Desa Kapitan Meo, Kecamatan Laenmanen, Kabupaten Malaka, NTT. Berdiri sejak 1 Agustus 1954. Beriman, Berakhlak, Cerdas.',
  keywords: ['SDK Buikoun', 'Sekolah Katolik', 'Malaka', 'NTT', 'Laenmanen', 'Kapitan Meo'],
  openGraph: {
    title: 'SDK BUIKOUN - Sekolah Dasar Katolik Buikoun',
    description:
      'Sekolah Dasar Katolik Buikoun, Malaka, NTT. Berdiri sejak 1954. Beriman, Berakhlak, Cerdas.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
