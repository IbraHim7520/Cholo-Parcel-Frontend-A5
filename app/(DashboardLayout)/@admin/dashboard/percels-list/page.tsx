// app/admin/parcels/page.tsx
import ParcelsTable from "@/components/Tables/AllPercelsTable";
import { env } from "@/Config/env";
import { IAdminGetAllPercel } from "@/Interfaces/admin.interface";

const PercelsListPage = async () => {
    const response = await fetch(`${env.BACKEND_URL}/admins/all-percels`, {
        credentials: "include",
        cache: "no-store",
    });

    const result = await response.json();
    const parcels: IAdminGetAllPercel[] = result.data || [];

    return (
        <div className="p-6 space-y-6">
            <header>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    Parcel <span className="text-orange-500">Management</span>
                </h1>
                <p className="text-slate-500 font-medium">Manage and track all system shipments</p>
            </header>

            <ParcelsTable initialData={parcels} />
        </div>
    );
};

export default PercelsListPage;