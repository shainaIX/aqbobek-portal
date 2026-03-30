"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  Download, 
  MoreVertical,
  UserCheck,
  UserX,
  Shield,
  GraduationCap,
  BookOpen
} from "lucide-react";
import { useState } from "react";

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState("students");
  const [searchQuery, setSearchQuery] = useState("");

  const users = {
    students: [
      { id: 1, name: "Алишер Иманалиев", class: "10\"А\"", email: "alisher@aqbobek.kz", status: "active", gpa: 4.8 },
      { id: 2, name: "Темуров Али", class: "10\"А\"", email: "temurov@aqbobek.kz", status: "active", gpa: 3.2 },
      { id: 3, name: "Ким Дмитрий", class: "10\"Б\"", email: "kim@aqbobek.kz", status: "warning", gpa: 3.5 },
      { id: 4, name: "Иванова Мария", class: "9\"А\"", email: "ivanova@aqbobek.kz", status: "active", gpa: 4.5 },
    ],
    teachers: [
      { id: 1, name: "Иванова Анна Петровна", subject: "Алгебра", email: "ivanova@aqbobek.kz", status: "active", classes: 4 },
      { id: 2, name: "Петров Сергей Михайлович", subject: "Физика", email: "petrov@aqbobek.kz", status: "active", classes: 3 },
      { id: 3, name: "Сидорова Елена Викторовна", subject: "Литература", email: "sidorova@aqbobek.kz", status: "active", classes: 5 },
    ],
    parents: [
      { id: 1, name: "Иманалиев Марат", children: "Алишер И. (10\"А\")", email: "imanaliev@aqbobek.kz", status: "active" },
      { id: 2, name: "Темурова Гульнара", children: "Али Т. (10\"А\")", email: "temurova@aqbobek.kz", status: "active" },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "warning": return "bg-yellow-100 text-yellow-700";
      case "inactive": return "bg-red-100 text-red-700";
      default: return "bg-neutral-100 text-neutral-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "Активен";
      case "warning": return "Внимание";
      case "inactive": return "Не активен";
      default: return "Статус";
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "students": return GraduationCap;
      case "teachers": return BookOpen;
      case "parents": return Users;
      default: return Users;
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
            Пользователи
          </h1>
          <p className="text-neutral-600 mt-1">
            Управление учетными записями
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Экспорт</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Добавить</span>
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-neutral-200">
        {[
          { id: "students", label: "Ученики", count: 524 },
          { id: "teachers", label: "Учителя", count: 48 },
          { id: "parents", label: "Родители", count: 412 },
        ].map((tab) => {
          const Icon = getTabIcon(tab.id);
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              <span className="px-2 py-0.5 bg-neutral-100 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Фильтр</span>
        </button>
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Пользователь</th>
                {activeTab === "students" && (
                  <>
                    <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Класс</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Средний балл</th>
                  </>
                )}
                {activeTab === "teachers" && (
                  <>
                    <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Предмет</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Классов</th>
                  </>
                )}
                {activeTab === "parents" && (
                  <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Дети</th>
                )}
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Email</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Статус</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {(users as any)[activeTab].map((user: any, index: number) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                  className="hover:bg-neutral-50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="font-medium text-neutral-900">{user.name}</span>
                    </div>
                  </td>
                  {activeTab === "students" && (
                    <>
                      <td className="px-5 py-4 text-sm text-neutral-600">{user.class}</td>
                      <td className="px-5 py-4">
                        <span className="text-sm font-bold text-neutral-900">{user.gpa}</span>
                      </td>
                    </>
                  )}
                  {activeTab === "teachers" && (
                    <>
                      <td className="px-5 py-4 text-sm text-neutral-600">{user.subject}</td>
                      <td className="px-5 py-4 text-sm text-neutral-600">{user.classes}</td>
                    </>
                  )}
                  {activeTab === "parents" && (
                    <td className="px-5 py-4 text-sm text-neutral-600">{user.children}</td>
                  )}
                  <td className="px-5 py-4 text-sm text-neutral-600">{user.email}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(user.status)}`}>
                      {getStatusLabel(user.status)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="p-1 hover:bg-neutral-100 rounded transition-colors">
                      <MoreVertical className="w-4 h-4 text-neutral-600" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}