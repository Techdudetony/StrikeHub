import ScoreEntryForm from '../components/ScoreEntryForm.jsx'
import Table from '../components/Table.jsx'
import { useStore } from '../store/useStore'


export default function Scores() {
    const games = useStore(s => s.games)
    const columns = [
        { key: 'seriesDate', header: 'Date' },
        { key: 'gameNo', header: 'Game' },
        { key: 'score', header: 'Score' },
        { key: 'notes', header: 'Notes' },
    ]


    return (
        <div className="grid gap-4">
            <ScoreEntryForm />
            <Table columns={columns} rows={games} />
        </div>
    )
}