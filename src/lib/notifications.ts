import { createClient } from '@/lib/supabase/server'

interface CreateNotificationParams {
    userId: string
    type: 'message' | 'grade' | 'alert' | 'risk'
    title: string
    body?: string
    metadata?: Record<string, unknown>
}

export async function createNotification(params: CreateNotificationParams) {
    const supabase = await createClient()

    const { error } = await supabase.from('notifications').insert({
        user_id: params.userId,
        type: params.type,
        title: params.title,
        body: params.body ?? null,
        metadata: params.metadata ?? {},
    })

    if (error) {
        console.error('[createNotification] error:', error.message)
    }
}

