import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_id")?.value

    if (!userId) {
      return NextResponse.json({ user: null })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        contributions: {
          include: {
            repository: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
        badges: {
          include: {
            badge: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 })
  }
}
