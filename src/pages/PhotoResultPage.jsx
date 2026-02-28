import { useLocation, useNavigate } from 'react-router-dom';

const C = {
    bg: '#0a0f1e',
    surface: 'rgba(15,23,42,0.8)',
    border: 'rgba(99,102,241,0.15)',
    text: '#f1f5f9',
    muted: '#64748b',
    sub: '#94a3b8',
    accentL: '#818cf8',
};

export default function PhotoResultPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const photo = state?.photo ?? null;
    const employee = state?.employee ?? {};

    const handleDownload = () => {
        if (!photo) return;
        const a = document.createElement('a');
        a.href = photo;
        a.download = `${(employee.name ?? 'employee').replace(/\s+/g, '_')}_photo.jpg`;
        a.click();
    };

    return (
        <>
            <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
        .photo-btn:hover { transform:translateY(-2px)!important; }
        .home-btn:hover { box-shadow:0 8px 28px rgba(99,102,241,0.5)!important; transform:translateY(-2px)!important; }
      `}</style>

            <div style={{
                minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg,#0a0f1e 0%,#0f172a 40%,#1a0a2e 100%)',
                fontFamily: "'Inter',sans-serif", padding: '32px 20px', position: 'relative', overflow: 'hidden',
            }}>
                {/* Ambient blobs */}
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 70%)', pointerEvents: 'none' }} />

                <div style={{ width: '100%', maxWidth: '520px', position: 'relative', zIndex: 1, animation: 'fadeUp 0.5s ease forwards' }}>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            width: '64px', height: '64px', borderRadius: '18px', fontSize: '28px', marginBottom: '16px',
                            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                            boxShadow: '0 0 32px rgba(99,102,241,0.5)',
                        }}>📸</div>
                        <h1 style={{ fontSize: '26px', fontWeight: '800', color: C.text, letterSpacing: '-0.5px', marginBottom: '6px' }}>
                            Photo Captured!
                        </h1>
                        <p style={{ fontSize: '13px', color: C.muted }}>
                            {employee.name ? `Photo saved for ${employee.name}` : 'Employee photo captured successfully'}
                        </p>
                    </div>

                    {/* Card */}
                    <div style={{
                        background: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(24px)',
                        border: '1px solid rgba(99,102,241,0.2)', borderRadius: '24px',
                        boxShadow: '0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                        overflow: 'hidden',
                    }}>
                        {photo ? (
                            <>
                                {/* Photo display */}
                                <div style={{
                                    position: 'relative', background: '#050a14',
                                    animation: 'scaleIn 0.5s ease forwards',
                                }}>
                                    <img
                                        id="captured-photo"
                                        src={photo}
                                        alt={`${employee.name ?? 'Employee'} photo`}
                                        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', display: 'block' }}
                                    />
                                    {/* Overlay badge */}
                                    <div style={{
                                        position: 'absolute', top: '14px', right: '14px',
                                        padding: '5px 12px', borderRadius: '9999px',
                                        background: 'rgba(16,185,129,0.9)', backdropFilter: 'blur(8px)',
                                        fontSize: '11px', fontWeight: '800', color: 'white',
                                        display: 'flex', alignItems: 'center', gap: '6px', letterSpacing: '0.04em',
                                    }}>
                                        <span style={{ width: '6px', height: '6px', background: 'white', borderRadius: '50%', display: 'inline-block' }} />
                                        CAPTURED
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            onClick={() => navigate(-1)}
                                            className="photo-btn"
                                            style={{
                                                flex: 1, padding: '13px',
                                                background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
                                                borderRadius: '13px', color: C.accentL, fontSize: '13px', fontWeight: '700',
                                                cursor: 'pointer', transition: 'transform 0.15s',
                                                fontFamily: "'Inter',sans-serif",
                                            }}>↺ Retake</button>
                                        <button
                                            onClick={handleDownload}
                                            className="photo-btn"
                                            style={{
                                                flex: 1, padding: '13px',
                                                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
                                                borderRadius: '13px', color: '#34d399', fontSize: '13px', fontWeight: '700',
                                                cursor: 'pointer', transition: 'transform 0.15s',
                                                fontFamily: "'Inter',sans-serif",
                                            }}>↓ Download</button>
                                    </div>
                                    <button
                                        onClick={() => navigate('/list')}
                                        className="home-btn"
                                        style={{
                                            width: '100%', padding: '14px',
                                            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                                            border: 'none', borderRadius: '13px', color: 'white',
                                            fontSize: '14px', fontWeight: '700', cursor: 'pointer',
                                            boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
                                            transition: 'transform 0.15s, box-shadow 0.15s',
                                            fontFamily: "'Inter',sans-serif",
                                        }}>⌂ Back to Dashboard</button>
                                </div>
                            </>
                        ) : (
                            <div style={{ padding: '48px', textAlign: 'center' }}>
                                <div style={{ fontSize: '48px', marginBottom: '12px' }}>📷</div>
                                <p style={{ color: C.muted, fontSize: '14px', marginBottom: '20px' }}>No photo found.</p>
                                <button onClick={() => navigate(-1)} style={{
                                    padding: '12px 24px',
                                    background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                                    border: 'none', borderRadius: '12px', color: 'white',
                                    fontSize: '14px', fontWeight: '700', cursor: 'pointer',
                                    fontFamily: "'Inter',sans-serif",
                                }}>← Go Back</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
