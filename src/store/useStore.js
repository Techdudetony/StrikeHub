import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { api } from '../lib/api';
import { toCamel, toSnake } from '../lib/case';

export const useStore = create((set, get) => ({
    // --- Auth state ---
    user: null,
    setUser: (user) => set({ user }),
    currentBowler: null,

    // --- Data ---
    games: [],

    // --- Auth actions ---
    login: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error; // caller shows a friendly message
    },

    signup: async ({ email, password, name = '', role = 'bowler' }) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name, role } },
        });
        if (error) throw error;
    },

    logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, currentBowler: null, games: [] });
    },

    // --- Auth bootstrap (keeps user + bowler in sync) ---
    initAuth: () => {
        const pump = async (session) => {
            const user = session?.user || null;
            set({ user });

            if (user) {
                const me = await api.get('/me');          // server ensures a Bowler for this Supabase user
                set({ currentBowler: toCamel(me.bowler) });
                await get().loadGames();
            } else {
                set({ currentBowler: null, games: [] });
            }
        };

        // initial
        supabase.auth.getSession().then(({ data }) => pump(data.session));

        // subscribe
        const { data: { subscription } } =
            supabase.auth.onAuthStateChange((_evt, session) => pump(session));

        return () => subscription.unsubscribe();
    },

    // --- Data actions ---
    loadGames: async () => {
        const bowler = get().currentBowler;
        if (!bowler) return set({ games: [] });
        const res = await api.get(`/games?bowler_id=${bowler.id}`);
        set({ games: toCamel(res) });
    },

    addGame: async (game) => {
        // bowler_id is enforced server-side to the current user
        const payload = toSnake({
            seriesDate: game.seriesDate,
            gameNo: game.gameNo,
            score: Number(game.score),
            leagueId: game.leagueId ?? null,
            notes: game.notes ?? '',
        });
        await api.post('/games', payload);
        await get().loadGames();
    },

    // --- Leagues (catalog) ---
    leaguesAll: [],

    loadLeaguesAll: async () => {
        const res = await api.get('/leagues');
        set({ leaguesAll: toCamel(res) });
    },

    createLeague: async (league) => {
        await api.post('/leagues', toSnake(league));
        await get().loadLeaguesAll();
    },
}));


