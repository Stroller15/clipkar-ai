import { NextResponse } from "next/server";

/** JSON error with a real HTTP status, so clients' error handling actually fires. */
export function fail(status: number, error: string, cause?: unknown) {
  if (cause !== undefined) console.error(error, cause);
  return NextResponse.json({ error }, { status });
}

export async function readJson<T>(req: Request): Promise<T | null> {
  try {
    return (await req.json()) as T;
  } catch {
    return null;
  }
}
