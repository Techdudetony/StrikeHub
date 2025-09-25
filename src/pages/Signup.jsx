import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function Signup() {
    const navigate = useNavigate();
    const location = useLocation();
    // If user got here from a protected page, go back there after sign-up; otherwise go to landing
    const from = location.state?.from?.pathname || '/';

    const signup = useStore((s) => s.signup);
    const user = useStore((s) => s.user);

    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'bowler' });
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState('');

    useEffect(() => {
        if (user) navigate(from, { replace: true });
    }, [user, navigate, from]);

    async function onSubmit(e) {
        e.preventDefault();
        setBusy(true); setErr('');
        try {
            await signup(form);          // Supabase signUp with metadata { name, role }
            navigate(from, { replace: true });  // keep landing redirect behavior
        } catch (e) {
            setErr(e.message || 'Sign up failed');
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="container py-10">
            <div className="panel max-w-md mx-auto">
                <h1 className="text-2xl font-semibold">Create your account</h1>

                {err && <div className="mt-3 text-sm text-red-400">{err}</div>}

                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                    <label className="block">
                        <span className="label">Name</span>
                        <input
                            type="text"
                            required
                            className="input mt-1"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </label>

                    <label className="block">
                        <span className="label">Email</span>
                        <input
                            type="email"
                            required
                            className="input mt-1"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </label>

                    <label className="block">
                        <span className="label">Password</span>
                        <input
                            type="password"
                            required
                            minLength={6}
                            className="input mt-1"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </label>

                    <label className="block">
                        <span className="label">Role</span>
                        <select
                            className="select mt-1"
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                        >
                            <option value="bowler">Bowler</option>
                            <option value="commissioner">League Commissioner</option>
                        </select>
                    </label>

                    <button className="btn-primary w-full mt-2" disabled={busy}>
                        {busy ? 'Creating…' : 'Sign up'}
                    </button>
                </form>

                <p className="mt-4 text-sm text-slate-400">
                    Already have an account? <Link to="/login" className="underline text-white">Log in</Link>
                </p>
            </div>
        </div>
    );
}
