import Replicate from "replicate";
import { NextResponse } from "next/server";
import { uploadFile } from "@/config/storage";
import { fail, readJson } from "@/lib/http";

export const maxDuration = 60;

const MODEL =
  "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637";

export async function POST(req: Request) {
  const body = await readJson<{ prompt?: unknown }>(req);
  const prompt = body?.prompt;
  if (typeof prompt !== "string" || !prompt.trim() || prompt.length > 2000) {
    return fail(400, "`prompt` must be a non-empty string under 2000 characters");
  }

  const auth = process.env.REPLICATE_API_KEY;
  if (!auth) return fail(500, "REPLICATE_API_KEY is not set");

  try {
    const output = (await new Replicate({ auth }).run(MODEL, {
      input: {
        prompt,
        height: 1280,
        width: 1024,
        num_outputs: 1,
        scheduler: "K_EULER",
        guidance_scale: 0,
        num_inference_steps: 4,
      },
    })) as unknown[];

    // Older SDKs return URL strings, newer ones return FileOutput objects
    const imageUrl = output?.[0] ? String(output[0]) : "";
    if (!imageUrl) return fail(502, "Replicate returned no image");

    const res = await fetch(imageUrl);
    if (!res.ok) return fail(502, `Couldn't download the generated image (${res.status})`);

    const url = await uploadFile(Buffer.from(await res.arrayBuffer()), {
      extension: "png",
      contentType: res.headers.get("content-type") ?? "image/png",
    });
    return NextResponse.json({ result: url });
  } catch (err) {
    return fail(502, "Image generation failed", err);
  }
}
