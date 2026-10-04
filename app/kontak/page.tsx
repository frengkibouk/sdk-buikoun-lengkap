import { Cross, MapPin, Mail, Phone, Clock } from 'lucide-react';

export default function KontakPage() {
  const waLink = 'https://wa.me/6282266138384?text=Halo%20SDK%20BUIKOUN%2C%20saya%20mau%20tanya%20info%20PPDB';

  return (
    <>
      {/* Page header */}
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-school">
          <div className="flex items-center gap-2 text-gold text-sm mb-2">
            <Cross className="w-4 h-4" />
            <span>Hubungi Kami</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Kontak</h1>
          <p className="text-white/70 mt-2 text-sm sm:text-base max-w-2xl">
            Silakan hubungi SDK BUIKOUN melalui kontak berikut.
          </p>
        </div>
      </section>

      {/* Contact info */}
      <section className="section-padding bg-white">
        <div className="container-school">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Info cards */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-navy text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-sm mb-1">Alamat</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Dusun Buikoun, Desa Kapitan Meo, Kecamatan Laenmanen,
                      Kabupaten Malaka, NTT 85761
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-gold text-navy rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-navy text-sm mb-1">Email</h3>
                    <a
                      href="mailto:sdkbuikoun2@gmail.com"
                      className="text-sm text-muted-foreground hover:text-navy transition-colors break-all"
                    >
                      sdkbuikoun2@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#25D366] text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-sm mb-1">WhatsApp</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Hubungi sekolah via WhatsApp untuk informasi cepat.
                    </p>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1da851] transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Hubungi WA 0822 6613 8384
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-navy text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-sm mb-1">Jam Operasional</h3>
                    <p className="text-sm text-muted-foreground">Senin - Jumat: 07:00 - 14:00 WITA</p>
                    <p className="text-sm text-muted-foreground">Sabtu - Minggu: Libur</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-bold text-navy text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold" />
                    Lokasi Sekolah
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Desa Kapitan Meo, Kecamatan Laenmanen, Kabupaten Malaka, NTT
                  </p>
                </div>
                <div className="relative w-full h-[350px] sm:h-[450px]">
                  <iframe
                    title="Lokasi Desa Kapitan Meo, Malaka, NTT"
                    src="https://www.google.com/maps?q=Desa+Kapitan+Meo+Laenmanen+Malaka+NTT&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
