export interface LLMStreamResponse {
    stream: AsyncIterable<string>;
}