import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// PATCH /api/notifications/:id/read — пометить ОДНО прочитанным
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }

    const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id)
        .eq('user_id', user.id) // защита — только своё уведомление

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return new NextResponse(null, { status: 204 })
}