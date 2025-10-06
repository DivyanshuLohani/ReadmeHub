import { NextRequest, NextResponse } from "next/server";
import { generateReadme } from "@/lib/readme";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const { description } = await req.json();

    if (!description) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    const readmeContent = await generateReadme(name, description);

    return NextResponse.json({ readme: readmeContent });
  } catch (error) {
    console.error("Error generating README:", error);
    return NextResponse.json(
      { error: "Failed to generate README" },
      { status: 500 }
    );
  }
}
