"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, PackagePlus, Package,
  Truck, Wallet, Receipt, Users, Star, Settings,
  ShieldCheck, MapPin, ClipboardList, BarChart3,
  UserCog, Bell,
  DollarSign
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import NavLogo from "./ui/NavLogo"
import { useUser } from "@/utils/useUser"

// --- Route Definitions by Role ---

const ROUTES_CONFIG = {
  MERCHANT: [
    {
      label: "Parcels & Logistics",
      items: [
        { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { title: "Create Parcel", url: "/dashboard/create-parcel", icon: PackagePlus },
        { title: "All Parcels", url: "/dashboard/parcels", icon: Package },
      ]
    },
    {
      label: "Finance",
      items: [
        { title: "Wallet", url: "/dashboard/wallet", icon: Wallet },
        { title: "Transactions", url: "/dashboard/transactions", icon: Receipt },
      ]
    },
    {
      label: "Management",
      items: [
        { title: "Customers", url: "/dashboard/customers", icon: Users },
        { title: "Reviews", url: "/dashboard/reviews", icon: Star },
        { title: "Settings", url: "/dashboard/settings", icon: Settings },
      ]
    }
  ],
  ADMIN: [
    {
      label: "System Overview",
      items: [
        { title: "Admin Stats", url: "/dashboard", icon: BarChart3 },
        { title: "All Merchants", url: "/dashboard/all-marchents", icon: Users },
        { title: "System Parcels", url: "/dashboard/all-parcels", icon: Package },
        { title: "All Riders", url: "/dashboard/all-riders", icon: Users },
        { title: "Transactions", url: "/dashboard/expenses", icon: DollarSign },
      ]
    },
    {
      label: "Security & Control",
      items: [
        { title: "Users Management", url: "/dashboard/users", icon: ShieldCheck },
        { title: "Notification", url: "/dashboard/notifications", icon: Bell },
      ]
    }
  ],
  RIDER: [
    {
      label: "Deliveries",
      items: [
        { title: "My Tasks", url: "/dashboard/rider", icon: ClipboardList },
        { title: "Live Map", url: "/dashboard/rider/map", icon: MapPin },
        { title: "Pickup List", url: "/dashboard/rider/pickups", icon: Truck },
      ]
    },
    {
      label: "Personal",
      items: [
        { title: "Earnings", url: "/dashboard/rider/earnings", icon: Wallet },
        { title: "Notifications", url: "/dashboard/rider/alerts", icon: Bell },
      ]
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser()
  const pathname = usePathname()
  console.log(pathname)
  // Fallback to MERCHANT if role is undefined, adjust as per your logic
  const userRole = (user?.role?.toUpperCase() as keyof typeof ROUTES_CONFIG) || "MERCHANT"
  const activeRoutes = ROUTES_CONFIG[userRole] || ROUTES_CONFIG.MERCHANT

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-slate-200/50 dark:border-slate-800/50" {...props}>
      <SidebarHeader className="h-16 flex items-center px-4">
        <NavLogo />
      </SidebarHeader>

      <SidebarContent className="px-2 scrollbar-none">
        {activeRoutes.map((section, index) => (
          <React.Fragment key={section.label}>
            <SidebarGroup>
              <SidebarGroupLabel className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mb-2">
                {section.label}
              </SidebarGroupLabel>
              <SidebarMenu>
                {section.items.map((item) => {
                  const isActive = pathname === item.url
                  console.log("isActive->",isActive)
                  return (
                    <SidebarMenuItem key={item.title} className="mb-0.5">
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`
                          group relative flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200
                          ${isActive
                            ? "bg-blue-50 text-orange-500 "
                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
                          }
                        `}
                      >
                        <Link href={item.url}>
                          <item.icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                          <span className="text-sm font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroup>

            {/* Don't show separator after the last group */}
            {index < activeRoutes.length - 1 && (
              <SidebarSeparator className="mx-2 my-2 opacity-50" />
            )}
          </React.Fragment>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-200/50 dark:border-slate-800/50">
        <NavUser user={{
          name: user?.name || "User",
          email: user?.email || "",
          avatar: user?.image || "",
        }} />
      </SidebarFooter>
    </Sidebar>
  )
}