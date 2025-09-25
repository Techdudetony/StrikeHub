import { useEffect, useMemo, useState } from 'react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export default function LeaguePage() {
    const games = useStore((s) => s.games);           // your games (already user-scoped)
    const leaguesAll = useStore((s) => s.leaguesAll);      // full catalog
    const loadLeaguesAll = useStore((s) => s.loadLeaguesAll);
    const createLeague = useStore((s) => s.createLeague);

    const [query, setQuery] = useState('');
    const [form, setForm] = useState({ name: '', center: '', season: '' });

    // Load catalog once
    useEffect(() => {
        if (!leaguesAll?.length) loadLeaguesAll();
    }, [leaguesAll?.length, loadLeaguesAll]);

    // Your linked leagues = distinct leagues referenced in your games
    const myLeagueIds = useMemo(() => {
        const ids = new Set();
        (games || []).forEach((g) => {
            if (g.leagueId != null) ids.add(g.leagueId);
        });
        return ids;
    }, [games]);

    const myLeagues = useMemo(() => {
        if (!leaguesAll?.length || myLeagueIds.size === 0) return [];
        return leaguesAll.filter((l) => myLeagueIds.has(l.id));
    }, [leaguesAll, myLeagueIds]);

    // Simple search across the catalog
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!leaguesAll?.length) return [];
        if (!q) return leaguesAll.slice(0, 25);
        return leaguesAll
            .filter((l) =>
                (l.name || '').toLowerCase().includes(q) ||
                (l.center || '').toLowerCase().includes(q) ||
                (l.season || '').toLowerCase().includes(q)
            )
            .slice(0, 50);
    }, [leaguesAll, query]);

    async function onCreate(e) {
        e.preventDefault();
        if (!form.name.trim()) return;
        await createLeague(form); // POST /leagues
        setForm({ name: '', center: '', season: '' });
    }

    return (
        <div className="grid gap-4">
            {/* Your leagues */}
            <section className="panel">
                <h2 className="text-lg font-semibold">Your leagues</h2>

                {myLeagues.length === 0 ? (
                    <div className="mt-3 text-slate-300">
                        <p>You don’t have any leagues linked yet.</p>
                        <p className="mt-1">
                            Add a score with a league selected on the{' '}
                            <Link className="underline" to="/scores">Scores</Link> page and it will appear here.
                            You can also find an existing league below or create a new one.
                        </p>
                    </div>
                ) : (
                    <ul className="mt-3 grid gap-3 md:grid-cols-2">
                        {myLeagues.map((l) => (
                            <li key={l.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                                <div className="text-base font-medium">{l.name}</div>
                                <div className="text-sm text-slate-400">
                                    {[l.center, l.season].filter(Boolean).join(' • ') || '—'}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Find an existing league */}
            <section className="panel">
                <h2 className="text-lg font-semibold">Find a league</h2>
                <input
                    className="input mt-3"
                    placeholder="Search by name, center, or season"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <ul className="mt-3 grid gap-2">
                    {filtered.map((l) => (
                        <li key={l.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                            <div className="text-base font-medium">{l.name}</div>
                            <div className="text-sm text-slate-400">
                                {[l.center, l.season].filter(Boolean).join(' • ') || '—'}
                            </div>
                            <div className="text-xs text-slate-400 mt-1">
                                Add a score in this league on the <span className="font-medium">Scores</span> page to link it.
                            </div>
                        </li>
                    ))}
                    {filtered.length === 0 && (
                        <div className="text-slate-400 text-sm mt-2">No leagues match your search.</div>
                    )}
                </ul>
            </section>

            {/* Create a league (become commissioner) */}
            <section className="panel">
                <h2 className="text-lg font-semibold">Create a league</h2>
                <form className="mt-3 grid gap-3 md:grid-cols-3" onSubmit={onCreate}>
                    <input
                        className="input"
                        placeholder="Name *"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        className="input"
                        placeholder="Center"
                        value={form.center}
                        onChange={(e) => setForm({ ...form, center: e.target.value })}
                    />
                    <input
                        className="input"
                        placeholder="Season"
                        value={form.season}
                        onChange={(e) => setForm({ ...form, season: e.target.value })}
                    />
                    <div className="md:col-span-3">
                        <button className="btn-primary">Create league</button>
                    </div>
                </form>
                <p className="mt-2 text-sm text-slate-400">
                    Creating a league makes you its commissioner (commissioner tools coming soon).
                </p>
            </section>
        </div>
    );
}
