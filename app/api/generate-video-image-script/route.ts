import { NextResponse } from "next/server";
import { createScriptSession } from "@/config/AiModel";
import { fail, readJson } from "@/lib/http";
import type { StoryElement } from "@/types";

export const maxDuration = 60;

function parseScenes(text: string): StoryElement[] | null {
  // Models sometimes wrap JSON in ``` fences even in JSON mode
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  try {
    const data = JSON.parse(cleaned);
    const scenes = Array.isArray(data) ? data : data?.scenes;
    if (!Array.isArray(scenes) || scenes.length === 0) return null;
    const valid = scenes.every(
      (s) => typeof s?.imagePrompt === "string" && typeof s?.contentText === "string"
    );
    return valid ? scenes : null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const body = await readJson<{ prompt?: unknown }>(req);
  const prompt = body?.prompt;
  if (typeof prompt !== "string" || !prompt.trim() || prompt.length > 4000) {
    return fail(400, "`prompt` must be a non-empty string under 4000 characters");
  }

  let text: string;
  try {
    const result = await createScriptSession().sendMessage(prompt);
    text = result.response.text();
  } catch (err) {
    return fail(502, "Script generation failed", err);
  }

  const scenes = parseScenes(text);
  if (!scenes) return fail(502, "The model returned a script in an unexpected format", text);

  return NextResponse.json({ result: { scenes } });
}
