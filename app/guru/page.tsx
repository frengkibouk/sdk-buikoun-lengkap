import { Cross, GraduationCap, Users, UserCog } from 'lucide-react';

const guru = [
  { no: 1, nama: 'ARKADIUS S.B. BANI, A.Ma.Pd.OR', jabatan: 'Kepala Sekolah' },
  { no: 2, nama: 'Theresia Ulu, S.Pd.Gr', jabatan: 'Bendahara Sekolah' },
  { no: 3, nama: 'Frengki Elyakim Bouk', jabatan: 'Operator Sekolah' },
  { no: 4, nama: 'Yosefina Agitha Bubu', jabatan: 'Guru' },
  { no: 5, nama: 'Yohanes Un Bau', jabatan: 'Guru' },
  { no: 6, nama: 'Yuliana Vinsensia Neno', jabatan: 'Guru' },
  { no: 7, nama: 'Imaculata Kole', jabatan: 'Guru' },
  { no: 8, nama: 'Maria Yustina Niis', jabatan: 'Guru' },
];

export default function GuruPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-school">
          <div className="flex items-center gap-2 text-gold text-sm mb-2">
            <Cross className="w-4 h-4" />
            <span>Tim Pendidik</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Guru & Tenaga Kependidikan</h1>
          <p className="text-white/70 mt-2 text-sm sm:text-base max-w-2xl">
            Para pendidik yang berdedikasi mengabdi di SDK BUIKOUN.
          </p>
        </div>
      </section>

      {/* Guru table */}
      <section className="section-padding bg-white">
        <div className="container-school">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-secondary/50 rounded-xl p-5 text-center border border-border">
              <div className="w-10 h-10 bg-navy text-white rounded-full flex items-center justify-center mx-auto mb-2">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-navy">6</div>
              <div className="text-xs text-muted-foreground">Guru</div>
            </div>
            <div className="bg-secondary/50 rounded-xl p-5 text-center border border-border">
              <div className="w-10 h-10 bg-gold text-navy rounded-full flex items-center justify-center mx-auto mb-2">
                <UserCog className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-navy">2</div>
              <div className="text-xs text-muted-foreground">Tenaga Kependidikan</div>
            </div>
            <div className="bg-secondary/50 rounded-xl p-5 text-center border border-border">
              <div className="w-10 h-10 bg-navy text-white rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-navy">8</div>
              <div className="text-xs text-muted-foreground">Total Personil</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white text-left" style={{ backgroundColor: '#0f2a5a' }}>
                    <th className="px-4 py-3 font-semibold w-12 text-center">No</th>
                    <th className="px-4 py-3 font-semibold">Nama</th>
                    <th className="px-4 py-3 font-semibold">Jabatan</th>
                  </tr>
                </thead>
                <tbody>
                  {guru.map((g, i) => (
                    <tr
                      key={g.no}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                    >
                      <td className="px-4 py-3 text-center text-muted-foreground font-medium">
                        {g.no}
                      </td>
                      <td className="px-4 py-3 font-semibold text-navy">{g.nama}</td>
                      <td className="px-4 py-3 text-muted-foreground">{g.jabatan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Data personil SDK BUIKOUN. Untuk pembaruan data, hubungi
            sekolah via email.
          </p>
        </div>
      </section>
    </>
  );
}
