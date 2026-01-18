import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const message = body;

    await new Promise((resolve) => setTimeout(resolve, 600));

    return NextResponse.json({
        reply: `Entendi sua mensagem: "${message.content}". No momento, estou apenas simulando uma resposta.`
    });
}