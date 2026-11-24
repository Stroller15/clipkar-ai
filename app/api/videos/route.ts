import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getDb } from "@/config/db";
import { videoDataSchema } from "@/config/db/schema";
import { requireEmail } from "@/lib/auth";
import type { Caption, StoryElement } from "@/types";

// GET /api/videos — the signed-in user's shorts, newest first
export async function GET() {
  const auth = await requireEmail();
  if ("error" in auth) return auth.error;

  const rows = await getDb()
    .select()
    .from(videoDataSchema)
    .where(eq(videoDataSchema.createdBy, auth.email))
    .orderBy(desc(videoDataSchema.id));

  return NextResponse.json({ result: rows });
}

const isStringArray = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every((x) => typeof x === "string");

// POST /api/videos — save a generated short for the signed-in user
export async function POST(req: Request) {
  const auth = await requireEmail();
  if ("error" in auth) return auth.error;

  let body: {
    videoScript?: StoryElement[];
    audioFileURL?: string;
    captionFile?: Caption[];
    imageList?: string[];
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { videoScript, audioFileURL, captionFile, imageList = [] } = body;
  if (
    !Array.isArray(videoScript) ||
    videoScript.length === 0 ||
    typeof audioFileURL !== "string" ||
    !audioFileURL ||
    !Array.isArray(captionFile) ||
    !isStringArray(imageList)
  ) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const [row] = await getDb()
    .insert(videoDataSchema)
    .values({
      videoScript,
      audioFileURL,
      captionFile,
      imageList,
      // Owner always comes from the session, never from the request body
      createdBy: auth.email,
    })
    .returning({ id: videoDataSchema.id });

  return NextResponse.json({ result: row }, { status: 201 });
}
