"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Scale, Ruler, Activity, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const result = w / (h * h);
      setBMI(parseFloat(result.toFixed(1)));
    }
  };

  const getBMICategory = (val: number) => {
    if (val < 18.5) return { label: "Underweight", color: "text-blue-400", bg: "bg-blue-500/10" };
    if (val < 25) return { label: "Normal", color: "text-green-400", bg: "bg-green-500/10" };
    if (val < 30) return { label: "Overweight", color: "text-yellow-400", bg: "bg-yellow-500/10" };
    return { label: "Obese", color: "text-red-400", bg: "bg-red-500/10" };
  };

  return (
    <Card className="glass border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="text-primary" size={20} /> BMI Calculator
        </CardTitle>
        <CardDescription>Calculate your Body Mass Index quickly.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bmi-weight">Weight (kg)</Label>
            <div className="relative">
              <Scale className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="bmi-weight"
                type="number" 
                placeholder="70" 
                className="pl-10 bg-white/5 border-white/10"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bmi-height">Height (cm)</Label>
            <div className="relative">
              <Ruler className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="bmi-height"
                type="number" 
                placeholder="175" 
                className="pl-10 bg-white/5 border-white/10"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button onClick={calculate} className="w-full bg-primary hover:bg-primary/90">
          Calculate BMI
        </Button>

        {bmi !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border border-white/10 flex items-center justify-between ${getBMICategory(bmi).bg}`}
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">Your Result</p>
              <h4 className="text-3xl font-bold">{bmi}</h4>
            </div>
            <div className="text-right">
              <Badge className={`${getBMICategory(bmi).bg} ${getBMICategory(bmi).color} border-none px-3 py-1`}>
                {getBMICategory(bmi).label}
              </Badge>
              <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1 justify-end">
                <Info size={10} /> Healthy: 18.5 - 24.9
              </p>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
