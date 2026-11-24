import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";
import { fail, readJson } from "@/lib/http";

// Vercel Hobby caps functions at 60s. AssemblyAI gets 50s of it, so a slow
// transcription returns a clean 504 instead of the function being killed.
export const maxDuration = 60;
const POLLING_TIMEOUT_MS = 50_000;

// Only transcribe audio this app uploaded, so the route can't be used
// to run arbitrary URLs through your AssemblyAI account
const ALLOWED_HOST = "firebasestorage.googleapis.com";

export async function POST(req: Request) {
  const body = await readJson<{ audioFileURL?: unknown }>(req);
  const raw = body?.audioFileURL;

  let url: URL;
  try {
    url = new URL(typeof raw === "string" ? raw : "");
  } catch {
    return fail(400, "`audioFileURL` must be a valid URL");
  }
  if (url.protocol !== "https:" || url.hostname !== ALLOWED_HOST) {
    return fail(400, "`audioFileURL` must point to this app's storage");
  }

  const apiKey = process.env.ASSEMBLY_AI_API_KEY;
  if (!apiKey) return fail(500, "ASSEMBLY_AI_API_KEY is not set");

  try {
    const transcript = await new AssemblyAI({ apiKey }).transcripts.transcribe(
      { audio: url.toString() },
      { pollingInterval: 1500, pollingTimeout: POLLING_TIMEOUT_MS }
    );
    if (transcript.status === "error" || !transcript.words?.length) {
      return fail(502, "Caption generation failed", transcript.error ?? "No words returned");
    }
    return NextResponse.json({ result: transcript.words });
  } catch (err) {
    if (err instanceof Error && /timeout/i.test(err.message)) {
      return fail(504, "Captions took too long. Try a shorter video.", err);
    }
    return fail(502, "Caption generation failed", err);
  }
}
