const YEAR = new Date().getFullYear();

const QUICK_LINKS = [
    { label: 'Employee Directory', href: '/list' },
];

const SOCIAL_LINKS = [
    { icon: '🐙', label: 'GitHub', href: '#' },
    { icon: '💼', label: 'LinkedIn', href: '#' },
    { icon: '🐦', label: 'Twitter', href: '#' },
];

export default function AppFooter() {
    return (
        <>
            <style>{`
                @keyframes ftrFadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
                .ftr-link:hover { color: #818cf8 !important; }
                .ftr-social:hover { background: rgba(99,102,241,0.25) !important; border-color: rgba(99,102,241,0.4) !important; transform: translateY(-2px); }
                .ftr-status-dot { animation: pulse 2s infinite; }
                @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
            `}</style>

            <footer style={{
                background: 'rgba(8,12,26,0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(99,102,241,0.12)',
                marginTop: 'auto',
                animation: 'ftrFadeIn 0.5s 0.3s ease both',
            }}>
                {/* ── Top section ── */}
                <div style={{
                    maxWidth: '1280px', margin: '0 auto',
                    padding: '40px 28px 28px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '36px',
                }}>

                    {/* Brand column */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                            <div style={{
                                width: '36px', height: '36px', borderRadius: '10px',
                                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '17px', boxShadow: '0 0 14px rgba(99,102,241,0.4)',
                                flexShrink: 0,
                            }}>💼</div>
                            <span style={{ fontSize: '15px', fontWeight: '800', color: '#f1f5f9', letterSpacing: '-0.2px' }}>
                                HR<span style={{ color: '#818cf8' }}>Dashboard</span>
                            </span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.65, maxWidth: '240px' }}>
                            A modern employee management portal to explore, manage, and analyse your workforce data.
                        </p>

                        {/* Status badge */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '7px',
                            marginTop: '16px', padding: '5px 12px', borderRadius: '9999px',
                            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
                        }}>
                            <span className="ftr-status-dot" style={{
                                width: '7px', height: '7px', borderRadius: '50%',
                                background: '#10b981', display: 'inline-block',
                            }} />
                            <span style={{ fontSize: '11px', fontWeight: '700', color: '#34d399', letterSpacing: '0.04em' }}>
                                All Systems Operational
                            </span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{
                            fontSize: '11px', fontWeight: '800', color: '#64748b',
                            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px',
                        }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {QUICK_LINKS.map(({ label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="ftr-link"
                                        style={{
                                            color: '#94a3b8', fontSize: '13px', fontWeight: '500',
                                            textDecoration: 'none', transition: 'color 0.18s',
                                            display: 'flex', alignItems: 'center', gap: '7px',
                                        }}
                                    >
                                        <span style={{ color: '#6366f1', fontSize: '10px' }}>▸</span>
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Features */}
                    <div>
                        <h4 style={{
                            fontSize: '11px', fontWeight: '800', color: '#64748b',
                            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px',
                        }}>Features</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {['Employee Directory', 'Salary Analytics', 'City Map View', 'Live Camera Capture', 'Search & Filter'].map((f) => (
                                <li key={f} style={{
                                    color: '#64748b', fontSize: '13px', fontWeight: '500',
                                    display: 'flex', alignItems: 'center', gap: '7px',
                                }}>
                                    <span style={{ color: '#6366f1', fontSize: '10px' }}>✓</span> {f}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tech stack */}
                    <div>
                        <h4 style={{
                            fontSize: '11px', fontWeight: '800', color: '#64748b',
                            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px',
                        }}>Built With</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {['⚛️ React 18', '⚡ Vite', '🗺️ Leaflet', '📊 Recharts', '🔐 Auth Context'].map((tech) => (
                                <span key={tech} style={{
                                    padding: '4px 10px', borderRadius: '8px', fontSize: '11px',
                                    fontWeight: '600', color: '#94a3b8',
                                    background: 'rgba(99,102,241,0.08)',
                                    border: '1px solid rgba(99,102,241,0.15)',
                                }}>{tech}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Bottom bar ── */}
                <div style={{
                    maxWidth: '1280px', margin: '0 auto',
                    padding: '16px 28px',
                    borderTop: '1px solid rgba(99,102,241,0.08)',
                    display: 'flex', alignItems: 'center',
                    flexWrap: 'wrap', gap: '12px',
                    justifyContent: 'space-between',
                }}>
                    <p style={{ fontSize: '12px', color: '#475569', fontWeight: '500' }}>
                        © {YEAR} <span style={{ color: '#64748b' }}>HRDashboard</span> — Built for internal HR management
                    </p>

                    {/* Social icons */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {SOCIAL_LINKS.map(({ icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                title={label}
                                className="ftr-social"
                                style={{
                                    width: '32px', height: '32px', borderRadius: '9px',
                                    background: 'rgba(99,102,241,0.08)',
                                    border: '1px solid rgba(99,102,241,0.15)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '14px', textDecoration: 'none',
                                    transition: 'all 0.18s',
                                }}
                            >{icon}</a>
                        ))}
                    </div>

                    <p style={{ fontSize: '11px', color: '#334155', fontWeight: '500' }}>
                        Version 1.0.0 &nbsp;•&nbsp; Made with ❤️ in India
                    </p>
                </div>
            </footer>
        </>
    );
}
