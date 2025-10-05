import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const quoteRes = await fetch("https://zenquotes.io/api/random");
  const quoteData = await quoteRes.json();
  const quote = quoteData[0].q + " - " + quoteData[0].a;
  return NextResponse.json({ q: quote });
}
