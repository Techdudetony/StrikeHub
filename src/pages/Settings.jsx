export default function Settings() {
    return (
        <form className="max-w-xl space-y-6">
            <section>
                <h3 className="text-sm font-semibold text-slate-300">Preferences</h3>
                <div className="mt-3 space-y-3">
                    <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Show tips after saving scores</span>
                    </label>
                    <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Email me weekly summary</span>
                    </label>
                </div>
            </section>
            <section>
                <h3 className="text-sm font-semibold text-slate-300">Appearance</h3>
                <select className="mt-2 w-full rounded-lg bg-slate-900/60 border-white/10">
                    <option>System</option>
                    <option>Dark</option>
                    <option>Light</option>
                </select>
            </section>
        </form>
    )
}