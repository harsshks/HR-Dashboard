import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const VALID_USER = 'testuser';
const VALID_PASS = 'Test123';

const S = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 40%, #1a0a2e 100%)',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        overflow: 'hidden',
    },
    blob1: {
        position: 'absolute', top: '-15%', right: '-10%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
    },
    blob2: {
        position: 'absolute', bottom: '-15%', left: '-10%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)',
        pointerEvents: 'none',
    },
    blob3: {
        position: 'absolute', top: '40%', left: '30%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
    },
    wrapper: {
        width: '100%', maxWidth: '460px', padding: '24px',
        position: 'relative', zIndex: 1,
        animation: 'fadeUp 0.6s ease forwards',
    },
    brandSection: {
        textAlign: 'center', marginBottom: '32px',
    },
    iconWrap: {
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: '72px', height: '72px', borderRadius: '22px',
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
        boxShadow: '0 0 40px rgba(99,102,241,0.5), 0 20px 40px rgba(0,0,0,0.4)',
        marginBottom: '20px',
        fontSize: '32px',
    },
    brandTitle: {
        fontSize: '32px', fontWeight: '800', letterSpacing: '-0.5px',
        color: '#f1f5f9', marginBottom: '6px',
    },
    brandAccent: { color: '#818cf8' },
    brandSub: {
        fontSize: '13px', color: '#64748b', fontWeight: '500', letterSpacing: '0.5px',
    },
    card: {
        background: 'rgba(15,23,42,0.75)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: '24px',
        padding: '36px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
    },
    cardHeader: {
        marginBottom: '28px',
    },
    cardTitle: {
        fontSize: '20px', fontWeight: '700', color: '#f1f5f9', marginBottom: '6px',
    },
    cardSub: { fontSize: '13px', color: '#64748b' },
    fieldWrap: { marginBottom: '18px' },
    label: {
        display: 'block', fontSize: '11px', fontWeight: '700',
        color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em',
        marginBottom: '8px',
    },
    inputWrap: { position: 'relative' },
    inputIcon: {
        position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
        color: '#475569', fontSize: '15px', pointerEvents: 'none',
        display: 'flex', alignItems: 'center',
    },
    input: {
        width: '100%', padding: '13px 14px 13px 42px',
        background: 'rgba(30,41,59,0.8)',
        border: '1px solid rgba(71,85,105,0.5)',
        borderRadius: '12px', color: '#f1f5f9', fontSize: '14px',
        outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
        fontFamily: "'Inter', sans-serif",
    },
    errorBox: {
        background: 'rgba(239,68,68,0.1)',
        border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: '12px', padding: '12px 16px',
        color: '#fca5a5', fontSize: '13px', marginBottom: '18px',
        display: 'flex', alignItems: 'center', gap: '8px',
    },
    btn: {
        width: '100%', padding: '14px',
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
        border: 'none', borderRadius: '12px',
        color: 'white', fontSize: '15px', fontWeight: '700',
        cursor: 'pointer', letterSpacing: '0.02em',
        boxShadow: '0 4px 24px rgba(99,102,241,0.4)',
        transition: 'transform 0.15s, box-shadow 0.15s',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        fontFamily: "'Inter', sans-serif",
    },
    divider: {
        display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0 16px',
    },
    dividerLine: { flex: 1, height: '1px', background: 'rgba(71,85,105,0.4)' },
    dividerText: { fontSize: '11px', color: '#475569', fontWeight: '600', letterSpacing: '0.08em' },
    hint: {
        background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: '10px', padding: '10px 14px', fontSize: '12px',
        color: '#94a3b8', textAlign: 'center', lineHeight: 1.6,
    },
    hintAccent: { color: '#818cf8', fontWeight: '600' },
};

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusUser, setFocusUser] = useState(false);
    const [focusPass, setFocusPass] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        await new Promise((r) => setTimeout(r, 700));
        if (username === VALID_USER && password === VALID_PASS) {
            login({ username });
            navigate('/list');
        } else {
            setError('Invalid credentials. Please check your username and password.');
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .login-input:focus {
          border-color: rgba(99,102,241,0.7) !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15) !important;
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(99,102,241,0.55) !important;
        }
        .login-btn:active:not(:disabled) { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.75; cursor: not-allowed; }
      `}</style>

            <div style={S.page}>
                <div style={S.blob1} />
                <div style={S.blob2} />
                <div style={S.blob3} />

                <div style={S.wrapper}>
                    {/* Brand */}
                    <div style={S.brandSection}>
                        <div style={S.iconWrap}>💼</div>
                        <h1 style={S.brandTitle}>
                            HR<span style={S.brandAccent}>Dashboard</span>
                        </h1>
                        <p style={S.brandSub}>Employee Management Portal</p>
                    </div>

                    {/* Card */}
                    <div style={S.card}>
                        <div style={S.cardHeader}>
                            <h2 style={S.cardTitle}>Welcome back 👋</h2>
                            <p style={S.cardSub}>Sign in to access your dashboard</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Username */}
                            <div style={S.fieldWrap}>
                                <label style={S.label}>Username</label>
                                <div style={S.inputWrap}>
                                    <span style={S.inputIcon}>👤</span>
                                    <input
                                        id="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your username"
                                        required
                                        className="login-input"
                                        style={{
                                            ...S.input,
                                            borderColor: focusUser ? 'rgba(99,102,241,0.7)' : 'rgba(71,85,105,0.5)',
                                        }}
                                        onFocus={() => setFocusUser(true)}
                                        onBlur={() => setFocusUser(false)}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div style={S.fieldWrap}>
                                <label style={S.label}>Password</label>
                                <div style={S.inputWrap}>
                                    <span style={S.inputIcon}>🔒</span>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                        className="login-input"
                                        style={{
                                            ...S.input,
                                            borderColor: focusPass ? 'rgba(99,102,241,0.7)' : 'rgba(71,85,105,0.5)',
                                        }}
                                        onFocus={() => setFocusPass(true)}
                                        onBlur={() => setFocusPass(false)}
                                    />
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div style={S.errorBox}>
                                    <span>⚠️</span> {error}
                                </div>
                            )}

                            {/* Sign In Button */}
                            <button
                                type="submit"
                                id="login-btn"
                                disabled={loading}
                                className="login-btn"
                                style={S.btn}
                            >
                                {loading ? (
                                    <>
                                        <span style={{
                                            width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)',
                                            borderTopColor: 'white', borderRadius: '50%',
                                            animation: 'spin 0.7s linear infinite', display: 'inline-block',
                                        }} />
                                        Authenticating…
                                    </>
                                ) : (
                                    <>→ Sign In</>
                                )}
                            </button>
                        </form>

                        <div style={S.divider}>
                            <div style={S.dividerLine} />
                            <span style={S.dividerText}>DEMO CREDENTIALS</span>
                            <div style={S.dividerLine} />
                        </div>

                        <div style={S.hint}>
                            Username: <span style={S.hintAccent}>testuser</span>&nbsp;&nbsp;•&nbsp;&nbsp;
                            Password: <span style={S.hintAccent}>Test123</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
