import Replicate from "replicate";
import { NextResponse } from "next/server";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import axios from "axios";
import { storage } from "@/config/Firebase";

type ReplicateOutput = string[];

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    console.log("Prompt:", prompt);

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });

    const input = {
      prompt: prompt,
      height: 1280,
      width: 1024,
      num_outputs: 1,
      scheduler: "K_EULER",
      guidance_scale: 0,
      num_inference_steps: 4,
    };

    const response: ReplicateOutput = (await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      { input }
    )) as ReplicateOutput;

    if (!response || response.length === 0) {
      throw new Error("No image URL found in the Replicate API response.");
    }

    const base64Image =
      "data:image/png;base64," + (await generateImageInBase64(response[0]));

    const fileName = "clipkar-ai-short-video-files/" + Date.now() + ".png";
    const storageRef = ref(storage, fileName);
    await uploadString(storageRef, base64Image, "data_url");

    const downloadURL = await getDownloadURL(storageRef);
    console.log("Download URL:", downloadURL);

    return NextResponse.json({ result: downloadURL });
  } catch (err) {
    console.error("Error during processing:", err);
    return NextResponse.json({
      error: "Something went wrong",
      err: err instanceof Error ? err.message : "Unknown error",
    });
  }
}

const generateImageInBase64 = async (imageURL: string): Promise<string> => {
  try {
    const res = await axios.get(imageURL, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(res.data).toString("base64");
    return base64Image;
  } catch (err) {
    console.log("Error generating base64 image:", err);
    throw err;
  }
};
