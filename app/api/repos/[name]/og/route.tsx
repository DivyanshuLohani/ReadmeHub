import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ name: string }> }
) {
    const { name } = await params

    const repo = await prisma.repository.findUnique({
        where: { name },
        include: {
            contributions: {
                include: {
                    user: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: 5,
            },
        },
    })

    if (!repo) {
        return new Response("Repository not found", { status: 404 })
    }

    // Calculate contribution type counts
    const typeCounts: { [key: string]: number } = {}
    repo.contributions.forEach((contrib) => {
        typeCounts[contrib.type] = (typeCounts[contrib.type] || 0) + 1
    })

    const topContributors = repo.contributions
        .reduce((acc: any[], contrib) => {
            const existing = acc.find(c => c.username === contrib.user.username)
            if (existing) {
                existing.count++
            } else {
                acc.push({ username: contrib.user.username, count: 1 })
            }
            return acc
        }, [])
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)

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
                {/* Decorative circles */}
                <div style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "#FF6B35",
                    opacity: 0.2,
                }} />
                <div style={{
                    position: "absolute",
                    top: "80px",
                    right: "40px",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    backgroundColor: "#183D5D",
                    opacity: 0.3,
                }} />
                <div style={{
                    position: "absolute",
                    bottom: "60px",
                    left: "60px",
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    backgroundColor: "#9C4668",
                    opacity: 0.25,
                }} />

                {/* Header */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", width: "100%" }}>
                    {/* Hacktoberfest Badge */}
                    <div style={{
                        backgroundColor: "#183D5D",
                        color: "#FF6B35",
                        padding: "8px 20px",
                        borderRadius: "20px",
                        fontSize: "16px",
                        fontWeight: "700",
                        letterSpacing: "0.1em",
                        border: "2px solid #FF6B35",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}>
                        <span style={{ fontSize: "24px" }}>📁</span>
                        <span>REPOSITORY</span>
                    </div>

                    {/* Repo Name and Description */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center" }}>
                        <h1 style={{ fontSize: "56px", fontWeight: "700", margin: 0, letterSpacing: "-0.02em", color: "white" }}>
                            {repo.name}
                        </h1>
                        <p style={{ fontSize: "22px", margin: 0, color: "#8b949e", maxWidth: "900px", lineHeight: "1.3" }}>
                            {repo.description}
                        </p>
                    </div>

                    {/* Stats Row */}
                    <div style={{ display: "flex", gap: "64px", marginTop: "16px" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <p style={{ fontSize: "48px", fontWeight: "700", margin: 0, color: "#FF6B35" }}>
                                {repo.contributions.length}
                            </p>
                            <p style={{ fontSize: "18px", margin: 0, color: "#8b949e", fontWeight: "500" }}>
                                Total Edits
                            </p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <p style={{ fontSize: "48px", fontWeight: "700", margin: 0, color: "#9C4668" }}>
                                ⭐ {repo.stars}
                            </p>
                            <p style={{ fontSize: "18px", margin: 0, color: "#8b949e", fontWeight: "500" }}>
                                Stars
                            </p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <p style={{ fontSize: "48px", fontWeight: "700", margin: 0, color: "#8B5CF6" }}>
                                {topContributors.length}
                            </p>
                            <p style={{ fontSize: "18px", margin: 0, color: "#8b949e", fontWeight: "500" }}>
                                Contributors
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contribution Types */}
                <div style={{
                    display: "flex",
                    gap: "16px",
                    backgroundColor: "rgba(15, 23, 42, 0.6)",
                    padding: "24px 32px",
                    borderRadius: "16px",
                    border: "2px solid #30363d",
                    width: "100%",
                    maxWidth: "900px",
                    justifyContent: "center",
                }}>
                    {Object.entries(typeCounts).length > 0 ? (
                        Object.entries(typeCounts).map(([type, count]) => (
                            <div key={type} style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "12px 24px",
                                backgroundColor: "#161b22",
                                borderRadius: "12px",
                                border: "1px solid #30363d",
                            }}>
                                <p style={{ fontSize: "32px", fontWeight: "700", margin: 0, color: "#FF6B35" }}>
                                    {count}
                                </p>
                                <p style={{ fontSize: "16px", margin: 0, color: "#8b949e", textTransform: "capitalize" }}>
                                    {type}s
                                </p>
                            </div>
                        ))
                    ) : (
                        <p style={{ fontSize: "20px", color: "#8b949e", margin: 0 }}>
                            No contributions yet - be the first! 🚀
                        </p>
                    )}
                </div>



                {/* Footer */}
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
                    Made with ReadmeHub • README Editing Made Easy 🎃
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    )
}