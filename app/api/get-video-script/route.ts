import { chatSession } from "@/config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const {prompt} = await req.json();

        const result = await chatSession.sendMessage(prompt);
        
        return NextResponse.json({
          result: JSON.parse(result.response.text()),
        });
    }catch(err) {
        console.log(err);
        return NextResponse.json({
            error: "Something went wrong",
            err
        });
    }
}