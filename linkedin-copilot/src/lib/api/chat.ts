export async function sendChatMessage(message: string) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: message })
    });

    if(!response.ok) {
        throw new Error('Erro ao enviar mensagem');
    }

    return response.json() as Promise<{reply: string}>;
}