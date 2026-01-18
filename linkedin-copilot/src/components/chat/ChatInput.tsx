'use client'

import { KeyboardEvent, useState } from "react";

interface Props {
    onSend: (text: string) => void;
}

export default function ChatInput({ onSend }: Props) {
    const [value, setValue] = useState('');

    function handleSend () {
        if (!value.trim()) return;
        onSend(value);
        setValue('');
    }

    function handleKeyDown (e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleSend();
        }
    }

    return (
        <div className="border-t border-zinc-800 p-4">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua mensagem..."
                className="w-full rounded-lg bg-zinc-800 px-4 py-2 text-sm text-white outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-600"
            />
        </div>
    )
}