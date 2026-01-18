import { IntentPayload } from "@/lib/intents/types";

export type ChatRole = 'user' | 'assistant'

export interface ChatMessage {
    id: string,
    role: ChatRole,
    content: string,
    createdAt: Date,
    intent?: IntentPayload,
}