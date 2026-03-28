import AddRiderButton from "@/components/CustomComponents/ADMIN/AddRiderButton";
import AllRidersTable from "@/components/CustomComponents/ADMIN/AllRidersTable";
import { env } from "@/Config/env";

async function getAllRiders() {
    const res = await fetch(`${env.BACKEND_URL}/admins/all-riders`, {
        credentials: "include",
        // use 'force-cache' or 'no-store' depending on how often data changes
        cache: 'no-store',
    });

    const data = await res.json();
    return data?.data || [];
}

const AdminAllRidersPage = async () => {
    const riders = await getAllRiders();
    console.log(riders)
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 font-sans">Merchant Directory</h1>
                        <p className="text-gray-500 text-sm">Manage and monitor all registered business partners.</p>
                    </div>
                    {/* The Button now controls the Modal state internally or via a shared parent */}
                    <AddRiderButton />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <AllRidersTable initialData={riders} />
                </div>
            </div>
        </div>
    )
}
export default AdminAllRidersPage