import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLY_AI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { audioFileURL } = await req.json();
    const FILE_URL = audioFileURL;

    const data = {
      audio: FILE_URL,
    };

    const transcript = await client.transcripts.transcribe(data);
    console.log(transcript.words);
    return NextResponse.json({ success: true, result: transcript.words });

  } catch (err) {
    console.error("Error during processing:", err);
    return NextResponse.json({
      error: "Something went wrong",
      err: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
