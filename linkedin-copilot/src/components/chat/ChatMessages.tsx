import { ChatMessage } from "@/types/chat";
import MessageBubble from "./MessageBubble";


interface Props {
    messages: ChatMessage[];
} 

export default function ChatMessages({ messages }: Props) {
    return (
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
            ))}
        </div>
    )
}