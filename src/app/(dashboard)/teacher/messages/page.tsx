"use client";

import { motion } from "framer-motion";
import { 
  Send, 
  Paperclip, 
  Search, 
  Phone, 
  Mail,
  Users,
  GraduationCap,
  User
} from "lucide-react";
import { useState } from "react";

export default function TeacherMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(0);
  const [filterType, setFilterType] = useState<"all" | "parents" | "students" | "colleagues">("all");

  // Conversations data
  const conversations = [
    {
      id: 0,
      type: "parent",
      name: "Иманалиев Марат",
      relation: "Родитель Алишера И. (10\"А\")",
      avatar: "ИМ",
      lastMessage: "Спасибо за обратную связь по контрольной работе!",
      time: "2 часа назад",
      unread: 2,
      messages: [
        { from: "them", text: "Здравствуйте, Анна Петровна! Хотел обсудить успеваемость Алишера.", time: "09:15" },
        { from: "me", text: "Добрый день! Алишер отлично справляется с материалом.", time: "09:30" },
        { from: "them", text: "Спасибо за обратную связь по контрольной работе!", time: "09:45" },
      ],
    },
    {
      id: 1,
      type: "parent",
      name: "Темурова Гульнара",
      relation: "Родитель Али Т. (10\"А\")",
      avatar: "ТГ",
      lastMessage: "Когда можно подойти на консультацию?",
      time: "Вчера",
      unread: 1,
      messages: [
        { from: "them", text: "Здравствуйте! У Али проблемы с физикой.", time: "14:20" },
        { from: "me", text: "Давайте встретимся на следующей неделе.", time: "15:00" },
        { from: "them", text: "Когда можно подойти на консультацию?", time: "15:30" },
      ],
    },
    {
      id: 2,
      type: "student",
      name: "Ким Дмитрий",
      relation: "Ученик 10\"Б\"",
      avatar: "КД",
      lastMessage: "Я отправил домашнее задание",
      time: "23.01",
      unread: 0,
      messages: [
        { from: "them", text: "Я отправил домашнее задание", time: "18:00" },
      ],
    },
    {
      id: 3,
      type: "parent",
      name: "Иванова Елена",
      relation: "Родитель Марии И. (9\"А\")",
      avatar: "ИЕ",
      lastMessage: "Благодарю за помощь в подготовке к олимпиаде",
      time: "22.01",
      unread: 0,
      messages: [
        { from: "them", text: "Благодарю за помощь в подготовке к олимпиаде", time: "10:00" },
      ],
    },
    {
      id: 4,
      type: "colleague",
      name: "Петров Сергей Михайлович",
      relation: "Учитель физики",
      avatar: "ПС",
      lastMessage: "Давайте согласуем тему совместного урока",
      time: "20.01",
      unread: 0,
      messages: [
        { from: "them", text: "Давайте согласуем тему совместного урока", time: "11:00" },
      ],
    },
  ];

  // Filter conversations
  const filteredConversations = conversations.filter((conv) => {
    if (filterType === "all") return true;
    if (filterType === "parents") return conv.type === "parent";
    if (filterType === "students") return conv.type === "student";
    if (filterType === "colleagues") return conv.type === "colleague";
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "parent": return Users;
      case "student": return GraduationCap;
      case "colleague": return User;
      default: return User;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "parent": return "from-blue-400 to-blue-600";
      case "student": return "from-green-400 to-green-600";
      case "colleague": return "from-purple-400 to-purple-600";
      default: return "from-neutral-400 to-neutral-600";
    }
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
            Связь с родителями, учениками и коллегами
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors">
          <Send className="w-4 h-4" />
          <span className="text-sm font-medium">Написать</span>
        </button>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-neutral-200">
        {[
          { id: "all", label: "Все", count: conversations.length },
          { id: "parents", label: "Родители", count: conversations.filter(c => c.type === "parent").length },
          { id: "students", label: "Ученики", count: conversations.filter(c => c.type === "student").length },
          { id: "colleagues", label: "Коллеги", count: conversations.filter(c => c.type === "colleague").length },
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
                  className="w-full pl-10 pr-4 py-2 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-secondary-500 focus:bg-white focus:outline-none transition-all text-sm"
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
                      selectedConversation === conv.id ? "bg-secondary-50" : ""
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
                            <span className="px-2 py-0.5 bg-secondary-500 text-white text-xs font-bold rounded-full">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          <TypeIcon className="w-3 h-3 text-neutral-400" />
                          <p className="text-xs text-neutral-500 truncate">{conv.relation}</p>
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
                      <p className="text-xs text-neutral-500">{conversations[selectedConversation].relation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Позвонить">
                      <Phone className="w-4 h-4 text-neutral-600" />
                    </button>
                    <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Написать email">
                      <Mail className="w-4 h-4 text-neutral-600" />
                    </button>
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
                          ? "bg-secondary-500 text-white"
                          : "bg-white text-neutral-900 border border-neutral-200"
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-2 ${
                          msg.from === "me" ? "text-secondary-100" : "text-neutral-500"
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
                      className="flex-1 px-4 py-2.5 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-secondary-500 focus:bg-white focus:outline-none transition-all text-sm"
                    />
                    <button className="p-2.5 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg transition-colors">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500 mt-2">
                    💡 Сообщение будет отправлено через портал
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