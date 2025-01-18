import textToSpeech, { protos } from "@google-cloud/text-to-speech";
import { storage } from "@/config/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";

const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.TTS_API_KEY,
});

export async function POST(req: Request) {
  const { text, id } = await req.json();

  if (!text || text.trim().length === 0) {
    return new Response(
      JSON.stringify({ error: "Text input cannot be empty." }),
      { status: 400 }
    );
  }

  const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest =
    {
      input: { text },
      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
      audioConfig: { audioEncoding: "MP3" },
    };

  try {
    const [response] = await client.synthesizeSpeech(request);

    if (!response.audioContent) {
      return new Response(
        JSON.stringify({ error: "Failed to generate audio content." }),
        { status: 500 }
      );
    }

    const storageRef = ref(storage, `clipkar-ai-short-video-files/${id}.mp3`);

    const audioBuffer = Buffer.from(response.audioContent as Uint8Array);
    await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });
    const downloadURL = await getDownloadURL(storageRef);

    return NextResponse.json({ success: true, result: downloadURL });

  } catch (error) {
    console.error("Error generating audio:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request.",
      }),
      { status: 500 }
    );
  }
}
