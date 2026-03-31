import { useState, useCallback, useRef } from 'react'
import { usePolling } from './usePolling'
import type { Message } from '@/types/messaging'

export function useMessages(conversationId: string) {
    const [messages, setMessages]   = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [hasMore, setHasMore]     = useState(true) // есть ли ещё сообщения выше
    const isFetching                = useRef(false)

    // Загрузка свежих сообщений (polling)
    const fetchMessages = useCallback(async () => {
        if (isFetching.current) return
        isFetching.current = true

        try {
            const res  = await fetch(`/api/conversations/${conversationId}/messages`)
            const data = await res.json()

            if (Array.isArray(data)) {
                setMessages(data)
            }
        } finally {
            isFetching.current = false
            setIsLoading(false)
        }
    }, [conversationId])

    // Загрузка старых сообщений — пагинация вверх
    const loadMore = useCallback(async () => {
        if (!hasMore || messages.length === 0) return

        const oldest = messages[0].created_at
        const res    = await fetch(
            `/api/conversations/${conversationId}/messages?cursor=${oldest}`
        )
        const older = await res.json()

        if (!Array.isArray(older) || older.length === 0) {
            setHasMore(false)
            return
        }

        // Добавляем в начало без дублей
        setMessages(prev => {
            const existingIds = new Set(prev.map(m => m.id))
            const unique      = older.filter((m: Message) => !existingIds.has(m.id))
            return [...unique, ...prev]
        })

        if (older.length < 30) setHasMore(false)
    }, [conversationId, messages, hasMore])

    // Polling каждые 5 секунд пока открыт чат
    usePolling(fetchMessages, 5000)

    // Пометить прочитанным при открытии
    useCallback(() => {
        fetch(`/api/conversations/${conversationId}/read`, { method: 'POST' })
    }, [conversationId])

    // Отправка с оптимистичным обновлением
    const sendMessage = useCallback(async (content: string) => {
        const trimmed = content.trim()
        if (!trimmed) return

        // Сразу показываем сообщение не дожидаясь сервера
        const optimistic: Message = {
            id:              `pending-${Date.now()}`,
            conversation_id: conversationId,
            sender_id:       'me',
            sender_name:     'Вы',
            sender_role:     '',
            content:         trimmed,
            created_at:      new Date().toISOString(),
            _pending:        true,
        }
        setMessages(prev => [...prev, optimistic])

        const res = await fetch(
            `/api/conversations/${conversationId}/messages`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: trimmed }),
            }
        )

        if (res.ok) {
            // Заменяем оптимистичное на реальное
            const real = await res.json()
            setMessages(prev =>
                prev.map(m => m.id === optimistic.id ? real : m)
            )
        } else {
            // Убираем оптимистичное если ошибка
            setMessages(prev => prev.filter(m => m.id !== optimistic.id))
        }
    }, [conversationId])

    return { messages, isLoading, hasMore, loadMore, sendMessage }
}