interface Segment {
    label: string;
    value: number;
    color: string; // Tailwind class string like "bg-emerald-500"
}

interface StatsBreakdownProps {
    title: string;
    total: number;
    segments: Segment[];
}

const StatsBreakdown = ({ title, total, segments }: StatsBreakdownProps) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6">{title}</h3>

        {/* Multi-segment Progress Bar */}
        <div className="h-3 w-full bg-slate-100 rounded-full flex overflow-hidden mb-8">
            {segments.map((s, i) => (
                <div
                    key={i}
                    style={{ width: `${total > 0 ? (s.value / total) * 100 : 0}%` }}
                    className={`${s.color} h-full transition-all duration-500`}
                />
            ))}
        </div>

        {/* Legend */}
        <div className="space-y-4">
            {segments.map((s, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${s.color}`} />
                        <span className="text-slate-600 font-medium">{s.label}</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-slate-800 font-bold">{s.value}</span>
                        <span className="text-slate-400 w-10 text-right">
                            {total > 0 ? Math.round((s.value / total) * 100) : 0}%
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default StatsBreakdown;