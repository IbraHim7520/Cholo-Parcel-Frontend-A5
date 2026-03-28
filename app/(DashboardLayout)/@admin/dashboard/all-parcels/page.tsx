// app/admin/parcels/page.tsx
import AllParcelsTable from "@/components/CustomComponents/ADMIN/AllParcelTable";
import { env } from "@/Config/env";

async function getAllParcels() {
    const res = await fetch(`${env.BACKEND_URL}/admins/all-parcels`, {
        cache: "no-store",
        credentials: "include",
    });

    if (!res.ok) return [];

    const data = await res.json();

    // ✅ Transform backend → UI format
    const parcels = data?.data?.parcels || [];

    return parcels.map((p: any) => ({
        trackingId: p.id,
        senderName: p.reciverName, // ⚠️ You don't have sender, so using receiver
        recipientCity: p.reciverAddress,
        weight: p.weight.toString(),

        // ✅ Convert enum → UI status
        status:
            p.status === "DELIVERED"
                ? "delivered"
                : p.status === "IN_TRANSIT"
                    ? "in-transit"
                    : p.status === "RETURNED"
                        ? "returned"
                        : "pending",

        createdAt: p.pickupTime,
    }));
}

const AdminAllParcelsPage = async () => {
    const parcels = await getAllParcels();

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="max-w-[1600px] mx-auto">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-800">Parcel Management</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Monitor and update all active shipments across the network.
                    </p>
                </header>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <AllParcelsTable initialParcels={parcels} />
                </div>
            </div>
        </div>
    );
};

export default AdminAllParcelsPage;