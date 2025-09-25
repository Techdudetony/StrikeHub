export default function StatCard({ label, value, hint }) {
    return (
        <div className="panel">
            <div className="text-xs text-slate-400">{label}</div>
            <div className="mt-1 text-2xl font-semibold">{value}</div>
            {hint && <div className="mt-2 text-xs text-slate-500">{hint}</div>}
        </div>
    );
}
