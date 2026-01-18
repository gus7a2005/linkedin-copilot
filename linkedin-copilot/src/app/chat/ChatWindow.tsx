'use client'

import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";
import { sendChatMessage } from "@/lib/api/chat";
import { ChatMessage } from "@/types/chat"
import { useState } from "react"


export default function ChatWindow() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: 'Olá! Eu sou o seu copiloto para o LinkedIn. Como posso te ajudar?',
            createdAt: new Date()
        },
    ]);

    async function handleSendMessage(text: string) {
        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'user', 
            content: text,
            createdAt: new Date()
        };


    setMessages((prev) => [...prev, userMessage]);

    try {
        const { reply } = await sendChatMessage(text);

        const botMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: reply,
            createdAt: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.',
                createdAt: new Date(),
            };

            setMessages((prev) => [...prev, errorMessage]);
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
    )

}