import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function ScoreEntryForm({ defaultLeagueId = '' }) {
    const addGame = useStore((s) => s.addGame);
    const leaguesAll = useStore((s) => s.leaguesAll);
    const loadLeaguesAll = useStore((s) => s.loadLeaguesAll);

    // load catalog for the dropdown
    useEffect(() => {
        if (!leaguesAll?.length) loadLeaguesAll();
    }, [leaguesAll?.length, loadLeaguesAll]);

    const [form, setForm] = useState({
        seriesDate: new Date().toISOString().slice(0, 10),
        gameNo: 1,
        score: '',
        leagueId: String(defaultLeagueId || ''), // '' = practice / none
        notes: '',
    });

    async function onSubmit(e) {
        e.preventDefault();
        if (!form.score) return;

        const payload = {
            seriesDate: form.seriesDate,
            gameNo: Number(form.gameNo),
            score: Number(form.score),
            leagueId: form.leagueId ? Number(form.leagueId) : null, // cast '' -> null
            notes: form.notes,
        };

        await addGame(payload);
        setForm((f) => ({
            ...f,
            gameNo: Math.min(3, Number(f.gameNo) + 1),
            score: '',
        }));
    }

    return (
        <form onSubmit={onSubmit} className="grid grid-cols-2 md:grid-cols-8 gap-3 panel">
            {/* Date */}
            <label className="col-span-2 md:col-span-2">
                <span className="label">Date</span>
                <input
                    type="date"
                    className="input mt-1"
                    value={form.seriesDate}
                    onChange={(e) => setForm({ ...form, seriesDate: e.target.value })}
                    required
                />
            </label>

            {/* Game # */}
            <label>
                <span className="label">Game #</span>
                <input
                    type="number"
                    min="1"
                    max="3"
                    className="input mt-1"
                    value={form.gameNo}
                    onChange={(e) => setForm({ ...form, gameNo: e.target.value })}
                    required
                />
            </label>

            {/* Score */}
            <label>
                <span className="label">Score</span>
                <input
                    type="number"
                    min="0"
                    max="300"
                    className="input mt-1"
                    value={form.score}
                    onChange={(e) => setForm({ ...form, score: e.target.value })}
                    required
                />
            </label>

            {/* League (optional) */}
            <label className="col-span-2">
                <span className="label">League (optional)</span>
                <select
                    className="select mt-1"
                    value={form.leagueId}
                    onChange={(e) => setForm({ ...form, leagueId: e.target.value })}
                >
                    <option value="">— None / Practice —</option>
                    {leaguesAll?.map((l) => (
                        <option key={l.id} value={l.id}>
                            {l.name}{l.center ? ` • ${l.center}` : ''}{l.season ? ` • ${l.season}` : ''}
                        </option>
                    ))}
                </select>
                <div className="text-xs text-slate-400 mt-1">
                    Can’t find your league? <Link to="/league" className="underline">Create or find it here</Link>.
                </div>
            </label>

            {/* Notes */}
            <label className="col-span-2 md:col-span-2">
                <span className="label">Notes</span>
                <input
                    type="text"
                    className="input mt-1"
                    placeholder="Oil pattern, misses, etc."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
            </label>

            <div className="col-span-2 md:col-span-1 flex items-end">
                <button className="btn-primary w-full">Save</button>
            </div>
        </form>
    );
}
