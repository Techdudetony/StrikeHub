import { useEffect, useState } from 'react';
import Table from '../components/Table.jsx';
import { api } from '../lib/api';

export default function Rankings() {
    const [rows, setRows] = useState([]);
    const [minGames, setMinGames] = useState(3);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let ok = true;

        (async () => {
            setLoading(true);
            setError('');
            try {
                // Server returns overall rankings across all bowlers
                // (endpoint was added earlier: GET /rankings/top-averages?limit=50)
                const data = await api.get('/rankings/top-averages?limit=50');

                const normalized = (Array.isArray(data) ? data : []).map((r, i) => ({
                    // normalize unknown shapes coming from SQL
                    name:
                        r.name ??
                        r.bowler_name ??
                        r.bowler?.name ??
                        'Unknown',
                    games: r.games ?? r.games_played ?? r.count ?? 0,
                    average: Math.round(r.average ?? r.avg ?? 0),
                    high: r.high ?? r.high_game ?? r.max ?? 0,
                }));

                // filter + sort defensively
                const filtered = normalized
                    .filter((r) => (r.games ?? 0) >= minGames)
                    .sort((a, b) => (b.average ?? 0) - (a.average ?? 0))
                    .map((r, idx) => ({ rank: idx + 1, ...r }));

                if (ok) setRows(filtered);
            } catch (e) {
                if (ok) setError(e.message || 'Failed to load rankings');
            } finally {
                if (ok) setLoading(false);
            }
        })();

        return () => {
            ok = false;
        };
    }, [minGames]);

    const columns = [
        { key: 'rank', header: '#' },
        { key: 'name', header: 'Bowler' },
        { key: 'games', header: 'Games' },
        { key: 'average', header: 'Average' },
        { key: 'high', header: 'High' },
    ];

    return (
        <div className="grid gap-4">
            <div className="panel flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <h2 className="text-lg font-semibold">Top Averages</h2>
                <label className="flex items-center gap-2">
                    <span className="label">Min games</span>
                    <input
                        type="number"
                        min={1}
                        className="input w-24"
                        value={minGames}
                        onChange={(e) => setMinGames(Number(e.target.value) || 1)}
                    />
                </label>
            </div>

            {error && (
                <div className="panel text-red-400 text-sm">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="panel text-slate-300">Loading rankings…</div>
            ) : rows.length === 0 ? (
                <div className="panel text-slate-300">
                    No ranking data yet. Once bowlers record scores, you’ll see the leaderboard here.
                </div>
            ) : (
                <Table columns={columns} rows={rows} />
            )}
        </div>
    );
}
