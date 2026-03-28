// app/admin/merchants/page.tsx
import AddMerchantButton from "@/components/CustomComponents/ADMIN/AddMarchentButton";
import AllMarchentTable from "@/components/CustomComponents/ADMIN/AllMarchentTable";
import { env } from "@/Config/env";

async function getAllMerchants() {
    const res = await fetch(`${env.BACKEND_URL}/admins/all-marchents`, {
        // use 'force-cache' or 'no-store' depending on how often data changes
        cache: 'no-store',
    });

    const data = await res.json();
    return data?.data || [];
}

const AdminAllMarchentPage = async () => {
    const MarchentData = await getAllMerchants();

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 font-sans">Merchant Directory</h1>
                        <p className="text-gray-500 text-sm">Manage and monitor all registered business partners.</p>
                    </div>
                    {/* The Button now controls the Modal state internally or via a shared parent */}
                    <AddMerchantButton />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <AllMarchentTable initialData={MarchentData} />
                </div>
            </div>
        </div>
    );
};

export default AdminAllMarchentPage;