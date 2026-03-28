import StatsBreakdown from "@/components/CustomComponents/ADMIN/StatBreakdownCard";
import StatCard from "@/components/CustomComponents/ADMIN/StatCard";
import { env } from "@/Config/env";
import { IDashboardStats } from "@/Interfaces/interfaces";

const AdminStatisticsPage = async () => {
    const statsResponse = await fetch(`${env.BACKEND_URL}/admins/statistics`, {
        credentials: "include",
    });
    const stats: IDashboardStats = await statsResponse.json();

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-800">Platform Analytics</h1>
                    <p className="text-slate-500 text-sm">
                        Real-time overview of users, riders, and parcel logistics.
                    </p>
                </header>

                {/* Top Level Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard title="Total Users" value={stats.totalUser} icon="users" color="blue" />
                    <StatCard title="Total Merchants" value={stats.totalMarchent} icon="shop" color="purple" />
                    <StatCard title="Total Riders" value={stats.totalRider} icon="bike" color="orange" />
                    <StatCard title="Total Parcels" value={stats.totalParcels} icon="package" color="emerald" />
                </div>

                {/* Detailed Breakdowns */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <StatsBreakdown
                        title="User Activity"
                        total={stats.totalUser}
                        segments={[
                            { label: "Active", value: stats.activeUser, color: "bg-emerald-500" },
                            { label: "Inactive", value: stats.inactiveUser, color: "bg-slate-300" },
                            { label: "Deleted", value: stats.deletedUser, color: "bg-rose-500" },
                        ]}
                    />

                    <StatsBreakdown
                        title="Rider Requests"
                        total={stats.totalRider}
                        segments={[
                            { label: "Approved", value: stats.approvedRiders, color: "bg-blue-500" },
                            { label: "Pending", value: stats.pendingRiders, color: "bg-amber-500" },
                            { label: "Rejected", value: stats.rejectedRiders, color: "bg-rose-500" },
                        ]}
                    />

                    <StatsBreakdown
                        title="Delivery Performance"
                        total={stats.totalParcels}
                        segments={[
                            { label: "Delivered", value: stats.deliveredParcels, color: "bg-emerald-500" },
                            { label: "Returned", value: stats.returnedParcels, color: "bg-orange-500" },
                            { label: "Cancelled", value: stats.cancelledParcels, color: "bg-rose-500" },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminStatisticsPage;