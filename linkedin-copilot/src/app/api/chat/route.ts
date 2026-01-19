export const runtime = 'edge';

import { NextRequest } from 'next/server';
import { getLLMResponse } from '@/lib/llm';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const { stream } = await getLLMResponse(message);

  const encoder = new TextEncoder();

  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
