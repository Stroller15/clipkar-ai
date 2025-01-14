import { chatSession } from "@/config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({
        error: "Invalid input. `prompt` is required and must be a string.",
      });
    }
    const result = await chatSession.sendMessage(prompt);


    return NextResponse.json({
      result: JSON.parse(result.response.text()), 
    });
  } catch (err) {
    console.error("Error during processing:", err);
    return NextResponse.json({
      error: "Something went wrong",
      err: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
