import { create } from 'zustand';
import sample from '../data/sample';
import { supabase } from '../lib/supabase';

export const useStore = create((set, get) => ({
    // existing demo state
    bowlers: sample.bowlers, leagues: sample.leagues, games: sample.games,
    addGame: (g) => set((s) => ({ games: [...s.games, g] })),

    // ---- Auth (Supabase) ----
    user: null, // { id, email, user_metadata: { role } }
    setUser: (user) => set({ user }),

    signup: async ({ name, email, password, role }) => {
        const { data, error } = await supabase.auth.signUp({
            email, password,
            options: { data: { name, role } } // stored in user_metadata
        });
        if (error) throw error;
        set({ user: data.user });
        return data.user;
    },

    login: async ({ email, password }) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        set({ user: data.user });
        return data.user;
    },

    logout: async () => {
        await supabase.auth.signOut();
        set({ user: null });
    },

    initAuth: () => {
        // run once at app start
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_ev, session) => {
            set({ user: session?.user || null });
        });
        // also set current session immediately
        supabase.auth.getSession().then(({ data }) => set({ user: data.session?.user || null }));
        return () => subscription.unsubscribe();
    },
}));
