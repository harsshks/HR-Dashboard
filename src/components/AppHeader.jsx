import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
    { label: 'Directory', icon: '👥', path: '/list' },
];

export default function AppHeader() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <style>{`
                @keyframes hdrFadeIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
                .nav-link-btn:hover { background: rgba(99,102,241,0.15) !important; color: #f1f5f9 !important; }
                .nav-link-btn.active { background: rgba(99,102,241,0.18) !important; color: #818cf8 !important; }
                .logout-btn:hover { background: rgba(239,68,68,0.18) !important; border-color: rgba(239,68,68,0.45) !important; transform: translateY(-1px); }
                .hdr-logo:hover { opacity: 0.85; }
            `}</style>

            <header style={{
                position: 'sticky', top: 0, zIndex: 200,
                background: 'rgba(8,12,26,0.88)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(99,102,241,0.14)',
                boxShadow: '0 4px 32px rgba(0,0,0,0.45)',
                animation: 'hdrFadeIn 0.4s ease forwards',
            }}>
                <div style={{
                    maxWidth: '1280px', margin: '0 auto',
                    padding: '0 28px', height: '64px',
                    display: 'flex', alignItems: 'center', gap: '32px',
                }}>

                    {/* ── Logo ── */}
                    <button
                        className="hdr-logo"
                        onClick={() => navigate('/list')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '11px',
                            background: 'none', border: 'none', cursor: 'pointer',
                            padding: 0, transition: 'opacity 0.2s',
                        }}
                    >
                        <div style={{
                            width: '38px', height: '38px', borderRadius: '11px',
                            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '18px', boxShadow: '0 0 18px rgba(99,102,241,0.45)',
                            flexShrink: 0,
                        }}>💼</div>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '15px', fontWeight: '800', color: '#f1f5f9', letterSpacing: '-0.3px', lineHeight: 1.1 }}>
                                HR<span style={{ color: '#818cf8' }}>Dashboard</span>
                            </div>
                            <div style={{ fontSize: '10px', color: '#475569', fontWeight: '500', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                                Employee Portal
                            </div>
                        </div>
                    </button>

                    {/* ── Nav links ── */}
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1 }}>
                        {NAV_LINKS.map(({ label, icon, path }) => {
                            const active = location.pathname === path || location.pathname.startsWith('/details');
                            return (
                                <button
                                    key={path}
                                    className={`nav-link-btn${active ? ' active' : ''}`}
                                    onClick={() => navigate(path)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '7px',
                                        padding: '7px 14px', borderRadius: '10px',
                                        background: active ? 'rgba(99,102,241,0.18)' : 'transparent',
                                        border: 'none', cursor: 'pointer',
                                        color: active ? '#818cf8' : '#64748b',
                                        fontSize: '13px', fontWeight: '600',
                                        transition: 'all 0.18s', fontFamily: "'Inter',sans-serif",
                                    }}
                                >
                                    <span>{icon}</span> {label}
                                </button>
                            );
                        })}
                    </nav>

                    {/* ── Right side ── */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* User badge */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '6px 14px', borderRadius: '9999px',
                            background: 'rgba(99,102,241,0.1)',
                            border: '1px solid rgba(99,102,241,0.22)',
                        }}>
                            <div style={{
                                width: '22px', height: '22px', borderRadius: '50%',
                                background: 'linear-gradient(135deg,#6366f1,#a855f7)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '11px', fontWeight: '800', color: 'white',
                            }}>
                                {String(user?.username ?? 'U')[0].toUpperCase()}
                            </div>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#818cf8' }}>
                                {user?.username}
                            </span>
                        </div>

                        {/* Logout */}
                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '8px 16px', borderRadius: '10px',
                                background: 'rgba(239,68,68,0.08)',
                                border: '1px solid rgba(239,68,68,0.22)',
                                color: '#f87171', fontSize: '13px', fontWeight: '600',
                                cursor: 'pointer', transition: 'all 0.18s',
                                fontFamily: "'Inter',sans-serif",
                            }}
                        >
                            <span>→</span> Logout
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}
