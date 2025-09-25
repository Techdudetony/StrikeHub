import Table from '../components/Table.jsx'
import { useStore } from '../store/useStore'


export default function League() {
    const league = useStore(s => s.leagues[0])
    const teams = league.teams.map((t, i) => ({ rank: i + 1, team: t.name, bowlers: t.bowlers.length }))


    return (
        <div className="grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h2 className="text-lg font-semibold">{league.name}</h2>
                <p className="text-slate-400 text-sm">{league.center} • {league.season}</p>
            </div>
            <Table columns={[{ key: 'rank', header: '#' }, { key: 'team', header: 'Team' }, { key: 'bowlers', header: 'Bowlers' }]} rows={teams} />
        </div>
    )
}