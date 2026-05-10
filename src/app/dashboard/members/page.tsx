"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Download,
  Mail,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Loader2
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { getMembers, deleteMember } from "./actions";
import { toast } from "sonner";
import { format } from "date-fns";

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    setLoading(true);
    const result = await getMembers();
    if (result.success) {
      setMembers(result.data || []);
    } else {
      toast.error("Failed to load members: " + result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this member? This action cannot be undone.")) {
      const result = await deleteMember(id);
      if (result.success) {
        toast.success("Member deleted successfully");
        fetchMembers();
      } else {
        toast.error("Failed to delete member: " + result.error);
      }
    }
  };

  const filteredMembers = members.filter(member => 
    member.fullName.toLowerCase().includes(search.toLowerCase()) ||
    member.email.toLowerCase().includes(search.toLowerCase()) ||
    (member.phone && member.phone.includes(search))
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Member Management</h1>
          <p className="text-muted-foreground">Manage your gym members and their subscriptions.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="glass border-white/10 hidden sm:flex">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <Plus className="mr-2 h-4 w-4" /> Add Member
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search by name, email, or phone..." 
            className="pl-10 bg-white/5 border-white/10 h-11"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="glass border-white/10 h-11">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
        <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
          {loading ? "Loading..." : `Showing ${filteredMembers.length} members`}
        </div>
      </div>

      <div className="glass border border-white/10 rounded-xl overflow-hidden min-h-[400px] flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Search className="text-muted-foreground" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">No members found</h3>
            <p className="text-muted-foreground max-w-xs">Try adjusting your search or add a new member to the system.</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="hover:bg-transparent border-white/10">
                <TableHead className="w-[300px]">Member</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((user) => (
                <TableRow key={user.id} className="border-white/10 hover:bg-white/[0.02] transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {user.fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold">{user.fullName}</span>
                        <span className="text-xs text-muted-foreground font-mono">#{user.id?.slice(-6) || "N/A"}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail size={12} className="text-primary" /> {user.email}
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone size={12} className="text-primary" /> {user.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-white/5 border-white/10 hover:bg-white/10">
                      {user.member?.membershipPlan?.name || "No Plan"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm" suppressHydrationWarning>
                      <Calendar size={14} className="text-muted-foreground" />
                      {user.createdAt ? format(new Date(user.createdAt), "MMM dd, yyyy") : "N/A"}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger 
                        render={<Button variant="ghost" size="icon" className="hover:bg-white/10 rounded-full" />}
                      >
                        <MoreVertical size={18} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass border-white/10">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="hover:bg-white/10">View Profile</DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-white/10">Edit Member</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem 
                          className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 size={14} className="mr-2" /> Delete Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredMembers.length}</span> members
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="glass border-white/10 h-10 w-10" disabled>
            <ChevronLeft size={18} />
          </Button>
          <Button variant="default" className="h-10 w-10 bg-primary">1</Button>
          <Button variant="outline" size="icon" className="glass border-white/10 h-10 w-10" disabled>
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
