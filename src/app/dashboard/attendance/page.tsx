"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  User, 
  ArrowLeft, 
  ArrowRight,
  MoreVertical
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const dummyAttendance = [
  { id: 1, name: "John Doe", time: "06:30 AM", status: "Present", plan: "Elite" },
  { id: 2, name: "Jane Smith", time: "07:15 AM", status: "Present", plan: "Pro" },
  { id: 3, name: "Mike Ross", time: "08:00 AM", status: "Late", plan: "Basic" },
  { id: 4, name: "Sarah Connor", time: "08:45 AM", status: "Present", plan: "Elite" },
  { id: 5, name: "Robert Paulson", time: "09:30 AM", status: "Present", plan: "Pro" },
];

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState("Today, May 7th");

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Tracking</h1>
          <p className="text-muted-foreground">Monitor daily check-ins and member consistency.</p>
        </div>
        <div className="flex items-center gap-2 glass p-1 rounded-lg border border-white/10">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/5">
            <ArrowLeft size={16} />
          </Button>
          <span className="text-sm font-medium px-4">{selectedDate}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/5">
            <ArrowRight size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/5 ml-2 border-l border-white/10 pl-4">
            <Calendar size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass border-white/10 flex items-center p-6 gap-4">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
            <User className="text-green-400" size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Total Present</p>
            <h3 className="text-2xl font-bold">142</h3>
          </div>
        </Card>
        <Card className="glass border-white/10 flex items-center p-6 gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="text-primary" size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Avg. Stay</p>
            <h3 className="text-2xl font-bold">68 min</h3>
          </div>
        </Card>
        <Card className="glass border-white/10 flex items-center p-6 gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
            <CheckCircle2 className="text-blue-400" size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Peak Hour</p>
            <h3 className="text-2xl font-bold">07:00 PM</h3>
          </div>
        </Card>
        <div className="flex items-center gap-2">
           <Button className="w-full h-full bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
             <CheckCircle2 className="mr-2 h-4 w-4" /> Quick Check-in
           </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search member by name..." 
            className="pl-10 bg-white/5 border-white/10 h-11"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="glass border-white/10 h-11">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" className="glass border-white/10 h-11">
            Export Report
          </Button>
        </div>
      </div>

      <Card className="glass border-white/10 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="hover:bg-transparent border-white/10">
              <TableHead>Member</TableHead>
              <TableHead>Check-in Time</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyAttendance.map((record) => (
              <TableRow key={record.id} className="border-white/10 hover:bg-white/[0.02]">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {record.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{record.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={14} className="text-muted-foreground" />
                    {record.time}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-white/10">
                    {record.plan}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={
                    record.status === "Present" ? "bg-green-500/20 text-green-400 border-none" : 
                    "bg-yellow-500/20 text-yellow-400 border-none"
                  }>
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="hover:bg-white/10 rounded-full">
                    <MoreVertical size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
