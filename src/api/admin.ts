import useSWR, { mutate } from 'swr';
import { supabase } from 'src/utils/supabase';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 30_000,
  keepPreviousData: true,
};

// SWR keys — exported so pages can call `mutate(KEY)` after writes
export const KEYS = {
  clubs: 'admin/clubs',
  classes: 'admin/classes',
  schedules: 'admin/schedules',
  banners: 'admin/banners',
  registrations: 'admin/registrations',
  counts: 'admin/counts',
  pageContent: (pageKey: string) => `admin/page_content/${pageKey}`,
};

// ----------------------------------------------------------------------

export function useClubs() {
  const { data, error, isLoading } = useSWR(
    KEYS.clubs,
    async () => {
      const { data: rows, error: err } = await supabase
        .from('clubs')
        .select('*')
        .order('id');
      if (err) throw err;
      return rows ?? [];
    },
    swrOptions
  );
  return { clubs: data ?? [], isLoading, error };
}

// Lightweight version for dropdowns (id+name only)
export function useClubOptions() {
  const { data, error, isLoading } = useSWR(
    `${KEYS.clubs}/options`,
    async () => {
      const { data: rows, error: err } = await supabase
        .from('clubs')
        .select('id, name')
        .order('name');
      if (err) throw err;
      return rows ?? [];
    },
    swrOptions
  );
  return { clubOptions: data ?? [], isLoading, error };
}

// ----------------------------------------------------------------------

export function useClasses() {
  const { data, error, isLoading } = useSWR(
    KEYS.classes,
    async () => {
      const { data: rows, error: err } = await supabase
        .from('classes')
        .select('*')
        .order('id');
      if (err) throw err;
      return rows ?? [];
    },
    swrOptions
  );
  return { classes: data ?? [], isLoading, error };
}

export function useClassOptions() {
  const { data, error, isLoading } = useSWR(
    `${KEYS.classes}/options`,
    async () => {
      const { data: rows, error: err } = await supabase
        .from('classes')
        .select('id, title')
        .order('title');
      if (err) throw err;
      return rows ?? [];
    },
    swrOptions
  );
  return { classOptions: data ?? [], isLoading, error };
}

// ----------------------------------------------------------------------

export function useSchedules() {
  const { data, error, isLoading } = useSWR(
    KEYS.schedules,
    async () => {
      const { data: rows, error: err } = await supabase
        .from('schedules')
        .select('*, clubs(name), classes(title)')
        .order('id');
      if (err) throw err;
      return rows ?? [];
    },
    swrOptions
  );
  return { schedules: data ?? [], isLoading, error };
}

// ----------------------------------------------------------------------

export function useBanners() {
  const { data, error, isLoading } = useSWR(
    KEYS.banners,
    async () => {
      const { data: rows, error: err } = await supabase
        .from('banners')
        .select('*')
        .order('page_key');
      if (err) throw err;
      return rows ?? [];
    },
    swrOptions
  );
  return { banners: data ?? [], isLoading, error };
}

// ----------------------------------------------------------------------

export function useRegistrations() {
  const { data, error, isLoading } = useSWR(
    KEYS.registrations,
    async () => {
      const { data: rows, error: err } = await supabase
        .from('registrations')
        .select('*, clubs(name)')
        .order('created_at', { ascending: false });
      if (err) throw err;
      return rows ?? [];
    },
    swrOptions
  );
  return { registrations: data ?? [], isLoading, error };
}

// ----------------------------------------------------------------------

export function useAdminCounts() {
  const { data, error, isLoading } = useSWR(
    KEYS.counts,
    async () => {
      const [c1, c2, c3] = await Promise.all([
        supabase.from('clubs').select('id', { count: 'exact', head: true }),
        supabase.from('classes').select('id', { count: 'exact', head: true }),
        supabase.from('schedules').select('id', { count: 'exact', head: true }),
      ]);
      return {
        clubs: c1.count ?? 0,
        classes: c2.count ?? 0,
        schedules: c3.count ?? 0,
      };
    },
    swrOptions
  );
  return {
    counts: data ?? { clubs: 0, classes: 0, schedules: 0 },
    isLoading,
    error,
  };
}

// ----------------------------------------------------------------------

export function usePageContent(pageKey: string) {
  const { data, error, isLoading } = useSWR(
    pageKey ? KEYS.pageContent(pageKey) : null,
    async () => {
      const { data: rows, error: err } = await supabase
        .from('page_content')
        .select('section_key, content')
        .eq('page_key', pageKey);
      if (err) throw err;
      return rows ?? [];
    },
    swrOptions
  );
  return { rows: data ?? [], isLoading, error };
}

// ----------------------------------------------------------------------

// Re-export `mutate` so pages can trigger revalidation after writes
export { mutate };
