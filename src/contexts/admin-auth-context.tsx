import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from 'src/utils/supabase';
import type { User } from '@supabase/supabase-js';

// SQL to run in Supabase:
//
// CREATE TABLE admin_profiles (
//   id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
//   role TEXT NOT NULL DEFAULT 'schedule_manager'
// );
// ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "read own profile" ON admin_profiles FOR SELECT USING (auth.uid() = id);
//
// CREATE TABLE banners (
//   id BIGSERIAL PRIMARY KEY,
//   page_key TEXT UNIQUE NOT NULL,
//   image_url TEXT,
//   updated_at TIMESTAMPTZ DEFAULT NOW()
// );
// ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "public read banners" ON banners FOR SELECT USING (true);
// CREATE POLICY "auth write banners" ON banners FOR ALL USING (auth.role() = 'authenticated');
//
// INSERT INTO banners (page_key) VALUES
//   ('home'), ('classes'), ('clubs'), ('membership'), ('career'), ('contact'), ('highlights')
// ON CONFLICT (page_key) DO NOTHING;

export type AdminRole = 'admin' | 'schedule_manager';

interface AdminAuthState {
  user: User | null;
  role: AdminRole | null;
  loading: boolean;
}

interface AdminAuthContextType extends AdminAuthState {
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    role: null,
    loading: true,
  });

  const fetchRole = async (userId: string): Promise<AdminRole | null> => {
    const { data } = await supabase.from('admin_profiles').select('role').eq('id', userId).single();
    return (data?.role as AdminRole) || null;
  };

  useEffect(() => {
    let currentUserId: string | null = null;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        currentUserId = session.user.id;
        const role = await fetchRole(session.user.id);
        setState({ user: session.user, role, loading: false });
      } else {
        setState({ user: null, role: null, loading: false });
      }
    });

    // IMPORTANT: never call other supabase.* methods synchronously inside
    // onAuthStateChange — the auth client holds an internal lock while this
    // callback runs, so an awaited query in here (e.g. fetchRole's
    // `.from().select()`) deadlocks and never resolves. This event also
    // fires on every tab focus (visibilitychange -> token refresh), which
    // is what caused the "stuck loading" after switching tabs. Deferring
    // with setTimeout lets the lock release first, per Supabase's own
    // guidance. We also skip the role refetch when it's just a token
    // refresh for the same user, since the role can't have changed.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setTimeout(async () => {
        if (session?.user) {
          if (session.user.id === currentUserId) {
            setState((prev) => ({ ...prev, user: session.user, loading: false }));
            return;
          }
          currentUserId = session.user.id;
          const role = await fetchRole(session.user.id);
          setState({ user: session.user, role, loading: false });
        } else {
          currentUserId = null;
          setState({ user: null, role: null, loading: false });
        }
      }, 0);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error?.message || null;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AdminAuthContext.Provider value={{ ...state, signIn, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return ctx;
}
