'use client';

import { useState } from 'react';
import { Cross, Calendar, Tag, ChevronDown, ChevronUp, Search } from 'lucide-react';
import type { Announcement } from '@/lib/types';

const categoryColors: Record<string, string> = {
  umum: 'bg-blue-50 text-blue-700 border-blue-200',
  akademik: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  kegiatan: 'bg-amber-50 text-amber-700 border-amber-200',
  libur: 'bg-red-50 text-red-700 border-red-200',
};

const categoryLabels: Record<string, string> = {
  umum: 'Umum',
  akademik: 'Akademik',
  kegiatan: 'Kegiatan',
  libur: 'Libur',
};

function formatDate(dateStr: string) {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function PengumumanClient({
  initialAnnouncements,
}: {
  initialAnnouncements: Announcement[];
}) {
  const [announcements] = useState<Announcement[]>(initialAnnouncements);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');

  const filtered = announcements.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || a.category === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = ['all', 'umum', 'akademik', 'kegiatan', 'libur'];

  return (
    <>
      {/* Page header */}
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-school">
          <div className="flex items-center gap-2 text-gold text-sm mb-2">
            <Cross className="w-4 h-4" />
            <span>Informasi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Pengumuman</h1>
          <p className="text-white/70 mt-2 text-sm sm:text-base max-w-2xl">
            Pengumuman terbaru dari SDK BUIKOUN untuk siswa, orang tua, dan
            masyarakat.
          </p>
        </div>
      </section>

      {/* Announcements */}
      <section className="section-padding bg-white">
        <div className="container-school">
          {/* Search and filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari pengumuman..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                    filter === cat
                      ? 'bg-navy text-white border-navy'
                      : 'bg-white text-muted-foreground border-border hover:bg-secondary'
                  }`}
                >
                  {cat === 'all' ? 'Semua' : categoryLabels[cat] || cat}
                </button>
              ))}
            </div>
          </div>

          {/* Announcement list */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Cross className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                {announcements.length === 0
                  ? 'Belum ada pengumuman yang dipublikasikan.'
                  : 'Tidak ada pengumuman yang cocok dengan pencarian Anda.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((item) => {
                const isOpen = expanded === item.id;
                const catClass =
                  categoryColors[item.category] || categoryColors.umum;
                return (
                  <article
                    key={item.id}
                    className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => setExpanded(isOpen ? null : item.id)}
                      className="w-full text-left p-5 sm:p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${catClass}`}
                            >
                              <Tag className="w-3 h-3" />
                              {categoryLabels[item.category] || item.category}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {formatDate(item.published_at)}
                            </span>
                          </div>
                          <h2 className="text-base sm:text-lg font-bold text-navy mb-1">
                            {item.title}
                          </h2>
                          <p
                            className={`text-sm text-muted-foreground leading-relaxed ${
                              isOpen ? '' : 'line-clamp-2'
                            }`}
                          >
                            {item.content}
                          </p>
                        </div>
                        <div className="flex-shrink-0 pt-1">
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
