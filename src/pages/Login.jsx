import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function Login() {
    const navigate = useNavigate();
    const login = useStore((s) => s.login);
    const [form, setForm] = useState({ email: '', password: '' });
    const user = useStore((s) => s.user);

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    async function onSubmit(e) {
        e.preventDefault();
        try {
            await login(form);
            navigate('/');
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="container py-10">
            <div className="panel max-w-md mx-auto">
                <h1 className="text-2xl font-semibold">Log in</h1>
                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                    <label className="block">
                        <span className="text-sm text-slate-400">Email</span>
                        <input
                            type="email"
                            required
                            className="mt-1 pl-2 w-full rounded-lg bg-slate-900/60 border-white/10"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </label>
                    <label className="block">
                        <span className="text-sm text-slate-400">Password</span>
                        <input
                            type="password"
                            required
                            className="mt-1 pl-2 w-full rounded-lg bg-slate-900/60 border-white/10"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </label>
                    <button className="btn-primary w-full">Log in</button>
                </form>
                <p className="mt-4 text-sm text-slate-400">
                    No account? <Link to="/signup" className="text-white underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
