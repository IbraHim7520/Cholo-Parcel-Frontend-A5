// app/admin/users/page.tsx
import { env } from "@/Config/env";
import AllUsersTable from "@/components/CustomComponents/ADMIN/AllUsersTable";

const AdminUsersPage = async () => {
    const userRes = await fetch(`${env.BACKEND_URL}/admins/all-users`, {
        cache: "no-store",
        credentials:"include"
    });
    const { data } = await userRes.json();

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
                    <p className="text-slate-500 text-sm">Monitor system users and adjust access levels.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <AllUsersTable initialUsers={data || []} />
                </div>
            </div>
        </div>
    );
};

export default AdminUsersPage;