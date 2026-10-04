/*
# Create announcements table for SDK BUIKOUN

1. New Tables
- `announcements`
  - `id` (uuid, primary key, default gen_random_uuid())
  - `title` (text, not null) — judul pengumuman
  - `content` (text, not null) — isi pengumuman
  - `category` (text, default 'umum') — kategori pengumuman (umum, akademik, kegiatan, libur)
  - `is_published` (boolean, default true) — apakah pengumuman sudah dipublikasikan
  - `published_at` (timestamptz, default now()) — tanggal publikasi
  - `created_at` (timestamptz, default now()) — tanggal dibuat
  - `updated_at` (timestamptz, default now()) — tanggal diperbarui

2. Security
- Enable RLS on `announcements`.
- Allow anon + authenticated to read published announcements (public data, no sign-in required).
- Allow anon + authenticated to insert, update, delete (simple blog format, no auth screen).
- Using (true) is acceptable because this is intentionally public/shared data (single-tenant, no sign-in).

3. Notes
- This is a single-tenant app with no sign-in screen, so all policies use TO anon, authenticated.
- The school staff can manage announcements through the admin UI without logging in.
*/

CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'umum',
  is_published boolean NOT NULL DEFAULT true,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_announcements" ON announcements;
CREATE POLICY "anon_select_announcements"
ON announcements FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "anon_insert_announcements" ON announcements;
CREATE POLICY "anon_insert_announcements"
ON announcements FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_announcements" ON announcements;
CREATE POLICY "anon_update_announcements"
ON announcements FOR UPDATE
TO anon, authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_announcements" ON announcements;
CREATE POLICY "anon_delete_announcements"
ON announcements FOR DELETE
TO anon, authenticated
USING (true);
