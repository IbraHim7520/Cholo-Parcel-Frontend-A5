interface StatCardProps {
    title: string;
    value: number;
    icon: string; // Can later use Lucide icon component
    color: "blue" | "purple" | "orange" | "emerald"; // restrict to safe Tailwind colors
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
        {/* Tailwind dynamic colors must be applied carefully */}
        <div className={`p-4 rounded-xl bg-${color}-50 text-${color}-600`}>
            <span className="text-2xl font-bold uppercase">{icon[0]}</span>
        </div>
        <div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{title}</p>
            <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
        </div>
    </div>
);

export default StatCard;