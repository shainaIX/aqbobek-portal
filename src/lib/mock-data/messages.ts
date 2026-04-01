export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    senderName: string;
    senderAvatar: string;
    senderRole: 'student' | 'teacher' | 'parent' | 'admin';
    content: string;
    timestamp: Date;
    isRead: boolean;
    attachments?: Attachment[];
}

export interface Attachment {
    id: string;
    name: string;
    type: 'image' | 'file' | 'link';
    url: string;
}

export interface Conversation {
    id: string;
    participantId: string;
    participantName: string;
    participantAvatar: string;
    participantRole: 'student' | 'teacher' | 'parent' | 'admin';
    lastMessage: string;
    lastMessageTime: Date;
    unreadCount: number;
    isOnline: boolean;
    subject?: string;
}

export const studentConversations: Conversation[] = [
    {
        id: '1',
        participantId: 't1',
        participantName: 'Иванова Анна Петровна',
        participantAvatar: 'ИП',
        participantRole: 'teacher',
        lastMessage: 'Не забудь сдать домашнее задание до пятницы',
        lastMessageTime: new Date('2025-01-30T14:30:00'),
        unreadCount: 2,
        isOnline: true,
        subject: 'Физика',
    },
    {
        id: '2',
        participantId: 't2',
        participantName: 'Петров Сергей Михайлович',
        participantAvatar: 'ПС',
        participantRole: 'teacher',
        lastMessage: 'Отличная работа на контрольной!',
        lastMessageTime: new Date('2025-01-29T10:15:00'),
        unreadCount: 0,
        isOnline: false,
        subject: 'Алгебра',
    },
    {
        id: '3',
        participantId: 'p1',
        participantName: 'Иманалиев Марат',
        participantAvatar: 'ИМ',
        participantRole: 'parent',
        lastMessage: 'Во сколько заканчиваются занятия?',
        lastMessageTime: new Date('2025-01-28T16:45:00'),
        unreadCount: 1,
        isOnline: true,
    },
    {
        id: '4',
        participantId: 'a1',
        participantName: 'Администрация',
        participantAvatar: 'AD',
        participantRole: 'admin',
        lastMessage: 'Объявление: Родительское собрание 5 февраля',
        lastMessageTime: new Date('2025-01-27T09:00:00'),
        unreadCount: 0,
        isOnline: false,
    },
];

export const mockMessages: Record<string, Message[]> = {
    '1': [
        {
            id: 'm1',
            conversationId: '1',
            senderId: 't1',
            senderName: 'Иванова Анна Петровна',
            senderAvatar: 'ИП',
            senderRole: 'teacher',
            content: 'Здравствуйте, Алишер! У вас есть вопросы по последней теме?',
            timestamp: new Date('2025-01-30T14:00:00'),
            isRead: true,
        },
        {
            id: 'm2',
            conversationId: '1',
            senderId: 's1',
            senderName: 'Алишер Иманалиев',
            senderAvatar: 'АИ',
            senderRole: 'student',
            content: 'Да, не совсем понял квантовую механику',
            timestamp: new Date('2025-01-30T14:15:00'),
            isRead: true,
        },
        {
            id: 'm3',
            conversationId: '1',
            senderId: 't1',
            senderName: 'Иванова Анна Петровна',
            senderAvatar: 'ИП',
            senderRole: 'teacher',
            content: 'Не забудь сдать домашнее задание до пятницы',
            timestamp: new Date('2025-01-30T14:30:00'),
            isRead: false,
        },
    ],
};