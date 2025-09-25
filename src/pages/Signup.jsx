import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function Signup() {
    const navigate = useNavigate();
    const signup = useStore((s) => s.signup);
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'bowler' });
    const user = useStore((s) => s.user);

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    async function onSubmit(e) {
        e.preventDefault();
        try {
            await signup(form) // Supabase signUp with metadata (role)
            navigate('/');
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="container py-10">
            <div className="panel max-w-md mx-auto">
                <h1 className="text-2xl font-semibold">Create your account</h1>
                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                    <label className="block">
                        <span className="text-sm text-slate-400">Name</span>
                        <input
                            type="text"
                            required
                            className="mt-1 pl-2 w-full rounded-lg bg-slate-900/60 border-white/10"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </label>
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
                    <label className="block">
                        <span className="text-sm text-slate-400">Role</span>
                        <select
                            className="mt-1 pl-2 w-full rounded-lg bg-slate-900/60 border-white/10"
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                        >
                            <option value="bowler">Bowler</option>
                            <option value="commissioner">League Commissioner</option>
                        </select>
                    </label>
                    <button className="btn-primary w-full">Sign up</button>
                </form>
                <p className="mt-4 text-sm text-slate-400">
                    Already have an account? <Link to="/login" className="text-white underline">Log in</Link>
                </p>
            </div>
        </div>
    );
}
