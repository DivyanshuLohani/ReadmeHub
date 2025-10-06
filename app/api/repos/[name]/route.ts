import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    
    const repository = await prisma.repository.findUnique({
      where: { name },
      include: {
        contributions: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
      },
    })
    
    if (!repository) {
      const repositories = await prisma.repository.findMany({
        include: {
          contributions: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 10,
          },
        },
      });
      return NextResponse.json({ error: "Repository not found", repositories: repositories  }, { status: 404 })
    }

    return NextResponse.json({ repository })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch repository" }, { status: 500 })
  }
}
