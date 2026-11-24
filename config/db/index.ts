import "server-only";
import { drizzle } from "drizzle-orm/neon-http";

// Server-only: never import this from a client component.
// Created lazily so builds don't need DATABASE_URL.
let instance: ReturnType<typeof drizzle> | undefined;

export function getDb() {
  if (!instance) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    instance = drizzle(url);
  }
  return instance;
}
