"use client";

import React from "react";
import { 
  Flame, 
  Clock, 
  Dumbbell, 
  Play, 
  Plus, 
  TrendingUp,
  History
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const calorieData = [
  { day: "Mon", calories: 450 },
  { day: "Tue", calories: 520 },
  { day: "Wed", calories: 380 },
  { day: "Thu", calories: 650 },
  { day: "Fri", calories: 480 },
  { day: "Sat", calories: 300 },
  { day: "Sun", calories: 200 },
];

const routines = [
  { id: 1, name: "Morning Strength", category: "Full Body", exercises: 8, duration: "45 min", calories: 350 },
  { id: 2, name: "HIIT Blast", category: "Cardio", exercises: 12, duration: "30 min", calories: 450 },
  { id: 3, name: "Leg Destroyer", category: "Legs", exercises: 6, duration: "50 min", calories: 400 },
];

export default function MyWorkoutsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workout Ecosystem</h1>
          <p className="text-muted-foreground">Track your progress and manage your training routines.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          <Plus className="mr-2 h-4 w-4" /> Log Workout
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats and Chart */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="glass border-white/10 p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
                <Flame className="text-orange-400" size={24} />
              </div>
              <span className="text-2xl font-bold">12,400</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Calories Burned</span>
            </Card>
            <Card className="glass border-white/10 p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                <Clock className="text-blue-400" size={24} />
              </div>
              <span className="text-2xl font-bold">18.5h</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Time Trained</span>
            </Card>
            <Card className="glass border-white/10 p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="text-primary" size={24} />
              </div>
              <span className="text-2xl font-bold">4.2%</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Growth Rate</span>
            </Card>
          </div>

          <Card className="glass border-white/10 overflow-hidden">
            <CardHeader>
              <CardTitle>Calorie Burn History</CardTitle>
              <CardDescription>Daily energy expenditure this week</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] pr-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={calorieData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #ffffff10", borderRadius: "8px" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="calories" 
                    stroke="hsl(263.4 70% 50.4%)" 
                    strokeWidth={4} 
                    dot={{ r: 4, fill: "hsl(263.4 70% 50.4%)" }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <History className="text-primary" size={20} /> Recent Logs
            </h3>
            <Button variant="link" className="text-primary p-0">View All</Button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white/5 border-white/10 p-4 hover:bg-white/[0.08] transition-all cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Dumbbell className="text-primary" size={22} />
                    </div>
                    <div>
                      <p className="font-bold">Power Lifting Session</p>
                      <p className="text-xs text-muted-foreground">Chest & Triceps • Yesterday, 6:30 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">450 kcal</p>
                    <p className="text-xs text-muted-foreground">55 Minutes</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Routines */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Training Routines</h3>
          <div className="space-y-4">
            {routines.map((routine) => (
              <Card key={routine.id} className="glass border-white/10 overflow-hidden group">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                      {routine.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-medium">{routine.duration}</span>
                  </div>
                  <h4 className="text-lg font-bold mb-1">{routine.name}</h4>
                  <p className="text-sm text-muted-foreground mb-6">{routine.exercises} targeted exercises</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1 text-orange-400">
                      <Flame size={14} />
                      <span className="text-xs font-bold">{routine.calories} kcal</span>
                    </div>
                    <Button size="sm" className="bg-white/10 hover:bg-primary transition-colors">
                      <Play size={14} className="mr-2" /> Start
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-primary/20 to-blue-500/20 border-white/10 p-6">
            <h4 className="font-bold mb-2">AI Recommendation</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Based on your recent heavy lifting, we suggest a 15-minute mobility session to enhance recovery.
            </p>
            <Button size="sm" variant="outline" className="w-full glass border-white/10">
              View Suggestion
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
