import { cookies } from "next/headers"
import { prisma } from "./prisma"

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_id")?.value

  if (!userId) {
    return null
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
      },
      badges: {
        include: {
          badge: true,
        },
      },
    },
  })

  return user
}
