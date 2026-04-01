import { createClient } from '@/lib/supabase/server'
import { adminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }

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

    const { data: conversations, error: convError } = await adminClient
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

    const partnerIdMap = new Map<string, string>()
    for (const conv of conversations ?? []) {
        const partner = conv.conversation_participants.find(
            (p: { user_id: string }) => p.user_id !== user.id
        )
        if (partner) {
            partnerIdMap.set(conv.id, partner.user_id)
        }
    }

    const partnerIds = [...new Set(partnerIdMap.values())]

    const { data: profiles } = partnerIds.length
        ? await adminClient
            .from('profiles')
            .select('id, name, role, avatar_url')
            .in('id', partnerIds)
        : { data: [] }

    const profileMap = new Map(
        (profiles ?? []).map(p => [p.id, p])
    )

    const { data: recentMessages } = await adminClient
        .from('messages')
        .select('conversation_id, content, created_at, sender_id')
        .in('conversation_id', conversationIds)
        .order('created_at', { ascending: false })

    const lastMessageMap = new Map<string, typeof recentMessages extends (infer T)[] | null ? T : never>()
    for (const msg of recentMessages ?? []) {
        if (!lastMessageMap.has(msg.conversation_id)) {
            lastMessageMap.set(msg.conversation_id, msg)
        }
    }

    const lastReadMap = new Map(
        participations.map(p => [p.conversation_id, p.last_read_at ?? '1970-01-01'])
    )

    const unreadCountMap = new Map<string, number>()
    for (const msg of recentMessages ?? []) {
        if (msg.sender_id === user.id) continue
        const lastRead = lastReadMap.get(msg.conversation_id) ?? '1970-01-01'
        if (msg.created_at > lastRead) {
            unreadCountMap.set(msg.conversation_id, (unreadCountMap.get(msg.conversation_id) ?? 0) + 1)
        }
    }

    const enriched = (conversations ?? []).map(conv => {
        const partnerId = partnerIdMap.get(conv.id)
        if (!partnerId) return null

        const partner = profileMap.get(partnerId)
        const lastMsg = lastMessageMap.get(conv.id)

        return {
            id: conv.id,
            created_at: conv.created_at,
            partner_id: partner?.id ?? null,
            partner_name: partner?.name ?? 'Неизвестный',
            partner_role: partner?.role ?? null,
            partner_avatar: partner?.avatar_url ?? null,
            last_message: lastMsg ? { content: lastMsg.content, created_at: lastMsg.created_at, sender_id: lastMsg.sender_id } : null,
            unread_count: unreadCountMap.get(conv.id) ?? 0,
        }
    })

    const result = enriched
        .filter(Boolean)
        .sort((a, b) => {
            const aTime = a?.last_message?.created_at ?? a?.created_at ?? ''
            const bTime = b?.last_message?.created_at ?? b?.created_at ?? ''
            return bTime.localeCompare(aTime)
        })
        .filter((conversation, index, array) => {
            if (!conversation?.partner_id) {
                return true
            }

            return (
                array.findIndex(
                    item => item?.partner_id === conversation.partner_id
                ) === index
            )
        })

    return NextResponse.json(result)
}

export async function POST(req: Request) {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }

    const { recipientId } = await req.json()

    if (!recipientId) {
        return NextResponse.json({ error: 'Не указан получатель' }, { status: 400 })
    }

    if (recipientId === user.id) {
        return NextResponse.json({ error: 'Нельзя отправить сообщение самому себе' }, { status: 400 })
    }

    const { data: myConvs } = await adminClient
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', user.id)

    const { data: theirConvs } = await adminClient
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', recipientId)

    const myIds = myConvs?.map(c => c.conversation_id) ?? []
    const theirIds = theirConvs?.map(c => c.conversation_id) ?? []
    const shared = myIds.find(id => theirIds.includes(id))

    if (shared) {
        return NextResponse.json({ id: shared, existing: true })
    }

    const { data: convRows, error: convError } = await adminClient
        .from('conversations')
        .insert({})
        .select('id')

    if (convError) {
        return NextResponse.json({ error: convError.message }, { status: 500 })
    }

    const conv = convRows?.[0]

    if (!conv?.id) {
        return NextResponse.json({ error: 'Не удалось создать диалог' }, { status: 500 })
    }

    const { error: partError } = await adminClient
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
