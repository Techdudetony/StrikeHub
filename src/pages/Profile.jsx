import { useStore } from '../store/useStore'


export default function Profile() {
    const me = useStore(s => s.bowlers[0])
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold">{me.name}</h2>
                <ul className="mt-3 space-y-1 text-sm text-slate-300">
                    <li>Hand: {me.hand}</li>
                    <li>Speed: {me.speedMph} mph</li>
                    <li>Typical line: {me.line}</li>
                    <li>Average: {me.avg}</li>
                </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-sm font-semibold text-slate-300">Arsenal</h3>
                <p className="text-slate-400 text-sm">Add your balls and layouts (coming soon).</p>
            </div>
        </div>
    )
}