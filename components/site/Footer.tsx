import Link from 'next/link';
import { Mail, MapPin, Clock } from 'lucide-react';
import { SchoolLogo } from './CrossLogo';

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-school py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* School identity */}
          <div className="space-y-4">
            <div className="[&_div]:text-white [&_.text-muted-foreground]:text-white/70">
              <SchoolLogo iconColor="text-gold" />
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Sekolah Dasar Katolik Buikoun, berdiri sejak 1 Agustus 1954.
              Beriman, Berakhlak, Cerdas.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-gold mb-4 text-sm uppercase tracking-wider">
              Tautan Cepat
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-white/70 hover:text-gold transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/profil" className="text-sm text-white/70 hover:text-gold transition-colors">
                  Profil
                </Link>
              </li>
              <li>
                <Link href="/guru" className="text-sm text-white/70 hover:text-gold transition-colors">
                  Guru & Tenaga Kependidikan
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="text-sm text-white/70 hover:text-gold transition-colors">
                  Galeri
                </Link>
              </li>
              <li>
                <Link href="/pengumuman" className="text-sm text-white/70 hover:text-gold transition-colors">
                  Pengumuman
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-sm text-white/70 hover:text-gold transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-gold mb-4 text-sm uppercase tracking-wider">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
                <span>
                  Dusun Buikoun, Desa Kapitan Meo, Kecamatan Laenmanen,
                  Kabupaten Malaka, NTT 85761
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="w-4 h-4 flex-shrink-0 text-gold" />
                <a
                  href="mailto:sdkbuikoun2@gmail.com"
                  className="hover:text-gold transition-colors"
                >
                  sdkbuikoun2@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Clock className="w-4 h-4 flex-shrink-0 text-gold" />
                <span>Senin - Jumat, 07:00 - 14:00 WITA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 mt-10 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/50">
            <p>&copy; {new Date().getFullYear()} SDK BUIKOUN. Hak cipta dilindungi.</p>
            <p>NPSN: 50301335 &middot; Akreditasi C &middot; YPLM</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
