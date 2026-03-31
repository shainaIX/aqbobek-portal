export interface Participant {
    user_id: string
    last_read_at: string | null
}

export interface LastMessage {
    content: string
    created_at: string
    sender_id: string
}

export interface Conversation {
    id: string
    created_at: string
    partner_id: string
    partner_name: string
    partner_role: 'teacher' | 'parent' | 'student' | 'admin'
    partner_avatar: string | null
    last_message: LastMessage | null
    unread_count: number
}

export interface Message {
    id: string
    conversation_id: string
    sender_id: string
    sender_name: string
    sender_role: string
    sender_avatar?: string | null
    content: string
    created_at: string
    _pending?: boolean
}

export interface SearchUser {
    id: string
    name: string
    role: 'teacher' | 'parent' | 'student' | 'admin'
    avatar_url: string | null
}

export interface Notification {
    id: string
    user_id: string
    type: 'message' | 'grade' | 'alert' | 'risk'
    title: string
    body: string | null
    is_read: boolean
    metadata: Record<string, unknown>
    created_at: string
}
