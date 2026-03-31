"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Paperclip,
  Search,
  Phone,
  Mail,
  Users,
  GraduationCap,
  User,
  MessageSquare,
  Loader2,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useConversations } from "@/hooks/useConversations";
import { useMessages } from "@/hooks/useMessages";
import type { Conversation } from "@/types/messaging";

// ─── Вспомогательные функции ────────────────────────────────────────────────

function getTypeFromRole(role: string) {
  if (role === "parent") return "parent";
  if (role === "student") return "student";
  return "colleague";
}

function getTypeIcon(type: string) {
  switch (type) {
    case "parent": return Users;
    case "student": return GraduationCap;
    default: return User;
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case "parent": return "from-blue-400 to-blue-600";
    case "student": return "from-green-400 to-green-600";
    default: return "from-purple-400 to-purple-600";
  }
}

function getTypeLabel(type: string) {
  switch (type) {
    case "parent": return "Родитель";
    case "student": return "Ученик";
    default: return "Коллега";
  }
}

function formatTime(iso: string) {
  if (!iso) return "";
  const date = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = diff / 1000 / 60 / 60;

  if (hours < 1) return `${Math.round(diff / 1000 / 60)} мин назад`;
  if (hours < 24) return `${Math.round(hours)} ч назад`;
  if (hours < 48) return "Вчера";
  return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" });
}

function getInitials(name: string) {
  return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
}

// ─── Окно чата ──────────────────────────────────────────────────────────────

function ChatWindow({ conversation }: { conversation: Conversation }) {
  const { messages, isLoading, hasMore, loadMore, sendMessage } = useMessages(
      conversation.id
  );
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const type = getTypeFromRole(conversation.partner_role);

  // Скролл вниз при новых сообщениях
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Пометить прочитанным при открытии
  useEffect(() => {
    fetch(`/api/conversations/${conversation.id}/read`, { method: "POST" });
  }, [conversation.id]);

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isSending) return;
    setInputValue("");
    setIsSending(true);
    await sendMessage(text);
    setIsSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
      <>
        {/* Шапка чата */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
                className={`w-10 h-10 bg-gradient-to-br ${getTypeColor(type)} rounded-full flex items-center justify-center text-white text-sm font-bold`}
            >
              {conversation.partner_avatar
                  ? <img src={conversation.partner_avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                  : getInitials(conversation.partner_name)}
            </div>
            <div>
              <p className="font-medium text-neutral-900">
                {conversation.partner_name}
              </p>
              <p className="text-xs text-neutral-500">
                {getTypeLabel(type)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Позвонить">
              <Phone className="w-4 h-4 text-neutral-600" />
            </button>
            <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Email">
              <Mail className="w-4 h-4 text-neutral-600" />
            </button>
          </div>
        </div>

        {/* Сообщения */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-neutral-50">

          {/* Кнопка загрузить больше */}
          {hasMore && (
              <div className="flex justify-center">
                <button
                    onClick={loadMore}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-700 bg-white border border-neutral-200 rounded-full transition-colors"
                >
                  <ChevronUp className="w-3 h-3" />
                  Загрузить ранее
                </button>
              </div>
          )}

          {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 text-neutral-400 animate-spin" />
              </div>
          ) : messages.length === 0 ? (
              <div className="flex justify-center py-8">
                <p className="text-sm text-neutral-400">Нет сообщений. Напишите первым!</p>
              </div>
          ) : (
              messages.map((msg, index) => {
                const isMe = msg.sender_id === "me" || msg._pending;
                return (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index < 5 ? index * 0.05 : 0 }}
                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                          className={`max-w-[70%] p-4 rounded-xl ${
                              isMe
                                  ? "bg-secondary-500 text-white"
                                  : "bg-white text-neutral-900 border border-neutral-200"
                          } ${msg._pending ? "opacity-70" : ""}`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                            className={`text-xs mt-2 flex items-center gap-1 ${
                                isMe ? "text-secondary-100" : "text-neutral-500"
                            }`}
                        >
                          {new Date(msg.created_at).toLocaleTimeString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {msg._pending && (
                              <Loader2 className="w-3 h-3 animate-spin" />
                          )}
                        </p>
                      </div>
                    </motion.div>
                );
              })
          )}
          <div ref={bottomRef} />
        </div>

        {/* Поле ввода */}
        <div className="p-4 border-t border-neutral-200 bg-white">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
              <Paperclip className="w-5 h-5 text-neutral-500" />
            </button>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Напишите сообщение..."
                disabled={isSending}
                className="flex-1 px-4 py-2.5 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-secondary-500 focus:bg-white focus:outline-none transition-all text-sm disabled:opacity-50"
            />
            <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isSending}
                className="p-2.5 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending
                  ? <Loader2 className="w-5 h-5 animate-spin" />
                  : <Send className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            💡 Enter — отправить, Shift+Enter — перенос строки
          </p>
        </div>
      </>
  );
}

// ─── Главная страница ────────────────────────────────────────────────────────

