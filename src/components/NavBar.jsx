import { NavLink, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

const linkCls = ({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link');

export default function NavBar() {
    const user = useStore((s) => s.user);
    const logout = useStore((s) => s.logout);
    const displayName = user?.user_metadata?.name || (user?.email ? user.email.split('@')[0] : null);

    return (
        <header className="app-header">
            <div className="header-inner">
                <Link to="/" aria-label="Strikehub home">
                    <img src="/strikehub_logo.svg" alt="Strikehub" className="brand-logo" />
                </Link>

                {/* Only show app nav when logged in */}
                {user && (
                    <nav className="nav-links">
                        <NavLink to="/dashboard" className={linkCls}>Dashboard</NavLink>
                        <NavLink to="/scores" className={linkCls}>Scores</NavLink>
                        <NavLink to="/league" className={linkCls}>League</NavLink>
                        <NavLink to="/rankings" className={linkCls}>Rankings</NavLink>
                        <NavLink to="/profile" className={linkCls}>Profile</NavLink>
                        <NavLink to="/settings" className={linkCls}>Settings</NavLink>
                    </nav>
                )}

                <div className="auth-actions">
                    {user ? (
                        <>
                            <span className="hidden sm:inline text-sm text-slate-300">
                                Hi{displayName ? `, ${displayName}` : ''}!
                            </span>
                            <button className="btn-muted" onClick={logout}>Log out</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="btn-muted">Log in</NavLink>
                            <NavLink to="/signup" className="btn-primary">Sign up</NavLink>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
