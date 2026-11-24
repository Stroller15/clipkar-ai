import "server-only";
import { randomUUID } from "node:crypto";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

/**
 * Server-side Firebase Storage via the Admin SDK. Uploads don't depend on
 * Storage security rules, so the bucket can deny all client access.
 *
 * FIREBASE_SERVICE_ACCOUNT: the service-account JSON (raw or base64)
 * FIREBASE_STORAGE_BUCKET:  e.g. my-project.firebasestorage.app
 */
function getApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  const bucket = process.env.FIREBASE_STORAGE_BUCKET;
  if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT is not set");
  if (!bucket) throw new Error("FIREBASE_STORAGE_BUCKET is not set");

  const json = raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
  return initializeApp({ credential: cert(JSON.parse(json)), storageBucket: bucket });
}

const FOLDER = "clipkar-ai-short-video-files";

/**
 * Upload a file and return a token download URL. The token URL works for
 * Remotion and AssemblyAI without opening the bucket to the public.
 */
export async function uploadFile(
  data: Buffer,
  { extension, contentType }: { extension: string; contentType: string }
): Promise<string> {
  const bucket = getStorage(getApp()).bucket();
  const path = `${FOLDER}/${randomUUID()}.${extension}`;
  const token = randomUUID();

  await bucket.file(path).save(data, {
    resumable: false,
    contentType,
    metadata: { metadata: { firebaseStorageDownloadTokens: token } },
  });

  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
    path
  )}?alt=media&token=${token}`;
}
