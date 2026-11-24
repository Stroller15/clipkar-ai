import "server-only";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/** The signed-in user's primary email, or a 401 response to return as-is. */
export async function requireEmail(): Promise<
  { email: string; user: NonNullable<Awaited<ReturnType<typeof currentUser>>> } | { error: NextResponse }
> {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!user || !email) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { email, user };
}
