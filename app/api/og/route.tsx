import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "#0d1117",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    fontFamily: "sans-serif",
                }}
            >
                {/* Decorative Circles */}
                <div
                    style={{
                        position: "absolute",
                        top: "40px",
                        left: "80px",
                        width: "140px",
                        height: "140px",
                        borderRadius: "50%",
                        backgroundColor: "#FF6B35",
                        opacity: 0.15,
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "60px",
                        right: "100px",
                        width: "180px",
                        height: "180px",
                        borderRadius: "50%",
                        backgroundColor: "#9C4668",
                        opacity: 0.15,
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "160px",
                        right: "40px",
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        backgroundColor: "#183D5D",
                        opacity: 0.15,
                    }}
                />

                {/* Hacktoberfest Badge */}
                <div
                    style={{
                        backgroundColor: "#183D5D",
                        color: "#FF6B35",
                        padding: "8px 20px",
                        borderRadius: "20px",
                        fontSize: "28px",
                        fontWeight: "700",
                        letterSpacing: "0.1em",
                        border: "3px solid #FF6B35",
                        marginBottom: "40px",
                    }}
                >
                    🎃 HACKTOBERFEST 2025 🎃
                </div>

                {/* Title */}
                <h1
                    style={{
                        fontSize: "96px",
                        fontWeight: "800",
                        margin: "0 0 20px 0",
                        color: "white",
                        letterSpacing: "-0.03em",
                    }}
                >
                    ReadmeHub
                </h1>

                {/* Subtitle */}
                <p
                    style={{
                        fontSize: "36px",
                        fontWeight: "600",
                        margin: 0,
                        backgroundImage: "linear-gradient(to right, #FF6B35, #a855f7, #FF6B35)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                    }}
                >
                    The Ultimate README Contribution Platform
                </p>

                {/* Tagline */}
                <p
                    style={{
                        fontSize: "26px",
                        marginTop: "40px",
                        color: "#8b949e",
                        fontWeight: "500",
                        maxWidth: "900px",
                        textAlign: "center",
                        lineHeight: 1.5,
                    }}
                >
                    Fix typos, add emojis 🚀, sprinkle quotes 💬, and earn badges.
                    Look productive this Hacktoberfest—no real code required! 😂
                </p>

                {/* Footer */}
                <p
                    style={{
                        fontSize: "20px",
                        color: "#666",
                        marginTop: "60px",
                        fontWeight: "600",
                    }}
                >
                    🎃 Where Every Typo Fix Counts 🏆
                </p>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
