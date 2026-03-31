import { useEffect, useRef } from 'react'

// Базовый хук — вызывает fn каждые intervalMs миллисекунд
export function usePolling(
    fn: () => void,
    intervalMs = 5000,
    enabled = true
) {
    const savedFn = useRef(fn)

    // Всегда держим актуальную версию функции
    useEffect(() => {
        savedFn.current = fn
    }, [fn])

    useEffect(() => {
        if (!enabled) return

        // Сразу вызываем при монтировании
        savedFn.current()

        const id = setInterval(() => savedFn.current(), intervalMs)
        return () => clearInterval(id)
    }, [intervalMs, enabled])
}