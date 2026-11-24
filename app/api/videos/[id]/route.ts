import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/config/db";
import { videoDataSchema } from "@/config/db/schema";
import { requireEmail } from "@/lib/auth";

// GET /api/videos/:id — one short, only if it belongs to the signed-in user
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireEmail();
  if ("error" in auth) return auth.error;

  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const [row] = await getDb()
    .select()
    .from(videoDataSchema)
    .where(and(eq(videoDataSchema.id, id), eq(videoDataSchema.createdBy, auth.email)));

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ result: row });
}
