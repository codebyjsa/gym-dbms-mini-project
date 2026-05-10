# FitSphere – Gym Membership & Workout Tracking System

FitSphere is a professional-grade Gym Management System built for modern fitness ecosystems. It features a premium dark luxury aesthetic, role-based dashboards, and comprehensive workout tracking.

## 🚀 Features

- **Admin Dashboard**: Manage members, trainers, workouts, attendance, and view revenue analytics.
- **Member Dashboard**: Track personal workouts, view attendance history, monitor BMI/Progress, and manage billing.
- **Trainer Dashboard**: Monitor assigned members and track their performance.
- **Workout Tracking**: Log exercises, calories burned, sets, reps, and duration.
- **Attendance System**: Real-time check-ins and session history.
- **Payment Management**: Membership plans, payment history, and automated status tracking.
- **Premium UI/UX**: Built with Next.js 15, Tailwind CSS, ShadCN UI, and Framer Motion for a stunning visual experience.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **UI Components**: ShadCN UI, Lucide React, Framer Motion
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: MySQL with Prisma ORM
- **Analytics**: Recharts

## 📋 Prerequisites

- Node.js 18+
- MySQL Server running locally or remotely

## ⚙️ Setup Instructions

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory (one is provided with placeholders):
   ```env
   DATABASE_URL="mysql://root:password@localhost:3306/fitsphere"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   ```

4. **Initialize Database**:
   Run Prisma migrations to create the database schema:
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Seed Dummy Data**:
   Populate the database with realistic dummy members, trainers, and workouts:
   ```bash
   npx prisma db seed
   ```

6. **Run the Development Server**:
   ```bash
   npm run dev
   ```

## 📊 Database Schema (DBMS Highlights)

The project uses a relational MySQL database designed with:
- **Normalization**: Data is organized to reduce redundancy.
- **Primary & Foreign Keys**: Ensuring referential integrity.
- **Relationships**: 
  - `User` 1:1 `Member`/`Trainer`
  - `MembershipPlan` 1:N `Member`
  - `Trainer` 1:N `Member`
  - `Member` 1:N `Workouts`/`Attendance`/`Payments`

## 🎨 UI Aesthetics

- **Theme**: Dark Luxury Gym (Charcoal & Neon)
- **Effects**: Glassmorphism, Neon Gradients, Micro-animations
- **Responsiveness**: Fully optimized for Mobile, Tablet, and Desktop

---
Created as a DBMS Mini Project.
