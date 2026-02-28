import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const COLORS = [
    '#6366f1', '#8b5cf6', '#a78bfa', '#818cf8', '#c4b5fd',
    '#7c3aed', '#9333ea', '#a855f7', '#7e22ce', '#6d28d9',
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: '12px', padding: '10px 16px', fontSize: '13px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}>
                <p style={{ color: '#818cf8', fontWeight: 700, marginBottom: '4px' }}>{label}</p>
                <p style={{ color: '#f1f5f9' }}>
                    Salary: <span style={{ color: '#10b981', fontWeight: 600 }}>
                        ₹{Number(payload[0].value).toLocaleString('en-IN')}
                    </span>
                </p>
            </div>
        );
    }
    return null;
};

export default function SalaryChart({ employees }) {
    const data = employees.slice(0, 10).map((emp) => ({
        name: emp.name?.split(' ')[0] ?? `EMP-${emp.id ?? '?'}`,
        salary: Number(emp.salary ?? emp.Salary ?? emp.ctc ?? 0),
    }));

    if (!data.length) {
        return (
            <p style={{ textAlign: 'center', padding: '32px 0', color: '#64748b' }}>
                No salary data available.
            </p>
        );
    }

    return (
        <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
                    <XAxis
                        dataKey="name"
                        tick={{ fill: '#94a3b8', fontSize: 11 }}
                        axisLine={{ stroke: 'rgba(148,163,184,0.2)' }}
                        tickLine={false}
                        angle={-30}
                        textAnchor="end"
                    />
                    <YAxis
                        tick={{ fill: '#94a3b8', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.08)' }} />
                    <Bar dataKey="salary" radius={[6, 6, 0, 0]} maxBarSize={48}>
                        {data.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
