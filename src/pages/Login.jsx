import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    // If user was bounced here by RequireAuth, go back there; otherwise go to landing "/"
    const from = location.state?.from?.pathname || '/';

    const login = useStore((s) => s.login);
    const user = useStore((s) => s.user);

    const [form, setForm] = useState({ email: '', password: '' });
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState('');

    useEffect(() => {
        if (user) navigate(from, { replace: true });
    }, [user, navigate, from]);

    async function onSubmit(e) {
        e.preventDefault();
        setBusy(true); setErr('');
        try {
            await login(form.email, form.password);   // pass (email, password)
            navigate(from, { replace: true });
        } catch (e) {
            setErr(e.message || 'Login failed');
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="container py-10">
            <div className="panel max-w-md mx-auto">
                <h1 className="text-2xl font-semibold">Log in</h1>

                {err && <div className="mt-3 text-sm text-red-400">{err}</div>}

                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                    <label className="block">
                        <span className="label">Email</span>
                        <input
                            className="input mt-1"
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </label>

                    <label className="block">
                        <span className="label">Password</span>
                        <input
                            className="input mt-1"
                            type="password"
                            required
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </label>

                    <button className="btn-primary w-full mt-2" disabled={busy}>
                        {busy ? 'Logging in…' : 'Log in'}
                    </button>
                </form>

                <p className="mt-4 text-sm text-slate-400">
                    No account? <Link to="/signup" className="underline text-white">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
