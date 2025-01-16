import Replicate from "replicate";
import { writeFile } from "node:fs/promises";

export async function POST() {
  try {
    const replicate = new Replicate();

    const input = {};

    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      { input }
    );

 
    for (const [index, item] of Object.entries(output)) {
      await writeFile(`output_${index}.png`, item);
    }
    //=> output_0.png written to disk
  } catch (error) {}
}
