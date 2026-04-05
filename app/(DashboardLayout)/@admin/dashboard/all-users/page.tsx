// app/admin/users/page.tsx
import UsersTable from "@/components/Tables/AllUsersTable";
import { env } from "@/Config/env";
import { IAdminGetAllUsers } from "@/Interfaces/admin.interface";

const AllUsersPage = async () => {
    const res = await fetch(`${env.BACKEND_URL}/admins/all-users`, {
        credentials: "include",
        cache: "no-store"
    });

    const result = await res.json();
    const users: IAdminGetAllUsers[] = result.data || [];

    return (
        <div className="p-6 space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        User <span className="text-orange-500">Database</span>
                    </h1>
                    <p className="text-slate-500 font-medium italic">Manage permissions and account status</p>
                </div>
                <div className="px-4 py-2 bg-orange-50 border border-orange-100 rounded-2xl">
                    <p className="text-orange-600 font-bold text-sm">{users.length} Total Users</p>
                </div>
            </header>

            <UsersTable initialData={users} />
        </div>
    );
};

export default AllUsersPage;