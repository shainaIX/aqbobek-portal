"use client";

import { motion } from "framer-motion";
import { Send, Paperclip, Search, MessageSquare, Users, GraduationCap, User, Shield } from "lucide-react";
import React, { useState } from "react";

const conversations = [
  { id: 0, type: "teacher", name: "Иванова А.П.", role: "Учитель математики", avatar: "ИП", lastMessage: "Нужно обсудить расписание", time: "2 часа назад", unread: 2 },
  { id: 1, type: "parent", name: "Иманалиев М.", role: "Родитель (10\"А\")", avatar: "ИМ", lastMessage: "Благодарю за решение", time: "Вчера", unread: 1 },
  { id: 2, type: "student", name: "Темуров А.", role: "Ученик 10\"А\"", avatar: "ТА", lastMessage: "Нужна справка", time: "23.01", unread: 0 },
  { id: 3, type: "staff", name: "Ахметова Г.", role: "Секретарь", avatar: "АГ", lastMessage: "Документы готовы", time: "22.01", unread: 0 },
];

export default function AdminMessagesPage() {
  const [selectedId, setSelectedId] = useState<number | null>(0);
  const [filter, setFilter] = useState<"all" | "teachers" | "parents" | "students" | "staff">("all");
  const [messageText, setMessageText] = useState("");

  const filtered = conversations.filter((c) => {
    if (filter === "all") return true;
    return c.type === filter.slice(0, -1);
  });

  const selected = conversations.find((c) => c.id === selectedId);

  const getConfig = (type: string) => {
    const configs: Record<string, { bg: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
      teacher: { bg: "from-purple-400 to-purple-600", color: "text-purple-600", icon: GraduationCap },
      parent: { bg: "from-blue-400 to-blue-600", color: "text-blue-600", icon: Users },
      student: { bg: "from-green-400 to-green-600", color: "text-green-600", icon: User },
      staff: { bg: "from-orange-400 to-orange-600", color: "text-orange-600", icon: Shield },
    };
    return configs[type] || configs.teacher;
  };

  return (
    <div className="space-y-6">

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline text-neutral-900">Сообщения</h1>
          <p className="text-neutral-600 mt-1">Коммуникация со всеми пользователями</p>
        </div>
        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium flex items-center gap-2">
          <Send className="w-4 h-4" />
          Написать
        </button>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <p className="text-xs text-neutral-600 mb-1">Всего</p>
          <p className="text-2xl font-bold text-neutral-900">{conversations.length}</p>
        </div>
        {["teacher", "parent", "student", "staff"].map((type) => {
          const config = getConfig(type);
          const count = conversations.filter(c => c.type === type).length;
          return (
            <div key={type} className="bg-white rounded-xl border border-neutral-200 p-4">
              <p className="text-xs text-neutral-600 mb-1 capitalize">
                {type === "teacher" ? "Учителя" : type === "parent" ? "Родители" : type === "student" ? "Ученики" : "Персонал"}
              </p>
              <p className={`text-2xl font-bold ${config.color}`}>{count}</p>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 border-b border-neutral-200 overflow-x-auto pb-2">
        {[
          { id: "all", label: "Все", count: conversations.length },
          { id: "teachers", label: "Учителя", count: conversations.filter(c => c.type === "teacher").length },
          { id: "parents", label: "Родители", count: conversations.filter(c => c.type === "parent").length },
          { id: "students", label: "Ученики", count: conversations.filter(c => c.type === "student").length },
          { id: "staff", label: "Персонал", count: conversations.filter(c => c.type === "staff").length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as typeof filter)}
            className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              filter === tab.id ? "border-purple-500 text-purple-600" : "border-transparent text-neutral-600 hover:text-neutral-900"
            }`}
          >
            {tab.label} <span className="ml-2 px-2 py-0.5 bg-neutral-100 rounded-full text-xs">{tab.count}</span>
          </button>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">

          <div className="border-r border-neutral-200">
            <div className="p-4 border-b border-neutral-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input type="text" placeholder="Поиск..." className="w-full pl-10 pr-4 py-2 bg-neutral-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>
            <div className="divide-y divide-neutral-100 max-h-[500px] overflow-y-auto">
              {filtered.map((conv) => {
                const config = getConfig(conv.type);
                const Icon = config.icon;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedId(conv.id)}
                    className={`w-full p-4 text-left hover:bg-neutral-50 transition-colors ${selectedId === conv.id ? "bg-purple-50" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${config.bg} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                        {conv.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-neutral-900 truncate">{conv.name}</p>
                          {conv.unread > 0 && <span className="px-2 py-0.5 bg-purple-500 text-white text-xs font-bold rounded-full">{conv.unread}</span>}
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          <Icon className="w-3 h-3 text-neutral-400" />
                          <p className="text-xs text-neutral-500 truncate">{conv.role}</p>
                        </div>
                        <p className="text-sm text-neutral-600 truncate">{conv.lastMessage}</p>
                        <p className="text-xs text-neutral-400 mt-1">{conv.time}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            {selected ? (
              <>
                <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${getConfig(selected.type).bg} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                    {selected.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">{selected.name}</p>
                    <p className="text-xs text-neutral-500">{selected.role}</p>
                  </div>
                </div>
                <div className="flex-1 p-4 bg-neutral-50">
                  <p className="text-center text-neutral-400 text-sm">История переписки</p>
                </div>
                <div className="p-4 border-t border-neutral-200">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-neutral-100 rounded-lg"><Paperclip className="w-5 h-5 text-neutral-500" /></button>
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Напишите сообщение..."
                      className="flex-1 px-4 py-2.5 bg-neutral-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button className="p-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600"><Send className="w-5 h-5" /></button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-neutral-400">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Выберите чат</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}