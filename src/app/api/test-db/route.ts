import { createClient } from '@/lib/supabase/server'

export async function GET() {
    const supabase = await createClient()

    const [conv, part, msg, notif, profiles] = await Promise.all([
        supabase.from('conversations').select('*').limit(1),
        supabase.from('conversation_participants').select('*').limit(1),
        supabase.from('messages').select('*').limit(1),
        supabase.from('notifications').select('*').limit(1),
        supabase.from('profiles').select('*').limit(1),
    ])

    return Response.json({
        tables: {
            conversations:             conv.error    ? `❌ ${conv.error.message}`    : '✅ OK',
            conversation_participants: part.error    ? `❌ ${part.error.message}`    : '✅ OK',
            messages:                  msg.error     ? `❌ ${msg.error.message}`     : '✅ OK',
            notifications:             notif.error   ? `❌ ${notif.error.message}`   : '✅ OK',
            profiles:                  profiles.error ? `❌ ${profiles.error.message}` : '✅ OK',
        }
    })
}