import { useStore } from '../store/useStore';

export default function Profile() {
    const user = useStore((s) => s.user);
    const bowler = useStore((s) => s.currentBowler);

    if (!user) {
        return (
            <div className="panel">
                <h2 className="text-lg font-semibold">Profile</h2>
                <p className="mt-2 text-slate-300">Please log in to view your profile.</p>
            </div>
        );
    }

    if (!bowler) {
        return (
            <div className="panel">
                <h2 className="text-lg font-semibold">Profile</h2>
                <p className="mt-2 text-slate-300">Loading your profile…</p>
            </div>
        );
    }

    // NOTE: currentBowler is camel-cased by the store (speed_mph -> speedMph)
    return (
        <div className="grid gap-4">
            <section className="panel">
                <h2 className="text-lg font-semibold">Account</h2>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <div>
                        <div className="label">Name</div>
                        <div className="mt-1 text-slate-100">{bowler.name || '—'}</div>
                    </div>
                    <div>
                        <div className="label">Email</div>
                        <div className="mt-1 text-slate-100">{user.email || '—'}</div>
                    </div>
                </div>
            </section>

            <section className="panel">
                <h2 className="text-lg font-semibold">Bowling Profile</h2>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                    <div>
                        <div className="label">Hand</div>
                        <div className="mt-1 text-slate-100">{bowler.hand ?? '—'}</div>
                    </div>
                    <div>
                        <div className="label">Speed (mph)</div>
                        <div className="mt-1 text-slate-100">{bowler.speedMph ?? '—'}</div>
                    </div>
                    <div>
                        <div className="label">Line</div>
                        <div className="mt-1 text-slate-100">{bowler.line ?? '—'}</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
