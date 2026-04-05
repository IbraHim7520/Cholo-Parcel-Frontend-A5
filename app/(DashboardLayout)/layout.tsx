"use client";

import { AppSidebar } from "@/components/app-sidebar";
import CustomLoading from "@/components/CustomComponents/CustomLoading";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

// ✅ ADD THIS
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserRole } from "@/Interfaces/interfaces";
import { useUser } from "@/utils/useUser";

interface IUserRole {
  admin: React.ReactNode
  marchent: React.ReactNode
  rider: React.ReactNode
}

const DashboardLayout = ({admin , marchent , rider}: IUserRole) => {
  const {user , isPending} = useUser();
  console.log(user?.role)
  if(isPending) return <CustomLoading />
  return (
    <TooltipProvider> {/* ✅ FIX */}
      <SidebarProvider
        style={
          {
            "--sidebar-width": "260px",
            "--header-height": "64px",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />

        <SidebarInset>
      

          <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
            {user?.role === UserRole.ADMIN && admin}
            {user?.role === UserRole.MERCHENT && marchent}
            {user?.role === UserRole.RIDER && rider}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default DashboardLayout;