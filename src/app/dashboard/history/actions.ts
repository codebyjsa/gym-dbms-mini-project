"use server";

import prisma from "@/lib/prisma";

export async function getAttendanceHistory(userId: string) {
  try {
    const history = await prisma.attendance.findMany({
      where: {
        member: {
          userId: userId
        }
      },
      orderBy: {
        date: "desc"
      }
    });

    return { success: true, data: history };
  } catch (error: any) {
    console.error("Attendance history error:", error);
    return { success: false, error: error.message };
  }
}
