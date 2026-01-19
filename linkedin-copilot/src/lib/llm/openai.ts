import { LLMStreamResponse } from "./types";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function openAIStream(
  userMessage: string,
): Promise<LLMStreamResponse> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: userMessage }],
    stream: true,
  });

  async function* streamGenerator() {
    for await (const chunk of response) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) yield content;
    }
  }

  return { stream: streamGenerator() };
}
