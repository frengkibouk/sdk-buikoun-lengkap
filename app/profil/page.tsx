import Image from 'next/image';
import { Target, Eye, Cross, Building2, Calendar, MapPin, Award, Mail, Hash } from 'lucide-react';

const profilImage = 'https://images.pexels.com/photos/1846336/pexels-photo-1846336.jpeg?auto=compress&cs=tinysrgb&w=1280';
const sejarahImage = 'https://images.pexels.com/photos/28437314/pexels-photo-28437314.jpeg?auto=compress&cs=tinysrgb&w=800';

const identitas = [
  { icon: Building2, label: 'Nama Sekolah', value: 'SDK BUIKOUN (Sekolah Dasar Katolik Buikoun)' },
  { icon: Hash, label: 'NPSN', value: '50301335' },
  { icon: MapPin, label: 'Alamat', value: 'Dusun Buikoun, Desa Kapitan Meo, Kecamatan Laenmanen, Kabupaten Malaka, NTT 85761' },
  { icon: Building2, label: 'Naungan', value: 'Yayasan Pendidikan Katolik Liurai Malaka' },
  { icon: Calendar, label: 'Tanggal Berdiri', value: '1 Agustus 1954' },
  { icon: Award, label: 'SK Pendirian', value: 'SK II/YPLM/1954' },
  { icon: Award, label: 'Status', value: 'Swasta' },
  { icon: Award, label: 'Akreditasi', value: 'C' },
  { icon: Mail, label: 'Email', value: 'sdkbuikoun2@gmail.com' },
];

const visi = [
  'Mewujudkan peserta didik yang beriman, berakhlak mulia, cerdas, dan mandiri.',
  'Membentuk pribadi yang berkarakter Katolik dan cinta tanah air.',
  'Mengembangkan potensi siswa secara holistik: spiritual, intelektual, sosial, dan emosional.',
];

const misi = [
  'Menyelenggarakan pendidikan berbasis nilai-nilai Katolik dan Pancasila.',
  'Membangun budaya literasi, kritis, dan kreatif di kalangan siswa.',
  'Mengembarkan kepedulian sosial dan kecintaan terhadap lingkungan alam Buikoun.',
  'Menyelenggarakan pembelajaran yang aktif, kreatif, efektif, dan menyenangkan.',
  'Bekerja sama dengan orang tua, masyarakat, dan paroki dalam mendidik generasi muda.',
];

export default function ProfilPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-school">
          <div className="flex items-center gap-2 text-gold text-sm mb-2">
            <Cross className="w-4 h-4" />
            <span>Tentang Sekolah</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Profil SDK BUIKOUN</h1>
          <p className="text-white/70 mt-2 text-sm sm:text-base max-w-2xl">
            Mengenal lebih dekat sejarah, visi, misi, dan identitas Sekolah Dasar
            Katolik Buikoun.
          </p>
        </div>
      </section>

      {/* Sejarah */}
      <section className="section-padding bg-white">
        <div className="container-school">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={sejarahImage}
                alt="Lingkungan asri Buikoun"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <div className="inline-block bg-secondary text-navy text-xs font-semibold px-3 py-1 rounded-full mb-3">
                Sejarah Singkat
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4">
                Berdiri Sejak 1954 oleh Para Misionaris
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed text-sm sm:text-base">
                <p>
                  SDK Buikoun didirikan pada <strong className="text-navy">1 Agustus 1954</strong>{' '}
                  dengan Surat Keputusan{' '}
                  <strong className="text-navy">SK II/YPLM/1954</strong> oleh para
                  misionaris Katolik yang datang ke pedalaman Malaka, NTT.
                </p>
                <p>
                  Berada di bawah naungan{' '}
                  <strong className="text-navy">Yayasan Pendidikan Katolik Liurai Malaka</strong>,
                  sekolah ini lahir dari semangat untuk membawa pendidikan dan
                  terang iman kepada anak-anak di Dusun Buikoun dan sekitarnya.
                </p>
                <p>
                  Selama lebih dari tujuh dekade, SDK Buikoun telah mendidik
                  ribuan anak dengan komitmen yang tak pernah pudar: membentuk
                  generasi yang beriman, berakhlak mulia, dan cerdas, di tengah
                  alam pegunungan NTT yang asri.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="section-padding bg-secondary/50">
        <div className="container-school">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visi */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-navy text-white rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-navy">Visi</h2>
              </div>
              <ul className="space-y-3">
                {visi.map((v, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Misi */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gold text-navy rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-navy">Misi</h2>
              </div>
              <ul className="space-y-3">
                {misi.map((m, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-secondary text-navy text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Identitas */}
      <section className="section-padding bg-white">
        <div className="container-school">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="inline-block bg-secondary text-navy text-xs font-semibold px-3 py-1 rounded-full mb-3">
                Identitas Sekolah
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-6">
                Identitas Lengkap
              </h2>
              <div className="space-y-4">
                {identitas.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 pb-4 border-b border-border last:border-0"
                    >
                      <div className="w-9 h-9 bg-secondary text-navy rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground font-medium mb-0.5">
                          {item.label}
                        </div>
                        <div className="text-sm font-semibold text-navy">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative w-full aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={profilImage}
                alt="Lingkungan asri pegunungan Buikoun"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
