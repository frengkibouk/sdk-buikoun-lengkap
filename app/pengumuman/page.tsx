import { supabase } from '@/lib/supabase';
import type { Announcement } from '@/lib/types';
import { PengumumanClient } from './PengumumanClient';

export const dynamic = 'force-dynamic';

async function getAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }

  return (data as Announcement[]) ?? [];
}

export default async function PengumumanPage() {
  const announcements = await getAnnouncements();

  return <PengumumanClient initialAnnouncements={announcements} />;
}
