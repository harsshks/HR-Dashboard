import { useRef, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const C = {
    bg: '#0a0f1e',
    surface: 'rgba(15,23,42,0.8)',
    border: 'rgba(99,102,241,0.15)',
    accent: '#6366f1',
    accentL: '#818cf8',
    text: '#f1f5f9',
    muted: '#64748b',
    sub: '#94a3b8',
};

const FIELD_EMOJIS = {
    name: '👤', email: '📧', department: '🏢', dept: '🏢', city: '📍', location: '📍',
    salary: '💰', Salary: '💰', ctc: '💰', phone: '📞', id: '🆔', emp_id: '🆔',
    employee_id: '🆔', joining_date: '📅', date: '📅', gender: '⚧', role: '💼',
};
function getEmoji(key) {
    return FIELD_EMOJIS[key] ?? FIELD_EMOJIS[key.toLowerCase()] ?? '•';
}
function formatLabel(key) {
    return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export default function EmployeeDetailsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const webcamRef = useRef(null);

    const [camReady, setCamReady] = useState(false);
    const [camError, setCamError] = useState(false);
    const [capturing, setCapturing] = useState(false);
    const [flash, setFlash] = useState(false);

    const employee = location.state?.employee ?? {};
    const fields = Object.entries(employee).filter(([, v]) => v !== null && v !== undefined);
    const initials = String(employee.name ?? employee.Name ?? 'E')[0].toUpperCase();

    const capture = useCallback(() => {
        if (!webcamRef.current || !camReady) return;
        setCapturing(true);
        setFlash(true);
        setTimeout(() => setFlash(false), 300);
        const imageSrc = webcamRef.current.getScreenshot();
        setTimeout(() => {
            if (imageSrc) {
                navigate('/photo-result', { state: { photo: imageSrc, employee } });
            } else {
                alert('Could not capture. Please allow camera access.');
                setCapturing(false);
            }
        }, 400);
    }, [navigate, employee, camReady]);

    return (
        <>
            <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes flashAnim { 0%,100%{opacity:0} 50%{opacity:0.7} }
        .back-btn:hover { background:rgba(99,102,241,0.15)!important; border-color:rgba(99,102,241,0.4)!important; }
        .capture-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 8px 28px rgba(99,102,241,0.55)!important; }
        .capture-btn:disabled { opacity:0.5; cursor:not-allowed; }
      `}</style>

            <div style={{ minHeight: '100vh', background: `linear-gradient(180deg,#0a0f1e 0%,#0f172a 100%)`, fontFamily: "'Inter',sans-serif", padding: '32px 24px' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', animation: 'fadeUp 0.5s ease forwards' }}>

                    {/* Back */}
                    <button
                        onClick={() => navigate('/list')}
                        className="back-btn"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '9px 18px', marginBottom: '28px',
                            background: 'rgba(15,23,42,0.7)', border: `1px solid ${C.border}`,
                            borderRadius: '11px', color: C.sub, fontSize: '13px', fontWeight: '600',
                            cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Inter',sans-serif",
                        }}>← Back to List</button>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: '24px' }}>

                        {/* ── Details Card ── */}
                        <div style={{
                            background: C.surface, border: `1px solid ${C.border}`,
                            borderRadius: '24px', overflow: 'hidden',
                            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                        }}>
                            {/* Profile header */}
                            <div style={{
                                background: 'linear-gradient(135deg,rgba(99,102,241,0.2) 0%,rgba(139,92,246,0.1) 100%)',
                                padding: '32px 28px', display: 'flex', alignItems: 'center', gap: '20px',
                                borderBottom: `1px solid ${C.border}`,
                            }}>
                                <div style={{
                                    width: '72px', height: '72px', borderRadius: '20px', flexShrink: 0,
                                    background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '28px', fontWeight: '800', color: 'white',
                                    boxShadow: '0 0 24px rgba(99,102,241,0.5)',
                                }}>{initials}</div>
                                <div>
                                    <h2 style={{ fontSize: '22px', fontWeight: '800', color: C.text, letterSpacing: '-0.3px', marginBottom: '4px' }}>
                                        {employee.name ?? employee.Name ?? 'Employee'}
                                    </h2>
                                    <p style={{ fontSize: '13px', color: C.accentL, fontWeight: '600' }}>
                                        {employee.department ?? employee.dept ?? employee.role ?? 'Employee'}
                                    </p>
                                    {(employee.city ?? employee.location) && (
                                        <p style={{ fontSize: '12px', color: C.muted, marginTop: '2px' }}>
                                            📍 {employee.city ?? employee.location}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Fields */}
                            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '420px', overflowY: 'auto' }}>
                                {fields.map(([key, val]) => (
                                    <div key={key} style={{
                                        display: 'flex', alignItems: 'flex-start', gap: '12px',
                                        padding: '12px 14px', borderRadius: '12px',
                                        background: 'rgba(99,102,241,0.05)',
                                        border: '1px solid rgba(99,102,241,0.08)',
                                        transition: 'background 0.15s',
                                    }}>
                                        <span style={{ fontSize: '16px', marginTop: '1px', flexShrink: 0 }}>{getEmoji(key)}</span>
                                        <div style={{ minWidth: 0 }}>
                                            <p style={{ fontSize: '10px', fontWeight: '700', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '3px' }}>
                                                {formatLabel(key)}
                                            </p>
                                            <p style={{ fontSize: '14px', fontWeight: '600', color: C.text, wordBreak: 'break-word' }}>
                                                {(key.toLowerCase().includes('salary') || key.toLowerCase().includes('ctc'))
                                                    ? `₹${Number(val).toLocaleString('en-IN')}`
                                                    : String(val)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {!fields.length && <p style={{ color: C.muted, textAlign: 'center', padding: '24px' }}>No data available.</p>}
                            </div>
                        </div>

                        {/* ── Camera Card ── */}
                        <div style={{
                            background: C.surface, border: `1px solid ${C.border}`,
                            borderRadius: '24px', overflow: 'hidden',
                            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                            display: 'flex', flexDirection: 'column',
                        }}>
                            <div style={{
                                padding: '20px 24px', borderBottom: `1px solid ${C.border}`,
                                background: 'rgba(99,102,241,0.04)',
                                display: 'flex', alignItems: 'center', gap: '10px',
                            }}>
                                <span style={{ fontSize: '20px' }}>📸</span>
                                <div>
                                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: C.text }}>Live Camera</h3>
                                    <p style={{ fontSize: '12px', color: C.muted }}>Capture employee photo</p>
                                </div>
                                {camReady && (
                                    <span style={{
                                        marginLeft: 'auto', padding: '4px 10px', borderRadius: '9999px',
                                        background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
                                        fontSize: '11px', fontWeight: '700', color: '#34d399', display: 'flex', alignItems: 'center', gap: '5px',
                                    }}>
                                        <span style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }} />
                                        LIVE
                                    </span>
                                )}
                            </div>

                            {/* Camera viewport */}
                            <div style={{ flex: 1, position: 'relative', background: '#050a14', minHeight: '320px' }}>
                                {flash && (
                                    <div style={{
                                        position: 'absolute', inset: 0, background: 'white', zIndex: 10,
                                        animation: 'flashAnim 0.3s ease forwards',
                                    }} />
                                )}
                                {!camError && (
                                    <Webcam
                                        ref={webcamRef}
                                        audio={false}
                                        screenshotFormat="image/jpeg"
                                        videoConstraints={{ facingMode: 'user', width: 640, height: 480 }}
                                        onUserMedia={() => setCamReady(true)}
                                        onUserMediaError={() => setCamError(true)}
                                        style={{
                                            width: '100%', height: '100%', objectFit: 'cover',
                                            display: camReady ? 'block' : 'none',
                                        }}
                                    />
                                )}
                                {!camReady && !camError && (
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '32px', height: '32px', border: '3px solid rgba(99,102,241,0.3)',
                                            borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                                        }} />
                                        <p style={{ color: C.muted, fontSize: '13px' }}>Starting camera…</p>
                                    </div>
                                )}
                                {camError && (
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                        <span style={{ fontSize: '40px' }}>🚫</span>
                                        <p style={{ color: '#fca5a5', fontSize: '13px', textAlign: 'center', padding: '0 20px' }}>
                                            Camera access denied or unavailable.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Capture button */}
                            <div style={{ padding: '20px 24px' }}>
                                <button
                                    id="capture-btn"
                                    onClick={capture}
                                    disabled={!camReady || camError || capturing}
                                    className="capture-btn"
                                    style={{
                                        width: '100%', padding: '14px',
                                        background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                                        border: 'none', borderRadius: '14px', color: 'white',
                                        fontSize: '14px', fontWeight: '700', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                        boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
                                        transition: 'transform 0.15s, box-shadow 0.15s',
                                        fontFamily: "'Inter',sans-serif",
                                    }}>
                                    {capturing
                                        ? <><span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} /> Capturing…</>
                                        : <><span>📷</span> Capture Photo</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
