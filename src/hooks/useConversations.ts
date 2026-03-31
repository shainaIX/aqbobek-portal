import { useState, useCallback } from 'react'
import { usePolling } from './usePolling'
import type { Conversation } from '@/types/messaging'

export function useConversations() {
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [isLoading, setIsLoading]         = useState(true)

    const fetchConversations = useCallback(async () => {
        const res  = await fetch('/api/conversations')
        const data = await res.json()

        if (Array.isArray(data)) {
            setConversations(data)
        }

        setIsLoading(false)
    }, [])

    // Polling каждые 10 секунд — список диалогов меняется реже
    usePolling(fetchConversations, 10000)

    // Найти или создать диалог с пользователем
    const startConversation = useCallback(async (recipientId: string) => {
        const res  = await fetch('/api/conversations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipientId }),
        })
        const data = await res.json()
        return data.id as string // возвращаем conversation_id для редиректа
    }, [])

    return { conversations, isLoading, startConversation }
}