export default function TeacherMessagesPage() {
  const { conversations, isLoading, startConversation } = useConversations();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"all" | "parent" | "student" | "colleague">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Выбираем первый диалог автоматически
  useEffect(() => {
    if (conversations.length > 0 && !selectedId) {
      setSelectedId(conversations[0].id);
    }
  }, [conversations]);

  const selectedConversation = conversations.find((c) => c.id === selectedId) ?? null;

  const filteredConversations = conversations.filter((conv) => {
    const type = getTypeFromRole(conv.partner_role);
    const matchesType = filterType === "all" || type === filterType;
    const matchesSearch = conv.partner_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const counts = {
    all: conversations.length,
    parent: conversations.filter((c) => getTypeFromRole(c.partner_role) === "parent").length,
    student: conversations.filter((c) => getTypeFromRole(c.partner_role) === "student").length,
    colleague: conversations.filter((c) => getTypeFromRole(c.partner_role) === "colleague").length,
  };

  return (
      <div className="space-y-6">
        {/* Заголовок */}
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold font-headline text-neutral-900">
              Сообщения
            </h1>
            <p className="text-neutral-600 mt-1">
              Связь с родителями, учениками и коллегами
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors">
            <Send className="w-4 h-4" />
            <span className="text-sm font-medium">Написать</span>
          </button>
        </motion.div>

        {/* Фильтр-табы */}
        <div className="flex gap-2 border-b border-neutral-200">
          {[
            { id: "all", label: "Все" },
            { id: "parent", label: "Родители" },
            { id: "student", label: "Ученики" },
            { id: "colleague", label: "Коллеги" },
          ].map((tab) => (
              <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      filterType === tab.id
                          ? "border-secondary-500 text-secondary-600"
                          : "border-transparent text-neutral-600 hover:text-neutral-900"
                  }`}
              >
                {tab.label}
                <span className="px-2 py-0.5 bg-neutral-100 rounded-full text-xs">
              {counts[tab.id as keyof typeof counts]}
            </span>
              </button>
          ))}
        </div>

        {/* Основной контейнер */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">

            {/* Список диалогов */}
            <div className="border-r border-neutral-200 lg:col-span-1">
              {/* Поиск */}
              <div className="p-4 border-b border-neutral-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                      type="text"
                      placeholder="Поиск сообщений..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-secondary-500 focus:bg-white focus:outline-none transition-all text-sm"
                  />
                </div>
              </div>

              {/* Список */}
              <div className="divide-y divide-neutral-100 max-h-[530px] overflow-y-auto">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="w-6 h-6 text-neutral-400 animate-spin" />
                    </div>
                ) : filteredConversations.length === 0 ? (
                    <div className="py-12 text-center">
                      <MessageSquare className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
                      <p className="text-sm text-neutral-500">Диалогов нет</p>
                    </div>
                ) : (
                    filteredConversations.map((conv, index) => {
                      const type = getTypeFromRole(conv.partner_role);
                      const TypeIcon = getTypeIcon(type);
                      return (
                          <motion.button
                              key={conv.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 + 0.2 }}
                              onClick={() => setSelectedId(conv.id)}
                              className={`w-full p-4 text-left hover:bg-neutral-50 transition-colors ${
                                  selectedId === conv.id ? "bg-secondary-50" : ""
                              }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                  className={`w-10 h-10 bg-gradient-to-br ${getTypeColor(type)} rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                              >
                                {conv.partner_avatar
                                    ? <img src={conv.partner_avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                                    : getInitials(conv.partner_name)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="font-medium text-neutral-900 truncate">
                                    {conv.partner_name}
                                  </p>
                                  {conv.unread_count > 0 && (
                                      <span className="px-2 py-0.5 bg-secondary-500 text-white text-xs font-bold rounded-full">
                                {conv.unread_count}
                              </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 mb-1">
                                  <TypeIcon className="w-3 h-3 text-neutral-400" />
                                  <p className="text-xs text-neutral-500">
                                    {getTypeLabel(type)}
                                  </p>
                                </div>
                                {conv.last_message && (
                                    <p className="text-sm text-neutral-600 truncate">
                                      {conv.last_message.content}
                                    </p>
                                )}
                                {conv.last_message && (
                                    <p className="text-xs text-neutral-400 mt-1">
                                      {formatTime(conv.last_message.created_at)}
                                    </p>
                                )}
                              </div>
                            </div>
                          </motion.button>
                      );
                    })
                )}
              </div>
            </div>

            {/* Окно чата */}
            <div className="lg:col-span-2 flex flex-col">
              <AnimatePresence mode="wait">
                {selectedConversation ? (
                    <motion.div
                        key={selectedConversation.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col flex-1"
                    >
                      <ChatWindow conversation={selectedConversation} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 flex items-center justify-center text-neutral-400"
                    >
                      <div className="text-center">
                        <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-sm">Выберите чат для начала общения</p>
                      </div>
                    </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </div>
  );
}