import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reply = `Recebi sua mensagem: "${message}". Esta resposta está sendo enviada em streaming, como um copiloto real faria.`;

      const words = reply.split(' ');

      for (const word of words) {
        controller.enqueue(encoder.encode(word + ' '));
        await new Promise((r) => setTimeout(r, 120));
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
