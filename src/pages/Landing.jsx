import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function Landing() {
    const user = useStore((s) => s.user);

    return (
        <div className='landing-hero'>
            {/* Hero */}
            <section className='container py-16 md:py-24'>
                <div className='grid items-center gap-10 md:grid-cols-2'>
                    <div>
                        <span className='kicker'>Bowling analytics, made simple</span>
                        <h1 className='display mt-3'>
                            Own your game with <span className='text-[var(--strike-green)]'>StrikeHub</span>
                        </h1>
                        <p className='subhead mt-4 max-w-prose'>
                            Track scores, speed, equipment, and lane notes. League commissioners
                            can manager standings, post updates, and email teams-everything in one fast modern tool.
                        </p>

                        <div className='mt-6 flex flex-wrap gap-3'>
                            {user ? (
                                <Link to="/dashboard" className='btn-primary'>Go to dashboard</Link>
                            ) : (
                                <>
                                    <Link to="/signup" className='btn-primary'>Get started free</Link>
                                    <Link to="/login" className='btn-muted'>Log in</Link>
                                </>
                            )}
                        </div>

                        <ul className='mt-6 grid grid-cols-2 gap-2 text-sm text-slate-400'>
                            <li>• Score & series tracking</li>
                            <li>• High game & averages</li>
                            <li>• Speed & hand dominance</li>
                            <li>• Oil pattern notes</li>
                            <li>• League standings</li>
                            <li>• Email updates</li>
                        </ul>
                    </div>

                    <div className='relative'>
                        <div className='preview panel'>
                            {/* TODO: Replace with a real screenshot of StrikeHub later */}
                            <img
                                src="/strikehub_logo.svg"
                                alt='StrikeHub preview'
                                className='mx-auto max-h-48 opacity-90'
                            />
                            <div className='mt-4 text-center text-sm text-slate-400'>
                                Dashboard preview coming soon
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className='container py-12 md:py-16'>
                <h2 className='text-2xl font-semibold'>Why bowlers love Strikehub!</h2>
                <div className='mt-6 grid gap-4 md:grid-cols-3'>
                    <div className='feature-card'>
                        <div className='feature-emoji'>🎯</div>
                        <h3 className='feature-title'>Real insights</h3>
                        <p className='feature-copy'>
                            Trends over time with series vs. game view. Know when you're improving-and why.
                        </p>
                    </div>
                    <div className='feature-card'>
                        <div className='feature-emoji'>🏎️</div>
                        <h3 className='feature-title'>Speed & notes</h3>
                        <p className='feature-copy'>
                            Track ball speed, hand, and lane patterns so adjustments become second nature.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-emoji">🎳</div>
                        <h3 className="feature-title">Equipment log</h3>
                        <p className="feature-copy">
                            Attach equipment used by game or series—match layouts to outcomes.
                        </p>
                    </div>
                </div>
            </section>

            {/* For commissioners */}
            <section className="container py-12 md:py-16">
                <h2 className="text-2xl font-semibold">Built for league commissioners</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="feature-card">
                        <div className="feature-emoji">📣</div>
                        <h3 className="feature-title">League news</h3>
                        <p className="feature-copy">
                            Post schedule changes, dues reminders, openings and free agents.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-emoji">📊</div>
                        <h3 className="feature-title">Standings & rankings</h3>
                        <p className="feature-copy">
                            Track standings, pinfall and averages with clean, shareable pages.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-emoji">📄</div>
                        <h3 className="feature-title">Import nights</h3>
                        <p className="feature-copy">
                            Upload PDFs/photos of score sheets for quick entry and verification.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-band">
                <div className="container py-10 text-center">
                    <h3 className="text-xl font-semibold">Ready to roll?</h3>
                    <p className="mt-2 text-slate-300">
                        Create your account and start tracking in under a minute.
                    </p>
                    <div className="mt-5 flex justify-center gap-3">
                        {user ? (
                            <Link to="/dashboard" className="btn-primary">Open dashboard</Link>
                        ) : (
                            <>
                                <Link to="/signup" className="btn-primary">Sign up</Link>
                                <Link to="/login" className="btn-muted">Log in</Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="container py-8 text-xs text-slate-400 flex items-center justify-between">
                <span>© {new Date().getFullYear()} Strikehub</span>
                <span>Built for bowlers & leagues</span>
            </footer>
        </div>
    );
}