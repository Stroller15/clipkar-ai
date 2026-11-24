import textToSpeech, { protos } from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import { uploadFile } from "@/config/storage";
import { fail, readJson } from "@/lib/http";

export const maxDuration = 60;

// Google Text-to-Speech accepts at most 5000 bytes of input per request
const MAX_BYTES = 5000;

let client: InstanceType<typeof textToSpeech.TextToSpeechClient> | undefined;
const getClient = () =>
  (client ??= new textToSpeech.TextToSpeechClient({ apiKey: process.env.TTS_API_KEY }));

export async function POST(req: Request) {
  const body = await readJson<{ text?: unknown }>(req);
  const text = typeof body?.text === "string" ? body.text.trim() : "";
  if (!text) return fail(400, "`text` cannot be empty");
  if (Buffer.byteLength(text, "utf8") > MAX_BYTES) {
    return fail(400, `\`text\` must be under ${MAX_BYTES} bytes`);
  }
  if (!process.env.TTS_API_KEY) return fail(500, "TTS_API_KEY is not set");

  const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
    input: { text },
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  };

  try {
    const [response] = await getClient().synthesizeSpeech(request);
    if (!response.audioContent) return fail(502, "Text-to-Speech returned no audio");

    const url = await uploadFile(Buffer.from(response.audioContent as Uint8Array), {
      extension: "mp3",
      contentType: "audio/mpeg",
    });
    return NextResponse.json({ result: url });
  } catch (err) {
    return fail(502, "Voiceover generation failed", err);
  }
}
