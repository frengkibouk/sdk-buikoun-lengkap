'use client';

import { useState, useRef } from 'react';
import { Cross, Calendar, FileText, Upload, CheckCircle, User, Phone, MapPin, Image as ImageIcon, FileCheck, ArrowRight } from 'lucide-react';

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

const berkasFields = [
  { name: 'kk', label: 'Foto Copy Kartu Keluarga (KK)', accept: '.jpg,.jpeg,.pdf', maxSize: 2 * 1024 * 1024, maxSizeLabel: '2MB' },
  { name: 'akta', label: 'Foto Copy Akta Kelahiran', accept: '.jpg,.jpeg,.pdf', maxSize: 2 * 1024 * 1024, maxSizeLabel: '2MB' },
  { name: 'foto', label: 'Foto Siswa 3x4', accept: '.jpg,.jpeg', maxSize: 1 * 1024 * 1024, maxSizeLabel: '1MB' },
  { name: 'ktp', label: 'KTP Orang Tua', accept: '.jpg,.jpeg,.pdf', maxSize: 2 * 1024 * 1024, maxSizeLabel: '2MB' },
];

const syarat = [
  'Usia minimal 6 tahun per Juli 2026',
  'Foto Copy Kartu Keluarga (KK)',
  'Foto Copy Akta Kelahiran',
  'Foto Siswa ukuran 3x4',
  'KTP Orang Tua / Wali',
];

