import { useState, useCallback } from 'react'
import { usePolling } from './usePolling'
import type { Notification } from '@/types/messaging'

export function useNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [unreadCount, setUnreadCount]     = useState(0)
    const [isLoading, setIsLoading]         = useState(true)

    const fetchNotifications = useCallback(async () => {
        try {
            const res = await fetch('/api/notifications')

            if (!res.ok) {
                setNotifications([])
                setUnreadCount(0)
                return
            }

            const data = await res.json()

            if (Array.isArray(data)) {
                setNotifications(data)
                setUnreadCount(data.filter((n: Notification) => !n.is_read).length)
            }
        } catch {
            setNotifications([])
            setUnreadCount(0)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Polling каждые 15 секунд — достаточно для бейджа
    usePolling(fetchNotifications, 15000)

    // Пометить все прочитанными
    const markAllRead = useCallback(async () => {
        // Оптимистично сбрасываем счётчик
        setUnreadCount(0)
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))

        await fetch('/api/notifications', { method: 'PATCH' })
    }, [])

    // Пометить одно прочитанным
    const markOneRead = useCallback(async (id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, is_read: true } : n)
        )
        setUnreadCount(prev => Math.max(0, prev - 1))

        await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' })
    }, [])

    return {
        notifications,
        unreadCount,
        isLoading,
        markAllRead,
        markOneRead,
    }
}
