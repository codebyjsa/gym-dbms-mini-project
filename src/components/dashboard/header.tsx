"use client";

import React from "react";
import { Search, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardHeader() {
  return (
    <header className="h-20 border-b border-white/10 glass px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <SidebarTrigger className="md:hidden" />
        <div className="relative w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search for members, workouts, or reports..." 
            className="pl-10 bg-white/5 border-white/10 focus:ring-primary w-full h-11"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">System Live</span>
        </div>
        
        <Button variant="ghost" size="icon" className="relative hover:bg-white/5 text-muted-foreground hover:text-white rounded-full">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
        </Button>
      </div>
    </header>
  );
}
