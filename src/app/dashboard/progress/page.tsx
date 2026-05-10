"use client";

import React from "react";
import { 
  Activity, 
  Target, 
  Scale, 
  TrendingDown, 
  TrendingUp,
  Calendar,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const progressData = [
  { date: "Jan", weight: 85, bodyFat: 22, bmi: 26.5 },
  { date: "Feb", weight: 84.2, bodyFat: 21.5, bmi: 26.2 },
  { date: "Mar", weight: 83, bodyFat: 20.8, bmi: 25.8 },
  { date: "Apr", weight: 81.5, bodyFat: 19.5, bmi: 25.4 },
  { date: "May", weight: 80.8, bodyFat: 18.8, bmi: 25.1 },
  { date: "Jun", weight: 79.5, bodyFat: 18.2, bmi: 24.8 },
];

export default function ProgressPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Body Evolution</h1>
          <p className="text-muted-foreground">Detailed metrics and progress tracking over time.</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
          onClick={() => toast.info("Measurement logging feature coming soon!")}
        >
          <Plus className="mr-2 h-4 w-4" /> Log Measurements
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Current Weight" 
          value="79.5 kg" 
          change="-5.5 kg" 
          icon={<Scale className="text-blue-400" />} 
          subtext="Total lost since Jan"
        />
        <MetricCard 
          title="Current BMI" 
          value="24.8" 
          change="-1.7" 
          icon={<Activity className="text-purple-400" />} 
          subtext="Healthy Weight Range"
        />
        <MetricCard 
          title="Body Fat" 
          value="18.2 %" 
          change="-3.8 %" 
          icon={<Target className="text-blue-400" />} 
          subtext="Lean muscle definition"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weight Progression Chart */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle>Weight Progression</CardTitle>
            <CardDescription>Visualizing your journey to the target weight</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] pr-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(263.4 70% 50.4%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(263.4 70% 50.4%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #ffffff10", borderRadius: "8px" }} />
                <Area type="monotone" dataKey="weight" stroke="hsl(263.4 70% 50.4%)" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* BMI & Body Fat */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle>Composition Analysis</CardTitle>
            <CardDescription>BMI and Body Fat percentage trends</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] pr-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="colorFat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #ffffff10", borderRadius: "8px" }} />
                <Area type="monotone" dataKey="bodyFat" stroke="#00f2ff" strokeWidth={3} fillOpacity={1} fill="url(#colorFat)" />
                <Area type="monotone" dataKey="bmi" stroke="#bc13fe" strokeWidth={3} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Table */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle>Measurement History</CardTitle>
          <CardDescription>Log of all recorded physical metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-muted-foreground">
                  <th className="py-4 font-medium">Date</th>
                  <th className="py-4 font-medium">Weight (kg)</th>
                  <th className="py-4 font-medium">BMI</th>
                  <th className="py-4 font-medium">Body Fat (%)</th>
                  <th className="py-4 font-medium">Change</th>
                </tr>
              </thead>
              <tbody>
                {[...progressData].reverse().map((log, i) => (
                  <tr key={i} className="border-b border-white/10 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 flex items-center gap-2">
                      <Calendar size={14} className="text-primary" />
                      {log.date} 2024
                    </td>
                    <td className="py-4 font-bold">{log.weight}</td>
                    <td className="py-4">{log.bmi}</td>
                    <td className="py-4">{log.bodyFat} %</td>
                    <td className="py-4">
                      {i < progressData.length - 1 && (
                        <div className="flex items-center gap-1 text-green-400">
                          <TrendingDown size={14} />
                          {(progressData[i+1].weight - log.weight).toFixed(1)} kg
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({ title, value, change, icon, subtext }: any) {
  return (
    <Card className="glass border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
        <div className="flex flex-col items-end">
          <span className="text-lg font-bold text-green-400">{change}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Variation</span>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
        <p className="text-xs text-muted-foreground mt-2">{subtext}</p>
      </div>
    </Card>
  );
}
