"use client";

import { motion } from "framer-motion";
import { 
  Send, 
  Paperclip, 
  Search, 
  Phone, 
  Mail,
  BookOpen,
  User,
  MessageSquare
} from "lucide-react";
import { useState } from "react";

export default function StudentMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(0);
  const [filterType, setFilterType] = useState<"all" | "teachers" | "classmates">("all");

  // Conversations data
  const conversations = [
    {
      id: 0,
      type: "teacher",
      name: "Иванова Анна Петровна",
      subject: "Алгебра",
      avatar: "ИП",
      lastMessage: "Молодец! Отлично справился с контрольной работой",
      time: "2 часа назад",
      unread: 2,
      messages: [
        { from: "them", text: "Здравствуйте, Алишер! Есть вопросы по домашнему заданию?", time: "09:15" },
        { from: "me", text: "Да, не понял задачу №5 про квадратные уравнения", time: "09:30" },
        { from: "them", text: "Молодец! Отлично справился с контрольной работой", time: "10:00" },
      ],
    },
    {
      id: 1,
      type: "teacher",
      name: "Петров Сергей Михайлович",
      subject: "Физика",
      avatar: "ПС",
      lastMessage: "Не забудь подготовить лабораторную к четвергу",
      time: "Вчера",
      unread: 1,
      messages: [
        { from: "them", text: "Напоминаю про лабораторную работу по теме «Законы Ньютона»", time: "14:20" },
        { from: "them", text: "Не забудь подготовить лабораторную к четвергу", time: "14:21" },
      ],
    },
    {
      id: 2,
      type: "classmate",
      name: "Темуров Али",
      subject: "10\"А\"",
      avatar: "ТА",
      lastMessage: "Скинешь конспект по истории?",
      time: "23.01",
      unread: 0,
      messages: [
        { from: "them", text: "Привет! Ты был на истории вчера?", time: "18:00" },
        { from: "them", text: "Скинешь конспект по истории?", time: "18:05" },
        { from: "me", text: "Да, сейчас отправлю", time: "18:30" },
      ],
    },
    {
      id: 3,
      type: "teacher",
      name: "Сидорова Елена Викторовна",
      subject: "Литература",
      avatar: "СЕ",
      lastMessage: "Твоё сочинение получило 5 баллов!",
      time: "22.01",
      unread: 0,
      messages: [
        { from: "them", text: "Твоё сочинение получило 5 баллов! Отличная работа", time: "10:00" },
      ],
    },
    {
      id: 4,
      type: "classmate",
      name: "Ким Дмитрий",
      subject: "10\"Б\"",
      avatar: "КД",
      lastMessage: "Идём после школы в библиотеку?",
      time: "20.01",
      unread: 0,
      messages: [
        { from: "them", text: "Идём после школы в библиотеку?", time: "11:00" },
      ],
    },
  ];

  // Filter conversations
  const filteredConversations = conversations.filter((conv) => {
    if (filterType === "all") return true;
    if (filterType === "teachers") return conv.type === "teacher";
    if (filterType === "classmates") return conv.type === "classmate";
    return true;
  });

  const getTypeIcon = (type: string) => {
    return type === "teacher" ? BookOpen : User;
  };

  const getTypeColor = (type: string) => {
    return type === "teacher" 
      ? "from-primary-400 to-primary-600" 
      : "from-tertiary-400 to-tertiary-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
            Связь с учителями и одноклассниками
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
          <Send className="w-4 h-4" />
          <span className="text-sm font-medium">Написать</span>
        </button>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-neutral-200">
        {[
          { id: "all", label: "Все", count: conversations.length },
          { id: "teachers", label: "Учителя", count: conversations.filter(c => c.type === "teacher").length },
          { id: "classmates", label: "Одноклассники", count: conversations.filter(c => c.type === "classmate").length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id as "all" | "teachers" | "classmates")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              filterType === tab.id
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-neutral-600 hover:text-neutral-900"
            }`}
          >
            {tab.label}
            <span className="px-2 py-0.5 bg-neutral-100 rounded-full text-xs">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Messages Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
          {/* Conversations List */}
          <div className="border-r border-neutral-200 lg:col-span-1">
            {/* Search */}
            <div className="p-4 border-b border-neutral-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Поиск сообщений..."
                  className="w-full pl-10 pr-4 py-2 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-primary-500 focus:bg-white focus:outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="divide-y divide-neutral-100 max-h-[500px] overflow-y-auto">
              {filteredConversations.map((conv, index) => {
                const TypeIcon = getTypeIcon(conv.type);
                return (
                  <motion.button
                    key={conv.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full p-4 text-left hover:bg-neutral-50 transition-colors ${
                      selectedConversation === conv.id ? "bg-primary-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${getTypeColor(conv.type)} rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                        {conv.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-neutral-900 truncate">{conv.name}</p>
                          {conv.unread > 0 && (
                            <span className="px-2 py-0.5 bg-primary-500 text-white text-xs font-bold rounded-full">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          <TypeIcon className="w-3 h-3 text-neutral-400" />
                          <p className="text-xs text-neutral-500 truncate">
                            {conv.type === "teacher" ? conv.subject : conv.subject}
                          </p>
                        </div>
                        <p className="text-sm text-neutral-600 truncate">{conv.lastMessage}</p>
                        <p className="text-xs text-neutral-400 mt-1">{conv.time}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Message Content */}
          <div className="lg:col-span-2 flex flex-col">
            {selectedConversation !== null && conversations[selectedConversation] ? (
              <>
                {/* Message Header */}
                <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${getTypeColor(conversations[selectedConversation].type)} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                      {conversations[selectedConversation].avatar}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{conversations[selectedConversation].name}</p>
                      <p className="text-xs text-neutral-500">
                        {conversations[selectedConversation].type === "teacher" 
                          ? `Учитель ${conversations[selectedConversation].subject}`
                          : `Одноклассник ${conversations[selectedConversation].subject}`
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {conversations[selectedConversation].type === "teacher" && (
                      <>
                        <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Позвонить">
                          <Phone className="w-4 h-4 text-neutral-600" />
                        </button>
                        <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Написать email">
                          <Mail className="w-4 h-4 text-neutral-600" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-neutral-50">
                  {conversations[selectedConversation].messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[70%] p-4 rounded-xl ${
                        msg.from === "me"
                          ? "bg-primary-500 text-white"
                          : "bg-white text-neutral-900 border border-neutral-200"
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-2 ${
                          msg.from === "me" ? "text-primary-100" : "text-neutral-500"
                        }`}>{msg.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Reply Input */}
                <div className="p-4 border-t border-neutral-200 bg-white">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                      <Paperclip className="w-5 h-5 text-neutral-500" />
                    </button>
                    <input
                      type="text"
                      placeholder="Напишите сообщение..."
                      className="flex-1 px-4 py-2.5 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-primary-500 focus:bg-white focus:outline-none transition-all text-sm"
                    />
                    <button className="p-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500 mt-2">
                    💡 Сообщения учителям видны только в рабочее время (8:00 - 18:00)
                  </p>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-neutral-400">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Выберите чат для начала общения</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}