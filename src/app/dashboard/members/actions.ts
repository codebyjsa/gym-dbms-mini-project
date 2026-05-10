"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getMembers() {
  try {
    const members = await prisma.user.findMany({
      where: {
        role: "MEMBER",
      },
      include: {
        member: {
          include: {
            membershipPlan: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: members };
  } catch (error: any) {
    console.error("Error fetching members:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteMember(userId: string) {
  try {
    // This will delete the User and the associated Member record (due to Cascade delete in Prisma schema)
    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/dashboard/members");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting member:", error);
    return { success: false, error: error.message };
  }
}
