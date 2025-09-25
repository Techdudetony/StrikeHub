export default function Table({ columns, rows }) {
    return (
        <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="min-w-full text-sm">
                <thead className="bg-white/5">
                    <tr>
                        {columns.map((c) => (
                            <th key={c.key} className="px-3 py-2 text-left font-medium text-slate-300">{c.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i} className="odd:bg-white/0 even:bg-white/[0.02]">
                            {columns.map(c => (
                                <td key={c.key} className="px-3 py-2">{r[c.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}