import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma"


export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      contributions: true,
      badges: true,
    },
  })

  if (!user) {
    return new Response("User not found", { status: 404 })
  }
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom right, #1E1B4B, #1E3A8A, #047857)",
          color: "white",
          fontFamily: '"sans-serif"',
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              height: "100px",
              width: "100px",
              borderRadius: "50%",
              backgroundColor: "white",
              color: "#1E1B4B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              fontWeight: "bold",
            }}
          >
            {username[0].toUpperCase()}
          </div>
          <div style={
            {
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }
          }>
            <h1 style={{ fontSize: "60px", fontWeight: "bold", margin: 0 }}>
              {username}
            </h1>
            <p style={{ fontSize: "24px", margin: 0, color: "#D1D5DB" }}>
              README Contributor
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "40px", marginBottom: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ fontSize: "48px", fontWeight: "bold", margin: 0 }}>
              {user.contributions.length}
            </p>
            <p style={{ fontSize: "20px", margin: 0, color: "#D1D5DB" }}>
              Contributions
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ fontSize: "48px", fontWeight: "bold", margin: 0 }}>
              {user.badges.length}
            </p>
            <p style={{ fontSize: "20px", margin: 0, color: "#D1D5DB" }}>
              Badges
            </p>
          </div>
        </div>

        <div
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#93C5FD",
          }}
        >
          Made with ReadmeHub
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
