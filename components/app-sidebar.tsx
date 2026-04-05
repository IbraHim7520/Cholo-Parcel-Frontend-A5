"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, PackagePlus, Package,
  Truck, Wallet, Receipt, Users, Star, Settings,
  ShieldCheck, MapPin, ClipboardList, BarChart3,
  Bell, DollarSign
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
        { title: "Wallet", url: "/dashboard/merchent-wallet", icon: Wallet },
        { title: "Transactions", url: "/dashboard/merchent-transactions", icon: Receipt },
      ]
    },
    {
      label: "Management",
      items: [
        { title: "Reviews", url: "/dashboard/reviews", icon: Star },
        { title: "Settings", url: "/dashboard/my-settings", icon: Settings },
      ]
    }
  ],
  ADMIN: [
    {
      label: "System Overview",
      items: [
        { title: "Admin Stats", url: "/dashboard", icon: BarChart3 },
        { title: "All Merchants", url: "/dashboard/all-merchents", icon: Users },
        { title: "System Parcels", url: "/dashboard/percels-list", icon: Package },
        { title: "All Riders", url: "/dashboard/all-riders", icon: Users },
        { title: "Transactions", url: "/dashboard/transactions", icon: DollarSign },
      ]
    },
    {
      label: "Security & Control",
      items: [
        { title: "Users Management", url: "/dashboard/all-users", icon: ShieldCheck },
        { title: "Notification", url: "/dashboard/notification-management", icon: Bell },
        { title: "Settings", url: "/dashboard/settings", icon: Settings },
        { title: "Wallet", url: "/dashboard/wallet", icon: Wallet },
      ]
    }
  ],
  RIDER: [
    {
      label: "Deliveries",
      items: [
        { title: "My Tasks", url: "/dashboard/rider-task", icon: ClipboardList },
        { title: "Live Parcels", url: "/dashboard/live-parcels", icon: MapPin },
        { title: "Delivered Parcels", url: "/dashboard/delivered-parcels", icon: Truck },
      ]
    },
    {
      label: "Personal",
      items: [
        { title: "Earnings", url: "/dashboard/rider-earnings", icon: Wallet },
        { title: "Notifications", url: "/dashboard/rider-notification", icon: Bell },
        { title: "Settings", url: "/dashboard/settings", icon: Settings },
      ]
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser()
  const pathname = usePathname()

  // Safely get the role string or fallback to MERCHANT
  const userRole = (user?.role?.toUpperCase() || "MERCHANT") as keyof typeof ROUTES_CONFIG

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-slate-200/50 dark:border-slate-800/50" {...props}>
      <SidebarHeader className="h-16 flex items-center px-4">
        <NavLogo />
      </SidebarHeader>

      <SidebarContent className="px-2 scrollbar-none">
        {/* Inline mapping based on the current user role */}
        {(ROUTES_CONFIG[userRole] || ROUTES_CONFIG.MERCHANT).map((section, index, array) => (
          <React.Fragment key={section.label}>
            <SidebarGroup>
              <SidebarGroupLabel className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mb-2 px-3">
                {section.label}
              </SidebarGroupLabel>
              <SidebarMenu>
                {section.items.map((item) => {
                  const isActive = pathname === item.url

                  return (
                    <SidebarMenuItem key={item.title} className="mb-0.5">
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`
                          group relative flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200
                          ${isActive
                            ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
                          }
                        `}
                      >
                        <Link href={item.url}>
                          <item.icon className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-orange-600" : ""}`} />
                          <span className="text-sm font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroup>

            {/* Separator logic using the array from the map callback */}
            {index < array.length - 1 && (
              <SidebarSeparator className="mx-2 my-2 opacity-30" />
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