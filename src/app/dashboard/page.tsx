"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { 
  Users, 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight, 
  Dumbbell,
  Clock,
  Flame,
  Target,
  Loader2
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { BMICalculator } from "@/components/features/bmi-calculator";
import { getDashboardStats } from "./actions";
import { formatDistanceToNow } from "date-fns";

const revenueData = [
  { name: "Jan", value: 4500 },
  { name: "Feb", value: 5200 },
  { name: "Mar", value: 4800 },
  { name: "Apr", value: 6100 },
  { name: "May", value: 5900 },
  { name: "Jun", value: 7200 },
];

const workoutData = [
  { name: "Mon", value: 45 },
  { name: "Tue", value: 52 },
  { name: "Wed", value: 38 },
  { name: "Thu", value: 65 },
  { name: "Fri", value: 48 },
  { name: "Sat", value: 30 },
  { name: "Sun", value: 20 },
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const role = session?.user?.role || "MEMBER";
  const userId = session?.user?.id;

  useEffect(() => {
    if (userId) {
      fetchStats();
    }
  }, [userId, role]);

  const fetchStats = async () => {
    setLoading(true);
    const result = await getDashboardStats(role, userId!);
    if (result.success) {
      setStats(result.data);
    }
    setLoading(false);
  };

  const chartData = (role === "ADMIN" ? revenueData : workoutData) as any[];

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back, {session?.user?.name || "Member"}. Here&apos;s what&apos;s happening in your fitness sphere.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title={role === "ADMIN" ? "Total Members" : "Workout Sessions"}
          value={role === "ADMIN" ? (stats?.totalMembers ?? 0) : (stats?.workoutCount ?? 0)}
          change="+12.5%"
          icon={<Users className="text-blue-400" />}
          description={role === "ADMIN" ? "Registered members" : "Completed workouts"}
        />
        <StatsCard 
          title={role === "ADMIN" ? "Total Revenue" : "Calories Burned"}
          value={role === "ADMIN" ? `$${stats?.totalRevenue ?? 0}` : (stats?.totalCalories ?? 0)}
          change="+8.2%"
          icon={role === "ADMIN" ? <CreditCard className="text-purple-400" /> : <Flame className="text-orange-400" />}
          description={role === "ADMIN" ? "From paid memberships" : "Estimated burn"}
        />
        <StatsCard 
          title="Activity Level"
          value={role === "ADMIN" ? (stats?.totalTrainers ?? 0) : (stats?.attendanceCount ?? 0)}
          change="+2.4%"
          icon={<Calendar className="text-blue-400" />}
          description={role === "ADMIN" ? "Active Trainers" : "Days attended"}
        />
        <StatsCard 
          title={role === "MEMBER" ? "Next Goal" : "Staff Count"}
          value={role === "MEMBER" ? "85kg" : (stats?.totalTrainers ?? 0)}
          change="On Track"
          icon={<Target className="text-purple-400" />}
          description="Progress towards target"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Chart */}
        <Card className="lg:col-span-2 glass border-white/10 overflow-hidden">
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>
              {role === "ADMIN" ? "Membership growth over time" : "Workout consistency this week"}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] w-full pr-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(263.4 70% 50.4%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(263.4 70% 50.4%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${role === "ADMIN" ? "$" : ""}${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #ffffff10", borderRadius: "8px" }}
                  itemStyle={{ color: "#ffffff" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(263.4 70% 50.4%)" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity or BMI Calculator */}
        <div className="space-y-6">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest events in the gym</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {stats?.recentActivity?.length > 0 ? (
                  stats.recentActivity.map((activity: any, i: number) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <Dumbbell size={18} className={role === "ADMIN" ? "text-primary" : "text-blue-400"} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {role === "ADMIN" ? `New member: ${activity.fullName}` : `Workout: ${activity.workout?.name || 'Session'}`}
                        </p>
                        <p className="text-xs text-muted-foreground" suppressHydrationWarning>
                          {activity.createdAt || activity.workoutDate 
                            ? formatDistanceToNow(new Date(activity.createdAt || activity.workoutDate), { addSuffix: true }) 
                            : "recently"}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-[10px] uppercase border-white/10">
                        {role === "ADMIN" ? "User" : "Log"}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No recent activity found.</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          {role === "MEMBER" && <BMICalculator />}
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, change, icon, description }: any) {
  return (
    <Card className="glass border-white/10 hover:border-primary/50 transition-all group cursor-default">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors">
            {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 20 }) : icon}
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            change?.startsWith("+") ? "bg-green-500/10 text-green-400" : "bg-primary/10 text-primary"
          }`}>
            {change}
          </span>
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-3xl font-bold">{value ?? 0}</h3>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <Clock size={12} /> {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
