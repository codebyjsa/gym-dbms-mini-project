"use server";

import prisma from "@/lib/prisma";

export async function getDashboardStats(role: string, userId: string) {
  try {
    if (role === "ADMIN") {
      const [totalMembers, totalTrainers, totalRevenue, recentActivity] = await Promise.all([
        prisma.user.count({ where: { role: "MEMBER" } }),
        prisma.user.count({ where: { role: "TRAINER" } }),
        prisma.payment.aggregate({
          where: { paymentStatus: "PAID" },
          _sum: { amount: true },
        }),
        prisma.user.findMany({
          where: { role: "MEMBER" },
          orderBy: { createdAt: "desc" },
          take: 5,
        }),
      ]);

      return {
        success: true,
        data: {
          totalMembers,
          totalTrainers,
          totalRevenue: totalRevenue._sum.amount || 0,
          recentActivity,
        }
      };
    } else {
      // For Member
      const [member, workoutCount, totalCalories, attendanceRate] = await Promise.all([
        prisma.member.findUnique({
          where: { userId },
          include: { workouts: { include: { workout: true } } },
        }),
        prisma.memberWorkout.count({ where: { member: { userId } } }),
        prisma.memberWorkout.findMany({
          where: { member: { userId } },
          include: { workout: true }
        }),
        prisma.attendance.count({ where: { member: { userId } } }),
      ]);

      const calories = totalCalories.reduce((acc, curr) => acc + (curr.workout.caloriesBurn * (curr.durationMinutes / 60)), 0);

      return {
        success: true,
        data: {
          workoutCount,
          totalCalories: Math.round(calories),
          attendanceCount: attendanceRate,
          recentActivity: totalCalories.slice(0, 5),
        }
      };
    }
  } catch (error: any) {
    console.error("Dashboard stats error:", error);
    return { success: false, error: error.message };
  }
}
