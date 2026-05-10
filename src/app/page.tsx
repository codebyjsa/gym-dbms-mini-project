"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Dumbbell, 
  Users, 
  TrendingUp, 
  Calendar, 
  ShieldCheck, 
  ChevronRight,
  Star,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center rotate-12">
            <Dumbbell className="text-white -rotate-12" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-gradient">FitSphere</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#membership" className="hover:text-primary transition-colors">Membership</Link>
          <Link href="#trainers" className="hover:text-primary transition-colors">Trainers</Link>
          <Link href="/login">
            <Button variant="ghost" className="hover:bg-white/10">Login</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(168,85,247,0.4)]">Join Now</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero.png" 
            alt="Gym Hero" 
            fill 
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 leading-tight">
              ELEVATE YOUR <br /> 
              <span className="text-gradient">FITNESS SPHERE</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
              The ultimate gym management and workout tracking ecosystem. 
              Data-driven results for a stronger you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:scale-105 transition-transform">
                Start Your Journey <ChevronRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full glass hover:bg-white/10">
                View Plans
              </Button>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div 
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold neon-blue">2,500+</span>
              <span className="text-sm text-muted-foreground uppercase tracking-widest mt-2">Active Members</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold neon-purple">50+</span>
              <span className="text-sm text-muted-foreground uppercase tracking-widest mt-2">Expert Trainers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold neon-blue">150+</span>
              <span className="text-sm text-muted-foreground uppercase tracking-widest mt-2">Workout Routines</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold neon-purple">99%</span>
              <span className="text-sm text-muted-foreground uppercase tracking-widest mt-2">Success Rate</span>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 blur-[120px] rounded-full animate-pulse" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="container px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Smart Management</h2>
            <p className="text-muted-foreground text-lg">Everything you need to run your fitness empire in one place.</p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { 
                icon: <TrendingUp className="text-blue-400" />, 
                title: "Workout Tracking", 
                desc: "Logs every rep, set, and calorie burned with real-time analytics." 
              },
              { 
                icon: <Users className="text-purple-400" />, 
                title: "Member Management", 
                desc: "Seamlessly manage memberships, roles, and personalized profiles." 
              },
              { 
                icon: <Calendar className="text-blue-400" />, 
                title: "Attendance System", 
                desc: "Automated check-ins and history tracking for every session." 
              },
              { 
                icon: <ShieldCheck className="text-purple-400" />, 
                title: "Secure Payments", 
                desc: "Encrypted transaction history and membership billing automation." 
              },
              { 
                icon: <Dumbbell className="text-blue-400" />, 
                title: "Trainer Assigned", 
                desc: "Get matched with professional trainers based on your goals." 
              },
              { 
                icon: <Star className="text-purple-400" />, 
                title: "Progress Visualization", 
                desc: "Interactive charts showing your BMI and body fat evolution." 
              }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="bg-white/5 border-white/10 hover:border-primary/50 transition-all duration-300 group overflow-hidden">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {React.cloneElement(feature.icon as React.ReactElement<any>, { size: 28 })}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Membership Section */}
      <section id="membership" className="py-24 bg-white/[0.02]">
        <div className="container px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-muted-foreground text-lg">Choose the sphere that fits your lifestyle.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Starter", price: "$29", duration: "Month", features: ["Basic Gym Access", "Locker Room", "Standard Equipment", "Mobile App Access"] },
              { name: "Pro Sphere", price: "$59", duration: "Month", features: ["24/7 Access", "Trainer Support", "Custom Diet Plan", "Progress Analytics"], popular: true },
              { name: "Elite Sphere", price: "$99", duration: "Month", features: ["All Pro Features", "Personal Coach", "Sauna & Spa", "Monthly Supplements"] }
            ].map((plan, i) => (
              <Card key={i} className={`relative glass border-white/10 ${plan.popular ? 'border-primary ring-1 ring-primary' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.duration}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <ChevronRight size={14} className="text-primary" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-white/10 hover:bg-white/20'}`}>
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 glass mt-auto">
        <div className="container px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Dumbbell className="text-primary" size={28} />
              <span className="text-2xl font-bold tracking-tighter text-gradient">FitSphere</span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6">
              Empowering your fitness journey with state-of-the-art technology and expert guidance. 
              Redefine your limits within the FitSphere.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">System Status</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Workout Tips</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Member Guide</Link></li>
            </ul>
          </div>
        </div>
        <div className="container px-6 mt-12 pt-8 border-t border-white/10 text-center text-sm text-muted-foreground">
          © 2026 FitSphere - Gym Membership & Workout Tracking System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