export default function PPDBPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    namaLengkap: '',
    nik: '',
    tempatTanggalLahir: '',
    jenisKelamin: '',
    alamat: '',
    namaOrangTua: '',
    waOrangTua: '',
    asalTK: '',
  });
  const [berkasData, setBerkasData] = useState<Record<string, BerkasFile | null>>({
    kk: null, akta: null, foto: null, ktp: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileChange = (fieldName: string, file: File, maxSize: number) => {
    if (file.size > maxSize) {
      setErrors(prev => ({ ...prev, [fieldName]: `File terlalu besar. Maksimal ${berkasFields.find(f => f.name === fieldName)?.maxSizeLabel}` }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setBerkasData(prev => ({
        ...prev,
        [fieldName]: {
          fieldName,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          dataUrl: reader.result as string,
        },
      }));
      setErrors(prev => { const c = { ...prev }; delete c[fieldName]; return c; });
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.namaLengkap.trim()) errs.namaLengkap = 'Nama lengkap wajib diisi';
    if (!formData.nik.trim()) errs.nik = 'NIK siswa wajib diisi';
    if (!formData.tempatTanggalLahir.trim()) errs.tempatTanggalLahir = 'Tempat & tanggal lahir wajib diisi';
    if (!formData.jenisKelamin) errs.jenisKelamin = 'Pilih jenis kelamin';
    if (!formData.alamat.trim()) errs.alamat = 'Alamat wajib diisi';
    if (!formData.namaOrangTua.trim()) errs.namaOrangTua = 'Nama orang tua/wali wajib diisi';
    if (!formData.waOrangTua.trim()) errs.waOrangTua = 'No WA orang tua wajib diisi';
    berkasFields.forEach(f => {
      if (!berkasData[f.name]) errs[f.name] = `${f.label} wajib diupload`;
    });
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const berkasList = Object.values(berkasData).filter(Boolean) as BerkasFile[];
    const pendaftar: Pendaftar = {
      id: `PPDB-${Date.now()}`,
      ...formData,
      berkas: berkasList,
      tanggalDaftar: new Date().toISOString(),
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('ppdb_pendaftar') || '[]');
    existing.push(pendaftar);
    localStorage.setItem('ppdb_pendaftar', JSON.stringify(existing));

    // Send WhatsApp summary
    const waText = `PPDB BARU SDK BUIKOUN - Nama: ${formData.namaLengkap}, Alamat: ${formData.alamat}, WA Ortu: ${formData.waOrangTua}, Berkas: ${berkasList.length} file terupload`;
    const waUrl = `https://wa.me/6282266138384?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (submitted) {
    return (
      <>
        <section className="bg-navy text-white py-12 md:py-16">
          <div className="container-school">
            <div className="flex items-center gap-2 text-gold text-sm mb-2">
              <Cross className="w-4 h-4" />
              <span>PPDB 2026/2027</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">Pendaftaran Berhasil</h1>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-school max-w-2xl">
            <div className="bg-white rounded-2xl border border-border shadow-sm p-8 text-center">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-navy mb-3">
                Pendaftaran Berhasil!
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                Terima kasih, data pendaftaran{' '}
                <strong className="text-navy">{formData.namaLengkap}</strong> telah
                berhasil dikirim. Data Anda akan diverifikasi oleh{' '}
                <strong className="text-navy">Operator Frengki Elyakim Bouk</strong>.
              </p>
              <div className="bg-secondary/50 rounded-lg p-4 text-left text-sm text-muted-foreground mb-6">
                <p className="font-semibold text-navy mb-1">Langkah selanjutnya:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Operator akan memverifikasi data dan berkas Anda</li>
                  <li>Anda akan dihubungi via WhatsApp untuk konfirmasi</li>
                  <li>Simpan bukti pendaftaran dan tunggu info selanjutnya</li>
                </ol>
              </div>
              <a
                href="/ppdb"
                className="inline-flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-navy-light transition-colors"
                onClick={(e) => { e.preventDefault(); setSubmitted(false); setFormData({ namaLengkap: '', nik: '', tempatTanggalLahir: '', jenisKelamin: '', alamat: '', namaOrangTua: '', waOrangTua: '', asalTK: '' }); setBerkasData({ kk: null, akta: null, foto: null, ktp: null }); }}
              >
                Daftar Lagi
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Page header */}
      <section className="bg-navy text-white py-12 md:py-16" style={{ backgroundColor: '#0f2a5a' }}>
        <div className="container-school">
          <div className="flex items-center gap-2 text-gold text-sm mb-2">
            <Cross className="w-4 h-4" />
            <span>Penerimaan Peserta Didik Baru</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            PPDB 2026/2027 SDK BUIKOUN
          </h1>
          <p className="text-white/70 mt-2 text-sm sm:text-base max-w-2xl">
            Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027
          </p>
        </div>
      </section>

      {/* Info & requirements */}
      <section className="section-padding bg-secondary/50">
        <div className="container-school">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Gelombang */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-navy text-white rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0f2a5a' }}>
                  <Calendar className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-navy">Jadwal Pendaftaran</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-gold/15 text-gold-dark px-3 py-1 rounded-full text-xs font-semibold">
                    Gelombang 1
                  </span>
                  <span className="text-sm text-muted-foreground">Juni - Juli 2026</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-secondary text-muted-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    Gelombang 2
                  </span>
                  <span className="text-sm text-muted-foreground">Agustus 2026 (jika kuota masih tersedia)</span>
                </div>
              </div>
              <a
                href="#form-pendaftaran"
                className="mt-5 inline-flex items-center gap-2 bg-gold text-navy px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-gold-dark transition-colors"
              >
                Daftar Sekarang
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Syarat */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gold text-navy rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-navy">Syarat Pendaftaran</h2>
              </div>
              <ul className="space-y-2">
                {syarat.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div id="form-pendaftaran" className="bg-white rounded-2xl border border-border shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-navy mb-1">
              Formulir Pendaftaran Online
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Isi data dengan lengkap dan benar. Tanda <span className="text-red-500">*</span> wajib diisi.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Data Siswa */}
              <div>
                <h3 className="text-sm font-bold text-navy bg-secondary/50 px-3 py-2 rounded-lg mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Data Calon Siswa
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-navy mb-1">
                      Nama Lengkap Calon Siswa <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.namaLengkap}
                      onChange={e => setFormData({ ...formData, namaLengkap: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                      placeholder="Nama lengkap sesuai akta"
                    />
                    {errors.namaLengkap && <p className="text-red-500 text-xs mt-1">{errors.namaLengkap}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">
                      NIK Siswa <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={16}
                      value={formData.nik}
                      onChange={e => setFormData({ ...formData, nik: e.target.value.replace(/[^0-9]/g, '') })}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                      placeholder="16 digit NIK"
                    />
                    {errors.nik && <p className="text-red-500 text-xs mt-1">{errors.nik}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">
                      Tempat, Tanggal Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.tempatTanggalLahir}
                      onChange={e => setFormData({ ...formData, tempatTanggalLahir: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                      placeholder="Contoh: Atambua, 15 Januari 2020"
                    />
                    {errors.tempatTanggalLahir && <p className="text-red-500 text-xs mt-1">{errors.tempatTanggalLahir}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">
                      Jenis Kelamin <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.jenisKelamin}
                      onChange={e => setFormData({ ...formData, jenisKelamin: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    >
                      <option value="">Pilih jenis kelamin</option>
                      <option value="L">Laki-laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                    {errors.jenisKelamin && <p className="text-red-500 text-xs mt-1">{errors.jenisKelamin}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">
                      Asal TK / PAUD
                    </label>
                    <input
                      type="text"
                      value={formData.asalTK}
                      onChange={e => setFormData({ ...formData, asalTK: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                      placeholder="Nama TK/PAUD sebelumnya (opsional)"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-navy mb-1">
                      Alamat Lengkap (Dusun/Desa) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={formData.alamat}
                      onChange={e => setFormData({ ...formData, alamat: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                      placeholder="Dusun, Desa, Kecamatan, Kabupaten"
                    />
                    {errors.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat}</p>}
                  </div>
                </div>
              </div>

              {/* Data Orang Tua */}
              <div>
                <h3 className="text-sm font-bold text-navy bg-secondary/50 px-3 py-2 rounded-lg mb-4 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Data Orang Tua / Wali
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-navy mb-1">
                      Nama Orang Tua / Wali <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.namaOrangTua}
                      onChange={e => setFormData({ ...formData, namaOrangTua: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                      placeholder="Nama lengkap orang tua/wali"
                    />
                    {errors.namaOrangTua && <p className="text-red-500 text-xs mt-1">{errors.namaOrangTua}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-navy mb-1">
                      No WA Orang Tua <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.waOrangTua}
                      onChange={e => setFormData({ ...formData, waOrangTua: e.target.value.replace(/[^0-9]/g, '') })}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                      placeholder="Contoh: 082266138384"
                    />
                    {errors.waOrangTua && <p className="text-red-500 text-xs mt-1">{errors.waOrangTua}</p>}
                  </div>
                </div>
              </div>

              {/* Upload Berkas */}
              <div>
                <h3 className="text-sm font-bold text-navy bg-secondary/50 px-3 py-2 rounded-lg mb-4 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Berkas <span className="text-red-500">*</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {berkasFields.map((field) => {
                    const file = berkasData[field.name];
                    return (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-navy mb-1">
                          {field.label}
                        </label>
                        <p className="text-xs text-muted-foreground mb-2">
                          Format: {field.accept.replace(/\./g, '').toUpperCase()} | Maks: {field.maxSizeLabel}
                        </p>
                        <input
                          ref={el => { fileRefs.current[field.name] = el; }}
                          type="file"
                          accept={field.accept}
                          onChange={e => {
                            const f = e.target.files?.[0];
                            if (f) handleFileChange(field.name, f, field.maxSize);
                          }}
                          className="hidden"
                        />
                        {!file ? (
                          <button
                            type="button"
                            onClick={() => fileRefs.current[field.name]?.click()}
                            className="w-full border-2 border-dashed border-border rounded-lg py-6 px-4 text-center hover:border-navy hover:bg-secondary/30 transition-colors"
                          >
                            <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                            <span className="text-xs text-muted-foreground">Klik untuk pilih file</span>
                          </button>
                        ) : (
                          <div className="border border-border rounded-lg p-3 flex items-center gap-3 bg-emerald-50/50">
                            {file.fileType.startsWith('image/') ? (
                              <img src={file.dataUrl} alt={file.fileName} className="w-12 h-12 object-cover rounded flex-shrink-0" />
                            ) : (
                              <div className="w-12 h-12 bg-navy text-white rounded flex items-center justify-center flex-shrink-0">
                                <FileText className="w-6 h-6" />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-navy truncate">{file.fileName}</p>
                              <p className="text-xs text-muted-foreground">{formatFileSize(file.fileSize)}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => { setBerkasData(prev => ({ ...prev, [field.name]: null })); if (fileRefs.current[field.name]) fileRefs.current[field.name]!.value = ''; }}
                              className="text-red-500 text-xs hover:text-red-700 flex-shrink-0"
                            >
                              Hapus
                            </button>
                          </div>
                        )}
                        {errors[field.name] && <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold text-navy px-8 py-3 rounded-lg font-semibold text-sm hover:bg-gold-dark transition-colors"
                >
                  <FileCheck className="w-5 h-5" />
                  Kirim Pendaftaran
                </button>
                <p className="text-xs text-muted-foreground mt-3">
                  Dengan mengirim formulir, data Anda akan disimpan dan dikirim ke
                  WhatsApp sekolah untuk verifikasi.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
