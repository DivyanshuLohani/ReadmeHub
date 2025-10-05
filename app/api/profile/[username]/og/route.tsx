import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma"

const colors = ["#1F2937", "#374151", "#4B5563", "#6B7280", "#9CA3AF", "#D1D5DB", "#FF6B35", "#FF8C42", "#FFA94D", "#FFB347"];

function ContributionGraph({ contributions }: { contributions: Array<{ createdAt: Date }> }) {
  const days = 30;
  const hours = 16;
  const now = new Date();

  const contributionMap = new Map<string, number>();
  contributions.forEach((contrib) => {
    const date = new Date(contrib.createdAt)
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`;
    contributionMap.set(key, (contributionMap.get(key) || 0) + 1);
  });

  const graphData: Array<Array<{ count: number; color: string }>> = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(now);
    day.setDate(now.getDate() - i);
    const dayColumn: Array<{ count: number; color: string }> = [];
    for (let j = 0; j < hours; j++) {
      const key = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}-${j}`;
      const count = contributionMap.get(key) || 0;
      const colorIndex = count > 0 ? Math.min(Math.floor(count) + 5, colors.length - 1) : 0;
      const cellColor = colors[colorIndex];
      dayColumn.push({ count, color: cellColor });
    }
    graphData.push(dayColumn);
  }

  return (
    <div style={{ display: "flex", gap: "3px", flexDirection: "row", width: "100%" }}>
      {graphData.map((day, dayIndex) => (
        <div key={dayIndex} style={{ display: "flex", flexDirection: "column", gap: "3px", flex: 1 }}>
          {day.map((hour, hourIndex) => (
            <div
              key={hourIndex}
              style={{
                width: '100%',
                height: '10px',
                borderRadius: '2px',
                backgroundColor: hour.color,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}


export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      contributions: {
        orderBy: {
          createdAt: "desc",
        },
      },
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
          justifyContent: "space-between",
          backgroundColor: "#0d1117",
          color: "white",
          fontFamily: '"sans-serif"',
          padding: "48px 60px",
          position: "relative",
        }}
      >
        {/* Decorative circles - Hacktoberfest style */}
        <div style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#FF6B35",
          opacity: 0.3,
        }} />
        <div style={{
          position: "absolute",
          top: "80px",
          right: "40px",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: "#183D5D",
          opacity: 0.3,
        }} />
        <div style={{
          position: "absolute",
          bottom: "60px",
          left: "60px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "#9C4668",
          opacity: 0.3,
        }} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", width: "100%" }}>
          {/* Hacktoberfest Badge */}
          <div style={{
            backgroundColor: "#183D5D",
            color: "#FF6B35",
            padding: "8px 20px",
            borderRadius: "20px",
            fontSize: "18px",
            fontWeight: "700",
            letterSpacing: "0.1em",
            marginBottom: "8px",
            border: "2px solid #FF6B35",
          }}>
            🎃 HACKTOBERFEST CHAMPION 🎃
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <p style={{ fontSize: "54px", fontWeight: "700", margin: 0, color: "#FF6B35" }}>
                {user.contributions.length}
              </p>
              <p style={{ fontSize: "20px", margin: 0, color: "#8b949e", fontWeight: "500" }}>
                README Edits
              </p>
            </div>
            <div
              style={{
                height: "110px",
                width: "110px",
                borderRadius: "50%",
                backgroundColor: "#183D5D",
                color: "#FF6B35",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "52px",
                fontWeight: "700",
                border: "4px solid #FF6B35",
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
              <h1 style={{ fontSize: "62px", fontWeight: "700", margin: 0, letterSpacing: "-0.03em" }}>
                {username}
              </h1>
              <p style={{ fontSize: "26px", margin: 0, color: "#FF6B35", fontWeight: "600" }}>
                Professional README Editor 📝
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <p style={{ fontSize: "54px", fontWeight: "700", margin: 0, color: "#9C4668" }}>
                {user.badges.length}
              </p>
              <p style={{ fontSize: "20px", margin: 0, color: "#8b949e", fontWeight: "500" }}>
                Badges Earned
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "80px", marginTop: "8px" }}>


          </div>
        </div>

        <div style={{
          display: "flex",
          width: "100%",
          backgroundColor: "#0d1117",
          padding: "20px",
          borderRadius: "12px",
          border: "2px solid #30363d",
        }}>
          <ContributionGraph contributions={user.contributions} />
        </div>

        <div
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#8b949e",
            letterSpacing: "0.05em",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          Made with ReadmeHub • Where Every Typo Fix Counts 🏆
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}