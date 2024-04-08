// translate with OpenAI
import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { text } = await request.json();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant and you are here to help the user translate text to Arabic what ever the user types in the editor.",
      },
      {
        role: "user",
        content: text,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  return NextResponse.json({ response }, { status: 200 });
}
