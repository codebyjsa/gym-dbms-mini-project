"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Award,
  Loader2
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { getAttendanceHistory } from "./actions";
import { format } from "date-fns";

export default function HistoryPage() {
  const { data: session } = useSession();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchHistory();
    }
  }, [session?.user?.id]);

  const fetchHistory = async () => {
    setLoading(true);
    const result = await getAttendanceHistory(session?.user?.id!);
    if (result.success) {
      setHistory(result.data || []);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Attendance History</h1>
        <p className="text-muted-foreground">Keep track of your consistency and workout frequency.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-white/10 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Calendar className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Total Visits</p>
              <h3 className="text-2xl font-bold">{history.length}</h3>
            </div>
          </div>
        </Card>
        <Card className="glass border-white/10 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Consistency</p>
              <h3 className="text-2xl font-bold">{history.length > 0 ? "High" : "None"}</h3>
            </div>
          </div>
        </Card>
        <Card className="glass border-white/10 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
              <Award className="text-purple-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Status</p>
              <h3 className="text-2xl font-bold">Active</h3>
            </div>
          </div>
        </Card>
      </div>

      <Card className="glass border-white/10 overflow-hidden min-h-[300px] flex flex-col">
        <CardHeader className="bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Attendance logs</CardTitle>
              <CardDescription>A detailed history of your gym sessions.</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : history.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
            <Calendar size={48} className="mb-4 opacity-20" />
            <p>No attendance records found.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead>Date</TableHead>
                <TableHead>Check-in Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((row) => (
                <TableRow key={row.id} className="border-white/10 hover:bg-white/[0.02]">
                  <TableCell className="font-medium">{format(new Date(row.date), "MMM dd, yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-muted-foreground" />
                      {format(new Date(row.checkInTime), "hh:mm p")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-500/20 text-green-400 border-none">
                      <CheckCircle2 size={12} className="mr-1" /> Present
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
