import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// POST /api/conversations/:id/read — пометить диалог прочитанным
export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase
        .from('conversation_participants')
        .update({ last_read_at: new Date().toISOString() })
        .eq('conversation_id', params.id)
        .eq('user_id', user.id)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return new NextResponse(null, { status: 204 })
}