'use client';

import { useState, useEffect } from 'react';
import { Cross, Lock, Download, FileText, Image as ImageIcon, CheckCircle, XCircle, Search, ArrowLeft } from 'lucide-react';

interface BerkasFile {
  fieldName: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  dataUrl: string;
}

interface Pendaftar {
  id: string;
  namaLengkap: string;
  nik: string;
  tempatTanggalLahir: string;
  jenisKelamin: string;
  alamat: string;
  namaOrangTua: string;
  waOrangTua: string;
  asalTK: string;
  berkas: BerkasFile[];
  tanggalDaftar: string;
}

const ADMIN_PASSWORD = 'buikoun123';
const berkasLabels: Record<string, string> = {
  kk: 'Kartu Keluarga',
  akta: 'Akta Kelahiran',
  foto: 'Foto 3x4',
  ktp: 'KTP Orang Tua',
};

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

export default function AdminPPDBPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pendaftarList, setPendaftarList] = useState<Pendaftar[]>([]);
  const [search, setSearch] = useState('');
  const [selectedPendaftar, setSelectedPendaftar] = useState<Pendaftar | null>(null);

  useEffect(() => {
    if (authenticated) {
      const data = JSON.parse(localStorage.getItem('ppdb_pendaftar') || '[]');
      setPendaftarList(data);
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Password salah. Coba lagi.');
    }
  };

  const refreshData = () => {
    const data = JSON.parse(localStorage.getItem('ppdb_pendaftar') || '[]');
    setPendaftarList(data);
  };

  const downloadFile = (berkas: BerkasFile, namaSiswa: string) => {
    const link = document.createElement('a');
    link.href = berkas.dataUrl;
    const ext = berkas.fileName.split('.').pop() || 'jpg';
    link.download = `${namaSiswa.replace(/\s+/g, '_')}_${berkasLabels[berkas.fieldName] || berkas.fieldName}.${ext}`;
    link.click();
  };

  const filtered = pendaftarList.filter(p =>
    p.namaLengkap.toLowerCase().includes(search.toLowerCase()) ||
    p.alamat.toLowerCase().includes(search.toLowerCase()) ||
    p.waOrangTua.includes(search)
  );

  // Login screen
  if (!authenticated) {
    return (
      <>
        <section className="bg-navy text-white py-12 md:py-16" style={{ backgroundColor: '#0f2a5a' }}>
          <div className="container-school">
            <div className="flex items-center gap-2 text-gold text-sm mb-2">
              <Cross className="w-4 h-4" />
              <span>Admin PPDB</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">Panel Admin PPDB</h1>
            <p className="text-white/70 mt-2 text-sm sm:text-base">
              Halaman ini khusus untuk operator sekolah.
            </p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-school max-w-md">
            <div className="bg-white rounded-2xl border border-border shadow-sm p-8">
              <div className="w-14 h-14 bg-navy text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-navy text-center mb-1">Login Admin</h2>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Masukkan password untuk melihat data pendaftar.
              </p>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    placeholder="Masukkan password"
                    autoFocus
                  />
                  {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-navy text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-navy-light transition-colors"
                >
                  Masuk
                </button>
              </form>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Detail view
  if (selectedPendaftar) {
    const berkasLengkap = selectedPendaftar.berkas.length === 4;
    return (
      <>
        <section className="bg-navy text-white py-10" style={{ backgroundColor: '#0f2a5a' }}>
          <div className="container-school">
            <h1 className="text-2xl sm:text-3xl font-bold">Detail Pendaftar</h1>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-school max-w-3xl">
            <button
              onClick={() => setSelectedPendaftar(null)}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke daftar
            </button>

            <div className="bg-white rounded-2xl border border-border shadow-sm p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <h2 className="text-xl font-bold text-navy">{selectedPendaftar.namaLengkap}</h2>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${berkasLengkap ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                  {berkasLengkap ? <><CheckCircle className="w-3.5 h-3.5" /> Berkas Lengkap</> : <><XCircle className="w-3.5 h-3.5" /> Berkas Belum Lengkap</>}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="border-b border-border pb-2">
                  <div className="text-xs text-muted-foreground">NIK</div>
                  <div className="text-sm font-medium text-navy">{selectedPendaftar.nik}</div>
                </div>
                <div className="border-b border-border pb-2">
                  <div className="text-xs text-muted-foreground">Tempat, Tgl Lahir</div>
                  <div className="text-sm font-medium text-navy">{selectedPendaftar.tempatTanggalLahir}</div>
                </div>
                <div className="border-b border-border pb-2">
                  <div className="text-xs text-muted-foreground">Jenis Kelamin</div>
                  <div className="text-sm font-medium text-navy">{selectedPendaftar.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</div>
                </div>
                <div className="border-b border-border pb-2">
                  <div className="text-xs text-muted-foreground">Asal TK/PAUD</div>
                  <div className="text-sm font-medium text-navy">{selectedPendaftar.asalTK || '-'}</div>
                </div>
                <div className="border-b border-border pb-2 sm:col-span-2">
                  <div className="text-xs text-muted-foreground">Alamat</div>
                  <div className="text-sm font-medium text-navy">{selectedPendaftar.alamat}</div>
                </div>
                <div className="border-b border-border pb-2">
                  <div className="text-xs text-muted-foreground">Nama Orang Tua/Wali</div>
                  <div className="text-sm font-medium text-navy">{selectedPendaftar.namaOrangTua}</div>
                </div>
                <div className="border-b border-border pb-2">
                  <div className="text-xs text-muted-foreground">No WA Orang Tua</div>
                  <div className="text-sm font-medium text-navy">{selectedPendaftar.waOrangTua}</div>
                </div>
                <div className="border-b border-border pb-2 sm:col-span-2">
                  <div className="text-xs text-muted-foreground">Tanggal Daftar</div>
                  <div className="text-sm font-medium text-navy">{formatDate(selectedPendaftar.tanggalDaftar)}</div>
                </div>
              </div>

              {/* Berkas */}
              <h3 className="text-sm font-bold text-navy mb-3">Berkas Upload ({selectedPendaftar.berkas.length}/4)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedPendaftar.berkas.map((b, i) => (
                  <div key={i} className="border border-border rounded-lg p-3 flex items-center gap-3">
                    {b.fileType.startsWith('image/') ? (
                      <img src={b.dataUrl} alt={b.fileName} className="w-14 h-14 object-cover rounded flex-shrink-0" />
                    ) : (
                      <div className="w-14 h-14 bg-navy text-white rounded flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-navy">{berkasLabels[b.fieldName] || b.fieldName}</p>
                      <p className="text-xs text-muted-foreground truncate">{b.fileName}</p>
                    </div>
                    <button
                      onClick={() => downloadFile(b, selectedPendaftar.namaLengkap)}
                      className="text-navy hover:text-gold flex-shrink-0"
                      title="Download"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                {selectedPendaftar.berkas.length === 0 && (
                  <p className="text-sm text-muted-foreground col-span-2">Tidak ada berkas diupload.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // List view
  return (
    <>
      <section className="bg-navy text-white py-10" style={{ backgroundColor: '#0f2a5a' }}>
        <div className="container-school">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 text-gold text-sm mb-1">
                <Cross className="w-4 h-4" />
                <span>Admin PPDB</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold">Data Pendaftar PPDB</h1>
            </div>
            <button
              onClick={refreshData}
              className="bg-white/10 text-white border border-white/30 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-school">
          {/* Search */}
          <div className="relative mb-6 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari nama, alamat, atau WA..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            />
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            <div className="bg-secondary/50 rounded-lg p-4 text-center border border-border">
              <div className="text-2xl font-bold text-navy">{pendaftarList.length}</div>
              <div className="text-xs text-muted-foreground">Total Pendaftar</div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center border border-border">
              <div className="text-2xl font-bold text-emerald-600">
                {pendaftarList.filter(p => p.berkas.length === 4).length}
              </div>
              <div className="text-xs text-muted-foreground">Berkas Lengkap</div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center border border-border col-span-2 sm:col-span-1">
              <div className="text-2xl font-bold text-amber-600">
                {pendaftarList.filter(p => p.berkas.length < 4).length}
              </div>
              <div className="text-xs text-muted-foreground">Berkas Belum Lengkap</div>
            </div>
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Cross className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                {pendaftarList.length === 0
                  ? 'Belum ada pendaftar.'
                  : 'Tidak ada hasil pencarian.'}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-white text-left" style={{ backgroundColor: '#0f2a5a' }}>
                      <th className="px-4 py-3 font-semibold w-10 text-center">No</th>
                      <th className="px-4 py-3 font-semibold">Nama Siswa</th>
                      <th className="px-4 py-3 font-semibold hidden md:table-cell">Tgl Lahir</th>
                      <th className="px-4 py-3 font-semibold hidden lg:table-cell">Alamat</th>
                      <th className="px-4 py-3 font-semibold">WA Ortu</th>
                      <th className="px-4 py-3 font-semibold text-center">Status Berkas</th>
                      <th className="px-4 py-3 font-semibold text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p, i) => {
                      const lengkap = p.berkas.length === 4;
                      return (
                        <tr key={p.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="px-4 py-3 text-center text-muted-foreground font-medium">{i + 1}</td>
                          <td className="px-4 py-3 font-semibold text-navy">{p.namaLengkap}</td>
                          <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{p.tempatTanggalLahir}</td>
                          <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell max-w-[200px] truncate">{p.alamat}</td>
                          <td className="px-4 py-3 text-muted-foreground">{p.waOrangTua}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${lengkap ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                              {lengkap ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                              {p.berkas.length}/4
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => setSelectedPendaftar(p)}
                              className="text-navy hover:text-gold text-xs font-semibold"
                            >
                              Detail & Download
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Data tersimpan sementara di browser. Untuk upgrade ke penyimpanan cloud,
            hubungi pengembang.
          </p>
        </div>
      </section>
    </>
  );
}
