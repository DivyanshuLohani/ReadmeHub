import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json()

    if (!username || username.trim().length === 0) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    let user = await prisma.user.findUnique({
      where: { username: username.trim() },
    })

    if (!user) {
      user = await prisma.user.create({
        data: { username: username.trim() },
      })
    }

    const cookieStore = await cookies()
    cookieStore.set("user_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    })

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 })
  }
}
