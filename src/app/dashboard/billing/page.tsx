"use client";

import React from "react";
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Download,
  Calendar,
  ShieldCheck
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

const history = [
  { id: "INV-001", date: "May 1, 2024", amount: "$59.00", status: "Paid", method: "Visa •••• 4242" },
  { id: "INV-002", date: "Apr 1, 2024", amount: "$59.00", status: "Paid", method: "Visa •••• 4242" },
  { id: "INV-003", date: "Mar 1, 2024", amount: "$59.00", status: "Paid", method: "Visa •••• 4242" },
];

export default function BillingPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Membership</h1>
        <p className="text-muted-foreground">Manage your subscription, payments, and billing history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Plan */}
        <Card className="lg:col-span-2 glass border-white/10 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-6">
            <Badge className="bg-primary text-white border-none px-4 py-1">Active</Badge>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Current Plan</CardTitle>
            <CardDescription>Your membership details and billing cycle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <h2 className="text-4xl font-black tracking-tighter text-gradient mb-2">PRO SPHERE</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={16} />
                  <span>Next billing date: <span className="font-bold text-white">June 1, 2024</span></span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-4xl font-bold">$59.00</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ShieldCheck className="text-primary" size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Premium Features</p>
                  <p className="text-xs text-muted-foreground">24/7 Access, Trainer Support, Analytics</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <CreditCard className="text-blue-400" size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Payment Method</p>
                  <p className="text-xs text-muted-foreground">Visa ending in 4242</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Button className="bg-primary hover:bg-primary/90">Upgrade Plan</Button>
              <Button variant="outline" className="glass border-white/10">Cancel Subscription</Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-lg">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-white/5 border border-primary/30 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-7 bg-white/10 rounded flex items-center justify-center font-bold text-[8px] tracking-tighter italic">VISA</div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">•••• 4242</span>
                  <span className="text-xs text-muted-foreground italic">Expires 12/26</span>
                </div>
              </div>
              <Badge variant="outline" className="text-[10px] uppercase border-primary/50 text-primary">Default</Badge>
            </div>
            <Button variant="outline" className="w-full border-dashed border-white/20 hover:border-primary/50 hover:bg-primary/5">
               Add New Method
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Billing History */}
      <Card className="glass border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>Recent invoices and transaction status</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="glass border-white/10">
            <Download size={14} className="mr-2" /> Download All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-muted-foreground">
                  <th className="py-4 font-medium">Invoice</th>
                  <th className="py-4 font-medium">Date</th>
                  <th className="py-4 font-medium">Amount</th>
                  <th className="py-4 font-medium">Status</th>
                  <th className="py-4 font-medium">Method</th>
                  <th className="py-4 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="border-b border-white/10 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 font-bold">{item.id}</td>
                    <td className="py-4 text-muted-foreground">{item.date}</td>
                    <td className="py-4 font-bold">{item.amount}</td>
                    <td className="py-4">
                      <Badge className="bg-green-500/10 text-green-400 border-none">
                        <CheckCircle2 size={12} className="mr-1" /> {item.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-xs text-muted-foreground">{item.method}</td>
                    <td className="py-4 text-right">
                      <Button variant="ghost" size="sm" className="hover:text-primary">
                        <Download size={14} />
                      </Button>
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
