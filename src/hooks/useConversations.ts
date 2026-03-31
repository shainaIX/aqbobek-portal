import { useState, useCallback } from 'react'
import { usePolling } from './usePolling'
import type { Conversation } from '@/types/messaging'

export function useConversations() {
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchConversations = useCallback(async () => {
        try {
            const res = await fetch('/api/conversations')
            const data = await res.json()

            if (res.ok && Array.isArray(data)) {
                setConversations(data)
            }
        } finally {
            setIsLoading(false)
        }
    }, [])

    usePolling(fetchConversations, 10000)

    const startConversation = useCallback(
        async (recipientId: string) => {
            const res = await fetch('/api/conversations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipientId }),
            })

            const data = await res.json()

            if (!res.ok || typeof data?.id !== 'string') {
                throw new Error(data?.error ?? 'Failed to start conversation')
            }

            await fetchConversations()
            return data.id as string
        },
        [fetchConversations]
    )

    return {
        conversations,
        isLoading,
        refreshConversations: fetchConversations,
        startConversation,
    }
}
