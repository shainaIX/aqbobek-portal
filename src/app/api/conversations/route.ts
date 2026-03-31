import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/conversations — список диалогов текущего пользователя
export async function GET() {
    const supabase = await createClient()

    // Получаем текущего пользователя
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Находим все диалоги где участвует пользователь
    const { data: participations, error: partError } = await supabase
        .from('conversation_participants')
        .select('conversation_id, last_read_at')
        .eq('user_id', user.id)

    if (partError) {
        return NextResponse.json({ error: partError.message }, { status: 500 })
    }

    if (!participations?.length) {
        return NextResponse.json([])
    }

    const conversationIds = participations.map(p => p.conversation_id)

    // Для каждого диалога получаем собеседника и последнее сообщение
    const { data: conversations, error: convError } = await supabase
        .from('conversations')
        .select(`
      id,
      created_at,
      conversation_participants (
        user_id,
        last_read_at
      )
    `)
        .in('id', conversationIds)
        .order('created_at', { ascending: false })

    if (convError) {
        return NextResponse.json({ error: convError.message }, { status: 500 })
    }

    // Для каждого диалога получаем данные собеседника и последнее сообщение
    const enriched = await Promise.all(
        (conversations ?? []).map(async (conv) => {
            // Находим участника который НЕ текущий пользователь
            const partnerParticipant = conv.conversation_participants.find(
                (p: any) => p.user_id !== user.id
            )

            if (!partnerParticipant) return null

            // Получаем профиль собеседника
            const { data: partner } = await supabase
                .from('profiles') // ← таблица профилей (см. ниже)
                .select('id, name, role, avatar_url')
                .eq('id', partnerParticipant.user_id)
                .single()

            // Получаем последнее сообщение
            const { data: lastMsg } = await supabase
                .from('messages')
                .select('content, created_at, sender_id')
                .eq('conversation_id', conv.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .single()

            // Считаем непрочитанные
            const myParticipation = participations.find(
                p => p.conversation_id === conv.id
            )
            const lastReadAt = myParticipation?.last_read_at ?? '1970-01-01'

            const { count: unreadCount } = await supabase
                .from('messages')
                .select('*', { count: 'exact', head: true })
                .eq('conversation_id', conv.id)
                .neq('sender_id', user.id)
                .gt('created_at', lastReadAt)

            return {
                id: conv.id,
                created_at: conv.created_at,
                partner_id: partner?.id ?? null,
                partner_name: partner?.name ?? 'Неизвестный',
                partner_role: partner?.role ?? null,
                partner_avatar: partner?.avatar_url ?? null,
                last_message: lastMsg ?? null,
                unread_count: unreadCount ?? 0,
            }
        })
    )

    // Убираем null и сортируем по последнему сообщению
    const result = enriched
        .filter(Boolean)
        .sort((a, b) => {
            const aTime = a?.last_message?.created_at ?? a?.created_at ?? ''
            const bTime = b?.last_message?.created_at ?? b?.created_at ?? ''
            return bTime.localeCompare(aTime)
        })

    return NextResponse.json(result)
}

// POST /api/conversations — найти существующий или создать новый диалог
export async function POST(req: Request) {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { recipientId } = await req.json()

    if (!recipientId) {
        return NextResponse.json({ error: 'recipientId is required' }, { status: 400 })
    }

    if (recipientId === user.id) {
        return NextResponse.json({ error: 'Cannot message yourself' }, { status: 400 })
    }

    // Ищем существующий диалог между этими двумя
    const { data: myConvs } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', user.id)

    const { data: theirConvs } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', recipientId)

    const myIds = myConvs?.map(c => c.conversation_id) ?? []
    const theirIds = theirConvs?.map(c => c.conversation_id) ?? []
    const shared = myIds.find(id => theirIds.includes(id))

    if (shared) {
        return NextResponse.json({ id: shared, existing: true })
    }

    // Создаём новый диалог
    const { data: conv, error: convError } = await supabase
        .from('conversations')
        .insert({})
        .select()
        .single()

    if (convError) {
        return NextResponse.json({ error: convError.message }, { status: 500 })
    }

    // Добавляем обоих участников
    const { error: partError } = await supabase
        .from('conversation_participants')
        .insert([
            { conversation_id: conv.id, user_id: user.id },
            { conversation_id: conv.id, user_id: recipientId },
        ])

    if (partError) {
        return NextResponse.json({ error: partError.message }, { status: 500 })
    }

    return NextResponse.json({ id: conv.id, existing: false }, { status: 201 })
}