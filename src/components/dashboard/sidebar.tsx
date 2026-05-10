"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { 
  Dumbbell, 
  LayoutDashboard, 
  Users, 
  UserCircle, 
  TrendingUp, 
  Calendar, 
  CreditCard, 
  Settings,
  LogOut,
  ChevronRight,
  ClipboardList,
  Activity
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const role = session?.user?.role || "MEMBER";

  const adminLinks = [
    { name: "Overview", href: "/dashboard", icon: <LayoutDashboard /> },
    { name: "Members", href: "/dashboard/members", icon: <Users /> },
    { name: "Trainers", href: "/dashboard/trainers", icon: <UserCircle /> },
    { name: "Workouts", href: "/dashboard/workouts", icon: <Dumbbell /> },
    { name: "Attendance", href: "/dashboard/attendance", icon: <Calendar /> },
    { name: "Payments", href: "/dashboard/payments", icon: <CreditCard /> },
  ];

  const trainerLinks = [
    { name: "Overview", href: "/dashboard", icon: <LayoutDashboard /> },
    { name: "My Members", href: "/dashboard/my-members", icon: <Users /> },
    { name: "Workouts", href: "/dashboard/workouts", icon: <Dumbbell /> },
    { name: "Attendance", href: "/dashboard/attendance", icon: <Calendar /> },
  ];

  const memberLinks = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
    { name: "My Workouts", href: "/dashboard/my-workouts", icon: <TrendingUp /> },
    { name: "Attendance", href: "/dashboard/history", icon: <Calendar /> },
    { name: "Progress", href: "/dashboard/progress", icon: <Activity /> },
    { name: "Payments", href: "/dashboard/billing", icon: <CreditCard /> },
  ];

  const links = role === "ADMIN" ? adminLinks : role === "TRAINER" ? trainerLinks : memberLinks;

  return (
    <Sidebar className="border-r border-white/10 glass">
      <SidebarHeader className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center rotate-6">
            <Dumbbell className="text-white -rotate-6" size={18} />
          </div>
          <span className="text-xl font-bold tracking-tighter text-gradient">FitSphere</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground/50">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-3 gap-1">
              {links.map((link) => (
                <SidebarMenuItem key={link.name}>
                  <SidebarMenuButton 
                    isActive={pathname === link.href}
                    className="h-11 p-0 rounded-lg transition-all relative overflow-hidden"
                  >
                    <Link 
                      href={link.href} 
                      className={`flex items-center gap-3 w-full h-full px-4 ${
                        pathname === link.href 
                          ? "bg-primary text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]" 
                          : "hover:bg-white/5 text-muted-foreground hover:text-white"
                      }`}
                    >
                      {React.cloneElement(link.icon as React.ReactElement<any>, { size: 20 })}
                      <span className="font-medium">{link.name}</span>
                      {pathname === link.href && <ChevronRight className="ml-auto" size={16} />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground/50">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-3">
              <SidebarMenuItem>
                <SidebarMenuButton className="h-11 p-0 hover:bg-white/5 text-muted-foreground hover:text-white transition-all relative overflow-hidden">
                  <Link href="/dashboard/settings" className="flex items-center gap-3 w-full h-full px-4">
                    <Settings size={20} />
                    <span className="font-medium">Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar className="h-10 w-10 border border-primary/20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/20 text-primary font-bold">
              {session?.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-sm font-bold truncate">{session?.user?.name || "User"}</span>
            <span className="text-xs text-muted-foreground truncate uppercase">{role}</span>
          </div>
          <button 
            onClick={() => signOut()}
            className="p-2 hover:bg-red-500/10 text-muted-foreground hover:text-red-400 rounded-lg transition-all"
          >
            <LogOut size={18} />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
