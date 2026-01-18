"use client";

import { useState } from "react";
import { ChatMessage } from "@/types/chat";
import { sendChatMessageStream } from "@/lib/api/chat";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Olá! Sou seu copiloto para LinkedIn. Como posso ajudar?",
      createdAt: new Date(),
    },
  ]);

  async function handleSendMessage(text: string) {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: new Date(),
    };

    const botMessageId = crypto.randomUUID();

    const botMessage: ChatMessage = {
      id: botMessageId,
      role: "assistant",
      content: "",
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);

    try {
      await sendChatMessageStream(text, (chunk) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, content: msg.content + chunk }
              : msg,
          ),
        );
      });
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, content: "⚠️ Erro ao receber resposta." }
            : msg,
        ),
      );
    }
  }

  return (
    <div className="flex h-[90vh] w-full max-w-3xl flex-col rounded-xl border border-zinc-800 bg-zinc-900 shadow-lg">
      <header className="border-b border-zinc-800 p-4 text-sm font-medium">
        LinkedIn Copilot
      </header>

      <ChatMessages messages={messages} />

      <ChatInput onSend={handleSendMessage} />
    </div>
  );
}
