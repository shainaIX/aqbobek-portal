import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/conversations/:id/messages?cursor=<iso_date>
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Проверяем что пользователь участник этого диалога
    const { data: access } = await supabase
        .from('conversation_participants')
        .select('user_id')
        .eq('conversation_id', params.id)
        .eq('user_id', user.id)
        .single()

    if (!access) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const url = new URL(req.url)
    const cursor = url.searchParams.get('cursor') // дата последнего загруженного (для пагинации вверх)
    const limit = 30

    let query = supabase
        .from('messages')
        .select(`
      id,
      conversation_id,
      sender_id,
      content,
      created_at,
      profiles (
        name,
        role,
        avatar_url
      )
    `)
        .eq('conversation_id', params.id)
        .order('created_at', { ascending: false })
        .limit(limit)

    // Если есть cursor — грузим сообщения старше него (пагинация вверх)
    if (cursor) {
        query = query.lt('created_at', cursor)
    }

    const { data: messages, error } = await query

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Разворачиваем в хронологический порядок
    const result = (messages ?? []).reverse().map(msg => ({
        id: msg.id,
        conversation_id: msg.conversation_id,
        sender_id: msg.sender_id,
        content: msg.content,
        created_at: msg.created_at,
        sender_name: (msg.profiles as any)?.name ?? 'Неизвестный',
        sender_role: (msg.profiles as any)?.role ?? null,
        sender_avatar: (msg.profiles as any)?.avatar_url ?? null,
    }))

    return NextResponse.json(result)
}

// POST /api/conversations/:id/messages — отправить сообщение
export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Проверяем доступ
    const { data: access } = await supabase
        .from('conversation_participants')
        .select('user_id')
        .eq('conversation_id', params.id)
        .eq('user_id', user.id)
        .single()

    if (!access) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { content } = await req.json()

    if (!content?.trim()) {
        return NextResponse.json({ error: 'Empty message' }, { status: 400 })
    }

    // Сохраняем сообщение
    const { data: message, error: msgError } = await supabase
        .from('messages')
        .insert({
            conversation_id: params.id,
            sender_id: user.id,
            content: content.trim(),
        })
        .select(`
      id,
      conversation_id,
      sender_id,
      content,
      created_at,
      profiles (
        name,
        role,
        avatar_url
      )
    `)
        .single()

    if (msgError) {
        return NextResponse.json({ error: msgError.message }, { status: 500 })
    }

    // Помечаем как прочитанное для отправителя
    await supabase
        .from('conversation_participants')
        .update({ last_read_at: new Date().toISOString() })
        .eq('conversation_id', params.id)
        .eq('user_id', user.id)

    // Находим получателя и создаём ему уведомление
    const { data: recipient } = await supabase
        .from('conversation_participants')
        .select('user_id')
        .eq('conversation_id', params.id)
        .neq('user_id', user.id)
        .single()

    if (recipient) {
        const { data: senderProfile } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', user.id)
            .single()

        await supabase.from('notifications').insert({
            user_id: recipient.user_id,
            type: 'message',
            title: `Новое сообщение от ${senderProfile?.name ?? 'пользователя'}`,
            body: content.trim().slice(0, 100), // превью первых 100 символов
            metadata: { conversation_id: params.id, sender_id: user.id },
        })
    }

    return NextResponse.json({
        id: message.id,
        conversation_id: message.conversation_id,
        sender_id: message.sender_id,
        content: message.content,
        created_at: message.created_at,
        sender_name: (message.profiles as any)?.name ?? 'Неизвестный',
        sender_role: (message.profiles as any)?.role ?? null,
        sender_avatar: (message.profiles as any)?.avatar_url ?? null,
    }, { status: 201 })
}