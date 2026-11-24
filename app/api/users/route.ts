import { getDb } from "@/config/db";
import { users } from "@/config/db/schema";
import { requireEmail } from "@/lib/auth";
import { NextResponse } from "next/server";

// POST /api/users — make sure the signed-in Clerk user has a row.
// Identity comes from the session, not the request body.
export async function POST() {
  const auth = await requireEmail();
  if ("error" in auth) return auth.error;

  await getDb()
    .insert(users)
    .values({
      email: auth.email,
      name: auth.user.fullName ?? auth.user.username ?? auth.email,
      imageUrl: auth.user.imageUrl,
    })
    .onConflictDoNothing({ target: users.email });

  return NextResponse.json({ ok: true });
}
