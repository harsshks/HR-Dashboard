import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees } from '../services/api';
import SalaryChart from '../components/SalaryChart';
import CityMap from '../components/CityMap';


/* ─── Shared tokens ─────────────────────────────────────── */
const C = {
    bg: '#0a0f1e',
    surface: 'rgba(15,23,42,0.85)',
    card: 'rgba(15,23,42,0.6)',
    border: 'rgba(99,102,241,0.15)',
    accent: '#6366f1',
    accentL: '#818cf8',
    text: '#f1f5f9',
    muted: '#64748b',
    sub: '#94a3b8',
};

const badge = (bg, color) => ({
    display: 'inline-flex', alignItems: 'center',
    padding: '3px 10px', borderRadius: '9999px',
    fontSize: '11px', fontWeight: '700', letterSpacing: '0.04em',
    background: bg, color,
});

/* ─── Stat Card ─────────────────────────────────────────── */
function StatCard({ icon, label, value, gradient }) {
    return (
        <div style={{
            background: 'rgba(15,23,42,0.7)', border: `1px solid ${C.border}`,
            borderRadius: '16px', padding: '20px 24px',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{
                    width: '36px', height: '36px', borderRadius: '10px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: '18px',
                    background: gradient,
                }}>{icon}</div>
                <span style={{ fontSize: '12px', color: C.muted, fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {label}
                </span>
            </div>
            <p style={{ fontSize: '28px', fontWeight: '800', color: C.text, letterSpacing: '-0.5px' }}>{value}</p>
        </div>
    );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function EmployeeListPage() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [search, setSearch] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees()
            .then((data) => {
                const list = Array.isArray(data) ? data
                    : (data?.data ?? data?.employees ?? Object.values(data ?? {}));
                setEmployees(Array.isArray(list) ? list : []);
            })
            .catch(() => setError('Failed to load employee data. Check your connection.'))
            .finally(() => setLoading(false));
    }, []);

    const filtered = employees.filter((emp) => {
        const q = search.toLowerCase();
        return !q ||
            String(emp.name ?? '').toLowerCase().includes(q) ||
            String(emp.email ?? '').toLowerCase().includes(q) ||
            String(emp.department ?? emp.dept ?? '').toLowerCase().includes(q) ||
            String(emp.city ?? emp.location ?? '').toLowerCase().includes(q);
    });

    const columns = employees.length ? Object.keys(employees[0]).slice(0, 8) : [];

    const avgSalary = employees.length
        ? Math.round(employees.reduce((a, e) => a + Number(e.salary ?? e.Salary ?? 0), 0) / employees.length)
        : 0;

    const stats = [
        { icon: '👥', label: 'Total Employees', value: employees.length || '—', gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
        {
            icon: '🏢', label: 'Departments',
            value: new Set(employees.map(e => e.department ?? e.dept ?? '')).size || '—',
            gradient: 'linear-gradient(135deg,#0ea5e9,#6366f1)'
        },
        {
            icon: '📍', label: 'Cities',
            value: new Set(employees.map(e => e.city ?? e.location ?? '')).size || '—',
            gradient: 'linear-gradient(135deg,#a78bfa,#ec4899)'
        },
        {
            icon: '💰', label: 'Avg Salary',
            value: avgSalary ? `₹${avgSalary.toLocaleString('en-IN')}` : '—',
            gradient: 'linear-gradient(135deg,#10b981,#0ea5e9)'
        },
    ];

    return (
        <>
            <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .emp-row:hover td { background:rgba(99,102,241,0.07)!important; cursor:pointer; }
        .emp-row:hover .row-arrow { opacity:1!important; }
        .search-input:focus { border-color:rgba(99,102,241,0.6)!important; box-shadow:0 0 0 3px rgba(99,102,241,0.12)!important; outline:none; }
        .analytics-btn:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(99,102,241,0.5)!important; }
        .action-btn:hover { background:rgba(99,102,241,0.15)!important; border-color:rgba(99,102,241,0.4)!important; }
      `}</style>

            <div style={{ minHeight: '100vh', background: `linear-gradient(180deg,#0a0f1e 0%,#0f172a 100%)`, fontFamily: "'Inter',sans-serif" }}>



                {/* ── Main ── */}
                <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '36px 28px' }}>

                    {/* Page heading */}
                    <div style={{ marginBottom: '32px', animation: 'fadeUp 0.5s ease forwards' }}>
                        <h1 style={{ fontSize: '28px', fontWeight: '800', color: C.text, letterSpacing: '-0.5px', marginBottom: '6px' }}>
                            Employee Directory
                        </h1>
                        <p style={{ fontSize: '14px', color: C.muted }}>
                            Manage and explore your workforce data — click any row to view full profile
                        </p>
                    </div>

                    {/* Stats */}
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
                        gap: '16px', marginBottom: '32px', animation: 'fadeUp 0.5s 0.1s ease both',
                    }}>
                        {stats.map((s) => <StatCard key={s.label} {...s} />)}
                    </div>

                    {/* Controls */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px', alignItems: 'center', animation: 'fadeUp 0.5s 0.2s ease both' }}>
                        <div style={{ position: 'relative', flex: 1, minWidth: '240px', maxWidth: '380px' }}>
                            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: C.muted }}>🔍</span>
                            <input
                                type="text"
                                placeholder="Search employees…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="search-input"
                                style={{
                                    width: '100%', padding: '11px 14px 11px 42px',
                                    background: 'rgba(15,23,42,0.8)', border: `1px solid ${C.border}`,
                                    borderRadius: '12px', color: C.text, fontSize: '14px',
                                    transition: 'border-color 0.2s, box-shadow 0.2s',
                                    fontFamily: "'Inter',sans-serif",
                                }}
                            />
                        </div>
                        <button
                            id="toggle-analytics"
                            onClick={() => setShowAnalytics((v) => !v)}
                            className="analytics-btn"
                            style={{
                                marginLeft: 'auto', padding: '11px 22px',
                                background: showAnalytics ? 'rgba(99,102,241,0.2)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                                border: showAnalytics ? '1px solid rgba(99,102,241,0.4)' : 'none',
                                borderRadius: '12px', color: 'white', fontSize: '13px', fontWeight: '700',
                                cursor: 'pointer', transition: 'all 0.2s',
                                boxShadow: showAnalytics ? 'none' : '0 4px 20px rgba(99,102,241,0.4)',
                                fontFamily: "'Inter',sans-serif",
                            }}>
                            {showAnalytics ? '✕ Hide Analytics' : '📊 View Salary Analytics'}
                        </button>
                    </div>

                    {/* Analytics panel */}
                    {showAnalytics && (
                        <div style={{
                            background: 'rgba(15,23,42,0.7)', border: `1px solid ${C.border}`,
                            borderRadius: '20px', padding: '28px', marginBottom: '28px',
                            backdropFilter: 'blur(16px)', animation: 'fadeUp 0.4s ease forwards',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                        }}>
                            <h2 style={{ fontSize: '17px', fontWeight: '800', color: C.text, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span>📊</span> Salary Analytics & City Map
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: '28px' }}>
                                <div>
                                    <p style={{ fontSize: '11px', fontWeight: '700', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>
                                        Top 10 Salaries
                                    </p>
                                    {employees.length > 0 ? <SalaryChart employees={employees} /> : <p style={{ color: C.muted }}>Loading…</p>}
                                </div>
                                <div>
                                    <p style={{ fontSize: '11px', fontWeight: '700', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>
                                        Employee Locations
                                    </p>
                                    {employees.length > 0 ? <CityMap employees={employees} /> : <p style={{ color: C.muted }}>Loading…</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Table */}
                    <div style={{
                        background: 'rgba(15,23,42,0.7)', border: `1px solid ${C.border}`,
                        borderRadius: '20px', overflow: 'hidden', animation: 'fadeUp 0.5s 0.3s ease both',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    }}>
                        <div style={{
                            padding: '18px 24px', borderBottom: `1px solid ${C.border}`,
                            display: 'flex', alignItems: 'center', gap: '10px',
                            background: 'rgba(99,102,241,0.04)',
                        }}>
                            <span>👥</span>
                            <span style={{ fontWeight: '700', color: C.text, fontSize: '15px' }}>Employees</span>
                            {!loading && (
                                <span style={badge('rgba(99,102,241,0.15)', C.accentL)}>
                                    {filtered.length} {search ? 'results' : 'total'}
                                </span>
                            )}
                        </div>

                        {loading && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px', gap: '14px' }}>
                                <div style={{
                                    width: '28px', height: '28px', border: '3px solid rgba(99,102,241,0.2)',
                                    borderTopColor: '#6366f1', borderRadius: '50%',
                                    animation: 'spin 0.8s linear infinite',
                                }} />
                                <span style={{ color: C.muted, fontSize: '14px' }}>Fetching employee data…</span>
                            </div>
                        )}

                        {error && (
                            <div style={{
                                margin: '20px', background: 'rgba(239,68,68,0.08)',
                                border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px',
                                padding: '14px 18px', color: '#fca5a5', fontSize: '13px',
                                display: 'flex', alignItems: 'center', gap: '8px',
                            }}>⚠️ {error}</div>
                        )}

                        {!loading && !error && (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr>
                                            {columns.map((col) => (
                                                <th key={col} style={{
                                                    padding: '13px 20px', textAlign: 'left', fontSize: '10px',
                                                    fontWeight: '800', color: C.muted, textTransform: 'uppercase',
                                                    letterSpacing: '0.1em', background: 'rgba(99,102,241,0.06)',
                                                    borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap',
                                                }}>
                                                    {col.replace(/_/g, ' ')}
                                                </th>
                                            ))}
                                            <th style={{ width: '40px', background: 'rgba(99,102,241,0.06)', borderBottom: `1px solid ${C.border}` }} />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.map((emp, i) => (
                                            <tr
                                                key={emp.id ?? emp.emp_id ?? i}
                                                className="emp-row"
                                                onClick={() => navigate(`/details/${emp.id ?? emp.emp_id ?? 0}`, { state: { employee: emp } })}
                                            >
                                                {columns.map((col, ci) => (
                                                    <td key={col} style={{
                                                        padding: '14px 20px', fontSize: '13px',
                                                        color: ci === 0 ? C.text : C.sub,
                                                        fontWeight: ci === 0 ? '600' : '400',
                                                        borderBottom: `1px solid rgba(99,102,241,0.06)`,
                                                        whiteSpace: 'nowrap', transition: 'background 0.15s',
                                                    }}>
                                                        {col.toLowerCase().includes('salary') || col.toLowerCase().includes('ctc')
                                                            ? `₹${Number(emp[col] ?? 0).toLocaleString('en-IN')}`
                                                            : (emp[col] ?? '—')}
                                                    </td>
                                                ))}
                                                <td style={{ padding: '14px 16px', borderBottom: `1px solid rgba(99,102,241,0.06)`, transition: 'background 0.15s' }}>
                                                    <span className="row-arrow" style={{ color: C.accentL, opacity: 0, transition: 'opacity 0.15s', fontSize: '16px' }}>→</span>
                                                </td>
                                            </tr>
                                        ))}
                                        {filtered.length === 0 && (
                                            <tr>
                                                <td colSpan={columns.length + 1} style={{
                                                    padding: '48px', textAlign: 'center',
                                                    color: C.muted, fontSize: '14px',
                                                }}>
                                                    No employees match your search.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
