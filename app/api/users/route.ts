import { db } from "@/config/db";
import { users } from "@/config/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, name, imageUrl } = await req.json();
  
  // Check if user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .execute();

  if (existingUser.length === 0) {
    // Insert new user
    await db
      .insert(users)
      .values({
        email,
        name,
        imageUrl,
      })
      .execute();
  }

  return NextResponse.json({ message: "User registered successfully" }, { status: 200 });
}
