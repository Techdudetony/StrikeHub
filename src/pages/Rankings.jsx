import Table from '../components/Table.jsx'
import { useStore } from '../store/useStore'


export default function Rankings() {
    const bowlers = useStore(s => s.bowlers)
    const rows = bowlers.sort((a, b) => b.avg - a.avg).map((b, i) => ({ rank: i + 1, name: b.name, avg: b.avg }))
    return (
        <Table columns={[{ key: 'rank', header: '#' }, { key: 'name', header: 'Bowler' }, { key: 'avg', header: 'Average' }]} rows={rows} />
    )
}