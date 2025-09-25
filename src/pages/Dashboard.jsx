import StatCard from '../components/StatCard.jsx';
import { useStore } from '../store/useStore';
import { average, high } from '../utils/calc';
import { api } from '../lib/api';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { useEffect } from 'react';

export default function Dashboard() {
    const games = useStore((s) => s.games);

    useEffect(() => {
        (async () => {
            try {
                // Note: backend expects an integer bowler_id; 'u1' will 422.
                // Use a real numeric id (e.g., 1) or fetch all for now:
                await api.get('/games');
            } catch (e) {
                console.warn('Fetching games failed:', e);
            }
        })();
    }, []);

    const scores = games.map((g) => g.score);
    const data = games.map((g) => ({ name: g.seriesDate + ' G' + g.gameNo, score: g.score }));

    return (
        <div className="grid gap-4">
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Average" value={average(scores)} />
                <StatCard label="High Game" value={high(scores)} />
                <StatCard label="Games Bowled" value={scores.length} />
                <StatCard label="Last Series Avg" value={average(games.slice(-3).map((g) => g.score))} />
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h2 className="mb-2 text-sm font-semibold text-slate-300">Score Trend</h2>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <XAxis dataKey="name" hide />
                            <YAxis domain={[100, 300]} />
                            <Tooltip />
                            <Line type="monotone" dataKey="score" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </section>
        </div>
    );
}
