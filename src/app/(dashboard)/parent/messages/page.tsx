"use client";

import { motion } from "framer-motion";
import { Send, Paperclip, Search } from "lucide-react";
import { useState } from "react";

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(0);

  const conversations = [
    {
      id: 0,
      teacher: "Иванова Анна Петровна",
      subject: "Алгебра",
      avatar: "ИП",
      lastMessage: "Алишер отлично справился с контрольной работой!",
      time: "2 часа назад",
      unread: 2,
      messages: [
        { from: "teacher", text: "Здравствуйте! Хочу сообщить, что Алишер отлично справился с контрольной работой по квадратным уравнениям.", time: "10:30" },
        { from: "teacher", text: "Получил 5 баллов. Так держать!", time: "10:31" },
      ],
    },
    {
      id: 1,
      teacher: "Петров Сергей Михайлович",
      subject: "Физика",
      avatar: "ПС",
      lastMessage: "Прошу обсудить с сыном пропущенный урок",
      time: "Вчера",
      unread: 1,
      messages: [
        { from: "teacher", text: "Добрый день. Алишер пропустил лабораторную работу по физике.", time: "14:20" },
        { from: "teacher", text: "Прошу обсудить с ним необходимость посещения всех уроков.", time: "14:21" },
      ],
    },
    {
      id: 2,
      teacher: "Сидорова Елена Викторовна",
      subject: "Литература",
      avatar: "СЕ",
      lastMessage: "Благодарю за помощь в организации мероприятия",
      time: "23.01",
      unread: 0,
      messages: [
        { from: "teacher", text: "Благодарю за помощь в организации литературного вечера!", time: "09:15" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold font-headline text-neutral-900">
          Сообщения
        </h1>
        <p className="text-neutral-600 mt-1">
          Связь с учителями
        </p>
      </motion.div>

      {/* Messages Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
          {/* Conversations List */}
          <div className="border-r border-neutral-200">
            {/* Search */}
            <div className="p-4 border-b border-neutral-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Поиск сообщений..."
                  className="w-full pl-10 pr-4 py-2 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-tertiary-500 focus:bg-white focus:outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="divide-y divide-neutral-100 max-h-[500px] overflow-y-auto">
              {conversations.map((conv, index) => (
                <motion.button
                  key={conv.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                  onClick={() => setSelectedMessage(conv.id)}
                  className={`w-full p-4 text-left hover:bg-neutral-50 transition-colors ${
                    selectedMessage === conv.id ? "bg-tertiary-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-tertiary-400 to-tertiary-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {conv.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-neutral-900 truncate">{conv.teacher}</p>
                        {conv.unread > 0 && (
                          <span className="px-2 py-0.5 bg-tertiary-500 text-white text-xs font-bold rounded-full">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 mb-1">{conv.subject}</p>
                      <p className="text-sm text-neutral-600 truncate">{conv.lastMessage}</p>
                      <p className="text-xs text-neutral-400 mt-1">{conv.time}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Message Content */}
          <div className="lg:col-span-2 flex flex-col">
            {selectedMessage !== null && conversations[selectedMessage] && (
              <>
                {/* Message Header */}
                <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-tertiary-400 to-tertiary-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {conversations[selectedMessage].avatar}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">{conversations[selectedMessage].teacher}</p>
                    <p className="text-xs text-neutral-500">{conversations[selectedMessage].subject}</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {conversations[selectedMessage].messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${msg.from === "teacher" ? "justify-start" : "justify-end"}`}
                    >
                      <div className={`max-w-[70%] p-4 rounded-xl ${
                        msg.from === "teacher"
                          ? "bg-neutral-100 text-neutral-900"
                          : "bg-tertiary-500 text-white"
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-2 ${
                          msg.from === "teacher" ? "text-neutral-500" : "text-tertiary-100"
                        }`}>{msg.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Reply Input */}
                <div className="p-4 border-t border-neutral-200">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                      <Paperclip className="w-5 h-5 text-neutral-500" />
                    </button>
                    <input
                      type="text"
                      placeholder="Напишите сообщение..."
                      className="flex-1 px-4 py-2 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-tertiary-500 focus:bg-white focus:outline-none transition-all text-sm"
                    />
                    <button className="p-2 bg-tertiary-500 hover:bg-tertiary-600 text-white rounded-lg transition-colors">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}