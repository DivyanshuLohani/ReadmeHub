import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name: repoName } = await params;

  try {
    const updatedRepo = await prisma.repository.update({
      where: { name: repoName },
      data: {
        stars: {
          increment: 1,
        },
      },
    });
    return NextResponse.json(updatedRepo);
  } catch (error) {
    console.error("Error starring repository:", error);
    return NextResponse.json(
      { error: "Failed to star repository" },
      { status: 500 }
    );
  }
}
