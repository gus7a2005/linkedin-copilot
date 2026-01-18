export async function sendChatMessageStream(
  message: string,
  onChunk: (chunk: string) => void
) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
    cache: 'no-store',
  });

  if (!response.body) {
    console.error('Response body é null');
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      onChunk(decoder.decode(value, { stream: true }));
    }
  } catch (err) {
    console.error('Erro durante streaming:', err);
  } finally {
    reader.releaseLock();
  }
}
