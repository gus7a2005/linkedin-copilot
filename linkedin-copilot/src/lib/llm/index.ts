import { openAIStream } from "./openai";
import { LLMStreamResponse } from "./types";

export async function getLLMResponse(message: string) : Promise<LLMStreamResponse> {
    return openAIStream(message);
}