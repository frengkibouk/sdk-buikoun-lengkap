import Image from 'next/image';
import { Cross } from 'lucide-react';

const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/32218913/pexels-photo-32218913.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Anak-anak bersekolah di pegunungan Buikoun',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/3992949/pexels-photo-3992949.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Kegiatan belajar di kelas',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/5621962/pexels-photo-5621962.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Anak-anak belajar bersama',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/1846336/pexels-photo-1846336.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Lingkungan asri pegunungan Buikoun',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/18506736/pexels-photo-18506736.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Guru mengajar di kelas',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/8466703/pexels-photo-8466703.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Siswa menulis di kelas',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/28437314/pexels-photo-28437314.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Anak-anak bermain di alam sekitar Buikoun',
    span: 'md:col-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/13806035/pexels-photo-13806035.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Suasana kelas belajar',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/8363576/pexels-photo-8363576.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Kegiatan kreatif bersama guru',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/3083012/pexels-photo-3083012.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Bukit hijau sekitar Buikoun',
    span: '',
  },
];

export default function GaleriPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-school">
          <div className="flex items-center gap-2 text-gold text-sm mb-2">
            <Cross className="w-4 h-4" />
            <span>Dokumentasi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Galeri Kegiatan</h1>
          <p className="text-white/70 mt-2 text-sm sm:text-base max-w-2xl">
            Dokumentasi kegiatan belajar dan lingkungan asri sekitar SDK BUIKOUN.
          </p>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="section-padding bg-white">
        <div className="container-school">
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] sm:auto-rows-[200px] gap-3">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`relative rounded-xl overflow-hidden shadow-sm group ${img.span}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors duration-300 flex items-end p-3">
                  <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
