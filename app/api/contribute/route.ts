import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { repositoryId, type, content } = await req.json();

    const contribution = await prisma.contribution.create({
      data: {
        type,
        content,
        userId,
        repositoryId,
      },
    });

    await prisma.repository.update({
      where: { id: repositoryId },
      data: { readmeContent: content },
    });

    const allBadges = await prisma.badge.findMany();

    // Fetch all contributions once
    const userContributions = await prisma.contribution.findMany({
      where: { userId },
    });

    // Precompute counts
    const typeCounts: Record<string, number> = {};
    for (const contrib of userContributions) {
      typeCounts[contrib.type] = (typeCounts[contrib.type] || 0) + 1;
    }
    const contributionCount = userContributions.length;

    // Check each badge against precomputed data
    for (const badge of allBadges) {
      let shouldAward = false;

      if (
        badge.name.includes("Typos") &&
        (typeCounts["typo"] ?? 0) >= badge.requirement
      ) {
        shouldAward = true;
      } else if (
        badge.name.includes("Emoji") &&
        (typeCounts["emoji"] ?? 0) >= badge.requirement
      ) {
        shouldAward = true;
      } else if (
        badge.name.includes("Motivation") &&
        (typeCounts["quote"] ?? 0) >= badge.requirement
      ) {
        shouldAward = true;
      } else if (
        contributionCount >= badge.requirement &&
        (badge.name.includes("Legend") || badge.name.includes("Warrior"))
      ) {
        shouldAward = true;
      } else if (badge.name.includes("Early Bird") && contributionCount >= 1) {
        shouldAward = true;
      }

      if (shouldAward) {
        await prisma.userBadge.upsert({
          where: {
            userId_badgeId: { userId, badgeId: badge.id },
          },
          create: { userId, badgeId: badge.id },
          update: {},
        });
      }
    }

    return NextResponse.json({ contribution });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create contribution" },
      { status: 500 }
    );
  }
}
