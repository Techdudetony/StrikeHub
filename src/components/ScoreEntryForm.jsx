import { useState } from 'react';
import { useStore } from '../store/useStore';

export default function ScoreEntryForm({ bowlerId = 'u1', leagueId = 'l1' }) {
    const addGame = useStore((s) => s.addGame);
    const [form, setForm] = useState({
        seriesDate: new Date().toISOString().slice(0, 10),
        gameNo: 1,
        score: '',
        notes: '',
    });

    function onSubmit(e) {
        e.preventDefault();
        if (!form.score) return;
        addGame({
            id: crypto.randomUUID(),
            bowlerId,
            leagueId,
            ...form,
            score: Number(form.score),
        });
        setForm((f) => ({ ...f, gameNo: Math.min(3, f.gameNo + 1), score: '' }));
    }

    return (
        <form
            onSubmit={onSubmit}
            className="grid grid-cols-2 md:grid-cols-6 gap-3 panel"
        >
            <label className="col-span-2">
                <span className="label">Date</span>
                <input
                    type="date"
                    value={form.seriesDate}
                    onChange={(e) => setForm({ ...form, seriesDate: e.target.value })}
                    className="input mt-1"
                />
            </label>

            <label>
                <span className="label">Game #</span>
                <input
                    type="number"
                    min="1"
                    max="3"
                    value={form.gameNo}
                    onChange={(e) => setForm({ ...form, gameNo: Number(e.target.value) })}
                    className="input mt-1"
                />
            </label>

            <label>
                <span className="label">Score</span>
                <input
                    type="number"
                    min="0"
                    max="300"
                    value={form.score}
                    onChange={(e) => setForm({ ...form, score: e.target.value })}
                    className="input mt-1"
                />
            </label>

            <label className="md:col-span-2 col-span-2">
                <span className="label">Notes</span>
                <input
                    type="text"
                    placeholder="Oil pattern, misses, etc."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="input mt-1"
                />
            </label>

            <div className="col-span-2 md:col-span-1 flex items-end">
                <button className="btn-primary w-full">Save</button>
            </div>
        </form>
    );
}
