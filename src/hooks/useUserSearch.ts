import { useCallback, useEffect, useState } from 'react'
import type { UserRole } from '@/context/AuthContext'
import type { SearchUser } from '@/types/messaging'

export function useUserSearch(roles: UserRole[], enabled = true) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchUser[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchUsers = useCallback(
        async (nextQuery: string) => {
            if (!enabled) {
                setResults([])
                return
            }

            setIsLoading(true)
            setError(null)

            try {
                const params = new URLSearchParams()
                params.set('roles', roles.join(','))
                if (nextQuery.trim()) {
                    params.set('q', nextQuery.trim())
                }

                const res = await fetch(`/api/users/search?${params.toString()}`)
                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data?.error ?? 'Failed to search users')
                }

                setResults(Array.isArray(data) ? data : [])
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to search users')
                setResults([])
            } finally {
                setIsLoading(false)
            }
        },
        [enabled, roles]
    )

    useEffect(() => {
        const timer = setTimeout(() => {
            void fetchUsers(query)
        }, 250)

        return () => clearTimeout(timer)
    }, [fetchUsers, query])

    return {
        query,
        setQuery,
        results,
        isLoading,
        error,
        refresh: () => fetchUsers(query),
    }
}
