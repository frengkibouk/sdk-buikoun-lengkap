import Image from 'next/image';
import Link from 'next/link';
import { Heart, BookOpen, Brain, Users, GraduationCap, Award, ArrowRight } from 'lucide-react';

const heroImage = 'https://images.pexels.com/photos/32218913/pexels-photo-32218913.jpeg?auto=compress&cs=tinysrgb&w=1920';

const keunggulan = [
  {
    icon: Heart,
    title: 'Beriman',
    desc: 'Membentuk pribadi yang beriman kepada Tuhan dengan nuansa Katolik, berakhlak mulia, dan berkarakter.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: BookOpen,
    title: 'Berakhlak',
    desc: 'Menanamkan nilai-nilai kebaikan, kejujuran, dan kasih sesama dalam kehidupan sehari-hari.',
    color: 'text-gold-dark',
    bg: 'bg-amber-50',
  },
  {
    icon: Brain,
    title: 'Cerdas',
    desc: 'Mengembangkan potensi akademik dan kreativitas siswa untuk meraih prestasi yang unggul.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
];

const stats = [
  { icon: Users, label: 'Jumlah Siswa', value: '120+' },
  { icon: GraduationCap, label: 'Tenaga Pengajar', value: '8' },
  { icon: Award, label: 'Akreditasi', value: 'C' },
  { icon: BookOpen, label: 'Berdiri Sejak', value: '1954' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[420px] sm:min-h-[500px] md:min-h-[560px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Anak-anak sekolah di pegunungan"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>
        <div className="container-school relative z-10 py-12 md:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-gold/90 text-navy px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-navy" />
              Berdiri Sejak 1 Agustus 1954
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              SDK BUIKOUN
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-6 max-w-xl">
              Sekolah Dasar Katolik Buikoun &mdash; Dusun Buikoun, Desa Kapitan Meo,
              Kabupaten Malaka, NTT. Mendidik generasi yang{' '}
              <span className="font-semibold text-gold">Beriman, Berakhlak, dan Cerdas</span>.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 bg-gold text-navy px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-gold-dark transition-colors"
              >
                Tentang Sekolah
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white border border-white/30 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/20 transition-colors"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sambutan Kepala Sekolah */}
      <section className="section-padding bg-white">
        <div className="container-school">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <div className="relative w-full max-w-xs mx-auto aspect-square rounded-2xl overflow-hidden shadow-lg ring-4 ring-gold/20">
                <Image
                  src="https://images.pexels.com/photos/18506736/pexels-photo-18506736.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Kepala Sekolah SDK Buikoun"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 320px, 320px"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="inline-block bg-secondary text-navy text-xs font-semibold px-3 py-1 rounded-full mb-3">
                Sambutan Kepala Sekolah
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4">
                Selamat Datang di SDK BUIKOUN
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed text-sm sm:text-base">
                <p>
                  Puji syukur kita panjatkan kepada Tuhan Yang Maha Esa atas
                  rahmat-Nya, sehingga SDK Buikoun dapat terus melaksanakan tugas
                  mulia mendidik anak-anak di pedalaman Malaka, NTT.
                </p>
                <p>
                  Sejak berdiri pada tahun 1954 oleh para misionaris, sekolah kami
                  berkomitmen untuk membentuk generasi yang{' '}
                  <strong className="text-navy">Beriman, Berakhlak, dan Cerdas</strong>.
                  Kami percaya bahwa pendidikan yang berkualitas adalah hak setiap
                  anak, tanpa memandang lokasi geografis.
                </p>
                <p>
                  Mari bersama membangun masa depan yang lebih baik bagi anak-anak
                  Buikuan dan sekitarnya.
                </p>
              </div>
              <div className="mt-5 border-l-4 border-gold pl-4">
                <p className="font-semibold text-navy text-sm">
                  ARKADIUS S.B. BANI, A.Ma.Pd.OR
                </p>
                <p className="text-xs text-muted-foreground">
                  Kepala Sekolah SDK BUIKOUN
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="section-padding bg-secondary/50">
        <div className="container-school">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2">
              Keunggulan Kami
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Tiga pilar utama pendidikan di SDK BUIKOUN
            </p>
            <div className="w-20 h-1 bg-gold mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {keunggulan.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border text-center"
                >
                  <div
                    className={`w-16 h-16 ${item.bg} ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-navy text-white">
        <div className="container-school">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="w-12 h-12 bg-gold/20 text-gold rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/70">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-school">
          <div className="bg-gradient-to-r from-navy to-navy-light rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Bergabunglah dengan Keluarga Besar SDK BUIKOUN
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto text-sm sm:text-base">
              Daftarkan putra-putri Anda dan jadilah bagian dari sejarah pendidikan
              Katolik di Malaka yang telah berdiri sejak 1954.
            </p>
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 bg-gold text-navy px-6 py-3 rounded-lg font-semibold text-sm hover:bg-gold-dark transition-colors"
            >
              Hubungi Sekolah
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
