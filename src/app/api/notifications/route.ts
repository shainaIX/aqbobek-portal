import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/notifications?unread_only=true
export async function GET(req: Request) {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }

    const url = new URL(req.url)
    const unreadOnly = url.searchParams.get('unread_only') === 'true'

    let query = supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50)

    if (unreadOnly) {
        query = query.eq('is_read', false)
    }

    const { data, error } = await query

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data ?? [])
}

// PATCH /api/notifications — пометить ВСЕ прочитанными
export async function PATCH() {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }

    const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return new NextResponse(null, { status: 204 })
}