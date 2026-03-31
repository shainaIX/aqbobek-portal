import { createClient } from '@/lib/supabase/server'

interface CreateNotificationParams {
    userId: string
    type: 'message' | 'grade' | 'alert' | 'risk'
    title: string
    body?: string
    metadata?: Record<string, unknown>
}

// Вызывай из любого API route когда нужно уведомить пользователя
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

// Примеры использования:
//
// При отправке сообщения:
// await createNotification({
//   userId: recipientId,
//   type: 'message',
//   title: `Новое сообщение от ${senderName}`,
//   body: messagePreview,
//   metadata: { conversation_id: convId }
// })
//
// При изменении оценки:
// await createNotification({
//   userId: studentId,
//   type: 'grade',
//   title: 'Новая оценка по физике',
//   body: 'Контрольная работа — 4',
//   metadata: { subject: 'physics', grade: 4 }
// })
//
// При высоком риске ученика:
// await createNotification({
//   userId: teacherId,
//   type: 'risk',
//   title: `Высокий риск: ${studentName}`,
//   body: 'Резкое падение успеваемости за 2 недели',
//   metadata: { student_id: studentId, risk_level: 'high' }
// })